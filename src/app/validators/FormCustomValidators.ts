import {ValidatorFn, AbstractControl } from '@angular/forms';


export class FormCustomValidators {
  static valueSelected(myArray: any[]): ValidatorFn {

    return (c: AbstractControl): { [key: string]: boolean } | null => {
      console.log("Any Array: ", myArray);
      let selectboxValue = c.value;
      let pickedOrNot = myArray.filter(alias => alias === selectboxValue);
      console.log('selectboxValue: ', selectboxValue);
      console.log('pickedOrNot: ', pickedOrNot);
      
      if (pickedOrNot.length > 0) {
        return null;
      } else {
        return { 'incorrect': true };
      }
    }
  }
}