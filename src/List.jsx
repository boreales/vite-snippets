import React, { useEffect } from 'react';
import Snippet from './Snippet.jsx';

export default function List({snippets, setSnippets}){
   
    useEffect(() => {
        const storedSnippets = JSON.parse(localStorage.getItem('snippets'));
        if (storedSnippets) {
        setSnippets(storedSnippets);
        }
    }, []);

    return(
        <>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {snippets.length}</p>
            <hr></hr>
            <ul>
            {snippets.map((item, index) => (
                <li key={index}>
                    <Snippet item={item} />
                </li>
            ))}
            </ul>
        </>
    );
}