import React, { useState, useEffect } from 'react'
import axios from 'axios'


function PhotoCard({ cardId }) {
    const [card, setCard] = useState();
    useEffect(() => {
        axios.get(`https://boiling-refuge-66454.herokuapp.com/images/${cardId}`)
            .then(res => {
                setCard(card => res.data);
            })
            .catch(e => console.log(e))
    }, [cardId])
    return card ? 
        (<div className="card">
            <div calssName="card__close">
                <button>X</button>
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
                                <h4 className="comment_text">
                                    {comment.text}
                                </h4>
                            </div>
                        )
                    })
                }
            </div>
            <div className="card__commentform">
                <input type="text" name="name" id="name" placeholder="Ваше имя"/>
                <input type="text" name="comment" id="comment" placeholder="Ваш комментарий"/>
                <button>Оставить комменатрий</button>
            </div>
        </div>) : null
}

export default PhotoCard
