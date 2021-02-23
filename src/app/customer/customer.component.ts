import { Component, OnInit } from '@angular/core';
import { ApicustomerService } from '../services/apicustomer.service';
import { Response } from '../models/response';
import { DialogCustomerComponent } from './dialog/dialogcustomer.component';
import { MatDialog } from '@angular/material/dialog';
import { Customer } from '../models/customer';
import { DialogDeleteComponent } from '../common/delete/dialogdelete.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  public lst: any[] = [];
  readonly width: string = '300px';
  public columnas: string[] = [
    'cliId',
    'cliName',
    'cliLastName',
    'cliPlanId',
    'cliStatus',
    'actions',
  ];

  /*'usrLastname', 'usrUsername', 'usrCi', 'usrPhone', 'usrEmail', 'usrPassword', 'usrStatus' */

  constructor(
    private apicustomer: ApicustomerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.getCustomers();
  }
  getCustomers() {
    this.apicustomer.getCustomers().subscribe((response) => {
      this.lst = response.data;
    });
  }

  openAdd() {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCustomers();
    });
  }

  openEdit(customer: Customer) {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      width: this.width,
      data: customer,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.getCustomers();
    });
  }

  deleteCustomer(customer: Customer) {
    const dialogRef = this.dialog.open(DialogDeleteComponent, {
      width: this.width,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
          this.apicustomer.deleteCustomer(customer.cliId).subscribe((response) => {
            if (response.successful === 1) {
              this.snackBar.open('Customer deleted successful', '', {
                duration: 2000
              });
              this.getCustomers();
            }
          });
      }
    });
  }
}
