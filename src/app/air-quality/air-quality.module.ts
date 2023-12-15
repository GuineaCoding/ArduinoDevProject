import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AirQualityPageRoutingModule } from './air-quality-routing.module';

import { AirQualityPage } from './air-quality.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AirQualityPageRoutingModule
  ],
  declarations: [AirQualityPage]
})
export class AirQualityPageModule {}
