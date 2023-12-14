import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PressurePageRoutingModule } from './pressure-routing.module';

import { PressurePage } from './pressure.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PressurePageRoutingModule
  ],
  declarations: [PressurePage]
})
export class PressurePageModule {}
