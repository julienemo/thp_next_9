// prepare API call
const key = '8de0df23'
const endPoint = 'http://www.omdbapi.com/?apikey='

const moviesCall = (keyWordZone) => {
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
    gallery.innerHTML = "An error ocurred. Please contact service provider or retry later"
  })
}

// prepare dom targets
const form = document.querySelector('form');
const keyWordZone = document.querySelector('#keyword');
const gallery = document.querySelector('#gallery');

const modal = document.querySelector('.modal');
const btnClose = document.querySelector('#btn_close');
const detailTitle = document.querySelector('#detail_title');
const detailPlot = document.querySelector('#detail_plot');

// page filling
const movieCard = (movie, galleryZone) => {
  if (movie.Poster == 'N/A') {
    movie.Poster = 'images/default.png'
  }
  galleryZone.innerHTML += `
  <div class='col col-4 mb-4'>
    <img class="poster" src="${movie.Poster}" alt="${movie.Title} poster">
    <p>${movie.Title} (${movie.Year})</p>
    <button id="${movie.imdbID}" data-toggle="modal" onclick="showMovieDetail('${movie.imdbID}')"  class='btn_detail btn btn-info'>See detail</button>
  </div>
  `
}

const showResults = (e) => {
  e.preventDefault();
  if (keyWordZone.value.length < 3) {
    gallery.innerHTML = "Please provide a longer keyword."
    return
  } else {
    moviesCall(keyWordZone);
  }
}

// show single movie detail
const showMovieDetail = (movieId) => {
  fetch(`${endPoint}${key}&i=${movieId}`)
  .then((response) => (response.json()))
  .then((response) => {
    modal.style.display = 'block';
    detailTitle.innerHTML = `${response.Title} (${response.Released})`;
    detailPlot.innerHTML = `${response.Plot}`; 
  }).catch((error) => {
    modal.style.display = 'block';
    detailTitle.innerHTML = `Error`;
    detailPlot.innerHTML = `Movie detail cannot be retrieved. Please retry or contact service provider`; 
  })
}

// page load, event attribution
form.onsubmit = showResults;

btnClose.onclick = () => {
  modal.style.display = 'none';
}