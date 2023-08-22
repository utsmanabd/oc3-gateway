import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeGatewayComponent } from './pages/home-gateway/home-gateway.component';
import { AutonomousMaintenanceComponent } from './pages/autonomous-maintenance/autonomous-maintenance.component';
import { PredictiveMaintenanceComponent } from './pages/predictive-maintenance/predictive-maintenance.component';
import { ActivityCiltComponent } from './pages/activity-cilt/activity-cilt.component';
import { StockSparepartsComponent } from './pages/stock-spareparts/stock-spareparts.component';

const routes: Routes = [
  {
    path: '',
    component: HomeGatewayComponent
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  },
  {
    path: 'am',
    component: AutonomousMaintenanceComponent,
  },
  {
    path: 'pm',
    component: PredictiveMaintenanceComponent,
  },
  {
    path: 'cilt',
    component: ActivityCiltComponent,
  },
  {
    path: 'stockparts',
    component: StockSparepartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
