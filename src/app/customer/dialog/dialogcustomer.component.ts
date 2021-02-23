import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Customer } from 'src/app/models/customer';
import { ApicustomerService } from 'src/app/services/apicustomer.service';

@Component({
  templateUrl: 'dialogcustomer.component.html',
})
export class DialogCustomerComponent {
  public cliName!: string;
  constructor(
    public dialogRef: MatDialogRef<DialogCustomerComponent>,
    public apiCustomer: ApicustomerService,
    public snackBAr: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public customer: Customer
  ) {
      if (this.customer !== null){
          this.cliName = customer.cliName;
      }
  }

  close() {
    this.dialogRef.close();
  }

  addCustomer() {
    const customer: Customer = { cliName: this.cliName, cliId: 0 };
    this.apiCustomer.addCustomer(customer).subscribe((response) => {
      if (response.successful === 1) {
        this.dialogRef.close();
        this.snackBAr.open('Customer Registered Successful', '', {
          duration: 2000,
        });
      }
    });
  }

  editCustomer(){
    const customer: Customer = { cliName: this.cliName, cliId: this.customer.cliId };
    this.apiCustomer.editCustomer(customer).subscribe((response) => {
      if (response.successful === 1) {
        this.dialogRef.close();
        this.snackBAr.open('Customer updated Successful', '', {
          duration: 2000,
        });
      }
    });
  }
}
