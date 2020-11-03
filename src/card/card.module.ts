import { Module } from '@nestjs/common';
import { CardController } from './card.controller';
import { CardRepository } from './repository/card.repository';

@Module({
    imports: [],
    controllers: [CardController],
    providers: [CardRepository]
})

export class CardModule {}
