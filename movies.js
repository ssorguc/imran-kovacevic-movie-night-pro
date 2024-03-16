'use strict';
let page = 1;


function loadMore() {
  const topRatedURL = `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${page}&api_key=${apiKey}`;
  fetch(topRatedURL, options).then((response) => response.json()).then((data) => {
    let movies = data.results;
    page++;
    movies.forEach(movie => {
      const templ = `
          <img onclick="openDetails(${movie.id})" src="https://image.tmdb.org/t/p/original/${movie.poster_path}" height="370px" class="p-1 movie-cover"/>
          `;

      document.getElementById("all-movies").insertAdjacentHTML('beforeend', templ);
    })
  }).catch(err => {
    const toastLiveExample = document.getElementById("liveToast");
    document.getElementById("error-message").innerHTML = err.message;
    const toast = new bootstrap.Toast(toastLiveExample);
    toast.show();
  });
}


window.onload = function() {
  loadMore();
};

function handleScroll() {
  const endOfPage = window.innerHeight + window.pageYOffset >= document.body.offsetHeight;
  if (endOfPage) {
    loadMore()
  }
}

window.addEventListener('scroll', handleScroll);