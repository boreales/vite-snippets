import React, {useState, useEffect} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnippetPage from './SnippetPage';
import AppComponent from './AppComponent.jsx'
import './firebase.js';

//On peut ensuite accéder aux fonctions de la librairie pour interagir avec la base de données
import { getDatabase, ref, child, get } from "firebase/database";

function App() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');

  const dbRef = ref(getDatabase());
    get(child(dbRef, `snippets`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  useEffect(() => {
      const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
      if (storedSnippets) {
      setSnippets(storedSnippets);
      }
  }, []);

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
