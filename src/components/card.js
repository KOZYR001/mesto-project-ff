import { likeAddCard, cardDislike } from "./api.js";

const templateCard = document.querySelector('#card-template').content;

export function cardCreate (card, handleDelete, cardLike, openImage, userId) {
  const cardElement = templateCard.querySelector('.card').cloneNode(true);
  const imageCard = cardElement.querySelector('.card__image');
  const titleCard = cardElement.querySelector('.card__title');
  const buttonLike = cardElement.querySelector(".card__like-button");
  const likesCard = cardElement.querySelector('.card__likes');

  imageCard.src = card.link;
  imageCard.alt = card.name;
  titleCard.textContent = card.name;
  likesCard.textContent = card.likes.length;

  if (card.owner._id !== userId) {
    cardElement.querySelector('.card__delete-button').remove();
  } else {
    const buttonRemove = cardElement.querySelector('.card__delete-button');
    buttonRemove.addEventListener('click', function () {
      handleDelete(cardElement, card._id);
    });
  }

  if (card.likes.some(like => like._id === userId)) {
    buttonLike.classList.add('card__like-button_is-active');
  }

  buttonLike.addEventListener('click', () => {
    cardLike(buttonLike, card._id, likesCard);
  });

  imageCard.addEventListener('click', function () {
    openImage(card.link, card.name);
  });

  return cardElement;
}

export function handleDeleteItem(cardElement) {
  cardElement.remove();
}

export function cardLike(buttonLike, cardId, likesCard) {
  const isLiked = buttonLike.classList.contains('card__like-button_is-active');
  const methodLike = isLiked ? cardDislike : likeAddCard;

  methodLike(cardId)
    .then((updateCard) => {
      buttonLike.classList.toggle('card__like-button_is-active');
      likesCard.textContent = updateCard.likes.length;
    })
    .catch (err => console.log(err));
}