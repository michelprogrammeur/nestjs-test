import { CardInterface } from '../interface/card.interface';
import { Expose } from 'class-transformer/decorators';

export class CardModel implements CardInterface {
    @Expose()
    content: string;

    @Expose()
    title: string;

    @Expose()
    uuid: string;
}
