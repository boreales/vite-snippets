import React, {useState} from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import './Form.css';
import { useSnippets } from './SnippetContext';

function Form() {
    const [formData, setFormData] = useState({
      title: '',
      code: '',
      language: '',
    });
    const { addSnippet } = useSnippets();

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        addSnippet(formData);
        setFormData({ title: '', code: '', language: '' });
    }

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
            <button onClick={handleSubmit}><BsFillPlusCircleFill /> Add Snippet</button>
        </div>
    );
}

export default Form;