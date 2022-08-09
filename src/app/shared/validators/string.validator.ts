import { AbstractControl, ValidationErrors } from "@angular/forms";

export class StringValidators {
  public static stringHasOnlyNumbers(control: AbstractControl): ValidationErrors | null {
    if(control.value){
      const arr = control.value.split(',').map((value: string) => value.trim());
      for(let i = 0; i < arr.length; i++){
        const string = arr[i];

        if(!/^[-]?[0-9]+$/.test(string)){
          return { 
            mustBeNumeric: {
              errorAt: string
            }
          }
        }
      }
    }

    return null;
  }
}