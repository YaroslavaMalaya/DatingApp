document.addEventListener('DOMContentLoaded', function() {
    const languagesSelect = document.getElementById('language');
    fetch('/scripts/languages.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(language => {
                const option = document.createElement('option');
                option.value = language.name;
                option.textContent = language.name;
                languagesSelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching languages:', error));
});
