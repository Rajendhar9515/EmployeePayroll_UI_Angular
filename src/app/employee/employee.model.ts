export class Employee {
  name: string = '';
  profilePic: string = '';
  gender: string = '';
  departments: Array<any> = [];
  salary: number = 0;
  startDate: Date;
  notes: string = '';

  constructor(
    name: string,
    profilePic: string,
    gender: string,
    department: Array<any>,
    salary: number,
    startDate: Date,
    notes: string
  ) {
    this.name = name;
    this.profilePic = profilePic;
    this.gender = gender;
    this.departments = department;
    this.startDate = startDate;
    this.salary = salary;
    this.notes = notes;
  }
}
