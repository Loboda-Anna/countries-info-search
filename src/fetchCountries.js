export default function fetchCountries(name) {
  const parametersMarkup = `name.official,capital,population,flags.svg,languages`;
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=${parametersMarkup}`
  )
    .then(resp => {
      resp.json();
    })
    .then(console.log())
    .catch(error =>
      Notiflix.Notify.failure('Oops, there is no country with that name')
    );
}
