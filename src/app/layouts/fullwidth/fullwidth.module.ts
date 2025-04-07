import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullwidthComponent } from './fullwidth.component';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HomeComponent } from 'src/app/modules/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';
import { NgxLoadingModule } from 'ngx-loading';
import { RegisterComponent } from 'src/app/modules/register/register.component';
import { LoginComponent } from 'src/app/modules/login/login.component';
import { DashbordAdminComponent } from 'src/app/modules/dashbordAdmin/dashbordAdmin.component';
import { ProfileComponent } from 'src/app/modules/profile/profile.component';
import { ManageUserComponent } from 'src/app/modules/manageUser/manageUser.component';
import { ManageProductComponent } from 'src/app/modules/manageProduct/manageProduct.component';
import { ProductComponent } from 'src/app/modules/product/product.component';
import { UpdateProductComponent } from 'src/app/modules/updateProduct/updateProduct.component';
import { ReportComponent } from 'src/app/modules/report/report.component';
import { ProductuserComponent } from 'src/app/modules/productuser/productuser.component';
import { CartComponent } from 'src/app/modules/cart/cart.component';
import { SuccessComponent } from 'src/app/modules/success/success.component';
import { ProductDetailComponent } from 'src/app/modules/productDetail/productDetail.component';
import { ContactComponent } from 'src/app/modules/contact/contact.component';
import { CreateOrderComponent } from 'src/app/modules/createOrder/createOrder.component';
import { OrderAdminComponent } from 'src/app/modules/orderAdmin/orderAdmin.component';

import { OrderDetailAdminComponent } from 'src/app/modules/orderDetailAdmin/orderDetailAdmin.component';
import { OrderUserComponent } from 'src/app/modules/orderUser/orderUser.component';
import { OrderDetailUserComponent } from 'src/app/modules/orderDetailUser/orderDetailUser.component';
import { PaymentComponent } from 'src/app/modules/payment/payment.component';
import { AddressComponent } from 'src/app/modules/address/address.component';






@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    FormsModule,
    NgxPermissionsModule.forRoot(),
    ReactiveFormsModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [
    FullwidthComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    DashbordAdminComponent,
    ProfileComponent,
    ManageUserComponent,
    ManageProductComponent,
    ProductComponent,
    UpdateProductComponent,
    ReportComponent,
    ProductuserComponent,
    CartComponent,
    SuccessComponent,
    ProductDetailComponent,
    ContactComponent,
    CreateOrderComponent,
    OrderAdminComponent,
    OrderDetailAdminComponent,
    OrderUserComponent,
    OrderDetailUserComponent,
    PaymentComponent,
    AddressComponent
    
  ]
})
export class FullwidthModule { }
