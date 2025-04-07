import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manageProduct',
  templateUrl: './manageProduct.component.html',
  styleUrls: ['./manageProduct.component.css'],
})
export class ManageProductComponent implements OnInit {
  constructor(
    private callService: CallserviceService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  imageBlobUrl: any;
  imageBlobUrls: any = [];
  productImgList: any;
  productList: any;
  productTypeList: any = [];

  ngOnInit() {
    this.getProductTypeAll();
    this.callService.getAllProduct().subscribe((res) => {
      if (res.data) {
        this.productList = res.data;
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

  getImage(fileNames: any, imgList: any) {
    this.callService.getBlobThumbnail(fileNames).subscribe((res) => {
      if (res) {
        let objectURL = URL.createObjectURL(res);
        this.imageBlobUrl = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        imgList.push(this.imageBlobUrl);
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

  onDeleteProduct(productId: any): void {
    if (productId) {
      Swal.fire({
        title: 'Do you want to delete it?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#56C596',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          this.callService.deleteProduct(productId).subscribe({
            next: (res) => {
              if (res.data) {
                Swal.fire({
                  icon: 'success',
                  title: 'Succeed!',
                  text: 'Successfully deleted',
                  confirmButtonText: 'ok',
                }).then(() => {
                  window.location.reload();
                });
              }
            },
            error: (err) => {
              console.error('Error deleting product:', err);
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete product.',
              });
            }
          });
        }
      });
    }
  }

  onUpdateProduct(productId: any) {
    this.router.navigate(['/product/' + productId]);
  }
}
