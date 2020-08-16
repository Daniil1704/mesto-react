import React from 'react';

function PopupWithForm(props) {
    const {
        title,
        buttonText,
        isOpen,
        onClose,
    } = props;
    return (
        <div className={`popup  ${isOpen && 'popup_opened'}`}>
            <form className={`popup__container `}>
                <button onClick={onClose} type="button" className="popup__close"></button>
                <h2 className="popup__title">{title}</h2>
                {props.children}
                <button type="submit" className="popup__save popup__button-loading">{buttonText}</button>
            </form>
        </div>
    );
}
export default PopupWithForm;