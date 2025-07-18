import React, { useState } from 'react';
import Snippet from './Snippet';
import Filter from './Filter';
import { useSnippets } from '../context/SnippetContext';

export default function List(){
    const [theme, setTheme] = useState('docco');
    const { filteredSnippets, setSnippets } = useSnippets();

    const handleChangeTheme = (newTheme) => {
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    return(
        <>
            <Filter snippets={filteredSnippets} setSnippets={setSnippets} />
            <hr></hr>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {filteredSnippets.length}</p>
            <button onClick={() => handleChangeTheme(theme === 'docco' ? 'androidstudio' : 'docco')}>Change Theme</button>
            <hr></hr>
            <ul>
            {filteredSnippets.map((item, index) => (
                <li key={index}>
                    <Snippet snippets={filteredSnippets} setSnippets={setSnippets} item={item} index={index} theme={theme} />
                </li>
            ))}
            </ul>
        </>
    );
}