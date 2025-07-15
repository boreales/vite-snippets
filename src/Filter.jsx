

export default function Filter({snippets, setSnippets}) {
    //Get the language from all snippets
    const languages = [...new Set(snippets.map(snippet => snippet.language))];

    const filter = (language) => {
        const filtered = snippets.filter(snippet => snippet.language === language);
        setSnippets(filtered);
    }

    return(
        <>
            <h3>Filtrer par langage</h3>
            <div className="filters">
                <ul>
                    {languages.map((language, index) => (
                        <li className="filter" key={index}>
                            <a href="#" onClick={() => filter(language)}>{language}</a>
                        </li>
                    ))}
                </ul>
                <a href="#" onClick={() => setSnippets(JSON.parse(localStorage.getItem('snippets') || '[]'))}>Réinitialiser les filtres</a>
            </div>
        </>
    )
}