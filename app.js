const API_KEY = 'api_key=02fbfc73d6702f6b0c3b8e7711a97e34';
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&' + API_KEY;
const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?' +API_KEY;
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');
const button = document.getElementById('search-btn');

getMovies(API_URL);

function getMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data)
        showMovies(data.results);
    })
}

function showMovies(data) {
    main.innerHTML = "";
    data.forEach(movie => {
        const{title, poster_path, vote_average, overview} = movie;
        const movie1 = document.createElement('div');
        movie1.classList.add('movie');
        movie1.innerHTML = `
        <img src="${IMAGE_URL + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getColor(vote_average)}">${vote_average}</span>
        </div>
        <div class="overview">
            ${overview};
        </div>
        `

        main.appendChild(movie1)
    });
}

function getColor(vote) {
    if (vote >= 8){
        return `green`
    }else if(vote >= 5){
        return `orange`
    }else{
        return `red`
    }
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const search_term = search.value;

    if (search_term) {
        getMovies(SEARCH_URL+ '&query=' + search_term)
    }else{
        getMovies(API_URL)
    }
})

