import { AbstractControl, ValidationErrors } from "@angular/forms";

export class MatrixValidators {
  public static isSquareMatrix(control: AbstractControl): ValidationErrors | null {
    if(control.value){
      const arr = control.value.split(',');

      return arr.length >= 1 && !(Math.pow(arr.length, 0.5) % 1)
        ? null
        : { isSquareMatrixInvalid:  true }
    }

    return null;
  }
}