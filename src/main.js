// CONFIGURACIÓN DE LA API
// Crea una instancia de Axios para realizar peticiones HTTP a la API de The Movie Database (TMDb)
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/", // URL base de la API de TMDb versión 3
  headers: {
    "Content-Type": "application/json;charset=utf-8", // Especifica que las peticiones serán en formato JSON con codificación UTF-8
  },
  params: {
    api_key: API_KEY, // Incluye automáticamente la clave API en todos los parámetros de las peticiones
  },
});

// FUNCIONES UTILITARIAS

/**
 * Crea elementos HTML para mostrar una lista de películas
 * @param {Array} movies - Array de objetos película obtenidos de la API
 * @param {HTMLElement} container - Elemento DOM donde se insertarán las películas
 */
function createMovies(movies, container) {
  container.innerHTML = ""; // Limpia el contenido previo del contenedor

  // Itera sobre cada película del array
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div"); // Crea un div contenedor para cada película
    movieContainer.classList.add("movie-container"); // Añade clase CSS para estilizado

    // Añade evento click para navegar a la página de detalles de la película
    movieContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id; // Cambia la URL hash para navegación SPA
    });

    const movieImg = document.createElement("img"); // Crea elemento imagen para el póster
    movieImg.classList.add("movie-img"); // Añade clase CSS
    movieImg.setAttribute("alt", movie.title); // Establece texto alternativo con el título
    movieImg.setAttribute(
      "src",
      "https://image.tmdb.org/t/p/w300" + movie.poster_path // URL completa del póster (300px de ancho)
    );

    movieContainer.appendChild(movieImg); // Inserta la imagen dentro del contenedor de película
    container.appendChild(movieContainer); // Inserta el contenedor de película en el contenedor principal
  });
}

/**
 * Crea elementos HTML para mostrar una lista de categorías/géneros
 * @param {Array} categories - Array de objetos categoría obtenidos de la API
 * @param {HTMLElement} container - Elemento DOM donde se insertarán las categorías
 */
function createCategories(categories, container) {
  container.innerHTML = ""; // Limpia el contenido previo del contenedor

  // Itera sobre cada categoría del array
  categories.forEach((category) => {
    const categoryContainer = document.createElement("div"); // Crea contenedor para cada categoría
    categoryContainer.classList.add("category-container"); // Añade clase CSS

    const categoryTitle = document.createElement("h3"); // Crea título h3 para la categoría
    categoryTitle.classList.add("category-title"); // Añade clase CSS
    categoryTitle.setAttribute("id", "id" + category.id); // Establece ID único basado en el ID de la categoría

    // Añade evento click para navegar a películas de esa categoría
    categoryTitle.addEventListener("click", () => {
      location.hash = `#category=${category.id}-${category.name}`; // Cambia hash con ID y nombre de categoría
    });

    const categoryTitleText = document.createTextNode(category.name); // Crea nodo de texto con el nombre de la categoría

    categoryTitle.appendChild(categoryTitleText); // Inserta el texto en el título
    categoryContainer.appendChild(categoryTitle); // Inserta título en contenedor de categoría
    container.appendChild(categoryContainer); // Inserta contenedor de categoría en contenedor principal
  });
}

// LLAMADOS A LA API

/**
 * Obtiene y muestra las películas en tendencia del día
 */
async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day"); // Petición GET al endpoint de películas trending diarias
  const movies = data.results; // Extrae el array de películas de la respuesta
  console.log(movies); // Imprime las películas en consola para debug

  createMovies(movies, trendingMoviesPreviewList); // Renderiza las películas en el contenedor específico
}

/**
 * Obtiene y muestra la lista de géneros/categorías de películas
 */
async function getCategegoriesPreview() {
  const { data } = await api("genre/movie/list"); // Petición GET al endpoint de géneros de películas
  const categories = data.genres; // Extrae el array de géneros de la respuesta

  createCategories(categories, categoriesPreviewList); // Renderiza las categorías en el contenedor específico
}

/**
 * Obtiene películas filtradas por categoría/género específico
 * @param {number} id - ID del género para filtrar películas
 */
async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    // Petición GET al endpoint de descubrimiento de películas
    params: {
      with_genres: id, // Parámetro que filtra por ID de género específico
    },
  });
  const movies = data.results; // Extrae el array de películas filtradas

  createMovies(movies, genericSection); // Renderiza películas en sección genérica
}

/**
 * Busca películas por término de búsqueda
 * @param {string} query - Término de búsqueda ingresado por el usuario
 */
async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    // Petición GET al endpoint de búsqueda de películas
    params: {
      query, // Parámetro con el término de búsqueda
    },
  });
  const movies = data.results; // Extrae el array de películas encontradas

  createMovies(movies, genericSection); // Renderiza resultados en sección genérica
}

/**
 * Obtiene todas las películas en tendencia del día para vista completa
 */
async function getTrendingMovies() {
  const { data } = await api("trending/movie/day"); // Misma petición que getTrendingMoviesPreview
  const movies = data.results; // Extrae el array de películas

  createMovies(movies, genericSection); // Renderiza en sección genérica (vista completa)
}

/**
 * Obtiene detalles completos de una película específica por su ID
 * @param {number} id - ID único de la película
 */
async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id); // Petición GET al endpoint de detalles de película específica

  const movieImgUrl = "https://image.tmdb.org/t/p/w500" + movie.poster_path; // URL del póster en resolución 500px
  console.log(movieImgUrl); // Imprime URL de imagen para debug

  // Establece imagen de fondo del header con gradiente superpuesto
  headerSection.style.background = `     
    linear-gradient(       
      180deg,       
      rgba(0, 0, 0, 0.35) 19.27%,  // Gradiente negro semi-transparente desde arriba
      rgba(0, 0, 0, 0) 29.17%      // Degradado a transparente
    ),     
    url(${movieImgUrl})  // Imagen de fondo con el póster de la película
  `;

  movieDetailTitle.textContent = movie.title; // Establece el título de la película
  movieDetailDescription.textContent = movie.overview; // Establece la descripción/sinopsis
  movieDetailScore.textContent = movie.vote_average; // Establece la puntuación promedio

  createCategories(movie.genres, movieDetailCategoriesList); // Renderiza los géneros de la película

  getRelatedMoviesId(id); // Llama función para obtener películas relacionadas
}

/**
 * Obtiene y muestra películas recomendadas/relacionadas basadas en una película específica
 * @param {number} id - ID de la película base para obtener recomendaciones
 */
async function getRelatedMoviesId(id) {
  const { data } = await api(`movie/${id}/recommendations`); // Petición GET al endpoint de recomendaciones
  const relatedMovies = data.results; // Extrae el array de películas relacionadas

  createMovies(relatedMovies, relatedMoviesContainer); // Renderiza películas relacionadas en su contenedor específico
}
