import { Field, InputType } from '@nestjs/graphql';

@InputType('LoginUserInput')
export class LoginUser {
  @Field()
  username: string;

  @Field()
  password: string;
}
