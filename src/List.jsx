import React, { useState } from 'react';
import Snippet from './Snippet';
import Filter from './Filter';
import { useSnippets } from './SnippetContext';

export default function List({search}){
    const [theme, setTheme] = useState('docco');
    const { snippets, setSnippets } = useSnippets();

    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.language.toLowerCase().includes(search.toLowerCase())
    );

    const handleChangeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return(
        <>
            <Filter snippets={snippets} setSnippets={setSnippets} />
            <hr></hr>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {filteredSnippets.length}</p>
            <button onClick={() => handleChangeTheme(theme === 'docco' ? 'androidstudio' : 'docco')}>Change Theme</button>
            <hr></hr>
            <ul>
            {filteredSnippets.map((item, index) => (
                <li key={index}>
                    <Snippet snippets={snippets} setSnippets={setSnippets} item={item} index={index} theme={theme} />
                </li>
            ))}
            </ul>
        </>
    );
}