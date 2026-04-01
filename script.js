let countriesData = [];

// FETCH DATA (correct API)
fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region")
  .then(res => {
    if (!res.ok) throw new Error("API error");
    return res.json();
  })
  .then(data => {
    countriesData = data;
    displayCountries(data);
  })
  .catch(err => console.log(err));

// DISPLAY COUNTRIES
function displayCountries(data) {
  const container = document.getElementById("countriesContainer");
  container.innerHTML = "";

  data.forEach(country => {
    const div = document.createElement("div");

    div.style.border = "1px solid black";
    div.style.margin = "10px";
    div.style.padding = "10px";
    div.style.display = "inline-block";
    div.style.width = "200px";

    div.innerHTML = `
      <h3>${country.name.common}</h3>
      <img src="${country.flags.png}" width="100"/>
      <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
      <p><b>Population:</b> ${country.population}</p>
      <p><b>Region:</b> ${country.region}</p>
    `;

    container.appendChild(div);
  });
}

// SEARCH FUNCTION
document.getElementById("searchInput").addEventListener("input", function () {
  const searchValue = this.value.toLowerCase();

  const filteredCountries = countriesData.filter(country =>
    country.name.common.toLowerCase().includes(searchValue)
  );

  displayCountries(filteredCountries);
});