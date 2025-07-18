import React, {useState, useEffect} from 'react'
import './App.css'
import Header from './Header.jsx';
import Search from './Search.jsx';
import Form from './Form.jsx';
import List from './List.jsx';
import Auth from './Auth.jsx'; 
import { SnippetProvider } from "./SnippetContext.jsx";
import Snippet from './Snippet.jsx';

function App() {
  const [search, setSearch] = useState('');
  const [isLogged, setIsLogged] = useState(false);

   useEffect(() => {
      const userId = localStorage.getItem('userId');
      if (userId) {
        setIsLogged(true);
      }
  }, []);

  return (
    <>
    {!isLogged && (<Auth setIsLogged={setIsLogged} />)}
    {isLogged && (
      <>
      <Header />
      <Search search={search} setSearch={setSearch}/>
      <hr></hr>
      <SnippetProvider>
        <Form search={search} setSearch={setSearch}/>
        <hr></hr>
        <List search={search}/>
      </SnippetProvider>
      </>
    )}
    </>
  )
}

export default App
