let countriesData = [];
let svgLoaded = false;
const loadingIndicator = document.getElementById("loadingIndicator");

// Fetch countries data
fetch("https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,cca2,cca3,altSpellings")
  .then(response => {
    if (!response.ok) {
      throw new Error("API Error");
    }
    return response.json();
  })
  .then(data => {
    countriesData = data;
    loadingIndicator.classList.add("hidden");
    displayCountries(data);
  })
  .catch(error => {
    console.log("Error fetching data:", error);
    loadingIndicator.textContent = "Error loading data.";
  });

// Fetch SVG world map
fetch("https://code.highcharts.com/mapdata/custom/world.svg")
  .then(response => response.text())
  .then(svgText => {
    document.getElementById("mapContainer").innerHTML = svgText;
    svgLoaded = true;
  })
  .catch(error => {
    console.log("Error fetching SVG:", error);
    document.getElementById("mapContainer").innerHTML = "<p>Error loading map</p>";
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
      <p><b>Capital:</b> ${country.capital && country.capital.length > 0 ? country.capital[0] : "N/A"}</p>
      <p><b>Population:</b> ${country.population.toLocaleString()}</p>
      <p><b>Region:</b> ${country.region}</p>
    `;

    // Add click event for modal
    div.addEventListener("click", () => openModal(country));

    container.appendChild(div);
  });
}

// Populate Alphabet Filter dynamically
const alphabetFilter = document.getElementById("alphabetFilter");
for (let i = 65; i <= 90; i++) {
  const option = document.createElement("option");
  const letter = String.fromCharCode(i);
  option.value = letter.toLowerCase();
  option.textContent = letter;
  alphabetFilter.appendChild(option);
}

const searchInput = document.getElementById("searchInput");

function applyFilters() {
  const searchValue = searchInput.value.toLowerCase();
  const alphaValue = alphabetFilter.value;

  if (!Array.isArray(countriesData)) return;

  const filteredCountries = countriesData.filter(country => {
    // 1. Alphabet Filter
    if (alphaValue !== "all" && country.name && country.name.common) {
      if (!country.name.common.toLowerCase().startsWith(alphaValue)) {
        return false;
      }
    }

    // 2. Search Text Filter
    if (searchValue) {
      return (
        (country.name && country.name.common && country.name.common.toLowerCase().includes(searchValue)) ||
        (country.name && country.name.official && country.name.official.toLowerCase().includes(searchValue)) ||
        (country.altSpellings && country.altSpellings.some(alt => alt.toLowerCase().includes(searchValue))) ||
        (country.cca2 && country.cca2.toLowerCase().includes(searchValue)) ||
        (country.cca3 && country.cca3.toLowerCase().includes(searchValue))
      );
    }
    
    return true;
  });

  displayCountries(filteredCountries);
}

// Bonus Feature: Debounce function to optimize search filtering
function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, delay);
  };
}

const debouncedApplyFilters = debounce(applyFilters, 300);

searchInput.addEventListener("input", debouncedApplyFilters);
alphabetFilter.addEventListener("change", applyFilters);

// --- Modal Logic ---

const modal = document.getElementById("countryModal");
const closeModalBtn = document.getElementById("closeModalBtn");
const modalCountryName = document.getElementById("modalCountryName");
const countryStatsList = document.getElementById("countryStatsList");
const statsSearchInput = document.getElementById("statsSearchInput");

let currentStats = [];

// Basic mock data generator based on country string to keep it consistent
function generateMockStats(countryName) {
  const hash = Array.from(countryName).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  
  return [
    { label: "GDP (Mocked)", value: "$" + ((hash * 123) % 5000 + 100).toLocaleString() + " Billion" },
    { label: "World Peace Ranking", value: "#" + ((hash % 150) + 1) },
    { label: "Tech Innovation Index", value: ((hash % 100) / 10 + 5).toFixed(1) + " / 10" },
    { label: "Space Exploration Focus", value: ["Low", "Medium", "High", "Very High"][hash % 4] },
    { label: "Happiness Index", value: ((hash % 100) / 10 + 3).toFixed(1) + " / 10" }
  ];
}

function openModal(country) {
  modal.classList.remove("hidden");
  modalCountryName.textContent = country.name.common;
  statsSearchInput.value = "";

  // Highlight country on map
  if (svgLoaded) {
    const paths = document.querySelectorAll("#mapContainer path");
    paths.forEach(p => p.classList.remove("highlighted"));

    const countryCode = country.cca2.toLowerCase();
    const targetPath = document.querySelector(`#mapContainer path[id="${countryCode}"]`);
                       
    if (targetPath) {
      targetPath.classList.add("highlighted");
    }
  }

  // Combine real stats with mock stats
  currentStats = [
    { label: "Capital", value: country.capital && country.capital.length > 0 ? country.capital[0] : "N/A" },
    { label: "Population", value: country.population.toLocaleString() },
    { label: "Region", value: country.region },
    ...generateMockStats(country.name.common)
  ];

  renderStats(currentStats);
}

closeModalBtn.addEventListener("click", () => {
  modal.classList.add("hidden");
});

function renderStats(statsToRender) {
  countryStatsList.innerHTML = "";
  statsToRender.forEach(stat => {
    const statDiv = document.createElement("div");
    statDiv.className = "stat-item";
    statDiv.innerHTML = `
      <span class="stat-label">${stat.label}</span>
      <span class="stat-value">${stat.value}</span>
    `;
    countryStatsList.appendChild(statDiv);
  });
}

statsSearchInput.addEventListener("input", function () {
  const searchTerm = this.value.toLowerCase();
  const filtered = currentStats.filter(stat => 
    stat.label.toLowerCase().includes(searchTerm) || 
    stat.value.toString().toLowerCase().includes(searchTerm)
  );
  renderStats(filtered);
});