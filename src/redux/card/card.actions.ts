import { CardType } from '../../models/Types';

export const ShuffleCardsAction = (items: CardType[]) => {
  return {
    type: 'SHUFFLE_CARDS',
    payload: items,
  };
};
