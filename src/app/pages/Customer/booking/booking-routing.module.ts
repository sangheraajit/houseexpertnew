import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { BookingviewComponent } from './bookingview/bookingview.component';
const routes: Routes = [
  {
    path: '',
    component: BookinglistComponent,
  },
  {
    path: 'bookinglist',
    component: BookinglistComponent,
  },
  {
    path: ':id',
    component: BookingviewComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule { }
