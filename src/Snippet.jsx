import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Snippet({item}) {
    return(
        <>
            {item.title} - {item.language} 
            <SyntaxHighlighter language={item.language} style={docco}>{item.code}</SyntaxHighlighter>
        </>
)}