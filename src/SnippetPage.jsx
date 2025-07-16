import { useParams } from 'react-router-dom';

export default function SnippetPage({ snippets }) {
  const { id } = useParams();
  const snippet = snippets[id];
  if (!snippet) return <div>Snippet introuvable</div>;
  return (
    <div>
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
    </div>
  );
}