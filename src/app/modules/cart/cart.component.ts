// import { Component, OnInit } from '@angular/core';
// import { CallserviceService } from '../services/callservice.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-cart',
//   templateUrl: './cart.component.html',
//   styleUrls: ['./cart.component.css']
// })
// export class CartComponent implements OnInit {

//   cart: any[] = [];
//   userDetail: any;
//   imageBlobUrl: SafeResourceUrl;
// item: any;

//   constructor(
//     private callService: CallserviceService, 
//     private sanitizer: DomSanitizer,
//     private router: Router 
//   ) {}

//   ngOnInit() {
//     this.userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
//     this.loadCart();
//   }

//   loadCart() {
//     this.cart = JSON.parse(sessionStorage.getItem(this.userDetail.userId + 'cart') || '[]');
//     this.cart.forEach(item => {
//       item.imgList = [];
//       this.callService.getProductImgByProductId(item.productId).subscribe((res) => {
//         if (res.data) {
//           for (let productImg of res.data) {
//             this.getImage(productImg.productImageName, item.imgList);
//           }
//         }
//       });
//     });
//   }

//   removeFromCart(product: any) {
//     this.cart = this.cart.filter(item => item.productId !== product.productId);
//     sessionStorage.setItem(this.userDetail.userId + 'cart', JSON.stringify(this.cart));
//   }

//   getImage(fileNames: any, imgList: any) {
//     this.callService.getBlobThumbnail(fileNames).subscribe((res) => {
//       if (res) {
//         let objectURL = URL.createObjectURL(res);
//         this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
//         imgList.push({
//           key: fileNames,
//           value: this.imageBlobUrl,
//         });
//       }
//     });
//   }
  

//   incrementQuantity(item: any, event: Event) {
//     event.preventDefault();
//     item.quantity++;
//     this.updateCart();
//   }

//   decrementQuantity(item: any, event: Event) {
//     event.preventDefault();
//     if (item.quantity > 1) {
//       item.quantity--;
//       this.updateCart();
//     }
//   }

//   updateCart() {
//     sessionStorage.setItem(this.userDetail.userId + 'cart', JSON.stringify(this.cart));
//   }

//   getTotalPrice() {
//     if (this.cart.length === 0) {
//       return 0;
//     }
//     return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
//   }

//   getTotalPriceWithShipping() {
//     return this.getTotalPrice() + (this.cart.length > 0 ? 0 : 0); 
//   }

//   getTotalQuantity() {
//     if (this.cart.length === 0) {
//       return 0;
//     }
//     return this.cart.reduce((total, item) => total + item.quantity, 0);
//   }
  

//   checkout() {
//     this.router.navigate(['/creteOrder'], { state: { cart: this.cart, userDetail: this.userDetail } });
//   }

// }



import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart: any[] = [];
  userDetail: any;
  imageBlobUrl: SafeResourceUrl;
  item: any;

  constructor(
    private callService: CallserviceService, 
    private sanitizer: DomSanitizer,
    private router: Router  // Inject the Router service here
  ) {}

  ngOnInit() {
    this.userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
    this.loadCart();
  }

  loadCart() {
    this.cart = JSON.parse(sessionStorage.getItem(this.userDetail.userId + 'cart') || '[]');
    this.cart.forEach(item => {
      item.imgList = [];
      this.callService.getProductImgByProductId(item.productId).subscribe((res) => {
        if (res.data) {
          for (let productImg of res.data) {
            this.getImage(productImg.productImageName, item.imgList);
          }
        }
      });
    });
  }

  removeFromCart(product: any) {
    this.cart = this.cart.filter(item => item.productId !== product.productId);
    sessionStorage.setItem(this.userDetail.userId + 'cart', JSON.stringify(this.cart));
  }

  getImage(fileNames: any, imgList: any) {
    this.callService.getBlobThumbnail(fileNames).subscribe((res) => {
      if (res) {
        let objectURL = URL.createObjectURL(res);
        this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        imgList.push({
          key: fileNames,
          value: this.imageBlobUrl,
        });
      }
    });
  }

  incrementQuantity(item: any, event: Event) {
    event.preventDefault();
    item.quantity++;
    this.updateCart();
  }

  decrementQuantity(item: any, event: Event) {
    event.preventDefault();
    if (item.quantity > 1) {
      item.quantity--;
      this.updateCart();
    }
  }

  updateCart() {
    sessionStorage.setItem(this.userDetail.userId + 'cart', JSON.stringify(this.cart));
  }

  getTotalQuantity() {
    if (this.cart.length === 0) {
      return 0;
    }
    return this.cart.reduce((total, item) => total + item.quantity, 0);
  }

  getTotalPrice() {
    if (this.cart.length === 0) {
      return 0;
    }
    return this.cart.reduce((total, item) => total + (item.productPrice * item.quantity), 0);
  }

  getTotalPriceWithShipping() {
    return this.getTotalPrice() + (this.cart.length > 0 ? 0 : 0); 
  }

  checkout() {
    this.router.navigate(['/creteOrder'], { state: { cart: this.cart, userDetail: this.userDetail } });
  }

}
