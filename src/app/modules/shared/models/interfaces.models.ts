export interface ICard {
  name: string;
  manaCost: string;
  text: string;
  type: string;
  imageUrl: string;
  colorIdentity: Array<string>;
}

export interface ICardArray extends Array<ICard> {}

export interface IGetCardsResponseObject {
  cards: ICardArray;
}

export interface IGetSingleCardResponseObject {
  card: ICard;
}
