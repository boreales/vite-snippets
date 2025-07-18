import reactLogo from '../assets/react.svg'

export default function Header(){
    return(
      <>
        <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Code Snippets</h1>
        <button className='logout' onClick={() => {
          localStorage.removeItem('userId');
          window.location.reload();
        }
        }>Logout</button>
      </>
    );
}