import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

interface ValidatorFn {
  (c: AbstractControl): ValidationErrors | null;
}
export const timeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('start').value;
  const end = fg.get('end').value;

  return start !== null && end !== null && start < end ? null : { range: true };
};
