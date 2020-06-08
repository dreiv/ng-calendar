import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

interface ValidatorFn {
  (c: AbstractControl): ValidationErrors | null;
}
export const datetimeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('start').value;
  const end = fg.get('end').value;

  return start < end ? null : { range: true };
};
