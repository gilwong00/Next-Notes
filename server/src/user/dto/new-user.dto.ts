import { Field, InputType } from '@nestjs/graphql';

@InputType('NewUserInput')
export class NewUser {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}
