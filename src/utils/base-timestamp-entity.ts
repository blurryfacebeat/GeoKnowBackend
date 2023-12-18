import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseTimestampEntity extends BaseEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
