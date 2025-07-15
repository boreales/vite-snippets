import React, { useEffect } from 'react';
import Snippet from './Snippet';
import Filter from './Filter';

export default function List({snippets, setSnippets, search}){
   
    useEffect(() => {
        const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
        if (storedSnippets) {
        setSnippets(storedSnippets);
        }
    }, []);

    const filteredSnippets = snippets.filter(snippet =>
        snippet.title.toLowerCase().includes(search.toLowerCase()) ||
        snippet.language.toLowerCase().includes(search.toLowerCase())
    );

    return(
        <>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {snippets.length}</p>
            <hr></hr>
            <Filter snippets={snippets} setSnippets={setSnippets} />
            <hr></hr>
            <ul>
            {filteredSnippets.map((item, index) => (
                <li key={index}>
                    <Snippet snippets={snippets} setSnippets={setSnippets} item={item} index={index} />
                </li>
            ))}
            </ul>
        </>
    );
}