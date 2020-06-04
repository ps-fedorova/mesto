// Закрыть по крестику и кликом по фону
function close(evt) {
  if (evt.target.classList.contains('popup__close') || evt.target.classList.contains('popup')) {
    openOrClosePopup(evt.target.closest('.popup'));
  };
};

// Закрыть кнопкой Esc
function closeEsc(evt) {
  const popupOpened = document.querySelector('.popup_opened');
  if (evt.key === 'Escape' && popupOpened) {
    openOrClosePopup(popupOpened);
  }
}

// Функция открытия и закрытия попапа
export function openOrClosePopup(popup) {
  popup.classList.toggle('popup_opened');

  if (popup.classList.contains('popup_opened')) {
    document.addEventListener('click', close);
    document.addEventListener('keydown', closeEsc);
  } else {
    document.removeEventListener('click', close);
    document.removeEventListener('keydown', closeEsc);
  }
};
