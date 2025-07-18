import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, arduinoLight, androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { getDatabase, ref, set} from "firebase/database";

export default function Snippet({item, setSnippets, snippets, index, theme}) {
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
        const [editedTitle, setEditedTitle] = useState('');
        const [editedLanguage, setEditedLanguage] = useState('');
        const [editedCode, setEditedCode] = useState('');



        const handleEditToggle = () => {
            setIsEditing(!isEditing);
            if (!isEditing) {
                // Set initial values for editing
                setEditedTitle(item.title);
                setEditedLanguage(item.language);
                setEditedCode(item.code);
            }
        }

        //Download snippet as a JSON file
        const downloadSnippet = (index) => {
            const snippetToDownload = snippets[index];
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
            const url = `${window.location.origin}/snippet/${index}`;
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
                    value={editedTitle} 
                    onChange={(e) => setEditedTitle(e.target.value)} 
                />
                <input 
                    type="text" 
                    placeholder="Language" 
                    value={editedLanguage} 
                    onChange={(e) => setEditedLanguage(e.target.value)} 
                />
                <textarea 
                    placeholder="Code" 
                    value={editedCode} 
                    onChange={(e) => setEditedCode(e.target.value)} 
                />
                <button onClick={() => handleSave(index)}>Save</button>
                <button onClick={handleEditToggle}>Cancel</button>
            </div>
            )}
            <button onClick={() => {
                handleEditToggle();
            }}>Edit</button>
            <button onClick={() => downloadSnippet(index)}>Download</button>
            <button style={{background:'red', color:'white'}} onClick={() => deleteSnippet(item.id)}>Delete</button>
            <button onClick={shareSnippet}>Partager</button>
        </>
    )
}