import React from 'react';
import { CardType } from '../../models/Types';
import './Card.css';

type Props = {
  card: CardType;
  handleSelectedCard: (card: CardType) => void;
  turned: boolean;
  disabled: boolean;
};

const Card: React.FC<Props> = ({ card, handleSelectedCard, turned, disabled }) => {
  const handleClick = () => {
    if (!disabled) {
      handleSelectedCard(card);
    }
  };

  return (
    <div className='card'>
      <div className={turned ? 'turned' : ''}>
        <img className='front' src={card.src} alt='front' />
        <img className='back' onClick={handleClick} src='/img/cover.jpg' alt='back' />
      </div>
    </div>
  );
};

export default Card;
