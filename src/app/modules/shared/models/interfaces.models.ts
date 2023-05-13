export interface ICard {
  name: string;
  manaCost: string;
  text: string;
}

export interface ICardArray extends Array<ICard> {}

export interface IGetCardsResponseObject {
  cards: ICardArray;
}

export interface IGetSingleCardResponseObject {
  cards: ICard;
}
