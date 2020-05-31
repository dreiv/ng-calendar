import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChevronLeftComponent } from './icons/chevron-left/chevron-left.component';
import { ChevronRightComponent } from './icons/chevron-right/chevron-right.component';
import { PlusComponent } from './icons/plus/plus.component';

@NgModule({
  declarations: [ChevronLeftComponent, ChevronRightComponent, PlusComponent],
  imports: [CommonModule],
  exports: [ChevronLeftComponent, ChevronRightComponent, PlusComponent]
})
export class SharedModule {}
