import Form from './Form.jsx'
import List from './List.jsx'
import Header from './Header'
import Search from './Search.jsx'

export default function AppComponent({
    snippets, 
    setSnippets, 
    search, 
    setSearch,
    setIsLogged
}) {
    function logout() {
        localStorage.removeItem('userId');
        setIsLogged(false);
    }

    return (
    <>
        <Header />
        <button type="button" className="link" onClick={logout}>Logout</button>
        <br/>
        <Search search={search} setSearch={setSearch}/>
        <hr></hr>
        <Form snippets={snippets} setSnippets={setSnippets} search={search} setSearch={setSearch}/>
        <hr></hr>
        <List snippets={snippets} setSnippets={setSnippets} search={search}/>
    </>
    );
}