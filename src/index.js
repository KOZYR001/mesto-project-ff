

import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import './scripts/cards.js';
import {openModal, closeModal, addListener} from './components/modal.js';

const addCardBtn = document.querySelector(".profile__add-button")
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup__image");
const numbers = [2, 3, 5];
const doubledNumbers = numbers.map(number => number * 2);
const templateCard = document.querySelector('#card-template').content;
const placesList = document.querySelector('.places__list');


addListener(popupEditProfile);
addListener(popupAddCard);
addListener(popupImage);

// @todo: Create Card
function cardCreate (card, handleDelete) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click',() => handleDelete(cardElement));
  return cardElement;
}

// @todo: Delete card
 function handleDeleteItem(cardElement) {
     cardElement.remove();
 }

// @todo: вывод карточки на страницу
initialCards.forEach(function(card) {
placesList.append(cardCreate(card,handleDeleteItem));
})

console.log(doubledNumbers);

profileEditButton.addEventListener("click", () => openModal(popupEditProfile));
addCardBtn.addEventListener("click", () => openModal(popupAddCard));

popupImage.addEventListener("click", () => {
  openModal(popupImage);
});

