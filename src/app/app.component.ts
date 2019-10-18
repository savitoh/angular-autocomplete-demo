import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Project } from './project';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  projects: Project[];
  filteredOptions: Observable<string[]>;
  state: string;
  states = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  constructor() {
  }

  ngOnInit() {
    this.form = new FormGroup({
      project: new FormControl('', [Validators.required, FormCustomValidators.valueSelected(this.states)]),
    });
    this.filteredOptions = this.form.get('project').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.states.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

}

export class FormCustomValidators {
  static valueSelected(myArray: any[]): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      let selectboxValue = c.value;
      let pickedOrNot = myArray.filter(alias => alias === selectboxValue);

      if (pickedOrNot.length > 0) {
        // everything's fine. return no error. therefore it's null.
        return null;

      } else {
        //there's no matching selectboxvalue selected. so return match error.
        return { 'incorrect': true };
      }
    }
  }
}


