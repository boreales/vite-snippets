import React, { useEffect, useState } from 'react';
import Snippet from './Snippet';

export default function List({snippets, setSnippets}){
    const [theme, setTheme] = useState('docco');

    useEffect(() => {
        const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
        if (storedSnippets) {
        setSnippets(storedSnippets);
        }
    }, []);

    const handleChangeTheme = (newTheme) => {
        setTheme(newTheme);
    }

    return(
        <>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {snippets.length}</p>
            <button onClick={() => handleChangeTheme(theme === 'docco' ? 'androidstudio' : 'docco')}>Change Theme</button>
            <hr></hr>
            <ul>
            {snippets.map((item, index) => (
                <li key={index}>
                    <Snippet item={item} theme={theme}/>
                </li>
            ))}
            </ul>
        </>
    );
}