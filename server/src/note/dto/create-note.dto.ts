import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateNoteInput')
export class CreateNoteDto {
  @Field()
  content: string;

  @Field()
  title: string;
}
