
import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import './components/card.js';
import {openModal, closeModal, closeByOverlayClick} from './components/modal.js';
import {cardCreate, handleDeleteItem, cardLike} from "./components/card.js";

const placesList = document.querySelector('.places__list');
const addCardBtn = document.querySelector(".profile__add-button")
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupAddCard = document.querySelector(".popup_type_new-card");
const formEditProfile = document.querySelector('.popup__form');
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_description');
const newPlaceForm = document.querySelector('.popup__form[name="new-place"]');
const placeInputName = newPlaceForm.querySelector('.popup__input_type_card-name');
const placeInputLink = newPlaceForm.querySelector('.popup__input_type_url');
const nameProfile = document.querySelector('.profile__title');
const descriptionProfile = document.querySelector('.profile__description');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imagePopup = document.querySelector('.popup_type_image');
const popups = document.querySelectorAll('.popup');

initialCards.forEach((element) => {
  const card = cardCreate(element, handleDeleteItem, cardLike, openImage);
  placesList.append(card);
});

profileEditButton.addEventListener('click', () => {
  inputName.value = nameProfile.textContent;
  inputJob.value = descriptionProfile.textContent;
  openModal(popupEditProfile);
});

buttonClosePopup.forEach((button) => {
  button.addEventListener('click', (e) => {
    const popup = e.target.closest('.popup');
    closeModal(popup);
  });
});

function submitAddCardForm(event) {
  event.preventDefault();

 const link = placeInputLink.value;
 const name = placeInputName.value;

 if (name && link) {
  const cardNew = cardCreate({name, link}, handleDeleteItem, openImage, cardLike);
  placesList.prepend(cardNew);

  closeModal(popupAddCard);
  newPlaceForm.reset();
 }
}

newPlaceForm.addEventListener('submit', submitAddCardForm);

function openImage(name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

function submitEditProfileForm(evt) {
  evt.preventDefault();
  const valueJob = inputJob.value;
  const valueName = inputName.value;
  descriptionProfile.textContent = valueJob;
  nameProfile.textContent = valueName;
  closeModal(popupEditProfile);
}

popups.forEach((popup) =>{
  popup.addEventListener('click', (e) => {
    closeByOverlayClick(popup, e);
  });
});
 
addCardBtn.addEventListener('click', () =>  {
  openModal(popupAddCard);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);
