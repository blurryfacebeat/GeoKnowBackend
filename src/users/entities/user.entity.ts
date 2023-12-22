import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  username: string;

  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
}
