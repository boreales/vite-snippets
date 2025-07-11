import React, {useState} from 'react'
import './App.css'
import Form from './Form.jsx'
import List from './List.jsx'
import Header from './Header'
import Search from './Search.jsx'

function App() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');

  const filteredSnippets = snippets.filter(
    (snippet) =>
      snippet.title.toLowerCase().includes(search.toLowerCase()) ||
      snippet.language.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <>
        <Header />
        <Search search={search} setSearch={setSearch}/>
        <hr></hr>
        <Form snippets={filteredSnippets} setSnippets={setSnippets} search={search} setSearch={setSearch}/>
        <hr></hr>
        <List snippets={filteredSnippets} setSnippets={setSnippets} search={search}/>
      </>
  )
}

export default App
