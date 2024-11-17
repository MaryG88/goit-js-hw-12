import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const loaderContainer = document.querySelector('.loader-container');
const loadMoreBtn = document.querySelector('.load-more-btn');

let query = '';
let page = 1;
let per_page = 15;


form.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();
  gallery.innerHTML = '';

  query = event.currentTarget.elements.input.value;
  if (query.trim() === '') {
    iziToast.error({
      title: 'Missing tags',
      message: 'Please enter a search query!',
      closeOnClick: true,
    });
    return;
  }
  page = 1;
  loadMoreBtn.classList.replace('load-more-hidden', 'load-more');
  loaderContainer.style.display = 'block';

  try {
    const data = await fetchImages(query, page, per_page);

    if (data.hits.length === 0) {
      iziToast.error({
        title: 'No pictures found',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        timeout: 2500,
        closeOnClick: true,
      });
    } else {
      renderImages(data.hits);

      if (data.totalHits > per_page * page) {
        loadMoreBtn.style.display = 'block';
      } else {
        loadMoreBtn.style.display = 'none';
        iziToast.error({
          position: 'topRight',
          message: `We're sorry, but you've reached the end of search results.`,
          timeout: 2500,
          closeOnClick: true,
        });
      }
    }
  } catch (error) {
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      timeout: 2500,
      closeOnClick: true,
    });
  } finally {
    loaderContainer.style.display = 'none';
  }
  form.reset();
}

async function onLoadMore() {
  loaderContainer.style.display = 'block';
  page += 1;
  try {
    const data = await fetchImages(query, page, per_page);
    renderImages(data.hits);
    // console.log(gallery.lastElementChild);

    const cardRect = gallery.lastElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardRect.height * 2,
      behavior: 'smooth',
    });

    if (data.totalHits > per_page * page) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.error({
        position: 'topRight',
        message: `We are sorry, there are no more posts to load`,
        timeout: 2500,
      closeOnClick: true,
      });
    }
  } catch (error) {
    console.log(error);
    iziToast.error({
      title: 'Error',
      message: 'Failed to fetch images. Please try again later.',
      timeout: 2500,
      closeOnClick: true,
    });
  } finally {
    loaderContainer.style.display = 'none';
  }
}
