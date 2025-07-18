import { createContext, useContext, useState, useEffect } from 'react';
import './firebase.js';
import { getDatabase, ref, child, get, set } from "firebase/database";

export const SnippetContext = createContext({
    snippets: [],
    loading: true,
    addSnippet: () => {},
    deleteSnippet: () => {},
    updateSnippet: () => {},
    snippetCount: 0
});

export function SnippetProvider({ children }) {
    const [snippets, setSnippets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoaded, setIsLoaded] = useState(false);
    const dbRef = ref(getDatabase());

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
        get(child(dbRef, `snippets`)).then((snapshot) => {
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
        const snippetsRef = ref(db, 'snippets/' + newSnippet.id);
        set(snippetsRef, newSnippet).then(() => {
            console.log("Snippet added successfully");
          }).catch(error => {
            console.error("Erreur lors de l'ajout du snippet:", error);
        });
    };

    const deleteSnippet = (index) => {
        const db = getDatabase();
        const snippetsRef = ref(db, 'snippets/' + item.id);
        //On supprime le snippet de la base de données
        set(snippetsRef, null).then(() => {
            console.log("Snippet deleted successfully");
        }).catch(error => {
            console.error("Erreur lors de la suppression du snippet:", error);
        });
        //Avec filter on supprime du state l'élément correspondant à l'index donné
        setSnippets(snippets.filter((_, i) => i !== index));
    };

    const updateSnippet = (index) => {
        const updatedSnippets = snippets.map((snippet, i) => 
            i === index ? { ...snippet, title: editedTitle, language: editedLanguage, code: editedCode } : snippet
        );
        setSnippets(updatedSnippets);
        localStorage.setItem('snippets', JSON.stringify(updatedSnippets));
        setIsEditing(false);
        setEditedTitle('');
        setEditedLanguage('');
        setEditedCode('');
    }

    // Valeur du contexte
    const contextValue = {
        snippets,
        loading,
        addSnippet,
        deleteSnippet,
        updateSnippet,
        snippetCount: snippets.length
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