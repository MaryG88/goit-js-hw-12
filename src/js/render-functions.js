import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';


const gallery = document.querySelector('.gallery');


  const lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
    animationSpeed: 300,
    overlay: true,
    overlayOpacity: 0.5,
  });

function renderImages(images) {
//   
  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
       return `<li class="gallery-item">
//     <a class="gallery-link" href="${largeImageURL}">
//       <img class="gallery-img" src="${webformatURL}" alt="${tags}"  />
//       <div class="gallery-img-info">
//          <p class="info-item-title"><b>Likes</b>${likes}</p>
//           <p class="info-item-title"><b>Views</b>${views}</p>
//           <p class="info-item-title"><b>Comments</b>${comments}</p>
//           <p class="info-item-title"><b>Downloads</b>${downloads}</p>
         
//         </div>
//     </a>
//   </li>`;
      })
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  
    lightbox.refresh();
  
}
  export {renderImages};