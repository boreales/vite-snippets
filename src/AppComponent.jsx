import Form from './Form.jsx'
import List from './List.jsx'
import Header from './Header'
import Search from './Search.jsx'
import BeatLoader from 'react-spinners/BeatLoader';

export default function AppComponent({
    snippets, 
    setSnippets, 
    search, 
    setSearch,
    setIsLogged,
    isLoaded
}) {
    function logout() {
        localStorage.removeItem('userId');
        setIsLogged(false);
    }

    return (
    <>
        {!isLoaded ? <BeatLoader /> 
        : (
        <>
        <Header />
        <br/>
        <Search search={search} setSearch={setSearch}/>
        <hr></hr>
        <Form snippets={snippets} setSnippets={setSnippets} search={search} setSearch={setSearch}/>
        <hr></hr>
        <List isLoaded={isLoaded} snippets={snippets} setSnippets={setSnippets} search={search}/>
        </>
        )}
    </>
    );
}