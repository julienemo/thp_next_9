// magic numbers and strings
const observationThreshold = 0.2;
const minimumKeywordLength = 3;
const errorMsg = "An error ocurred. Please contact service provider or retry later"
const longerWordMsg = "Please provide a longer keyword."

const key = '8de0df23'
const endPoint = 'http://www.omdbapi.com/?apikey='

// dom targets
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
  <div class='col col-3 mx-1 mb-4 movie_card card border invisible'>
    <img class="poster rounded" src="${movie.Poster}" alt="${movie.Title} poster">
    <p class='title_text'>${movie.Title} (${movie.Year})</p>
    <button id="${movie.imdbID}" onclick="showMovieDetail('${movie.imdbID}')" 
      class='btn_detail btn btn-info mb-3'>See detail
    </button>
  </div>
  `
}

const moviesCall = (keyWordZone) => {
  fetch(url('s', keyWordZone.value))
  .then((response) => (response.json()))
  .then((response) => {
    let data = response.Search;
    gallery.innerHTML = "";
    data.forEach((item) => {
      movieCard(item, gallery) 
    })
    
    // observer effect
    let observer = new IntersectionObserver((entries) => {
      cardsAnimation(entries);
    }, { threshold: observationThreshold });
    let items = document.querySelectorAll('.movie_card');
    items.forEach((item) => {
      observer.observe(item);
    });
  }).catch((error) => {
    console.log(error);
    gallery.innerHTML = errorMsg;
  })
}

const showMovieDetail = (movieId) => {
  fetch(url('i', movieId))
  .then((response) => (response.json()))
  .then((response) => {
    modal.style.display = 'block';
    fillModal(
      `${response.Title} (${response.Released})`, 
      response.Plot
    )
  }).catch((error) => {
    console.log(error);
    modal.style.display = 'block';
    fillModal('Error', errorMsg);
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
btnClose.onclick = () => { modal.style.display = 'none'; }

// tool funcs
const url = (params, value) => { return `${endPoint}${key}&${params}=${value}`}

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
