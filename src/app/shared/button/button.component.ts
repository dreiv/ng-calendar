import { Component, HostBinding, Input } from '@angular/core';

export type ButtonVariant = 'contained' | 'outlined' | 'text';

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[app-button], a[app-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @HostBinding('class')
  @Input()
  variant: ButtonVariant = 'contained';
}
