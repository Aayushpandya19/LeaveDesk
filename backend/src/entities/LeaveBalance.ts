// src/entities/LeaveBalance.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { LeaveType } from './../constants';

@Entity()
export class LeaveBalance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: LeaveType })
  leaveType: LeaveType;

  @Column({ type: 'float', default: 0 })
  totalAllocated: number;

  @Column({ type: 'float', default: 0 })
  used: number;

  @Column({ type: 'float', default: 0 })
  remaining: number;

  // User associated with this balance
  @ManyToOne(() => User, (user) => user.leaveBalances)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  userId: number;
}