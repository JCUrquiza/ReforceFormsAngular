import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, FormGroup, AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class ValidatorsService {

  public firstNameAndLastnamePattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  public cantBeStrider = ( control: FormControl ): ValidationErrors | null => {
    const value: string = control.value.trim().toLowerCase();
    if (value === 'strider') {
      return {
        noStrider: true,
      }
    }

    return null;
  }

  public isValidField( form: FormGroup, field: string ) {
    return form.controls[field].errors && form.controls[field].touched;
  }

  public isFieldOneEqualFieldTwo( field1: string, field2: string ) {
    return ( formGroup: AbstractControl ): ValidationErrors | null => {

      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if ( fieldValue1 !== fieldValue2 ) {
        formGroup.get(field2)?.setErrors({ notEqual: true });
        return { notEqual: true }
      }

      formGroup.get(field2)?.setErrors(null);
      return null;
    }
  }

  // ============

  getFieldError( myForm: FormGroup, field: string ): string | null {
    if ( !myForm.controls[field] ) return null

    const errors = myForm.controls[field].errors || {};

    for( const key of Object.keys(errors) ) {
      switch( key ) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${ errors['minlength'].requiredLength } caracteres`
      }
    }

    return null;
  }


}
