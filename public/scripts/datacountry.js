document.addEventListener('DOMContentLoaded', function() {
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    fetch('https://countriesnow.space/api/v0.1/countries')
        .then(response => response.json())
        .then(data => {
            data.data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.country;
                option.textContent = country.country;
                countrySelect.appendChild(option);
            });
        })
        .catch(error => console.error('Error fetching countries:', error));

    countrySelect.addEventListener('change', function() {
        const selectedCountry = this.value;

        citySelect.innerHTML = '<option value="">Select City...</option>';

        fetch('https://countriesnow.space/api/v0.1/countries/cities', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ country: selectedCountry })
        })
            .then(response => response.json())
            .then(data => {
                data.data.forEach(city => {
                    const option = document.createElement('option');
                    option.value = city;
                    option.textContent = city;
                    citySelect.appendChild(option);
                });
            })
            .catch(error => console.error('Error fetching cities:', error));
    });
});
