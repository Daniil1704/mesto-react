import React, { useState } from 'react';
import '../index.css';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js'
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../usercontext/CurrentUserContex.js';
import EditProfilePopup from './EditProfilePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import AddPlacePopup from './AddPlacePopup.js';
import { api } from '../utils/Api.js'

function App() {
  const [currentUser, setCurrenUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    isImageOpen: false,
    name: '',
    link: ''
  });

  React.useEffect(() => {
    api.getUserInfo()
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.sendUserInfo(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api.sendUserAvatar(data)
      .then((data) => {
        setCurrenUser(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }
  // ____________________Картоки____________________
  const [cards, setCards] = useState([]);

  React.useEffect(() => {
    api.getCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }, []);

  function handleAddPlaceSubmit(data) {
    setIsLoading(true)
    api.addCard(data)
      .then((data) => {
        setCards([...cards, data]);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      })
      .finally(() => {
        setIsLoading(false);
        closeAllPopups();
      })
  }

  function handleCardDelete(card) {
    const isMyOwner = card.owner._id === currentUser._id;

    api.deleteCard(card._id, !isMyOwner)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? !newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }
  // ____________________Лайки____________________

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.addLike(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Произошла ошибка: ${err}`);
      });
  }


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
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          cards={cards}
        >
        </Main>

        <Footer />

        <section className="popups">
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
            isLoading={isLoading}
          >
          </EditProfilePopup>

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
            isLoading={isLoading}
          >
          </AddPlacePopup>

          <EditAvatarPopup
            onUpdateAvatar={handleUpdateAvatar}
            isLoading={isLoading}
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
          >
          </EditAvatarPopup>

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
    </CurrentUserContext.Provider>
  );
}

export default App;