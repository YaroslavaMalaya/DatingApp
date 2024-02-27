document.addEventListener('DOMContentLoaded', function() {
    const selectedInterests = new Set();
    const buttons = document.querySelectorAll('.interests-form-group .button');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const interest = this.getAttribute('data-interest');
            if (selectedInterests.has(interest)) {
                selectedInterests.delete(interest);
                this.classList.remove('selected');
            } else if (selectedInterests.size < 6) {
                selectedInterests.add(interest);
                this.classList.toggle('selected');
            }
            document.getElementById('selectedInterests').value = Array.from(selectedInterests).join(',');
        });
    });
});
