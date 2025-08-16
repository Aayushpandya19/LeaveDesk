// src/entities/User.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Leave } from './Leave';
import { LeaveBalance } from './LeaveBalance';
import { UserRole } from '../constants';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role: UserRole;

  // Self-referencing relation: An employee reports to a manager
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'managerId' })
  manager: User;

  @Column({ nullable: true })
  managerId: number;

  // Leaves requested by this user (employee)
  @OneToMany(() => Leave, (leave) => leave.employee)
  leaves: Leave[];

  // Leaves approved/rejected by this user (manager)
  @OneToMany(() => Leave, (leave) => leave.approvedBy)
  approvedLeaves: Leave[];

  // Leave balances for this user
  @OneToMany(() => LeaveBalance, (leaveBalance) => leaveBalance.user)
  leaveBalances: LeaveBalance[];
}