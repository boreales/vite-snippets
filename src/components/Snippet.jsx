import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, arduinoLight, androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { useSnippets } from '../context/SnippetContext.jsx';

export default function Snippet({item, theme}) {
    const {deleteSnippet, updateSnippet} = useSnippets();

    switch (theme) {
        case 'arduinoLight':
            var themeSet = arduinoLight;
            break;
        case 'androidstudio':
            var themeSet = androidstudio;
            break;
        default:
            var themeSet = docco;
    }
        const [isEditing, setIsEditing] = useState(false);
        const [formData, setFormData] = useState({
            id: item.id,
            title: item.title,
            code: item.code,
            language: item.language,
        });

        const handleEditToggle = () => {
            setIsEditing(!isEditing);
            if (!isEditing) {
                // Reset formData
                setFormData({ title: item.title, code: item.code, language: item.language });
            }
        }

        //Download snippet as a JSON file
        const downloadSnippet = (item) => {
            const snippetToDownload = item;
            const blob = new Blob([JSON.stringify(snippetToDownload, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${snippetToDownload.title}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        };

        const shareSnippet = () => {
            const url = `${window.location.origin}/snippet/${item.id}`;
            navigator.clipboard.writeText(url);
            alert('Lien copié dans le presse-papier !');
          };

    return(
        <>
            {item.title} - {item.language} 
            <SyntaxHighlighter language={item.language} style={themeSet}>{item.code}</SyntaxHighlighter>
            {isEditing && (
            <div>
                <h3>Edit Snippet</h3>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                />
                <input 
                    type="text" 
                    placeholder="Language" 
                    value={formData.language} 
                    onChange={(e) => setFormData({ ...formData, language: e.target.value })} 
                />
                <textarea 
                    placeholder="Code" 
                    value={formData.code} 
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })} 
                />
                <button onClick={() => updateSnippet(formData)}>Save</button>
                <button onClick={handleEditToggle}>Cancel</button>
            </div>
            )}
            <button onClick={() => {
                handleEditToggle();
            }}>Edit</button>
            <button onClick={() => downloadSnippet(item)}>Download</button>
            <button style={{background:'red', color:'white'}} onClick={() => deleteSnippet(item.id)}>Delete</button>
            <button onClick={shareSnippet}>Partager</button>
        </>
    )
}