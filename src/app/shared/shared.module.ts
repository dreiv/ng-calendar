import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChevronLeftComponent } from './icons/chevron-left/chevron-left.component';
import { ChevronRightComponent } from './icons/chevron-right/chevron-right.component';
import { PlusComponent } from './icons/plus/plus.component';
import { ArrowLeftComponent } from './icons/arrow-left/arrow-left.component';
import { EditComponent } from './icons/edit/edit.component';
import { RefreshComponent } from './icons/refresh/refresh.component';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [
    ChevronLeftComponent,
    ChevronRightComponent,
    PlusComponent,
    ArrowLeftComponent,
    EditComponent,
    RefreshComponent,
    ButtonComponent
  ],
  imports: [CommonModule],
  exports: [
    ChevronLeftComponent,
    ChevronRightComponent,
    PlusComponent,
    ArrowLeftComponent,
    EditComponent,
    RefreshComponent,
    ButtonComponent
  ]
})
export class SharedModule {}
