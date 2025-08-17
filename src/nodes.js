// SECCIONES PRINCIPALES DE LA APLICACIÓN
// Elementos que representan las diferentes páginas/vistas de la SPA

const headerSection = document.querySelector("#header");
// Selecciona la sección header principal que contiene título, botón de búsqueda y navegación

const trendingPreviewSection = document.querySelector("#trendingPreview");
// Selecciona la sección que muestra el preview/resumen de películas en tendencia (vista home)

const categoriesPreviewSection = document.querySelector("#categoriesPreview");
// Selecciona la sección que muestra el preview de categorías/géneros disponibles (vista home)

const genericSection = document.querySelector("#genericList");
// Selecciona la sección genérica reutilizable para mostrar listas completas de películas
// (se usa en: búsqueda, tendencias completas, películas por categoría)

const movieDetailSection = document.querySelector("#movieDetail");
// Selecciona la sección que muestra los detalles completos de una película específica

// LISTAS Y CONTENEDORES ESPECÍFICOS
// Elementos contenedores donde se insertan dinámicamente listas de películas y categorías

const searchForm = document.querySelector("#searchForm");
// Selecciona el formulario completo de búsqueda (input + botón)

const trendingMoviesPreviewList = document.querySelector(
  ".trendingPreview-movieList"
);
// Contenedor específico donde se insertan las películas trending en la vista preview/home

const categoriesPreviewList = document.querySelector(".categoriesPreview-list");
// Contenedor donde se insertan las categorías/géneros en la vista preview/home

const movieDetailCategoriesList = document.querySelector(
  "#movieDetail .categories-list"
);
// Contenedor dentro de la sección de detalles donde se muestran los géneros de la película actual

const relatedMoviesContainer = document.querySelector(
  ".relatedMovies-scrollContainer"
);
// Contenedor con scroll horizontal donde se muestran películas relacionadas/recomendadas

// ELEMENTOS INDIVIDUALES DE INTERFAZ
// Elementos específicos que se manipulan directamente (texto, botones, inputs)

// === ELEMENTOS DEL HEADER ===

const headerTitle = document.querySelector(".header-title");
// Elemento que contiene el título principal de la aplicación (visible en home)

const arrowBtn = document.querySelector(".header-arrow");
// Botón de flecha/retroceso para navegar hacia atrás (visible en páginas internas)

const headerCategoryTitle = document.querySelector(
  ".header-title--categoryView"
);
// Título alternativo del header que se usa para mostrar nombre de categoría o "Tendencias"

// === ELEMENTOS DE BÚSQUEDA ===

const searchFormInput = document.querySelector("#searchForm input");
// Campo de texto donde el usuario ingresa el término de búsqueda

const searchFormBtn = document.querySelector("#searchBtn");
// Botón que ejecuta la búsqueda cuando se hace click

// === BOTONES DE NAVEGACIÓN ===

const trendingBtn = document.querySelector(".trendingPreview-btn");
// Botón "Ver más" en la sección de trending preview que lleva a la vista completa de tendencias

// === ELEMENTOS DE DETALLES DE PELÍCULA ===

const movieDetailTitle = document.querySelector(".movieDetail-title");
// Elemento donde se muestra el título de la película en la página de detalles

const movieDetailDescription = document.querySelector(
  ".movieDetail-description"
);
// Elemento donde se muestra la sinopsis/descripción de la película en detalles

const movieDetailScore = document.querySelector(".movieDetail-score");
// Elemento donde se muestra la puntuación/rating promedio de la película
