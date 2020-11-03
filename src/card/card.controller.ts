import {Controller, Get, HttpStatus, Param, Post, Body} from '@nestjs/common';
import { CardRepository } from './repository/card.repository';
import { HttpCardException } from './exception/http-card.exception';
import { CardInterface } from './interface/card.interface';
import { HttpCardNotFoundException } from './exception/http-card-not-found.exception';
import { CreateANewCardDto } from './dto/create-a-new-card.dto';
import { CardFactory } from './factory/card.factory';
import { plainToClass } from 'class-transformer';
import v4 from 'uuid'

@Controller('cards')
export class CardController {
  constructor(private readonly cardRepository: CardRepository) {}

  @Get()
  async listAllCards(): Promise<CardInterface[]> {
    try {
      return await this.cardRepository.listAllCards()
    } catch (e) {
      throw CardController.httpException500(`error on list cards - ${e.message}`)
    }
  }

  @Get(':uuid')
  async findOneCardByUuid(@Param('uuid') uuid): Promise<CardInterface> {
    let card: CardInterface

    try {
      card = await this.cardRepository.findOneOrNull(uuid)
    } catch (e) {
      throw CardController.httpException500(`error on list cards - ${e.message}`)
    }

    if (card === null) {
      throw CardController.httpException404(`Card ${uuid} not found`);
    }

    return card
  }

  @Post()
  async createANewCard(@Body() createANewCardDto: CreateANewCardDto): Promise<void> {
    const card: CardInterface = plainToClass(CardFactory, createANewCardDto);
    card.uuid = v4();

    try {
      await this.cardRepository.addCard(card)
    } catch (e) {
      throw CardController.httpException500(`error on createANewCard - ${e.message}`)
    }
  }


  // exceptions
  static httpException500(message: string): HttpCardException {
    return new HttpCardException(message, HttpStatus.INTERNAL_SERVER_ERROR)
  }

  static httpException404(message: string): HttpCardNotFoundException {
    return new HttpCardNotFoundException(message, HttpStatus.NOT_FOUND)
  }
}
