import { Component, OnInit } from '@angular/core';
import { PaymentDetailsService } from '../shared/payment-details.service';
import { PaymentDetails } from '../shared/payment-details.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-payment-details',
  templateUrl: './payment-details.component.html',
  styles: [
  ]
})
export class PaymentDetailsComponent  implements OnInit
{
  constructor (public service: PaymentDetailsService, private toastr: ToastrService)
  {

  }
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetails) {
    this.service.formData = Object.assign({}, selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?'))
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = res as PaymentDetails[]
            this.toastr.error('Deleted successfully', 'Payment Detail Register')
          },
          error: err => { console.log(err) }
        })
  }




}
