import {CardInterface} from "../interface/card.interface";

export class CardFactory {
    uuid: string
    title: string
    content: string
}

export interface ICardFactory {
    generate(attributes: CardFactory): CardInterface;
}
