
export function openModal(modal) {
    modal.classList.add('popup_is-animated');
    setTimeout(() => {
        modal.classList.add('popup_is-opened');
    }, 0);
    document.addEventListener('keydown', handleEscKeyUp);
};

export function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 600);
    document.removeEventListener('keydown', handleEscKeyUp);
}

export const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
            closeModal(popup);
  }
};

export function closeByOverlayClick(popup, e) {
    if (e.target === popup) {
        closeModal(popup);
    }
};