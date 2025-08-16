// src/entities/Leave.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './User';
import { LeaveStatus } from '../constants';
import { LeaveType } from '../constants';
import { HalfDayType } from '../constants';


@Entity()
export class Leave {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startDate: Date;

  @Column()
  endDate: Date;

  @Column({ type: 'enum', enum: LeaveStatus, default: LeaveStatus.PENDING })
  status: LeaveStatus;

  @Column({ nullable: true })
  reason: string;

  @Column({ type: 'enum', enum: LeaveType, default: LeaveType.ANNUAL })
  leaveType: LeaveType;

  @Column({ default: false })
  isHalfDay: boolean;

  @Column({ type: 'enum', enum: HalfDayType, nullable: true })
  halfDayType: HalfDayType | null;

  // Employee who requested the leave
  @ManyToOne(() => User, (user) => user.leaves)
  @JoinColumn({ name: 'employeeId' })
  employee: User;

  @Column()
  employeeId: number;

  // Manager who approved/rejected the leave
  @ManyToOne(() => User, (user) => user.approvedLeaves, { nullable: true })
  @JoinColumn({ name: 'approvedById' })
  approvedBy: User;

  @Column({ nullable: true })
  approvedById: number;
}