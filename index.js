// magic numbers and strings
const observationThreshold = 0.2;
const minimumKeywordLength = 3;
const errorMsg = "An error ocurred. Please contact service provider or retry later"
const longerWordMsg = "Please provide a longer keyword."

const endPoint = 'https://www.omdbapi.com/?apikey='// doc indicates http but github page only want secured requests

// DOM targets
const apiKey = document.querySelector('#api_key');
const form = document.querySelector('form');
const keyWordZone = document.querySelector('#keyword');
const gallery = document.querySelector('#gallery');

const modal = document.querySelector('.modal');
const btnClose = document.querySelector('#btn_close');
const detailTitle = document.querySelector('#detail_title');
const detailPlot = document.querySelector('#detail_plot');

// page filling funcs
const movieCard = (movie, galleryZone) => {
  if (movie.Poster == 'N/A') { movie.Poster = 'images/default.png' }
  galleryZone.innerHTML += `
  <div class='col col-3 mx-1 my-5 movie_card card border invisible'>
    <img class="poster rounded" src="${movie.Poster}" alt="${movie.Title} poster">
    <p class='title_text'>${movie.Title} (${movie.Year})</p>
    <button id="${movie.imdbID}" onclick="showMovieDetail('${movie.imdbID}')" 
    class='btn_detail btn btn-info mb-3'>See detail</button>
  </div>`
}

const showMovieDetail = (movieId) => {
  modal.style.display = 'block';
  fetch(url('i', movieId))
  .then((response) => (response.json()))
  .then((response) => {
    fillModal(`${response.Title} (${response.Released})`, response.Plot)
  }).catch((error) => {
    console.log(error);
    fillModal('Error', errorMsg);
  })
}

const moviesCall = (keyWordZone) => {
  gallery.innerHTML = "<p class='waiting'>We are looking for your movies. The results will be displayed here shortly.</p>"
  fetch(url('s', keyWordZone.value))
  .then((response) => (response.json()))
  .then((response) => {
    gallery.innerHTML = "";
    response.Search.forEach((item) => { movieCard(item, gallery) })
    
    // observer effect
    let observer = new IntersectionObserver(
      (entries) => { cardsAnimation(entries);},
      { threshold: observationThreshold }
    );
    document.querySelectorAll('.movie_card').forEach((item) => { observer.observe(item); });
  }).catch((error) => {
    console.log(error);
    gallery.innerHTML = errorMsg;
  })
}

const fillPage= (e) => {
  e.preventDefault();
  if (keyWordZone.value.length < minimumKeywordLength) {
    gallery.innerHTML = longerWordMsg;
  } else { 
    moviesCall(keyWordZone); 
  }
}

// page load, event attribution
form.onsubmit = fillPage;
btnClose.onclick = () => {
  fillModal("Just one moment...", "You'll see film plot shortly here") 
  modal.style.display = 'none'; 
}

// tool funcs
const url = (params, value) => { return `${endPoint}${apiKey.value}&${params}=${value}`}

const fillModal = (title, content) => {
  detailTitle.innerHTML = title;
  detailPlot.innerHTML = content; 
}

const cardsAnimation = (cards) => {
  cards.forEach((card) => {
    if (card.intersectionRatio >= observationThreshold) {
      card.target.classList.remove('invisible');
    } else {
      card.target.classList.add('invisible');
    }
  });
}
