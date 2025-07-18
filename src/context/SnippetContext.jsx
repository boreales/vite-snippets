import { createContext, useContext, useState, useEffect } from 'react';
import '../firebase.js';
import { getDatabase, ref, child, get, set, push } from "firebase/database";

export const SnippetContext = createContext({
    snippets: [],
    loading: true,
    addSnippet: () => {},
    deleteSnippet: () => {},
    updateSnippet: () => {},
    snippetCount: 0,
    isLoaded: false,
    search: '',
    setSearch: () => {},
    filteredSnippets: [],
});

export function SnippetProvider({ children }) {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const [search, setSearch] = useState('');
    const dbRef = ref(getDatabase());
    const userId = localStorage.getItem('userId');

    // Charger les utilisateurs depuis localStorage au montage
    useEffect(() => {
        try {
            loadedSnippets();
        } catch (error) {
            console.error('Erreur lors du chargement des snippets:', error);
            setSnippets([]);
        } finally {
            setLoading(false);
        }
    }, []);

    async function loadedSnippets() {
        get(child(dbRef, `snippets/` + userId)).then((snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            console.log('Data', Object.entries(data));
            if (data) {
              const snippetsArray = Object.entries(data).map(([id, snippet]) => ({
                id,
                ...snippet
              }));
              setSnippets(snippetsArray);
              setIsLoaded(true);
            }
          } else {
            console.log("No data available");
            setIsLoaded(true);
          }
        }).catch((error) => {
          console.error(error);
          setIsLoaded(true);
        });
    }

    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.language.toLowerCase().includes(search.toLowerCase())
    );

    // Fonction pour ajouter un utilisateur
    const addSnippet = (formData) => {
        if (!formData.title.trim() || !formData.code.trim() || !formData.language.trim()) {
            alert("Please fill in all fields");
            return;
        }
        const newSnippet = {
            id: Date.now(),
            title: formData.title,
            code: formData.code,
            language: formData.language,
        };
        setSnippets([...snippets, newSnippet]);
        
        const db = getDatabase();
        const snippetsRef = ref(db, 'snippets/' + userId + '/' + newSnippet.id);
        set(snippetsRef, newSnippet).then(() => {
            console.log("Snippet added successfully");
          }).catch(error => {
            console.error("Erreur lors de l'ajout du snippet:", error);
        });
    };

    const deleteSnippet = (id) => {
        const db = getDatabase();
        const snippetsRef = ref(db, 'snippets/' + userId + '/' + id);
        //On supprime le snippet de la base de données
        set(snippetsRef, null).then(() => {
            console.log("Snippet deleted successfully");
        }).catch(error => {
            console.error("Erreur lors de la suppression du snippet:", error);
        });
        //Avec filter on supprime du state l'élément correspondant à l'index donné
        setSnippets(snippets.filter((snippet) => snippet.id !== id));
    };

    const updateSnippet = (id, formData) => {
        console.log(formData);
        if (!formData.title.trim() || !formData.code.trim() || !formData.language.trim()) {
            alert("Please fill in all fields");
            return;
        }

        //Update the snippet in the state
        const updatedSnippets = snippets.map(snippet => 
            snippet.id === id ? { ...snippet, ...formData } : snippet
        );
        //On met à jour le snippet dans la base de données
        console.log(updatedSnippets);
        //Get the snippet to update
        const snippetToUpdate = updatedSnippets.find(snippet => snippet.id === id);
        if (!snippetToUpdate) {
            console.error("Snippet not found for update");
            return;
        }
        const db = getDatabase();
        
        const snippetsRef = ref(db, 'snippets/' + userId + '/' + snippetToUpdate.id);
        //On met à jour le snippet dans la base de données
        set(snippetsRef, snippetToUpdate).then(() => {
            console.log("Snippet updated successfully");
        }).catch(error => {
            console.error("Erreur lors de la mise à jour du snippet:", error);
        });
        setSnippets(updatedSnippets);
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
    }

    // Valeur du contexte
    const contextValue = {
        snippets,
        loading,
        addSnippet,
        deleteSnippet,
        updateSnippet,
        snippetCount: snippets.length,
        isLoaded,
        filteredSnippets,
        search,
        setSearch
    };

    return (
        <SnippetContext.Provider value={contextValue}>
            {children}
        </SnippetContext.Provider>
    );
}

// Hook personnalisé pour utiliser le contexte
export function useSnippets() {
    const context = useContext(SnippetContext);
    
    if (!context) {
        throw new Error('useSnippets doit être utilisé dans un SnippetProvider');
    }
    
    return context;
}

// Hook pour un snippet spécifique
export function useSnippet(snippetId) {
    const { snippets } = useContext(SnippetContext);
    if (!snippets) {
        throw new Error("useSnippet must be used within a SnippetProvider");
    }
    return {
        snippetFind: snippets.find(snippet => snippet.id === snippetId) || {},
        snippetId
    };
}