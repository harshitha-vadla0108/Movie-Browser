const apiKey = '4c3d3e'; // Get one from omdbapi.com

async function searchMovie() {
  const query = document.getElementById('searchInput').value;
  const movieList = document.getElementById('movieList');
  movieList.innerHTML = 'Loading...';

  try {
    const response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`);
    const data = await response.json();

    if (data.Response === "True") {
      movieList.innerHTML = "";
      data.Search.forEach(movie => {
        movieList.innerHTML += `
          <div class="movie">
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100'}" alt="Poster"/>
            <div class="movie-info">
              <h3>${movie.Title}</h3>
              <p>Year: ${movie.Year}</p>
              <p>Type: ${movie.Type}</p>
            </div>
          </div>
        `;
      });
    } else {
      movieList.innerHTML = `<p>No results found for "${query}"</p>`;
    }
  } catch (error) {
    movieList.innerHTML = `<p>Error fetching data. Try again.</p>`;
  }
}
