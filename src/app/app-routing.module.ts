import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard] // Protect the 'home' route
  },
  {
    path: 'sensor-data',
    loadChildren: () => import('./pages/sensor-data/sensor-data.module').then(m => m.SensorDataPageModule),
    canActivate: [AuthGuard] // Protect the 'sensor-data' route
  },
  {
    path: 'temperature',
    loadChildren: () => import('./temperature/temperature.module').then( m => m.TemperaturePageModule)
  },
  {
    path: 'humidity',
    loadChildren: () => import('./humidity/humidity.module').then( m => m.HumidityPageModule)
  },
  {
    path: 'pressure',
    loadChildren: () => import('./pressure/pressure.module').then( m => m.PressurePageModule)
  },
  {
    path: 'moisture',
    loadChildren: () => import('./moisture/moisture.module').then( m => m.MoisturePageModule)
  },
  {
    path: 'air-quality',
    loadChildren: () => import('./air-quality/air-quality.module').then( m => m.AirQualityPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
