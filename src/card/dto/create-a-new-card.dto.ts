import {
    IsNotEmpty,
    IsString,
    Length,
} from 'class-validator';

export class CreateANewCardDto {

    @Length(1, 250)
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    content: string
}
