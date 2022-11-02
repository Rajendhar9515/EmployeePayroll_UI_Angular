import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'gender',
    'department',
    'salary',
    'startDate',
    'actions',
  ];
  dataSource: any;

  ELEMENT_DATA = [];

  public employees: any;
  constructor(
    private route: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.dataSource = this.ELEMENT_DATA;
    this.getEmpData();
  }

  getEmpData() {
    this.employeeService.getEmployees().subscribe((resp) => {
      this.employees = resp.data;
    });
  }

  onEdit(empId: number) {
    console.log(empId);
    this.route.navigate(['/update', empId]);
  }

  onRemove(empId: number) {
    this.employeeService.deletEmpData(empId).subscribe(() => {
      this.getEmpData();
    });
  }

  onAdd() {
    this.route.navigateByUrl('/form');
  }
}
