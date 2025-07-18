import { useParams } from 'react-router-dom';

export default function SnippetPage({ snippets }) {
  const { id } = useParams();
  const snippet = snippets.find((snippet) => {
    if (snippet.id.toString() === id.toString()) {
      return snippet;
    }
  });
  if (!snippet) return <div>Snippet introuvable</div>;
  return (
    <div>
      <h2>{snippet.title}</h2>
      <pre>{snippet.code}</pre>
      <a href="/">Retour à la liste des snippets</a>
    </div>
  );
}