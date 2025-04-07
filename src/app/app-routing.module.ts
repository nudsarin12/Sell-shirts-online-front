import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './layouts/default/default.component';
import { HomeComponent } from './modules/home/home.component';
import { FullwidthComponent } from './layouts/fullwidth/fullwidth.component';
import { RegisterComponent } from './modules/register/register.component';
import { LoginComponent } from './modules/login/login.component';
import { DashbordAdminComponent } from './modules/dashbordAdmin/dashbordAdmin.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { ManageUserComponent } from './modules/manageUser/manageUser.component';
import { ManageProductComponent } from './modules/manageProduct/manageProduct.component';
import { ProductComponent } from './modules/product/product.component';
import { UpdateProductComponent } from './modules/updateProduct/updateProduct.component';
import { ReportComponent } from './modules/report/report.component';
import { ProductuserComponent } from './modules/productuser/productuser.component';
import { CheckoutComponent } from './modules/checkout/checkout.component';
import { SuccessComponent } from './modules/success/success.component';
import { ProductDetailComponent } from './modules/productDetail/productDetail.component';
import { ContactComponent } from './modules/contact/contact.component';
import { CartComponent } from './modules/cart/cart.component';
import { CreateOrderComponent } from './modules/createOrder/createOrder.component';
import { OrderAdminComponent } from './modules/orderAdmin/orderAdmin.component';

import { OrderDetailAdminComponent } from './modules/orderDetailAdmin/orderDetailAdmin.component';
import { OrderUserComponent } from './modules/orderUser/orderUser.component';
import { OrderDetailUserComponent } from './modules/orderDetailUser/orderDetailUser.component';
import { PaymentComponent } from './modules/payment/payment.component';
import { AddressComponent } from './modules/address/address.component';


const routes: Routes = [
  {
    path: '',
    component: FullwidthComponent,
    children: [{
      path: '',
      component: HomeComponent
    },{
      path: 'register',
      component: RegisterComponent
    },{
      path: 'login',
      component: LoginComponent
    },{
      path: 'dashbord-admin',
      component: DashbordAdminComponent
    },{
      path: 'profile',
      component: ProfileComponent
    },{
      path: 'manage-user',
      component: ManageUserComponent
    },{
      path: 'profile/:userId',
      component: ProfileComponent
    },{
      path: 'manage-product',
      component: ManageProductComponent
    },{
      path: 'product',
      component: ProductComponent
    },{
      path: 'product/:productId',
      component: UpdateProductComponent
    },{
      path: 'report',
      component: ReportComponent
    }
    ,{
      path: 'home',
      component: HomeComponent
    }
    ,{
      path: 'productuser',
      component: ProductuserComponent
    }
    ,{
      path: 'cart',
      component: CartComponent
    }
    ,{
      path: 'checkout',
      component: CheckoutComponent
    }
    ,{
      path: 'success',
      component: SuccessComponent
    },{
      path: 'product-detail/:productId',
      component: ProductDetailComponent
    },{
      path: 'contact',
      component: ContactComponent
    },{
      path: 'creteOrder',
      component: CreateOrderComponent
    },{
      path: 'order-admin',
      component: OrderAdminComponent
    },{
      path: 'orderDetailAdmin/:orderId',
      component: OrderDetailAdminComponent
    },{
      path: 'order-user',
      component: OrderUserComponent
    },{
      path: 'orderDetailUser/:orderId',
      component: OrderDetailUserComponent
    },{
      path: 'payment/:orderId',
      component: PaymentComponent
    },{
      path: 'address',
      component: AddressComponent
    }
        
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



