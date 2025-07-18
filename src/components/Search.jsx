import React, { useEffect } from 'react';
import { useSnippets } from '../context/SnippetContext.jsx';

export default function Search(){
    const { search, setSearch } = useSnippets();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearch(search);
            console.log(`Searching for: ${search}`);
        }, 300);
        return () => clearTimeout(timer);
    }, [search]);

    const clearSearch = () => {
        setSearch('');
    };

    return(
        <>
            <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Snippets"
            />
            {search !== '' &&
            <button onClick={clearSearch}>X</button>
            }
        </>
    );
}