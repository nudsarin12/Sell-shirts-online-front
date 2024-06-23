// import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
// import { DataSharingService } from 'src/app/modules/DataSharingService';
// import { Subscription } from 'rxjs';

// @Component({
//   selector: 'app-header',
//   templateUrl: './header.component.html',
//   styleUrls: ['./header.component.css']
// })
// export class HeaderComponent implements OnInit, OnDestroy {

//   userDetail: any;
//   private subscription: Subscription;

//   constructor(
//     private router: Router,
//     private dataSharingService: DataSharingService
//   ) { 
//     this.subscription = this.dataSharingService.userDetail.subscribe(value => {
//       this.loadUserDetailFromSession();
//     });
//   }

//   ngOnInit() {
//     this.loadUserDetailFromSession();
//   }

//   ngOnDestroy() {
//     if (this.subscription) {
//       this.subscription.unsubscribe();
//     }
//   }

//   private loadUserDetailFromSession() {
//     const userDetailSession = sessionStorage.getItem("userDetail");
//     if (userDetailSession) {
//       this.userDetail = JSON.parse(userDetailSession);
//     } else {
//       this.userDetail = null;
//     }
//   }

//   logout() {
//     sessionStorage.removeItem("userDetail");
//     this.dataSharingService.userDetail.next(true);
//     this.router.navigate(['/login']);
//   }
// }


import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/modules/DataSharingService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userDetail: any;
  private subscription: Subscription;

  constructor(
    private router: Router,
    private dataSharingService: DataSharingService
  ) { 
    this.subscription = this.dataSharingService.userDetail.subscribe(value => {
      this.loadUserDetailFromSession();
    });
  }

  ngOnInit() {
    this.loadUserDetailFromSession();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  private loadUserDetailFromSession() {
    const userDetailSession = sessionStorage.getItem("userDetail");
    if (userDetailSession) {
      this.userDetail = JSON.parse(userDetailSession);
    } else {
      this.userDetail = null;
    }
  }

  logout() {
    sessionStorage.removeItem("userDetail");
    this.dataSharingService.userDetail.next(true);
    // this.router.navigate(['/login']);
    this.router.navigate(['/home']);
  }

  // Add a method to handle search input if needed
  onSearch(event: Event) {
    const searchTerm = (event.target as HTMLInputElement).value;
    console.log('Search term:', searchTerm);
    // Implement search logic here
  }
}


