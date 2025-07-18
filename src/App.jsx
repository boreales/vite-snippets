import React, {useState, useEffect} from 'react'
import './App.css'
import Auth from './Auth.jsx'; 
import { SnippetProvider } from "./SnippetContext.jsx";
import AppComponent from './AppComponent.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnippetPage from './SnippetPage.jsx';

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
      <SnippetProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppComponent search={search} setSearch={setSearch} />} />
            <Route path="/snippet/:id" element={<SnippetPage />} />
          </Routes>
        </BrowserRouter>
      </SnippetProvider>
    )}
    </>
  )
}

export default App
