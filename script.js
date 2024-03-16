'use strict';


//Global variables
const popularURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=1&api_key=${apiKey}`;



fetch(popularURL, options).then((response) => response.json()).then((data) => {
  //throw new Error("Please try again later. Server is down.");
  let movies = data.results;
  let brojCol = 1;

  for (let i = 0; i < 4; i++) {
    const singleMovie = `
        <div class="main-container" onclick="openDetails(${movies[i].id})">
        <div class="poster-container">
            <a href="#"><img src="https://image.tmdb.org/t/p/original/${movies[i].poster_path}" class="poster" /></a>
        </div>
        <div class="ticket-container">
            <div class="ticket__content">
                <h4 class="ticket__movie-title">${movies[i].original_title}</h4>
                <p class="ticket__movie-slogan">
                    ${movies[i].title}
                </p>
                <p class="ticket__current-price"> 5 BAM</p>
                <p class="ticket__old-price">⭐️${movies[i].vote_average}</p>
                <button class="ticket__buy-btn">Wish list</button>
            </div>
        </div>
    </div>
            `;
    document.getElementById(brojCol)?.insertAdjacentHTML('afterbegin', singleMovie);
    brojCol++;
  }
}).catch(err => {
  const toastLiveExample = document.getElementById("liveToast");
  document.getElementById("error-message").innerHTML = err.message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
});



const loadingImg = document.createElement("img");
loadingImg.src = "assets/loading.gif";
loadingImg.style.width = "60px";
const resultDiv = document.getElementById("result");
const moviesFound = document.createElement("p");

function searchMovies() {
  const searchWord = document.getElementById("searchInput").value;
  if (searchWord === "" || searchWord === null || searchWord === undefined) {
    moviesFound.innerHTML = "Enter a search word so we can find your movies.";
    resultDiv.appendChild(moviesFound);
  }
  else {
    moviesFound.innerHTML = "";
    resultDiv.appendChild(loadingImg);
    setTimeout(delayedLoading, 2000);
  }
}

function delayedLoading() {
  resultDiv.removeChild(loadingImg);
  const searchWord = document.getElementById("searchInput").value;
  let searchURL = `https://api.themoviedb.org/3/search/movie?query=%22${searchWord}%22&include_adult=false&language=en-US&page=1&api_key=${apiKey}`;

  fetch(searchURL, options).then((response) => response.json()).then((data) => {
    const pronadeniFilmovi = data.results;
    pronadeniFilmovi.forEach((element) => {
      const movieFoundHTML = `<div onclick="openDetails(${element.id})" class="movie_card" id="ave">
            <div class="info_section">
              <div class="movie_header">
<img class="locandina" src="${element.poster_path ? "https://image.tmdb.org/t/p/original/" + element.poster_path : "assets/movie-icon.png"}"/>
                <h1>${element.title}</h1>
                <p class="movie_desc">
                ${limitString(element.overview, 10)}
                </p>
                <span class="minutes">${element.release_date.slice(0, 4)
        }</span>
              </div>

            </div>
            <div class="blur_back ave_back"></div>
          </div>            
            `;
      moviesFound.insertAdjacentHTML('beforeend', movieFoundHTML);
    })

  }).catch(err => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });


  resultDiv.appendChild(moviesFound);
}

function openDetails(id) {
  localStorage.setItem("movieId", id);
  window.open("movieDetails.html", "_self");
}

function limitString(text, limit) {
  if (typeof text !== 'string') {
    throw new Error("Parameter has to be a string")
  }
  const words = text.split(' ');

  if (words.length > limit) {
    const shortenedString = words.slice(0, limit).join(' ') + '...';
    return shortenedString;
  }
  return text;
}
