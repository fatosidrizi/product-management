import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';

import {Customer} from './customer';

function emailMatcher(c: AbstractControl): { [key: string]: boolean } | number {
  const emailControl = c.get('email');
  const confirmControl = c.get('confirmEmail');

  if (emailControl.pristine || confirmControl.pristine) {
    return null;
  }

  if (emailControl.value === confirmControl.value) {
    return null;
  }
  return {match: true};
}

function ratingRange(min: number, max: number): ValidatorFn {
  return (c: AbstractControl): { [key: string]: boolean } | null => {
    if (c.value !== null && (isNaN(c.value) || c.value < min || c.value > max)) {
      return {range: true};
    }
    return null;
  };
}

@Component({
  selector: 'pm-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customerForm: FormGroup;
  customer = new Customer();

  // this getter returns a form array.
  get addresses(): FormArray {
    // return <FormArray> this.customerForm.get('addresses') <cast to desired type> or write as below.
    return this.customerForm.get('addresses') as FormArray;
  }

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      // lastName: {value: 'n/a', disabled: true},
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        confirmEmail: ['', Validators.required],
      }, {validator: emailMatcher}),
      phone: '',
      notification: 'email',
      rating: [null, ratingRange(1, 5)],
      sendCatalog: true,
      // addresses: this.buildAddress() // If we want a dynamic form gorup we should add array insetad.
      addresses: this.fb.array([this.buildAddress()])
    });

    this.customerForm.get('notification').valueChanges.subscribe(
      value => {
        this.setNotification(value);
        console.log(value);
      }
    );
  }

  populateTestData(): void {
    this.customerForm.patchValue({
      firstName: 'Jack',
      lastName: 'Hanks',
      sendCatalog: true,
    });
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: '',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved: ' + JSON.stringify(this.customerForm.value));
  }

  setNotification(notifyVia: string) {
    const phoneControl = this.customerForm.get('phone');
    if (notifyVia === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }
}
