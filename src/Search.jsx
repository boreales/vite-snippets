import React, { useEffect } from 'react';

export default function Search({search, setSearch}){

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