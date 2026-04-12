# TerraFinder 🌍

TerraFinder is a dynamic, interactive web application that allows users to explore comprehensive information about countries around the world. It provides sleek, real-time filtering, detailed statistics, and interactive map visualizations.

## Final Implementation Features

- **Dynamic Data Rendering:** Integrates the `REST Countries API` to fetch and render global country data dynamically.
- **Interactive Global Map:** Clicking on a country card opens a detailed modal with a custom Highcharts SVG world map, highlighting the selected region in real-time.
- **Multi-Filter System:** Allows searching via keywords (common names, official names, alternate spellings, and alpha codes) alongside an Alphabet dropdown filter.
- **Array High-Order Functions:** All searching and filtering logic is handled purely through native JS array methods (`.filter()`, `.some()`, etc.).
- **Debounced Search (Bonus):** Included a custom debounce function to optimize search bar performance, limiting expensive rendering operations during rapid typing.
- **Loading State (Bonus):** Added a CSS-animated loading indicator to provide visual feedback while fetching initial payloads.
- **Responsive Layout:** Completely mobile responsive, utilizing CSS Flexbox and Grid, with custom `@media` queries adjusting complex modal views to stack natively on smaller viewports.

## Tech Stack
- Vanilla HTML5 & CSS3
- Vanilla JavaScript (ES6+)
- API: [REST Countries V3.1](https://restcountries.com/)
- Map Data: [Highcharts Custom SVG Map](https://code.highcharts.com/)

## Installation & Setup
1. Clone this repository to your local machine.
2. Open `index.html` in your favorite modern browser. No complex build tools or `npm` installations are needed. Minimum viable connection required for fetching LIVE API data.

## Author
Developed as a demonstration of API integration, advanced Javascript manipulation, and creative UI engineering.
