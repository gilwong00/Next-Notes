import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType({ description: 'note' })
@Entity({ name: 'notes' })
export class Note {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field(() => String)
  @Column('text')
  @Index()
  content: string;

  @Field()
  @ManyToOne(() => User, (user) => user.id)
  @Index()
  created_by: string;

  @Field(() => Date)
  @CreateDateColumn()
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updated_at: Date;
}
