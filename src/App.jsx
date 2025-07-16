import React, {useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnippetPage from './SnippetPage';
import AppComponent from './AppComponent.jsx'
import './firebase.js';
import { getDatabase, ref, child, get } from "firebase/database";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const dbRef = ref(getDatabase());

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

   useEffect(() => {
      if (!isLoaded) {
        loadedSnippets();
      }
  }, [snippets]);

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppComponent snippets={filteredSnippets} setSnippets={setSnippets} search={search} setSearch={setSearch} />} />
          <Route path="/snippet/:id" element={<SnippetPage snippets={filteredSnippets} />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
