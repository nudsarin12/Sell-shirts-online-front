import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-orderDetailUser',
  templateUrl: './orderDetailUser.component.html',
  styleUrls: ['./orderDetailUser.component.css']
})
export class OrderDetailUserComponent implements OnInit {
  order: any = {};
  orderId: number | null = null;
  productImgList: any[] = [];
  ImageList: any[] = [];

  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.orderId = Number(params.get('orderId'));
      if (this.orderId) {
        this.fetchOrderDetails(this.orderId);
      }
    });
  }

  fetchOrderDetails(orderId: number): void {
    this.callService.getOrderDetails(orderId).subscribe(
      response => {
        this.order = response.data; 
        this.fetchProductDetailsForOrderItems();
      },
      error => {
        console.error('Error fetching order details:', error);
      }
    );
  }

  fetchProductDetailsForOrderItems(): void {
    this.order.items.forEach((item: any) => {
      this.callService.getProductByProductId(item.productId).subscribe(
        productResponse => {
          if (productResponse.data) {
            item.productDetails = productResponse.data;
            item.productName = productResponse.data.productName; // Assign product name
            this.fetchProductImages(item);
          } else {
            console.error('No product data found for productId:', item.productId);
          }
        },
        error => {
          console.error('Error fetching product details:', error);
        }
      );
    });
  }

  fetchProductImages(item: any): void {
    this.callService.getProductImgByProductId(item.productId).subscribe(
      imageResponse => {
        if (imageResponse.data) {
          item.images = [];
          this.productImgList = imageResponse.data;
          this.productImgList.forEach((img: any) => {
            this.getImage(img.productImageName, item);
          });
        } else {
          console.error('No images found for productId:', item.productId);
        }
      },
      error => {
        console.error('Error fetching product images:', error);
      }
    );
  }

  getImage(fileName: string, item: any): void {
    this.callService.getImageByte(fileName).subscribe(
      imageBlob => {
        let objectURL = URL.createObjectURL(imageBlob);
        let imageUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        item.images.push({ key: fileName, value: imageUrl });
      },
      error => {
        console.error('Error fetching image:', error);
      }
    );
  }

  calculateTotalAmount(): number {
    if (this.order.items && this.order.items.length > 0) {
      return this.order.items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0);
    } else {
      return 0;
    }
  }
  

  calculateProductTotal(item: any): number {
    return item.price * item.quantity;
  }
  fetchOrders() {
    const userDetailString = sessionStorage.getItem('userDetail');
    if (userDetailString) {
      const userDetail = JSON.parse(userDetailString);
      const userDetailId = userDetail.userDetailId;

      console.log(userDetail.userDetailId);

      this.callService.getOrdersByUserId(userDetailId).subscribe(
        (response) => {
          this.fetchOrders = response.data || response;
          console.log(this.fetchOrders);
        },
        (error) => {
          console.error('Failed to fetch orders:', error);
        }
      );
    } else {
      console.error('User detail not found in session storage');
    }
  }

  navigateToPayment(): void {
    if (this.orderId) {
      this.router.navigate(['/payment', this.orderId]);
      
    }
  }
}
