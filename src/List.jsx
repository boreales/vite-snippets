import Snippet from './Snippet';
import Filter from './Filter';

export default function List({snippets, setSnippets}){
   
    return(
        <>
            <h2>Liste des Snippets</h2>
            <p>Nombre de snippets : {snippets.length}</p>
            <hr></hr>
            <Filter snippets={snippets} setSnippets={setSnippets} />
            <hr></hr>
            <ul>
            {snippets.map((item, index) => (
                <li key={index}>
                    <Snippet snippets={snippets} setSnippets={setSnippets} item={item} index={index} />
                </li>
            ))}
            </ul>
        </>
    );
}