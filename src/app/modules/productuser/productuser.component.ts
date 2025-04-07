// import { Component, OnInit } from '@angular/core';
// import { CallserviceService } from '../services/callservice.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-productuser',
//   templateUrl: './productuser.component.html',
//   styleUrls: ['./productuser.component.css']
// })
// export class ProductuserComponent implements OnInit {
// [x: string]: any;

//   imageBlobUrl: SafeResourceUrl | undefined;
//   imageBlobUrls: SafeResourceUrl[] = [];
//   productImgList: any[] = [];
//   productList: any[] = [];
//   productTypeList: any[] = [];

//   constructor(
//     private callService: CallserviceService,
//     private sanitizer: DomSanitizer,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.getProductTypeAll();
//     this.callService.getAllProduct().subscribe((res) => {
//       if (res.data) {
//         this.productList = res.data;
//         for (let product of this.productList) {
//           product.imgList = [];

//           product.productType = this.productTypeList.filter(
//             (x: any) => x.productTypeId == product.productTypeId
//           );

//           if (null == product.productType[0]) {
//             window.location.reload();
//           }

//           this.callService
//             .getProductImgByProductId(product.productId)
//             .subscribe((res) => {
//               if (res.data) {
//                 this.productImgList = res.data;
//                 for (let productImg of this.productImgList) {
//                   this.getImage(productImg.productImageName, product.imgList);
//                 }
//               } else {
//                 window.location.reload();
//               }
//             });
//         }
//       }
//     });
//   }

//   getProductTypeAll() {
//     this.callService.getProductTypeAll().subscribe((res) => {
//       if (res.data) {
//         this.productTypeList = res.data;
//       }
//     });
//   }

//   getImage(fileNames: any, imgList: any) {
//     console.log(fileNames);
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

//   navigateToDetail(productId: string) {
//     this.router.navigate(['/product-detail', productId]);
//   }
  

 

//   addToCart(product: any, event: Event) {
//     event.stopPropagation();
//     let userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
//     if (!userDetail.userId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'กรุณาเข้าสู่ระบบ',
//         text: 'Please log in to add items to the cart.',
//         toast: true,
//         position: 'bottom-right',
//         timer: 3000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });
//       return;
//     }
  
//     let cart = JSON.parse(sessionStorage.getItem(userDetail.userId + 'cart') || '[]');
//     let item = cart.find((item: any) => item.productId === product.productId && item.userId === userDetail.userId);
//     if (item) {
//       item.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1, userId: userDetail.userId });
//     }
//     sessionStorage.setItem(userDetail.userId + 'cart', JSON.stringify(cart));
  
//     Swal.fire({
//       icon: 'success',
//       title: 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว',
//       toast: true,
//       position: 'bottom-right',
//       timer: 3000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//     });
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { CallserviceService } from '../services/callservice.service';
// import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-productuser',
//   templateUrl: './productuser.component.html',
//   styleUrls: ['./productuser.component.css']
// })
// export class ProductuserComponent implements OnInit {
//   [x: string]: any;

//   imageBlobUrl: SafeResourceUrl | undefined;
//   imageBlobUrls: SafeResourceUrl[] = [];
//   productImgList: any[] = [];
//   productList: any[] = [];
//   productTypeList: any[] = [];
//   filteredProductList: any[] = [];

//   constructor(
//     private callService: CallserviceService,
//     private sanitizer: DomSanitizer,
//     private router: Router
//   ) {}

//   ngOnInit() {
//     this.getProductTypeAll();
//     this.callService.getAllProduct().subscribe((res) => {
//       if (res.data) {
//         this.productList = res.data;
//         this.filteredProductList = this.productList;
//         for (let product of this.productList) {
//           product.imgList = [];

//           product.productType = this.productTypeList.filter(
//             (x: any) => x.productTypeId == product.productTypeId
//           );

//           if (null == product.productType[0]) {
//             window.location.reload();
//           }

//           this.callService
//             .getProductImgByProductId(product.productId)
//             .subscribe((res) => {
//               if (res.data) {
//                 this.productImgList = res.data;
//                 for (let productImg of this.productImgList) {
//                   this.getImage(productImg.productImageName, product.imgList);
//                 }
//               } else {
//                 window.location.reload();
//               }
//             });
//         }
//       }
//     });
//   }

//   getProductTypeAll() {
//     this.callService.getProductTypeAll().subscribe((res) => {
//       if (res.data) {
//         this.productTypeList = res.data;
//       }
//     });
//   }

//   getImage(fileNames: any, imgList: any) {
//     console.log(fileNames);
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

//   filterProducts(event: Event) {
//     const target = event.target as HTMLSelectElement;
//     const productTypeId = target.value;
  
//     if (productTypeId === 'all') {
//       this.filteredProductList = this.productList;
//     } else {
//       this.filteredProductList = this.productList.filter(
//         (product: any) => product.productType[0]?.productTypeId === parseInt(productTypeId, 10)
//       );
//     }
//   }
  

//   navigateToDetail(productId: string) {
//     this.router.navigate(['/product-detail', productId]);
//   }

//   addToCart(product: any, event: Event) {
//     event.stopPropagation();
//     let userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
//     if (!userDetail.userId) {
//       Swal.fire({
//         icon: 'warning',
//         title: 'กรุณาเข้าสู่ระบบ',
//         text: 'Please log in to add items to the cart.',
//         toast: true,
//         position: 'bottom-right',
//         timer: 3000,
//         timerProgressBar: true,
//         showConfirmButton: false,
//       });
//       return;
//     }

//     let cart = JSON.parse(sessionStorage.getItem(userDetail.userId + 'cart') || '[]');
//     let item = cart.find((item: any) => item.productId === product.productId && item.userId === userDetail.userId);
//     if (item) {
//       item.quantity += 1;
//     } else {
//       cart.push({ ...product, quantity: 1, userId: userDetail.userId });
//     }
//     sessionStorage.setItem(userDetail.userId + 'cart', JSON.stringify(cart));

//     Swal.fire({
//       icon: 'success',
//       title: 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว',
//       toast: true,
//       position: 'bottom-right',
//       timer: 3000,
//       timerProgressBar: true,
//       showConfirmButton: false,
//     });
//   }
// }



import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productuser',
  templateUrl: './productuser.component.html',
  styleUrls: ['./productuser.component.css']
})
export class ProductuserComponent implements OnInit {
  [x: string]: any;

  imageBlobUrl: SafeResourceUrl | undefined;
  imageBlobUrls: SafeResourceUrl[] = [];
  productImgList: any[] = [];
  productList: any[] = [];
  productTypeList: any[] = [];
  filteredProductList: any[] = [];
  searchText: string = '';
  selectedProductType: string = 'all';
  

  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProductTypeAll();
    this.callService.getAllProduct().subscribe((res) => {
      if (res.data) {
        this.productList = res.data;
        this.filteredProductList = this.productList; // Initialize filtered list
        for (let product of this.productList) {
          product.imgList = [];

          product.productType = this.productTypeList.filter(
            (x: any) => x.productTypeId == product.productTypeId
          );

          if (null == product.productType[0]) {
            window.location.reload();
          }

          this.callService
            .getProductImgByProductId(product.productId)
            .subscribe((res) => {
              if (res.data) {
                this.productImgList = res.data;
                for (let productImg of this.productImgList) {
                  this.getImage(productImg.productImageName, product.imgList);
                }
              } else {
                window.location.reload();
              }
            });
        }
      }
    });
  }

  getProductTypeAll() {
    this.callService.getProductTypeAll().subscribe((res) => {
      if (res.data) {
        this.productTypeList = res.data;
      }
    });
  }

  getImage(fileNames: any, imgList: any) {
    console.log(fileNames);
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

  filterProducts(productTypeId: any) {
    if (productTypeId === 'all') {
      this.filteredProductList = this.productList;
    } else {
      this.filteredProductList = this.productList.filter(
        (product: any) => product.productTypeId === productTypeId
      );
    }
  }

  filterProductsByText() {
    this.filterAndSearchProducts();
  }

  filterAndSearchProducts() {
    let filteredList = this.productList;
    if (this['selectedProductType'] !== 'all') {
      filteredList = filteredList.filter(
        (product: any) => product.productType[0]?.productTypeId === parseInt(this['selectedProductType'], 10)
      );
    }
    if (this.searchText.trim() !== '') {
      const searchTerm = this.searchText.trim().toLowerCase();
      filteredList = filteredList.filter((product: any) =>
        product.productName.toLowerCase().includes(searchTerm) || 
        product.productPrice.toString().includes(searchTerm)
      );
    }
    this.filteredProductList = filteredList;
  }

  navigateToDetail(productId: string) {
    this.router.navigate(['/product-detail', productId]);
  }

  addToCart(product: any, event: Event) {
    event.stopPropagation();
    let userDetail = JSON.parse(sessionStorage.getItem('userDetail') || '{}');
    if (!userDetail.userId) {
      Swal.fire({
        icon: 'warning',
        title: 'กรุณาเข้าสู่ระบบ',
        text: 'Please log in to add items to the cart.',
        toast: true,
        position: 'bottom-right',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      return;
    }

    let cart = JSON.parse(sessionStorage.getItem(userDetail.userId + 'cart') || '[]');
    let item = cart.find((item: any) => item.productId === product.productId && item.userId === userDetail.userId);
    if (item) {
      item.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1, userId: userDetail.userId });
    }
    sessionStorage.setItem(userDetail.userId + 'cart', JSON.stringify(cart));

    Swal.fire({
      icon: 'success',
      title: 'เพิ่มสินค้าลงตะกร้าเรียบร้อยแล้ว',
      toast: true,
      position: 'bottom-right',
      timer: 3000,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }
}
