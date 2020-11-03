import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller';
import { CardRepository } from './repository/card.repository';
import { cardsMock } from './mock/cards.mock';

describe('CardController', () => {
  let cardController: CardController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardRepository],
    }).compile();

    cardController = app.get<CardController>(CardController);
  });

  describe('root', () => {
    it('should return card collection', () => {
      expect(cardController.listAllCards()).toBe(cardsMock);
    });
  });
});
