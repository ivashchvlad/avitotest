import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './PhotoCard.css'

function PhotoCard({ cardId, open }) {
    const [card, setCard] = useState();
    const [name, setName] = useState('')
    const [comment, setComment] = useState('');
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

    const handleChange = (e) => {
        switch(e.target.name) {
            case 'name': setName(e.target.value); break;
            case 'comment': setComment(e.target.value); break;
            default: return;
        }
    }   

    const addComment = () => {
        axios.post(`https://boiling-refuge-66454.herokuapp.com/images/${cardId}/comments`, 
        { name: name, comment: comment })
        .then((res) => {
            if (res.status === 204){
                setName('');
                setComment('');
            }
        })
        .catch(e => console.log(e.message));
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
                        <input 
                            type="text" 
                            name="name" 
                            id="name" 
                            placeholder="Ваше имя"
                            value={name}
                            onChange={handleChange} 
                        />
                        <input 
                            type="text" 
                            name="comment" 
                            id="comment" 
                            placeholder="Ваш комментарий"
                            value={comment}
                            onChange={handleChange}
                        />
                        <button onClick={addComment}>Оставить комменатрий</button>
                    </div>
                </div>
            </div>) : null
}

export default PhotoCard
