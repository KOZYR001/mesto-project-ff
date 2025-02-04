const numbers = [2, 3, 5];


const doubledNumbers = numbers.map(number => number * 2);

// @todo: Template
const templateCard = document.querySelector('#card-template').content;

// @todo: DOM узел
const placesList = document.querySelector('.places__list');

// @todo: Create Card
function cardCreate (card, deleteButton) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__image').src = card.link;
  cardElement.querySelector('.card__image').alt = card.alt;
  cardElement.querySelector('.card__title').textContent = card.name;
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click',() => deleteCard(cardElement));
  return cardElement;
}

// @todo: Delete card
 function deleteCard(cardElement) {
     cardElement.remove();
 }

// @todo: вывод карточки на страницу
initialCards.forEach(function(element) {
placesList.append(cardCreate(element));
})

console.log(doubledNumbers); 

import './pages/index.css';