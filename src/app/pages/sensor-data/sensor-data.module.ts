import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorDataPageRoutingModule } from './sensor-data-routing.module';

import { SensorDataPage } from './sensor-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorDataPageRoutingModule
  ],
  declarations: [SensorDataPage]
})
export class SensorDataPageModule {}
