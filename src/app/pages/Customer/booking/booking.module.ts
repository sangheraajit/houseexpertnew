import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookingRoutingModule } from './booking-routing.module';
import { BookinglistComponent } from './bookinglist/bookinglist.component';
import { BookingviewComponent } from './bookingview/bookingview.component';

import { FormsModule } from '@angular/forms';
import { SelectPackageComponent } from './select-package/select-package.component';




@NgModule({
  declarations: [
    BookinglistComponent,
    BookingviewComponent,
    SelectPackageComponent
  ],
  imports: [
    CommonModule,
    BookingRoutingModule,
    CommonModule,
        FormsModule,
  ]
})
export class BookingModule { }
