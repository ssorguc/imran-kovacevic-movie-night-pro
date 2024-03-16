'use strict';

//Global variables
const movieId = localStorage.getItem("movieId");
const appendToResponse = 'genre,keywords,alternative_titles,changes,credits,images,keywords,lists,releases,reviews,similar,translations,videos,casts';

const movieDetailURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=${appendToResponse}`;


fetch(movieDetailURL, options).then(response => response.json()).then(data => {
  let slides = "";
  data.images.backdrops.forEach((elm, index) => {
    if (index === 0) {
      slides += `<div class="carousel-item active" data-interval="5000">
      <img src="https://image.tmdb.org/t/p/w500/${elm.file_path}" class="d-block w-100" alt="...">`
    } else {
      slides += `<div class="carousel-item" data-interval="5000">
      <img src="https://image.tmdb.org/t/p/w500/${elm.file_path}" class="d-block w-100" alt="...">`
    }
  });
  const templ =
    `<div id="carouselExampleInterval" class="carousel slide background-img" data-ride="carousel"
      <div class="carousel-inner">
      ${slides}
        </div>
      </a>
      <a class="carousel-control-next" href="#carouselExampleInterval" role="button" data-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>

      </a>
    </div>
      `;
  document.getElementById("galerija").insertAdjacentHTML("afterbegin", templ);
  document.getElementById("title").innerHTML = data.title;
  document.getElementById("year").innerHTML = data.release_date.slice(0, 4);
  document.getElementById("genre").innerHTML = data.genres.map(x => x.name);
  document.getElementById("desc").innerHTML = data.overview;
  document.getElementById("actors").innerHTML = data.casts.cast.map(x => x.name).filter((_elm, index) => index < 5);
  let findTrailer = data.videos.results.find(elm => elm.type === "Trailer");
  if (findTrailer === undefined && data.videos.results.length > 0) {
    findTrailer = data.videos.results[0];
  }
  const video =
    `<iframe class="px-3" height="560px" width="100%" src="https://www.youtube.com/embed/${findTrailer.key}">
    </iframe>
  `;
  document.getElementById("trailer").insertAdjacentHTML("beforeend", video)
}).catch(err => {
  const toastLiveExample = document.getElementById("liveToast");
  document.getElementById("error-message").innerHTML = err.message;
  const toast = new bootstrap.Toast(toastLiveExample);
  toast.show();
});
