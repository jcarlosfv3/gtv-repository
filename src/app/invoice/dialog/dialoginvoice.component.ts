import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Details } from "src/app/models/details";
import { Invoice } from "src/app/models/invoice";
import { Months } from "src/app/models/months";
import { Years } from "src/app/models/years";
import { ApiinvoiceService } from "src/app/services/apiinvoice.service";

@Component({
  templateUrl: 'dialoginvoice.component.html'
})

export class DialogInvoiceComponent{
  public invoice!: Invoice;
  public details!: Details[];
  public years!: Years[];
  public months!: Months[];
  public year: number = new Date().getFullYear();

  public detailForm = this.fromBuilder.group({
    PlanId: [0, Validators.required],
    Year: [0, Validators.required],
    Month: [0, Validators.required]

  });

  constructor(
    public dialogRef: MatDialogRef<DialogInvoiceComponent>,
    public snackBar: MatSnackBar,
    public fromBuilder: FormBuilder,
    public apiInvoice: ApiinvoiceService
    ) {
      this.details = [];
      this.invoice = {Code:1000000020, CliId: 1013, UsrId: 1, details:[]}

      for (var i = -1; i < 3; i++) {
          if (i === -1){
            this.years = [{Gestion: this.year +(i)}];
          }else {
          this.years.push({Gestion: this.year +(i)});
        }
      }

      this.months = [{Id: 1, Name: 'Enero'},{Id: 2, Name: 'Febrero'},{Id: 3, Name: 'Marzo'}];
    }

  close(){
    this.dialogRef.close();
  }

  addDetails() {
    this.details.push(this.detailForm.value);

  }

  addInvoice() {
    this.invoice.details = this.details;
    this.apiInvoice.add(this.invoice).subscribe(resp =>{
      if(resp.successful === 1) {
        this.dialogRef.close();
        this.snackBar.open(resp.message, '', {
          duration: 2000
        });
      }
    });
  }
}
