import React, {useState} from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import './Form.css';
import './firebase.js';
import { getDatabase, ref, set} from "firebase/database";

function Form({snippets, setSnippets}) {
    const [formData, setFormData] = useState({
      title: '',
      code: '',
      language: '',
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const addSnippet = () => {
        if (!formData.title.trim() || !formData.code.trim() || !formData.language.trim()) {
            alert("Please fill in all fields");
            return;
        }
        const newSnippet = {
            id: Date.now(),
            title: formData.title,
            code: formData.code,
            language: formData.language,
        };
        setSnippets([...snippets, newSnippet]);
        
        const db = getDatabase();
        const snippetsRef = ref(db, 'snippets/' + newSnippet.id);
        set(snippetsRef, newSnippet).then(() => {
            console.log("Snippet added successfully");
          }).catch(error => {
            console.error("Erreur lors de l'ajout du snippet:", error);
        });
        setFormData({ title: '', code: '', language: '' });
    };

    return (
        <div className='App-form'>
            <h2>Ajouter un Snippet</h2>
            <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            placeholder="Snippet Title"
            />
            <input
            type="text"
            value={formData.language}
            onChange={(e) => handleInputChange('language', e.target.value)}
            placeholder="Snippet Language"
            />
            <textarea
            value={formData.code}
            onChange={(e) => handleInputChange('code', e.target.value)}
            placeholder="Snippet Code"
            />
            <button onClick={addSnippet}><BsFillPlusCircleFill /> Add Snippet</button>
        </div>
    );
}

export default Form;