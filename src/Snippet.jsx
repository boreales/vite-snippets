import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco, arduinoLight, androidstudio } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default function Snippet({item, theme}) {
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

    return(
        <>
            {item.title} - {item.language} 
            <SyntaxHighlighter language={item.language} style={themeSet}>{item.code}</SyntaxHighlighter>
        </>
    )
}