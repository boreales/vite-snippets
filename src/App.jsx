import React, {useState, useEffect} from 'react'
import './App.css'
import './firebase.js';
import { getDatabase, ref, child, get } from "firebase/database";
import Header from './Header.jsx';
import Search from './Search.jsx';
import Form from './Form.jsx';
import List from './List.jsx';
import Auth from './Auth.jsx'; 
import { BrowserRouter } from 'react-router-dom';
import AppComponent from './AppComponent.jsx';
import SnippetPage from './SnippetPage.jsx';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const dbRef = ref(getDatabase());

  async function loadedSnippets() {
    get(child(dbRef, `snippets`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
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

   useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setIsLogged(true);
        if (!isLoaded) {
          loadedSnippets();
        }
      } else {
        setIsLoaded(true);
      }
  }, [snippets]);

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    {!isLogged && (<Auth setIsLogged={setIsLogged} />)}
    {isLogged && (
        <BrowserRouter>
            <AppComponent 
                snippets={filteredSnippets} 
                setSnippets={setSnippets} 
                search={search} 
                setSearch={setSearch}
                setIsLogged={setIsLogged}
                isLoaded={isLoaded}
            />
            <SnippetPage snippets={filteredSnippets} />
        </BrowserRouter>
    )}
    </>
  )
}

export default App
