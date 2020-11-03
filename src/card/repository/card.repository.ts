import { Injectable, HttpStatus } from '@nestjs/common';
import { CardInterface } from '../interface/card.interface';
import { cardsMock } from '../mock/cards.mock';
import { CardRepositoryException } from './card.repository.exception';
import { plainToClass } from 'class-transformer';
import {CardModel} from "../model/card.model";

@Injectable()
export class CardRepository {
  async listAllCards(): Promise<CardInterface[]> {
    let cardsCollection = []

    try {
      const result = Promise.resolve(cardsMock)
      cardsCollection = await result
    } catch(e) {
      if (e.status === 404) {
        return null;
      }
      throw new CardRepositoryException(
          `CardRepository - Error on listAllCards ${e.message}`,
          HttpStatus.FORBIDDEN,
      )
    }

    return cardsCollection.map((card: any) => plainToClass(CardModel, card, {
      strategy: 'excludeAll',
      excludeExtraneousValues: true
    }));
  }


  async findOneOrNull(uuid: string): Promise<CardInterface|null> {
    let card: CardInterface = null

    try {
      const result = Promise.resolve(cardsMock.find((card) => card.uuid === uuid))
      card = await result
    } catch(e) {
      if (e.status === 404) {
        return null;
      }
      throw new CardRepositoryException(
          `CardRepository - Error on findOneOrNull ${uuid}`,
          HttpStatus.FORBIDDEN,
      )
    }

    return plainToClass(CardModel, card, {
      strategy: 'excludeAll',
      excludeExtraneousValues: true
    });
  }



  async addCard(card: CardInterface): Promise<void> {
    try {
      const result = Promise.resolve(cardsMock.unshift(card));
      await result
    } catch (e) {
      if (e.status === 404) {
        return null;
      }
      throw new CardRepositoryException(
          `CardRepository - Error on addCard ${e.message}`,
          HttpStatus.FORBIDDEN
      );
    }
  }
}
