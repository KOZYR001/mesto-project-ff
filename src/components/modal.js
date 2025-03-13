export function openModal(modal) {
    modal.classList.add('popup_is-animated', 'popup_is-opened');
    document.addEventListener('keydown', handleEscKeyUp);
};

export function closeModal(popup) {
    if (!popup) return;

    popup.classList.remove('popup_is-opened');
    setTimeout(() => {
        popup.classList.remove('popup_is-animated');
    }, 600);
    document.removeEventListener('keydown', handleEscKeyUp);
}

export const handleEscKeyUp = (e) => {
    if (e.key === "Escape") {
        const popup = document.querySelector(".popup_is-opened");
        if (popup) {
            closeModal(popup);
        }
    }
};
