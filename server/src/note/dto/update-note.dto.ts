import { Field, InputType, Int } from '@nestjs/graphql';

@InputType('updateNoteInput')
export class UpdateNoteDto {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field()
  title: string;
}
