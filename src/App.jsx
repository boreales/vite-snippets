import React, {useState} from 'react'
import './App.css'
import Form from './Form.jsx'
import List from './List.jsx'
import Header from './Header'

function App() {
  const [snippets, setSnippets] = useState([]);
  const [search, setSearch] = useState('');

  return (
      <>
        <Header />
        <hr></hr>
        <Form snippets={snippets} setSnippets={setSnippets} search={search} setSearch={setSearch}/>
        <hr></hr>
        <List snippets={snippets} setSnippets={setSnippets} search={search}/>
      </>
  )
}

export default App
