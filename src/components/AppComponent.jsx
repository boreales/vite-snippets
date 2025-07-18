import Form from './Form.jsx'
import List from './List.jsx'
import Header from './Header.jsx'
import Search from './Search.jsx'
import BeatLoader from 'react-spinners/BeatLoader';
import { useSnippets } from '../context/SnippetContext.jsx';

export default function AppComponent({
    search, 
    setSearch,
}) {
    const {isLoaded} = useSnippets();

    return (
    <>
        {!isLoaded ? <BeatLoader /> 
        : (
        <>
        <Header />
        <br/>
        <Search search={search} setSearch={setSearch}/>
        <hr></hr>
        <Form search={search} setSearch={setSearch}/>
        <hr></hr>
        <List isLoaded={isLoaded} search={search}/>
        </>
        )}
    </>
    );
}