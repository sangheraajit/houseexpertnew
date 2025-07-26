import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LOCAL_VARIABLES } from 'src/app/constants/constants';
import { SubcategoryService } from 'src/app/service/subcategory.service';

@Component({
  selector: 'app-bookinglist',
  templateUrl: './bookinglist.component.html',
  styleUrls: ['./bookinglist.component.scss'],
})
export class BookinglistComponent implements OnInit {
  orderDialog: boolean = false;
  orders: any[] = [];
  selectedorders: any[] = [];
  order: any;
  custid = Number(localStorage.getItem(LOCAL_VARIABLES.CUSTOMER_ID));
  currentPage: number = 1;
  rowsPerPage: number = 10;
  hasPreviousPage: boolean = false;
  hasNextPage: boolean = false;
  totalPages: number = 0;
  currentOrders: any[] = [];
  selectAll: boolean = false;  // Add the selectAll property

  constructor(
    private orderService: SubcategoryService,
    public router: Router
  ) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.orderService.getCustomerOrders(this.custid).subscribe((res: any) => {
      this.orders = res.filter(
        (order: any) => order.fromcity != null && order.fromcity !== ''
      );
      this.totalPages = Math.ceil(this.orders.length / this.rowsPerPage);
      this.updatePageData();
    });
  }

  updatePageData() {
    const startIndex = (this.currentPage - 1) * this.rowsPerPage;
    this.currentOrders = this.orders.slice(startIndex, startIndex + this.rowsPerPage);
    this.hasPreviousPage = this.currentPage > 1;
    this.hasNextPage = this.currentPage < this.totalPages;
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePageData();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePageData();
    }
  }

  onSelectAll() {
    if (this.selectAll) {
      this.selectedorders = [...this.orders];
    } else {
      this.selectedorders = [];
    }
  }

  editorder(order: any) {
    this.order = { ...order };
    this.orderDialog = true;
    localStorage.setItem('Message', JSON.stringify(this.order));
    this.router.navigate(['bookinglist/' + this.order.id]);
  }
}
