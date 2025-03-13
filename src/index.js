
import './pages/index.css';
import { openModal, closeModal} from './components/modal.js';
import { cardCreate, cardLike } from "./components/card.js";
import { enableValidation} from "./components/validation.js";
import { getUserMe, getInitialCards, editProfile, addNewCard, deleteIdCard, editAvatar } from "./components/api.js";

const placesList = document.querySelector('.places__list');
const addCardBtn = document.querySelector(".profile__add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const popupEditProfile = document.querySelector(".popup_type_edit");
const buttonClosePopup = document.querySelectorAll('.popup__close');
const popupAddCard = document.querySelector(".popup_type_new-card");
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
const formElement = popupEditProfile.querySelector('.popup__form');
const profileImage = document.querySelector('.profile__image img');
const deleteConfirmPopup = document.querySelector('.popup_type_confirm');
const deleteConfirmForm = document.querySelector('.popup__form[name="confirm-delete"]');
const imageProfileEditButton = document.querySelector('.profile__image_avatar-edit');
const popupAvatarEdit = document.querySelector('.popup_type_avatar');
const formAvatarEdit = document.querySelector('.popup__form[name="edit-avatar"]');
const avatarUrlInput = document.querySelector('.popup__input_type_avatar-url');

let userId = "";
let cardToDelete = "";

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

newPlaceForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = placeInputName.value;
  const link = placeInputLink.value;
  const submitButton = newPlaceForm.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    addNewCard(name, link)
      .then((cardData) => {
        const newCard = cardCreate(cardData, handleDeleteItem, cardLike, openImage, userId);
        placesList.prepend(newCard);

        closeModal(popupAddCard);
        newPlaceForm.reset();
      })
      .catch((err) => {
        console.error('Ошибка при добавлении карточки:', err);
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить';
      });
});

function openImage(link, name) {
  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;
  openModal(imagePopup);
}


function submitEditProfileForm(evt) {
  evt.preventDefault();
  const valueJob = inputJob.value;
  const valueName = inputName.value;
  
  const submitButton = formElement.querySelector('.popup__button');
  submitButton.textContent = 'Сохранение...';

  editProfile(valueName, valueJob)
  .then((userData) => {
    nameProfile.textContent = userData.name;
    descriptionProfile.textContent = userData.about;
    profileImage.src = userData.avatar;

    closeModal(popupEditProfile);
  })
  .catch((err) => {
    console.error('Ошибка при обновлении профиля:', err);
  })
  .finally(() => {
    submitButton.textContent = 'Сохранить';
  })
}

popups.forEach((popup) => {
  popup.addEventListener('click', (e) => {
    if (e.target === popup) {
    closeModal(popup, e);
    }
  });
});

formElement.addEventListener('submit', submitEditProfileForm);

function confirmOpenDeletePopup(cardElement, cardId) {
  cardToDelete = { cardElement, cardId };
  openModal(deleteConfirmPopup);
}

deleteConfirmForm.addEventListener("submit", function (event) {
  event.preventDefault();
  
  if (cardToDelete) {
      var _cardToDelete = cardToDelete,
          cardElement = _cardToDelete.cardElement,
          cardId = _cardToDelete.cardId;
      
      deleteIdCard(cardToDelete.cardId) // Убедитесь, что deleteIdCard возвращает Promise
          .then(() => {
              cardElement.remove();
              closeModal(deleteConfirmPopup);
          })
          .catch(function (err) {
              console.error('Ошибка при удалении карточки:', err);
          })
          .finally(function () {
              cardToDelete = null;
          });
  }
});

addCardBtn.addEventListener('click', () => {
  openModal(popupAddCard);
});

  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'form__input-error_active'
  };

enableValidation(validationConfig);

Promise.all([getUserMe(), getInitialCards()])
   .then(([userData, cardsData]) => {
     nameProfile.textContent = userData.name;
     descriptionProfile.textContent = userData.about;
     profileImage.src = userData.avatar;
 
     userId = userData._id;
 
     cardsData.forEach((card) => {
       const newCard = cardCreate(card, confirmOpenDeletePopup, cardLike, openImage, userId);
       placesList.append(newCard);
     });
   })
   .catch((err) => {
     console.error('Ошибка при загрузке данных:', err);
   });
 
 imageProfileEditButton.addEventListener('click', () => {
   openModal(popupAvatarEdit);
 });
 
 formAvatarEdit.addEventListener('submit', function (event) {
  event.preventDefault();

  const avatarUrl = avatarUrlInput.value;

  if (avatarUrl) {
    const submitButton = formAvatarEdit.querySelector('.popup__button');
    submitButton.textContent = 'Сохранение...';

    editAvatar(avatarUrl)
      .then((userData) => {
        profileImage.src = userData.avatar;
        closeModal(popupAvatarEdit);
        formAvatarEdit.reset();
      })
      .catch((err) => {
        console.error('Ошибка при обновлении аватара:', err);
      })
      .finally(() => {
        submitButton.textContent = 'Сохранить';
      });
  }
});
