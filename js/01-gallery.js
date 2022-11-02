import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const cardMarkup = createGalleryMarkup(galleryItems);
galleryContainer.insertAdjacentHTML('beforeend', cardMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ original, preview, description }) => {
      return `
			<div class="gallery__item">
  			<a class="gallery__link" 
				href="${original}">
    			<img
      			class="gallery__image"
      			src="${preview}"
      			data-source="${original}"
      			alt="${description}"
    			/>
  			</a>
			</div>`;
    })
    .join('');
}

function onContainerClick(event) {
  event.preventDefault();

  const isGalleryCardEl = event.target.dataset.source;
  if (!isGalleryCardEl) {
    return;
  }

  console.log(isGalleryCardEl);
  console.log(event.target.alt);

  const instance = basicLightbox.create(
    `
    <img src="${isGalleryCardEl}" alt="${event.target.alt}">
`,
    {
      onShow: instance => {
        window.addEventListener('keydown', onEscKeyPress);
      },
    }
  );

  instance.show();

  function onEscKeyPress(event) {
    if (event.code === 'Escape') {
      window.removeEventListener('keydown', onEscKeyPress);
      instance.close();
    }
  }
}

galleryContainer.addEventListener('click', onContainerClick);

console.log(galleryItems);
