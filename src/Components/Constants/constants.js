
// HTML CONSTANTS
const HTML_OPENING= "<html> "
const HTML_CLOSING = "</html> "
const BODY_OPENING ="<body>"
const BODY_CLOSING = "</body>"

// 
const STYLE_FOR_MARKDOWN = `
<style>  
  h1 {
    font-size: 2em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 1.25em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h4 {
    font-size: 1.1em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h5 {
    font-size: 1em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  h6 {
    font-size: 0.9em;
    font-weight: bold;
    margin-bottom: 0.5em;
  }

  p {
    font-size: 12px;
  }

  /* Bold */
  b, strong {
    font-weight: bold;
  }

  /* Italic */
  i, em {
    font-style: italic;
  }

  /* Strike Through */
  s, strike {
    text-decoration: line-through;
  }

  /* Blockquote */
  blockquote {
    margin: 0;
    padding: 0 1em;
    color: #666;
    border-left: 4px solid #ccc;
  }

  /* Code Block */
  pre {
    margin: 0;
    padding: 0.5em;
    background-color: #f0f0f0;
    font-family: 'Courier New', Courier, monospace;
    border: 1px solid #ccc;
    white-space: pre-wrap;
  }

  code {
    font-family: 'Courier New', Courier, monospace;
    background-color: #f0f0f0;
    padding: 0.2em;
    border: 1px solid #ccc;
  }
</style>
`


export {
    HTML_CLOSING,
    HTML_OPENING,
    BODY_OPENING,
    BODY_CLOSING,
    STYLE_FOR_MARKDOWN
}