

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import './scripts/cards.js';
import {openModal, closeModal, addListener} from './components/modal.js';


const popupEditProfile = document.querySelector("popup_type_edit");
const popupAddCard = document.querySelector("popup_type_new-card");
const popupImage = document.querySelector("popup_type_image");
const numbers = [2, 3, 5];
const doubledNumbers = numbers.map(number => number * 2);
const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');

addListener(popupEditProfile);
addListener(popupAddCard);
addListener(popupImage);

// @todo: Create Card
function cardCreate (card, deleteButton) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click',() => deleteButton(cardElement));
  return cardElement;
}

// @todo: Delete card
 function deleteCard(cardElement) {
     cardElement.remove();
 }

// @todo: вывод карточки на страницу
initialCards.forEach(function(deleteCard) {
placesList.append(cardCreate(deleteCard));
})

console.log(doubledNumbers); 


