import { useParams } from 'react-router-dom';
import { useSnippet } from '../context/SnippetContext.jsx';

export default function SnippetPage({ snippets }) {
  const { id } = useParams();
  const snippet = useSnippet(id);
  if (!snippet) return <div>Snippet introuvable</div>;
  return (
    <div>
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
      <a href="/">Retour à la liste des snippets</a>
    </div>
  );
}