import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from '../../utils/base-timestamp-entity';

@Entity()
export class UserEntity extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 16 })
  username: string;

  @Column({ type: 'varchar', length: 32 })
  password: string;
}
