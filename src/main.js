import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('.text-input');
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
    iziToast.warning({
      title: 'Missing tags',
      message: 'Please enter a search query!',
      closeOnClick: true,
    });
    return;
  }
  page = 1;
  loadMoreBtn.style.display = 'none';
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
        iziToast.show({
          class: 'toast',
          position: 'topRight',
          messageColor: 'white',
          message: `We're sorry, but you've reached the end of search results.`,
        });
      }
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
  form.reset();
}

async function onLoadMore() {
  loaderContainer.style.display = 'block';
  page += 1;
  try {
    const data = await fetchImages(query, page, per_page);
    renderImages(data.hits);
    console.log(gallery.lastElementChild);

    const cardSize = gallery.lastElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardSize.top + cardSize.height * 1.5,
      behavior: 'smooth',
    });

    if (data.totalHits > per_page * page) {
      loadMoreBtn.style.display = 'block';
    } else {
      loadMoreBtn.style.display = 'none';
      iziToast.show({
        class: 'toast',
        position: 'topRight',
        messageColor: 'white',
        message: `We are sorry, there are no more posts to load`,
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

// form.addEventListener('submit', async (event) => {
//     event.preventDefault();
//      query = event.currentTarget.elements.searchQuery.value.trim();

//     if(!query) {
//         iziToast.error({ 
//         title: 'Warning',
//         message: 'Please enter a search query!',
//         position: 'topRight'
//       });
//       return;
//     }

//     page = 1;
//     gallery.innerHTML = '';
//     loadMoreBtn.style.display = 'none';
//     fetchRenderImages();
// });

// const fetchRenderImages = async () => {
//     try {
//         loader.style.display = 'block';
//         const data = await fetchImages (query, page, per_page);
//         loader.style.display = 'none';

//         if(data.hits.length === 0) {
//             iziToast.error({
//                 message: 'Sorry, there are no images matching your search query. Please try again!'
//             });
//             loadMoreBtn.style.display = 'none';
//             return;
//         } 
//         renderImages(data.hits);
//         page += 1;

//     if (data.hits.length < per_page || page > Math.ceil(data.totalHits / per_page)) {
//         loadMoreBtn.style.display = 'none';
//         iziToast.error({
//             position: "topRight",
//             message: "We are sorry, there are no more posts to load"
//         })
//     } else {
//         loadMoreBtn.style.display = 'block';
//     }
//     } catch (error) {
//         loadMoreBtn.style.display = 'none';
//         iziToast.error({title: 'Error', message: error.message});
//     }
// };

// loadMoreBtn.addEventListener('click', async () => {
//     await fetchRenderImages();
//     const galleryRect = document.querySelector('.gallery').lastElementChild.getBoundingClientRect();
//     window.scrollBy({
//         top: galleryRect.height * 2,
//         behavior: 'smooth'
//     });
// });

// const showMessage = (type, title, message) => {
//     iziToast[type]({
//       title,
//       message,
//       timeout: 2500,
//       progressBar: false,
//       position: 'center'
//     });
//   };
  
//   const errorMessage = (message, title = '') => {
//     showMessage('error', title, message);
//   };
  
//   const successMessage = (message, title = '') => {
//     showMessage('success', title, message);
//   };

// function showLoader() {
//     loaderContainer.style.display = 'flex';
//   }
  
//   function hideLoader() {
//     loaderContainer.style.display = 'none';
//   }



//   showLoader();
//     fetchImages(query)
//     .then(images => {
//         renderImages(gallery, images);
//         hideLoader();
//       })
//       .catch((error) => {
//         errorMessage(error.message);
//         hideLoader();
//         gallery.innerHTML = '';
        
//       });

   