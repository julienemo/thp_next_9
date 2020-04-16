// prepare API call
const key = '8de0df23'
const endPoint = 'http://www.omdbapi.com/?apikey='

// prepare dom targets
const form = document.querySelector('form');
const keyWordZone = document.querySelector('#keyword');
const gallery = document.querySelector('#gallery');
const content = document.querySelector('#content');
const btnsDetail = document.querySelectorAll('.btn_detail');

// page filling
const movieCard = (movie, galleryZone) => {
  console.log(`${movie.imdbID} ${movie.Poster}`)
  if (movie.Poster == 'N/A') {
    movie.Poster = 'images/default.png'
  }
  galleryZone.innerHTML += `
  <div class='col col-4 mb-4'>
    <img class="poster" src="${movie.Poster}" alt="${movie.Title} poster">
    <p>${movie.Title} (${movie.Year})</p>
    <button id="${movie.imdbId}" class='btn_detail btn btn-info'>See detail</button>
  </div>
  `
}

const showResults = () => {
  if (keyWordZone.value.length < 3) {
    gallery.innerHTML = "Please provide a longer keyword."
    return
  } else {
    apiCall(keyWordZone);
  }
}

const apiCall = (keyWordZone) => {
  fetch(`${endPoint}${key}&s=${keyWordZone.value}`)
  .then((response) => (response.json()))
  .then((response) => {
    let data = response.Search;
    gallery.innerHTML = "";
    data.forEach((item) => {
      movieCard(item, gallery) 
    })
  }).catch((error) => {
    console.log(error);
    gallery.innerHTML = "An error occured. Please contact service provider or retry later"
  })

}

const showMovieDetail = () => {
 
}
// page load, event attribution
form.onsubmit = showResults;
btnsDetail.forEach((btn) => {
  //btn.onclick = 
});