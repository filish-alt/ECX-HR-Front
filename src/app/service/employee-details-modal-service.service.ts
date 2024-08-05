import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { LeaveRequestService } from './leaveRequest.service';
import {EmployeePositionService} from './employee-position'

@Injectable({
  providedIn: 'root'
})
export class EmployeeDetailsModalServiceService {

  private isOpen = new BehaviorSubject<boolean>(false);
  isOpen$ = this.isOpen.asObservable();

  private leaverequestId = new BehaviorSubject<string | null>(null);
  leaveApprovalId$ = this.leaverequestId.asObservable();
 
  constructor(private leaveRequest: LeaveRequestService,private employeePosition:EmployeePositionService) {} // Replace with your actual backend service
  private position = new BehaviorSubject<string | null>(null); // Corrected property name
  position$ = this.position.asObservable();
  private employeeName = new BehaviorSubject<string | null>(null); // Corrected property name
  employeeName$ = this.employeeName.asObservable();
  openModal(leaverequestId: string) {
    this.leaverequestId.next(leaverequestId);

    forkJoin([
      this.leaveRequest.getLeaveRequestByEmp(leaverequestId),
      this.employeePosition.getEmployeePosition(leaverequestId)
    ]).subscribe(([leaveRequest, employeePositionData]) => {
      // Extract data from the responses and set properties accordingly
   
      // Set other related data properties accordingly
      this.position.next(employeePositionData.divisionId);
      this.position.next(employeePositionData.position)
    });
    this.isOpen.next(true);
  }

  closeModal() {
    this.isOpen.next(false);
  }
}