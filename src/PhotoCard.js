import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PhotoCard.css'

function PhotoCard({ cardId, open }) {
    const [card, setCard] = useState();
    useEffect(() => {
        axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${cardId}`)
            .then(res => {
                setCard(card => res.data);
            })
            .catch(e => console.log(e))
    }, [cardId])

    const close = () => {
        setCard('');
    }

    return card ?
        (
            <div className="popup">
                <div className="popup__background" onClick={close}></div>
                <div className="card">
                    <div className="card__close">
                        <button onClick={close}>x</button>
                    </div>
                    <div className="card__photo">
                        <img src={card.url} alt="card.id" />
                    </div>
                    <div className="card__comments">
                        {
                            card.comments.map(comment => {
                                return (
                                    <div className="comment">
                                        <h4 className="comment__date">
                                            {comment.date}
                                        </h4>
                                        <h4 className="comment__text">
                                            {comment.text}
                                        </h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="card__commentform">
                        <input type="text" name="name" id="name" placeholder="Ваше имя" />
                        <input type="text" name="comment" id="comment" placeholder="Ваш комментарий" />
                        <button>Оставить комменатрий</button>
                    </div>
                </div>
            </div>) : null
}

export default PhotoCard
