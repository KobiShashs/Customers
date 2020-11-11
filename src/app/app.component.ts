import { Customer } from 'src/app/models/Customer';
import { RestService } from './services/rest.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateOrUpdateDialogComponent } from './components/create-or-update-dialog/create-or-update-dialog.component';
import { stringify } from '@angular/compiler/src/util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  public customers: Customer[];

  public resultDialog: Customer;

  public constructor(private restService: RestService, public dialog: MatDialog) { }


  ngOnInit(): void {
    this.restService.getAllCustomers().subscribe(
      (res) => { this.customers = res; },
      (err) => { alert(err.error); });
  }


  public deleteCustomer(customer: Customer): void {
    this.restService.deleteCustomer(customer).subscribe(
      () => { this.customers = this.customers.filter(item => item.id !== customer.id); },
      (err) => { alert(err.message); }
    );
  }


  public addCustomer(): void {
    this.openDialog(null);
  }

  public updateCustomer(customer: Customer): void {
    this.openDialog(customer);
  }

  public openDialog(customer: Customer): void {

    let type: string;
    if (customer) {
      type = 'Update';
    } else {
      type = 'Create';
    }

    const dialogRef = this.dialog.open(CreateOrUpdateDialogComponent, {
      width: '300px',
      data: { customer, type }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log('*', result, '*');
      this.resultDialog = result;


      if (type === 'Update') {
        this.restService.updateCustomer(this.resultDialog).subscribe(
          (res) => {
            console.log(res);
            const toUpdate = this.customers.find(moshe => moshe.id === res.id);
            const idx = this.customers.indexOf(toUpdate);
            this.customers[idx] = res;
            console.log(toUpdate);
          },
          (err) => {
            console.log(err);
            alert(err.message); }
        );


      } else {
        console.log(result);
        this.restService.addCustomer(this.resultDialog).subscribe(
          (res) => { this.customers.push(res); },
          (err) => { alert(err.message); }
        );
      }


    });
  }

}
