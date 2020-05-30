import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeftComponent } from './icons/arrow-left/arrow-left.component';
import { ArrowRightComponent } from './icons/arrow-right/arrow-right.component';
import { PlusComponent } from './icons/plus/plus.component';

@NgModule({
  declarations: [ArrowLeftComponent, ArrowRightComponent, PlusComponent],
  imports: [CommonModule],
  exports: [ArrowLeftComponent, ArrowRightComponent, PlusComponent]
})
export class SharedModule {}
