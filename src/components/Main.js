import React, { useState } from 'react';
import avatar from '../images/avatar.png';
import { api } from '../utils/Api.js';
import Card from './Card.js'

function Main(props) {

    const {
        onEditProfile,
        onAddPlace,
        onEditAvatar,
        onCardClick
    } = props

    const [userName, setUserName] = useState();
    const [userAbout, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();

    const [cards, setCards] = useState([]);

    React.useEffect(() => {
        api.getUserInfo()
            .then((data) => {
                setUserName(data.name);
                setUserDescription(data.about);
                setUserAvatar(data.avatar);
            })
            .catch((err) => {
                console.log(`Произошла ошибка: ${err}`);
            });
    }, []);

    React.useEffect(() => {
        api.getCards()
            .then((data) => {
                setCards(data);
            })
            .catch((err) => {
                console.log(`Произошла ошибка: ${err}`);
            });
    }, []);

    return (
        <main className="main ">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-img" src={userAvatar || avatar} alt="аватар" />
                    <button onClick={onEditAvatar} className="profile__pencil-edit"></button>
                </div>
                <div className="profile__description">
                <div className="profile__name">
                    <h1 className="profile__author">{userName}</h1>
                    <p className="profile__about">{userAbout}</p>
                </div>
                <button onClick={onEditProfile} type="button" className="profile__button-edit"></button>
                </div>
                <button onClick={onAddPlace} type="button" className="profile__button-add"></button>
            </section>
            <section className="cards">
                {cards.map((card) => (
                    <Card
                        key={card._id} //
                        card={card}
                        onCardClick={onCardClick}
                    >
                    </Card>
                ))}
            </section>
        </main>
    );
}

export default Main;