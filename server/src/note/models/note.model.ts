import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';
import { User } from 'src/user/models/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

@ObjectType({ description: 'note' })
@Entity({ name: 'notes' })
export class Note {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column('text')
  @Index()
  content: string;

  @ManyToOne(() => User, (user) => user.id)
  @Index()
  @Column()
  @JoinColumn({ name: 'created_by', referencedColumnName: 'id' })
  created_by: string;

  @CreateDateColumn()
  date_added: Date;

  @UpdateDateColumn()
  date_modified: Date;

  // for response
  @Field()
  createdBy: string;

  @Field(() => GraphQLISODateTime)
  dateAdded: Date;

  @Field(() => GraphQLISODateTime)
  dateModified: Date;
}
