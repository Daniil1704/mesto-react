import React, { useState } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import '../index.css';

function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    name: '',
    link: ''
  });

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleCardClick(cardData) {
    const { link, name } = cardData;
    setSelectedCard({ isImageOpen: true, link: link, name: name });
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setSelectedCard((setSelectedCard) => {
      return { ...setSelectedCard, isImageOpen: false }
    });
  }

  return (

    <div className="page">
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onEditAvatar={handleEditAvatarClick}
        onCardClick={handleCardClick}
      >
      </Main>

      <Footer />

      <section className="popups">
        <PopupWithForm
          name='profile'
          title='Редактировать профиль'
          buttonText='Сохранить'
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
        
            <input name="name" class="popup__input popup__input_author " id="author-input" type="text"
              pattern="[A-Za-zА-ЯЁа-яё -]{1,}" minlength="2" maxlength="40" placeholder="Имя" required />
            <span className="popup__span-error" ></span>
            <input name="about" class="popup__input popup__input_about " id="about-input" type="text" minlength="2"
              maxlength="200" placeholder="О себе" required />
            <span className="popup__span-error" ></span>
          
        </PopupWithForm>

        <PopupWithForm
          name='card'
          title='Новое место'
          buttonText='Сохранить'
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          
            <input name="name" class="popup__input popup__input_name " id="name-input" type="text" placeholder="Название"
              minlength="1" maxlength="30" required />
            <span className="popup__span-error" ></span>
            <input name="link" class="popup__input popup__input_link " id="link-input" type="url"
              placeholder="Ссылка на картинку" required />
            <span className="popup__span-error" ></span>
        
        </PopupWithForm>

        <PopupWithForm
          name='avatar'
          title='Обновить аватар'
          buttonText='Сохранить'
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          
            <input name="avatar" className="popup__input popup__input_name" type="url" placeholder="Ссылка на картинку" defaultValue="" required />
            <span className="popup__span-error"></span>
          
        </PopupWithForm>

        <ImagePopup
          isOpen={selectedCard.isImageOpen}
          onClose={closeAllPopups}
          name={selectedCard.name}
          link={selectedCard.link}
        >
        </ImagePopup>

        <PopupWithForm
          name='card-delete'
          title='Вы уверены?'
          buttonText='Да'
        >
        </PopupWithForm>
      </section>
    </div>

  );
}

export default App;