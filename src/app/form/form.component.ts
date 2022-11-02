import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { Employee } from '../employee/employee.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  employee: Employee = new Employee('', '', '', [], 0, new Date(), '');

  departments = [
    { id: 1, name: 'Hr', isChecked: false },
    { id: 2, name: 'Sales', isChecked: false },
    { id: 3, name: 'Finance', isChecked: false },
    { id: 4, name: 'Engineer', isChecked: false },
    { id: 5, name: 'Others', isChecked: false },
  ];

  salary = [15000, 20000, 30000, 40000, 50000, 60000];

  nameError: string = '';
  empId: number = 0;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.empId = this.route.snapshot.params['id'];
    this.findEmpData();
  }

  onSubmit() {
    const selectedDepartments = this.departments
      .filter((item) => item.isChecked)
      .map((item) => item.name)
      .join()
      .toString();

    this.employee.departments = selectedDepartments.split(',');

    const data = {
      name: this.employee.name,
      gender: this.employee.gender,
      profilePic: this.employee.profilePic,
      department: this.employee.departments,
      salary: this.employee.salary,
      startDate: this.employee.startDate,
      notes: this.employee.notes,
    };
    if (!this.empId) {
      this.employeeService.saveEmpData(data).subscribe((data) => {
        console.log(data);
        this.router.navigateByUrl('/dashBoard');
      });
    } else {
      this.employeeService.editEmpData(this.empId, data).subscribe((data) => {
        this.router.navigateByUrl('/dashBoard');
      });
    }
  }

  onInput() {
    const nameRegex = RegExp('^[A-Z]{1}[a-zA-Z]{2,}$');
    if (nameRegex.test(this.employee.name)) {
      this.nameError = '';
      return;
    }
    this.nameError = 'Name is Incorrect';
  }

  findEmpData() {
    if (!this.empId) return;
    this.employeeService.findById(this.empId).subscribe((data) => {
      console.log(data);
      this.employee = data.data;
      console.log(data.data.department);
      const dept = data.data.department;
      for (let i = 0; i < dept.length; i++) {
        this.departments
          .filter((item) => item.name === dept[i])
          .map((item) => (item.isChecked = true));
      }
    });
  }

  getDepartmentList() {
    console.log(this.departments);
  }
}
