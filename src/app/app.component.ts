import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { FindValueSubscriber } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  myForm: FormGroup | undefined;
  statusValues = ['Stable','Critical','Finished']
  lastSubmittedData : {project: string, mail: string, status: 'Stable'|'Critical'|'Finished'} | undefined;
  errorMessages : {name: string, errorKey: string, message: string}[] = [
    {name: 'project', errorKey: 'required', message: 'Project name is required.'},
    {name: 'project', errorKey: 'nameIsForbidden', message: '"Test" as project name is forbidden.'},
    {name: 'email', errorKey: 'required', message: 'Contact mail is required.'},
    {name: 'email', errorKey: 'email', message: 'This is not a valid mail address.'},
    {name: 'status', errorKey: 'required', message: 'Project status is required.'},
  ]

  ngOnInit(): void {
    this.myForm = new FormGroup({
      'project':new FormControl(null, Validators.required, this.asyncProjectValidator.bind(this)),
      'email':new FormControl(null, [Validators.required, Validators.email]),
      'status':new FormControl(null, Validators.required)
    })
  } 

  onSubmit(): void {
    console.log(this.myForm.value);
    this.lastSubmittedData = this.myForm.value;
  }

  asyncProjectValidator(control: FormControl): Promise<{[key: string]: boolean}> | Observable<{[key: string]: boolean}> {
    console.log(control.value);
    const promise = new Promise<{[key: string]: boolean}>((resolve, reject) => {
      const myTimeOut = setTimeout(()=>{
        if (control.value === 'Test') {
          resolve({'nameIsForbidden': true});
        }
        else resolve(null);
      }, Math.floor(Math.random()*3000));
    })
    return promise; 
  }

  errorMessage(formControlName: string, errorKey: string): boolean {
    if (this.myForm.get(formControlName).hasError(errorKey)) return true;
    return false;
  }

}
