import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { countryInfoEl, countriesListEl } from './index';

export default function fetchCountries(name) {
  const parametersMarkup = `name,capital,population,flags,languages`;
  return fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${parametersMarkup}`
  ).then(resp => {
    if (!resp.ok) {
      Notify.failure('Oops, there is no country with that name');
      countriesListEl.innerHTML = '';
      countryInfoEl.innerHTML = '';
      throw new Error(resp.status);
    }
    return resp.json();
  });
}
