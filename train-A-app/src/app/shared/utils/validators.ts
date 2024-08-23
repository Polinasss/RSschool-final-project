import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function noSpaceValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const isInvalid = control.value.trim().length === 0;
    return isInvalid ? { space: true } : null;
  };
}
