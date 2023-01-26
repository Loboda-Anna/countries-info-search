import './css/styles.css';
import fetchCountries from './fetchCountries';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
var debounce = require('lodash.debounce');


const DEBOUNCE_DELAY = 300;
const fieldEl = document.querySelector('[id="search-box"]');
export const countriesListEl = document.querySelector('.country-list');
export const countryInfoEl = document.querySelector('.country-info');



fieldEl.addEventListener('input', debounce(onFieldInput, DEBOUNCE_DELAY));

function onFieldInput(e) {
  let sanitizValue = fieldEl.value.trim();
  if (sanitizValue === '') {
    return;
  }
  fetchCountries(sanitizValue)
    .then(countries => {
      if (countries.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        countriesListEl.innerHTML = '';
        countryInfoEl.innerHTML = '';
        return;
      }
      if (countries.length >= 2) {
        renderCountriesList(countries);
      }
      if (countries.length === 1) {
        renderCountryInfo(countries);
      }
    })
    .catch(error => console.log(error));
}

function renderCountriesList(countries) {
  const countriesMarkup = countries
    .map(({ flags, name }) => {
      return `<li>
    <img src=${flags.svg}  alt =  "${name.official} flag" width = "30" >
      ${name.official}
    </li>`;
    })
    .join('');
  countriesListEl.innerHTML = countriesMarkup;
  countryInfoEl.innerHTML = '';
}

function renderCountryInfo(countries) {
  let { flags, name, capital, population, languages } = countries[0];
  const countryMarkup = `<h1>
  <img src=${flags.svg}  alt =  "${name.official} flag" width = "50">
      ${name.official}
      </h1>
      <ul><li>
          <p><b>Capital</b>: ${capital}</p>
          <p><b>Population</b>: ${population}</p>
          <p><b>Languages</b>: ${Object.values(languages)}</p>
        </li></ul>`;
  countriesListEl.innerHTML = '';
  countryInfoEl.innerHTML = countryMarkup;
}
