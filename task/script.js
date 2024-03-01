document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");
    const countriesContainer = document.getElementById("countriesContainer");

    let allCountriesData = []; 

    fetch("https://restcountries.com/v3.1/all")
        .then(response => response.json())
        .then(data => {
            allCountriesData = data;
            displayCountries(allCountriesData);
        })
        .catch(error => {
            console.error("Error fetching countries:", error);
        });

    function displayCountries(countries) {
        countriesContainer.innerHTML = "";
        countries.forEach(country => {
            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = `
                <img src="${country.flags.png}" alt="${country.name.common}" class="flag">
                <h2>${country.name.common}</h2>
            `;
            countriesContainer.appendChild(countryCard);
        });
    }

    searchInput.addEventListener("input", function () {
        const searchText = this.value.trim().toLowerCase();
        const filteredCountries = allCountriesData.filter(country => country.name.common.toLowerCase().includes(searchText));
        displayCountries(filteredCountries);
    });
});
