localStorage.setItem('targetedLanguage', 'en');

let originalTexts = [];
let translatedTexts = [];

function collectInitialText() {
    originalTexts = [];
    document.querySelectorAll('[data-translate]').forEach(element => {
        originalTexts.push(element.textContent);
    });
}

function translateAllElements() {
    const selectedLanguage = document.getElementById('language-select').value;
    localStorage.setItem('targetedLanguage', selectedLanguage)

    // Check if the selected language is the same as the original language (English)
    if (selectedLanguage == 'en') {
        window.location.reload();
        return;
    }

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            texts: originalTexts,
            target_lang: selectedLanguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        translatedTexts = data.translated_texts || [];
        document.querySelectorAll('[data-translate]').forEach((element, index) => {
            element.textContent = translatedTexts[index] || '';
        });
    })
    .catch(error => {
        console.error('Translation error:', error);
    });
}

function logout() {
    window.history.pushState({}, '', window.location.href);
    // Replace the current entry in the history with a new one, pointing to the index page
    window.history.replaceState({}, '', '/');
    // Redirect the user to the index page
    window.location.href = "/doctorLogin";
}