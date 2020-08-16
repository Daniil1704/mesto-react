import React from 'react';

function Card(props) {

    const {
        card,
        onCardClick
    } = props

    function handleImageClick() {
        onCardClick(card);
    }

    return (
        <div className="card">
            <button className="card__rubbish" type="button"></button>
            <img className="card__image" alt="изображение" src={card.link} onClick={handleImageClick} />
            
            <div className="card__photo-name">
                <p className="card__photo-title">{card.name}</p>
                <div className="card__like">
                    <button type="button" className="card__button-like"></button>
                    <span className="card__span-like">{card.likes.length}</span>
                </div>
            </div>
        </div>
    )
}

export default Card;