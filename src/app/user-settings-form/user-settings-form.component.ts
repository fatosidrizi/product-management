import {Component, OnInit} from '@angular/core';
import {UserSettings} from './data/user-settings';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'pm-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.css']
})
export class UserSettingsFormComponent implements OnInit {

  originalUserSettings: UserSettings = {
    name: 'Eris',
    emailOffers: true,
    interfaceStyle: 'dark',
    subscriptionType: 'Monthly',
    notes: 'Notes ....'
  };

  userSettings: UserSettings = {...this.originalUserSettings};

  constructor() {
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    console.log('In submit: ', form.valid);
  }
}
