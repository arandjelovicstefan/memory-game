import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from '../../components/Card/Card';
import { CardType } from '../../models/Types';
import { ShuffleCardsAction } from '../../redux/card/card.actions';
import { setTurns } from '../../redux/user/user.actions';
import './GamePage.css';

const memoryImages = [
  { src: '/img/image1.jpg' },
  { src: '/img/image2.jpg' },
  { src: '/img/image3.jpg' },
  { src: '/img/image4.jpg' },
  { src: '/img/image5.jpg' },
  { src: '/img/image6.jpg' },
];

const Game: React.FC = (props: any) => {
  const [refresh, setRefresh] = useState(0);
  const [firstCard, setfirstCard] = useState<CardType | null>(null);
  const [secondCard, setSecondCard] = useState<CardType | null>(null);
  const [turnsHelper, setTurnsHelper] = useState(1);
  const [matched, setMatched] = useState(0);
  const [disabled, setDisabled] = useState(false);

  const startGame = () => {
    const allMemoryCards = [...memoryImages, ...memoryImages].map(card => {
      return { ...card, id: nanoid(), match: false };
    });
    const randomCards = allMemoryCards.sort(() => Math.random() - 0.5);
    props.ShuffleCardsAction(randomCards);
  };

  const handleSelectedCard = (card: CardType) => {
    setTurnsHelper(prev => prev + 1);
    props.setTurns(turnsHelper);
    firstCard ? setSecondCard(card) : setfirstCard(card);
  };

  const reset = () => {
    setfirstCard(null);
    setSecondCard(null);
    setDisabled(false);
  };

  useEffect(() => {
    if (refresh === 0) {
      reset();
      startGame();
      setRefresh(1);
    }

    if (firstCard && secondCard) {
      setDisabled(true);
      if (firstCard!.src === secondCard!.src) {
        const cardsCopy = [...props.cardItems!].map(card =>
          card.src === firstCard.src ? { ...card, match: true } : card
        );
        props.ShuffleCardsAction(cardsCopy);
        setMatched(prev => prev + 1);
        reset();
      } else {
        setTimeout(() => reset(), 600);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondCard, refresh]);

  return (
    <div>
      <div>Turns: {props.turns}</div>
      <div className='card-block'>
        {props.cardItems.map((card: CardType) => (
          <Card
            turned={card === firstCard || card === secondCard || card.match}
            handleSelectedCard={handleSelectedCard}
            card={card}
            key={card.id}
            disabled={disabled}
          />
        ))}
      </div>
      <button
        onClick={() => {
          setRefresh(0);
          setTurnsHelper(0);
          props.setTurns(0);
        }}
      >
        &#8634;
      </button>
      {matched === 6 ? <Redirect to='/scoreboard' /> : null}
      {!props.currentUser ? <Redirect to='/scoreboard' /> : null}
    </div>
  );
};

const mapStateToProps = (state: any) => {
  return {
    cardItems: state.card.cardItems,
    turns: state.user.turns,
    currentUser: state.user.currentUser,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    ShuffleCardsAction: (items: CardType[]) => dispatch(ShuffleCardsAction(items)),
    setTurns: (turns: any) => dispatch(setTurns(turns)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
