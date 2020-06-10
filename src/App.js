import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

import PhotoCard from './PhotoCard'

function Avito() {
    const [cards, setCards] = useState([])
    const [selectedCardId, setSelectedCardId] = useState();
    useEffect(() => {
        axios.get('https://boiling-refuge-66454.herokuapp.com/images')
        .then(res => setCards(res.data))
        .catch(e => console.log(e))
    }, [])

    const openCard = (e) => {
      console.log(e);
      setSelectedCardId(e.target.name);
    }

    return (
        <>
        <PhotoCard cardId={selectedCardId}/>
        <div className="container">
            <header className="header">
              <h1 className="header__title">Test App</h1>
            </header>
            <main className="main">
                {
                    cards.length ? cards.map(card => 
                      (<div className="main__image">
                        <img
                          name={card.id}
                          src={card.url} 
                          alt='nice view'
                          key={card.id} 
                          onClick={openCard}
                        />
                      </div>)
                    ) :
                    'loading...'
                }
            </main>
            <footer className="footer">
              <h3 className="footer__copyright">©2018-2019</h3>
            </footer>
        </div>
      </>
    )
}

export default Avito
