import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { hash } from 'argon2';

@ObjectType({ description: 'user' })
@Entity({ name: 'users' })
export class User {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ name: 'date_added' })
  @Field(() => GraphQLISODateTime)
  dateAdded: Date;

  @UpdateDateColumn({ name: 'date_modified' })
  @Field(() => GraphQLISODateTime)
  dateModified: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password);
  }
}
