// EVENT LISTENERS - NAVEGACIÓN POR BOTONES

// Listener para el botón de búsqueda
searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value; // Cambia la URL hash para navegar a página de búsqueda con el término ingresado
});

// Listener para el botón de tendencias
trendingBtn.addEventListener("click", () => {
  location.hash = "#trends"; // Cambia la URL hash para navegar a la página de tendencias
});

// Listener para el botón de retroceso/flecha
arrowBtn.addEventListener("click", () => {
  history.back(); // Utiliza la API del navegador para volver a la página anterior en el historial
  // location.hash = '#home';  // Código comentado: alternativa para ir directo a home
});

// EVENT LISTENERS - DETECCIÓN DE CAMBIOS DE PÁGINA

// Listener que se ejecuta cuando el DOM ha cargado completamente
window.addEventListener("DOMContentLoaded", navigator, false); // Ejecuta navigator() al cargar la página inicial

// Listener que detecta cambios en el hash de la URL (navegación SPA)
window.addEventListener("hashchange", navigator, false); // Ejecuta navigator() cada vez que cambia el hash

// FUNCIÓN PRINCIPAL DE NAVEGACIÓN

/**
 * Router principal que determina qué página mostrar basándose en el hash de la URL
 * Analiza location.hash y llama a la función de página correspondiente
 */
function navigator() {
  console.log({ location }); // Debug: imprime objeto location actual en consola

  // Estructura condicional que evalúa el hash actual y determina la página a mostrar
  if (location.hash.startsWith("#trends")) {
    trendsPage(); // Muestra página de películas en tendencia
  } else if (location.hash.startsWith("#search=")) {
    searchPage(); // Muestra página de resultados de búsqueda
  } else if (location.hash.startsWith("#movie=")) {
    movieDetailsPage(); // Muestra página de detalles de película específica
  } else if (location.hash.startsWith("#category=")) {
    categoriesPage(); // Muestra página de películas filtradas por categoría
  } else {
    homePage(); // Página por defecto (home) cuando no hay hash o no coincide con ningún patrón
  }

  // Scroll automático al inicio de la página tras cada navegación
  document.body.scrollTop = 0; // Para navegadores más antiguos
  document.documentElement.scrollTop = 0; // Para navegadores modernos
}

// FUNCIONES DE PÁGINAS - CONFIGURACIÓN DE UI

/**
 * Configura la interfaz y carga contenido para la página principal/home
 */
function homePage() {
  console.log("Home!!"); // Debug: confirma que se está ejecutando homePage

  // CONFIGURACIÓN DEL HEADER
  headerSection.classList.remove("header-container--long"); // Remueve clase para header largo
  headerSection.style.background = ""; // Limpia background personalizado del header
  arrowBtn.classList.add("inactive"); // Oculta botón de retroceso (no se necesita en home)
  arrowBtn.classList.remove("header-arrow--white"); // Remueve estilo de flecha blanca
  headerTitle.classList.remove("inactive"); // Muestra título principal del header
  headerCategoryTitle.classList.add("inactive"); // Oculta título de categoría
  searchForm.classList.remove("inactive"); // Muestra formulario de búsqueda

  // CONFIGURACIÓN DE SECCIONES VISIBLES
  trendingPreviewSection.classList.remove("inactive"); // Muestra sección de preview de tendencias
  categoriesPreviewSection.classList.remove("inactive"); // Muestra sección de preview de categorías
  genericSection.classList.add("inactive"); // Oculta sección genérica (para listas completas)
  movieDetailSection.classList.add("inactive"); // Oculta sección de detalles de película

  // CARGA DE DATOS
  getTrendingMoviesPreview(); // Llama función para obtener y mostrar preview de películas trending
  getCategegoriesPreview(); // Llama función para obtener y mostrar categorías disponibles
}

/**
 * Configura la interfaz para mostrar películas de una categoría específica
 */
function categoriesPage() {
  console.log("categories!!"); // Debug: confirma ejecución de categoriesPage

  // CONFIGURACIÓN DEL HEADER
  headerSection.classList.remove("header-container--long"); // Header normal (no largo)
  headerSection.style.background = ""; // Sin background personalizado
  arrowBtn.classList.remove("inactive"); // Muestra botón de retroceso
  arrowBtn.classList.remove("header-arrow--white"); // Flecha en color normal (no blanco)
  headerTitle.classList.add("inactive"); // Oculta título principal
  headerCategoryTitle.classList.remove("inactive"); // Muestra título de categoría
  searchForm.classList.add("inactive"); // Oculta formulario de búsqueda

  // CONFIGURACIÓN DE SECCIONES
  trendingPreviewSection.classList.add("inactive"); // Oculta preview de tendencias
  categoriesPreviewSection.classList.add("inactive"); // Oculta preview de categorías
  genericSection.classList.remove("inactive"); // Muestra sección genérica para lista de películas
  movieDetailSection.classList.add("inactive"); // Oculta detalles de película

  // EXTRACCIÓN DE PARÁMETROS DE LA URL
  // Ejemplo de hash: "#category=28-Action"
  const [_, categoryData] = location.hash.split("="); // Separa en ['#category', '28-Action']
  const [categoryId, categoryName] = categoryData.split("-"); // Separa en ['28', 'Action']

  // CONFIGURACIÓN ESPECÍFICA DE LA PÁGINA
  headerCategoryTitle.innerHTML = categoryName; // Establece nombre de categoría en el header

  // CARGA DE DATOS
  getMoviesByCategory(categoryId); // Obtiene y muestra películas filtradas por el ID de categoría
}

/**
 * Configura la interfaz para mostrar detalles completos de una película específica
 */
function movieDetailsPage() {
  console.log("Movie!!"); // Debug: confirma ejecución de movieDetailsPage

  // CONFIGURACIÓN DEL HEADER
  headerSection.classList.add("header-container--long"); // Header largo para acomodar imagen de fondo
  // headerSection.style.background = '';  // Comentado: el background se establece en getMovieById()
  arrowBtn.classList.remove("inactive"); // Muestra botón de retroceso
  arrowBtn.classList.add("header-arrow--white"); // Flecha blanca para contrastar con imagen de fondo
  headerTitle.classList.add("inactive"); // Oculta título principal
  headerCategoryTitle.classList.add("inactive"); // Oculta título de categoría
  searchForm.classList.add("inactive"); // Oculta formulario de búsqueda

  // CONFIGURACIÓN DE SECCIONES
  trendingPreviewSection.classList.add("inactive"); // Oculta preview de tendencias
  categoriesPreviewSection.classList.add("inactive"); // Oculta preview de categorías
  genericSection.classList.add("inactive"); // Oculta sección genérica
  movieDetailSection.classList.remove("inactive"); // Muestra sección de detalles de película

  // EXTRACCIÓN DE PARÁMETROS DE LA URL
  // Ejemplo de hash: "#movie=550"
  const [_, movieId] = location.hash.split("="); // Separa en ['#movie', '550']

  // CARGA DE DATOS
  getMovieById(movieId); // Obtiene detalles completos de la película por su ID
}

/**
 * Configura la interfaz para mostrar resultados de búsqueda
 */
function searchPage() {
  console.log("Search!!"); // Debug: confirma ejecución de searchPage

  // CONFIGURACIÓN DEL HEADER
  headerSection.classList.remove("header-container--long"); // Header normal
  headerSection.style.background = ""; // Sin background personalizado
  arrowBtn.classList.remove("inactive"); // Muestra botón de retroceso
  arrowBtn.classList.remove("header-arrow--white"); // Flecha en color normal
  headerTitle.classList.add("inactive"); // Oculta título principal
  headerCategoryTitle.classList.add("inactive"); // Oculta título de categoría
  searchForm.classList.remove("inactive"); // Mantiene visible formulario de búsqueda

  // CONFIGURACIÓN DE SECCIONES
  trendingPreviewSection.classList.add("inactive"); // Oculta preview de tendencias
  categoriesPreviewSection.classList.add("inactive"); // Oculta preview de categorías
  genericSection.classList.remove("inactive"); // Muestra sección genérica para resultados
  movieDetailSection.classList.add("inactive"); // Oculta detalles de película

  // EXTRACCIÓN DE PARÁMETROS DE LA URL
  // Ejemplo de hash: "#search=Deadpool"
  const [_, query] = location.hash.split("="); // Separa en ['#search', 'Deadpool']

  // CARGA DE DATOS
  getMoviesBySearch(query); // Busca películas que coincidan con el término de búsqueda
}

/**
 * Configura la interfaz para mostrar todas las películas en tendencia
 */
function trendsPage() {
  console.log("TRENDS!!"); // Debug: confirma ejecución de trendsPage

  // CONFIGURACIÓN DEL HEADER
  headerSection.classList.remove("header-container--long"); // Header normal
  headerSection.style.background = ""; // Sin background personalizado
  arrowBtn.classList.remove("inactive"); // Muestra botón de retroceso
  arrowBtn.classList.remove("header-arrow--white"); // Flecha en color normal
  headerTitle.classList.add("inactive"); // Oculta título principal
  headerCategoryTitle.classList.remove("inactive"); // Muestra título de categoría
  searchForm.classList.add("inactive"); // Oculta formulario de búsqueda

  // CONFIGURACIÓN DE SECCIONES
  trendingPreviewSection.classList.add("inactive"); // Oculta preview (se muestra lista completa)
  categoriesPreviewSection.classList.add("inactive"); // Oculta preview de categorías
  genericSection.classList.remove("inactive"); // Muestra sección genérica para lista completa
  movieDetailSection.classList.add("inactive"); // Oculta detalles de película

  // CONFIGURACIÓN ESPECÍFICA DE LA PÁGINA
  headerCategoryTitle.innerHTML = "Tendencias"; // Establece título fijo para página de tendencias

  // CARGA DE DATOS
  getTrendingMovies(); // Obtiene lista completa de películas en tendencia (no solo preview)
}
