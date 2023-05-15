// Add imports above this line
import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// Change code below this line

const refs = {
  galleryList: document.querySelector('ul.gallery'),
};

const markUp = createImages(galleryItems);

refs.galleryList.innerHTML = markUp;

function createImages(images) {
  return images.reduce((acc, image) => (acc += createMarkup(image)), '');
}

function createMarkup({ preview, original, description }) {
  const itemList = `<li><a class="gallery__link" href="${original}" onclick="return false" ><img class = "gallery__image" src = '${preview}' alt = '${description}'></a></li>`;
  return itemList;
}

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

gallery.on('show.simplelightbox');
