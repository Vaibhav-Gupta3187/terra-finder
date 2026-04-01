let countriesData = [];

fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region")
  .then(response => {
    if (!response.ok) {
      throw new Error("API Error");
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // DEBUG
    countriesData = data;
    displayCountries(data);
  })
  .catch(error => {
    console.log("Error fetching data:", error);
  });

function displayCountries(data) {
  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";

  if (!Array.isArray(data)) return;

  data.forEach(country => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.png}" alt="flag" />
      <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><b>Population:</b> ${country.population.toLocaleString()}</p>
      <p><b>Region:</b> ${country.region}</p>
    `;

    container.appendChild(div);
  });
}

document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();

  if (!Array.isArray(countriesData)) return;

  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(searchValue)
  );

  displayCountries(filteredCountries);
});