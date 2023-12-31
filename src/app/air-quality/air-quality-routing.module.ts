import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AirQualityPage } from './air-quality.page';

const routes: Routes = [
  {
    path: '',
    component: AirQualityPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AirQualityPageRoutingModule {}
