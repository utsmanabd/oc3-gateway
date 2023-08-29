import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutonomousMaintenanceComponent } from './autonomous-maintenance/autonomous-maintenance.component';
import { PredictiveMaintenanceComponent } from './predictive-maintenance/predictive-maintenance.component';
import { ActivityCiltComponent } from './activity-cilt/activity-cilt.component';
import { StockSparepartsComponent } from './stock-spareparts/stock-spareparts.component';
import { HomeGatewayComponent } from './home-gateway/home-gateway.component';

const routes: Routes = [
  { 
    path: '',
    component: HomeGatewayComponent,
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
  // {
  //   path: '',
  //   component: TemplateComponent,
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'am',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'am',
  //       component: AutonomousMaintenanceComponent,
  //     },
  //     {
  //       path: 'pm',
  //       component: PredictiveMaintenanceComponent,
  //     },
  //     {
  //       path: 'cilt',
  //       component: ActivityCiltComponent,
  //     },
  //     {
  //       path: 'stockparts',
  //       component: StockSparepartsComponent
  //     }
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
