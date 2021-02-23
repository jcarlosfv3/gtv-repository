import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogInvoiceComponent } from './dialog/dialoginvoice.component';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  readonly width: string = '600px';
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  openAdd(){
    const dialogRef = this.dialog.open(DialogInvoiceComponent, {
      width: this.width
    });
  }

}
