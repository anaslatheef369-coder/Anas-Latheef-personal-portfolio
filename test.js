fetch('https://text.pollinations.ai/prompt/what%20is%20logistics?systemPrompt=You%20are%20an%20expert%20logistics%20chatbot')
    .then(response => response.text())
    .then(text => console.log(text))
    .catch(err => console.error(err));
