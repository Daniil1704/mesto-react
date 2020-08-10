import './index.css';

import { Card } from '../components/Card.js';

import { FormValidator } from '../components/FormValidator.js';

import {
  editButton,
  popup,
  popupClose,
  nameInput,
  infoInput,
  name,
  info,
  formElement,
  addButton,
  popupAdd,
  popupName,
  popupLink,
  formCase,
  popupPicture,
  buttonProfile,
  buttonAdd,
  cards,
  pictureName,
  pictureLink,
  formElements,
  userFormProfile,
  myId,
  myToken,
  avatar,
  popupSure,
  popupAvatar,
  buttonAvatar
} from '../utils/utils.js';

import { Userinfo } from '../components/UserInfo.js';

import { PopupWithForm } from '../components/PopupWithForm.js';

import { Section } from '../components/Section.js';

import { PopupWithImage } from '../components/PopupWithImage.js';

import { Api } from '../components/Api.js'

import { PopupWithDelete } from '../components/PopupWithDelete.js'

const popupWithForm = new PopupWithForm(popup, {
  submitForm: () => {
    popupWithForm.sendingLoading(true)

    const input = popupWithForm.getInputValues();
    console.log(input);
    api.changeProfileEdit(input)
      .then((data) => {
        userInfo.setUserInfo(data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupWithForm.sendingLoading(false)
        popupWithForm.close()
      })
  }
});

const openProfileForm = () => {
  const profile = userInfo.getUserInfo();
  nameInput.value = profile.name;
  infoInput.value = profile.text;
  popupWithForm.open()
}

const photoPopup = new PopupWithImage(popupPicture, pictureName, pictureLink);

function switchButton() {

  if (popup.classList.contains('popup')) {
    buttonProfile.classList.remove('popup__save_disabled');
    buttonProfile.disabled = false;
  }
  else if (popupAdd.classList.contains('popup-add')) {
    buttonAdd.classList.add('popup__save_disabled');

    buttonAdd.disabled = true;
  }
}
const popupWithDelete = new PopupWithDelete(popupSure)
const api = new Api({
  urlApi: `https://mesto.nomoreparties.co/v1/${myId}`,
  token: myToken
});

const userInfo = new Userinfo(userFormProfile)

Promise.all([api.getProfileInfo(), api.getCards()])
  .then((data) => {
    userInfo.setUser(data[0])
    const userId = data[0]._id
    const section = new Section({
      data: data[1],
      renderer: (data) => {
        setting(userId, data)
      },
    },
      cards
    );
    section.renderItems(data[1])



    const cardForm = new PopupWithForm(popupAdd, {
      submitForm: () => {
        cardForm.sendingLoading(true)
        const inputCard = cardForm.getInputValues();
        api.addCards(inputCard)
          .then((data) => {
            setting(userId, data)
          })

          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            cardForm.sendingLoading(false)
            cardForm.close()
          })
      }
    })
    function setting(userId, data) {

      const card = new Card('#template', userId, {
        initialCards: data,
        handleCardClick: () => {
          photoPopup.open(data)
        },
        deleteCards: () => {
          popupWithDelete.open()
          popupWithDelete.setHandleSubmit(() => {
            api.deleteCard(data._id)
              .then(() => {
                card.delete()
              })
              .catch((err) => {
                console.log(err)
              })
              .finally(() => {
                popupWithDelete.close()
              })
          })
        },
        handleLike: () => {
          api.addLike(data._id)
            .then((data) => {
              card.clickLike(data.likes);
              card.likeButton();
            })
            .catch((err) => {
              console.log(err)
            })
        },
        handleDeleteLike: () => {
          api.deleteLike(data._id)
            .then((data) => {
              card.clickLike(data.likes);
              card.likeButton();
            })
            .catch((err) => {
              console.log(err)
            })
        }
      });
      const cardElement = card.generateCard();
      section.setItem(cardElement);
    }
    addButton.addEventListener('click', () => { cardForm.open() });
  })

const popupAvatarForm = new PopupWithForm(popupAvatar, {
  submitForm: () => {
    popupAvatarForm.sendingLoading(true)
    const input = popupAvatarForm.getInputValues();
    api.changeAvatar(input)
      .then((data) => {
        userInfo.setAvatarLink(data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        popupAvatarForm.sendingLoading(false)
        popupAvatarForm.close()
      })

  }

})
const formValidator = new FormValidator(formElements, popup);
formValidator.enableValidation();

const formValidatorCard = new FormValidator(formElements, popupAdd);
formValidatorCard.enableValidation();

editButton.addEventListener('click', () => openProfileForm());

buttonAvatar.addEventListener('click', () => { popupAvatarForm.open() });

switchButton();