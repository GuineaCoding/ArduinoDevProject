import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SensorDataPage } from './sensor-data.page';

const routes: Routes = [
  {
    path: '',
    component: SensorDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SensorDataPageRoutingModule {}
