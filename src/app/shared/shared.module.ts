import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArrowLeftComponent } from './icons/arrow-left/arrow-left.component';
import { ArrowRightComponent } from './icons/arrow-right/arrow-right.component';

@NgModule({
  declarations: [ArrowLeftComponent, ArrowRightComponent],
  imports: [CommonModule],
  exports: [ArrowLeftComponent, ArrowRightComponent]
})
export class SharedModule {}
