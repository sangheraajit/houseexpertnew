import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { BookingviewComponent } from './bookingview/bookingview.component';
import { AuthGuard } from 'src/app/service/auth-guard.service';
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: BookinglistComponent,
        canActivate: [AuthGuard]
      },
      {
        path: ':id',
        component: BookingviewComponent,
        canActivate: [AuthGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
