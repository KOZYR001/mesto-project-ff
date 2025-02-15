const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
            closeModal(popup);
  }
};

export const openModal = (modal) => {
    modal.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
};

export const closeModal = (popup) => {
    if (popup) {
        popup.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', handleEscKeyUp);
    }
}

export const addListener = (popup) => {
   const closePopup =  popup.querySelector(".popup__close");
   if (closePopup) {
   closePopup.addEventListener('click', () => {
    closeModal(popup);
   });
   }
   
   popup.addEventListener("mousedown", (event) => {
    if (event.target.classList.contains("popup")) {
        closeModal(popup);
    }
   });
};


