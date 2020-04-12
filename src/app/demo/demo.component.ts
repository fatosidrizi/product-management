import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

function comparePasswords(passwordGroup: AbstractControl) {
  const password = passwordGroup.get('password');
  const confirmPass = passwordGroup.get('confirmPassword');

  if (password.pristine || confirmPass.pristine) {
    return null;
  }
  if (password.value === confirmPass.value) {
    return null;
  }
  return {match: true};
}

@Component({
  selector: 'pm-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  demoForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.demoForm = this.fb.group({
      userName: ['', Validators.required],
      passwordGroup: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
        confirmPassword: ['']
      }, {validator: comparePasswords}),
    });
  }

  save() {

  }

  populateTestData() {
    this.demoForm.patchValue({
      userName: 'admin',
    });
  }
}
