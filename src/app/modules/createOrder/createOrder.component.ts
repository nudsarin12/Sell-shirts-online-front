


import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';

@Component({
  selector: 'app-createOrder',
  templateUrl: './createOrder.component.html',
  styleUrls: ['./createOrder.component.css']
})
export class CreateOrderComponent implements OnInit {
  cart: any[] = [];
  userDetail: any;
  selectedPaymentMethod: number;

  constructor(
    private router: Router,
    private callService: CallserviceService
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { cart: any[], userDetail: any };
    this.cart = state.cart;
    this.userDetail = state.userDetail;
  }

  ngOnInit() {
    if (!this.cart || !this.userDetail) {
      this.router.navigate(['/']);
    }
  }

  placeOrder() {
    if (!this.selectedPaymentMethod) {
      alert('Please select a payment method');
      return;
    }

    const orderDetails = {
      userDetailId: this.userDetail.userId,
      paymentId: this.selectedPaymentMethod,
      totalAmount: this.cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0),
      status: "unpaid",
      items: this.cart.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: item.productPrice
      }))
    };

    this.callService.placeOrder(orderDetails).subscribe(
      response => {
        if (response.status === 'SUCCESS') {
          alert('Order placed successfully');

          // Clear the cart from session storage
          sessionStorage.removeItem(this.userDetail.userId + 'cart');

          this.router.navigate(['order-user']);
        } else {
          alert('Error placing order: ' + response.message);
        }
      },
      error => {
        alert('Error placing order: ' + error.message);
      }
    );
  }
  getTotalPrice() {
        if (this.cart.length === 0) {
          return 0;
        }
        return this.cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
      }
    
      getTotalPriceWithShipping() {
        const shippingCost = 0; 
        return this.getTotalPrice() + shippingCost;
      }
}