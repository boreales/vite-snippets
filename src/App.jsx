import React, {useState, useEffect} from 'react'
import './App.css'
import Auth from './components/Auth.jsx'; 
import { SnippetProvider } from "./context/SnippetContext.jsx";
import AppComponent from './components/AppComponent.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SnippetPage from './components/SnippetPage.jsx';

function App() {
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
            <Route path="/" element={<AppComponent />} />
            <Route path="/snippet/:id" element={<SnippetPage />} />
          </Routes>
        </BrowserRouter>
      </SnippetProvider>
    )}
    </>
  )
}

export default App
