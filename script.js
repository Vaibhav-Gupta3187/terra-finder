const container = document.getElementById("data");

fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population")
  .then(res => res.json())
  .then(data => {

    // limit to 20 countries (clean UI)
    data.slice(0, 20).forEach(country => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${country.name.common}</h3>
        <img src="${country.flags.png}" width="100"/>
        <p>Capital: ${country.capital ? country.capital[0] : "N/A"}</p>
        <p>Population: ${country.population}</p>
        <hr/>
      `;

      container.appendChild(div);
    });

  })
  .catch(err => {
    console.log(err);
    container.innerText = "Failed to load data";
  });