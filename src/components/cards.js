

import { openModal } from "./modal.js";

const templateCard = document.querySelector('#card-template').content;

export function cardCreate (card, handleDelete, cardLike, openImage) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const imageCard = cardElement.querySelector('.card__image');
  const titleCard = cardElement.querySelector('.card__title');

  imageCard.src = card.link;
  imageCard.alt = card.name;
  titleCard.textContent = card.name;
  
  const buttonRemove = cardElement.querySelector('.card__delete-button');
  buttonRemove.addEventListener('click', function () {
    handleDelete(cardElement);
  });

  const buttonLike = cardElement.querySelector(".card__like-button");
  buttonLike.addEventListener('click', () => {
    cardLike(buttonLike);
  });

  imageCard.addEventListener('click', function () {
    openImage(card.name, card.link);
  });

  return cardElement;
}

export function handleDeleteItem(cardElement) {
  cardElement.remove();
}


export function cardLike(buttonLike) {
  buttonLike.classList.add('card__like-button_is-active');
}