import './css/styles.css';
import fetchCountries from './fetchCountries';

const DEBOUNCE_DELAY = 300;
const fieldEl = document.querySelector('[id="search-box"]');

// fieldEl.addEventListener('input', _.debounce(onFieldInput, DEBOUNCE_DELAY));
fieldEl.addEventListener('input', onFieldInput);

function onFieldInput(e) {
  let sanitizValue = fieldEl.value.trim();
  if (sanitizValue === '') {
    return;
  }
  fetchCountries(sanitizValue);
}

console.log();
