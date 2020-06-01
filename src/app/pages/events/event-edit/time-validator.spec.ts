import { AbstractControl, ValidationErrors, FormGroup } from '@angular/forms';

interface ValidatorFn {
  (c: AbstractControl): ValidationErrors | null;
}
const MyAwesomeRangeValidator: ValidatorFn = (fg: FormGroup) => {
  const start = fg.get('rangeStart').value;
  const end = fg.get('rangeEnd').value;
  return start !== null && end !== null && start < end ? null : { range: true };
};
