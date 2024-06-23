import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manageUser',
  templateUrl: './manageUser.component.html',
  styleUrls: ['./manageUser.component.css']
})
export class ManageUserComponent implements OnInit {

  constructor(
    private callService : CallserviceService,
    private  router :Router
  ) { }

  userList : any

  ngOnInit() {
    this.callService.getAllUser().subscribe(res=>{
      if(res.data){
        this.userList = res.data
      }
    })
  }

  onUpdateUser(userId : any){
    if(userId){
      this.router.navigate(['/profile/'+ userId]);
    }
  }

  onDeleteUser(userId : any){
    if(userId){

      this.callService.deleteUserByUserId(userId).subscribe(res=>{
        if(res.data){
          window.location.reload()
        }
      })
    }
  }
  

}



// import { Component, OnInit } from '@angular/core';
// import { CallserviceService } from '../services/callservice.service';
// import { Router } from '@angular/router';
// import Swal from 'sweetalert2';

// @Component({
//   selector: 'app-manageUser',
//   templateUrl: './manageUser.component.html',
//   styleUrls: ['./manageUser.component.css']
// })
// export class ManageUserComponent implements OnInit {

//   userList: any[] = [];
//   registerForm: any;  
//   isPassword: boolean = false;

//   constructor(
//     private callService: CallserviceService,
//     private router: Router
//   ) { }

//   ngOnInit() {
//     this.loadUserList();
//   }

//   loadUserList() {
//     this.callService.getAllUser().subscribe({
//       next: (res) => {
//         if (res.data) {
//           this.userList = res.data;
//         }
//       },
//       error: (err) => {
//         console.error('Error fetching user list:', err);
//         Swal.fire({
//           icon: 'error',
//           title: 'Error',
//           text: 'Failed to load user list.',
//         });
//       }
//     });
//   }

//   onUpdateUser(userId: any) {
//     if (userId) {
//       this.router.navigate(['/profile/' + userId]);
//     }
//   }

//   onDeleteUser(userId: any) {
//     if (userId) {
//       Swal.fire({
//         title: 'ต้องการลบใช่หรือไม่?',
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#56C596',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'ตกลง',
//         cancelButtonText: 'ยกเลิก'
//       }).then((result) => {
//         if (result.isConfirmed) {
//           this.callService.deleteUserByUserId(userId).subscribe({
//             next: (res) => {
//               if (res.data) {
//                 Swal.fire({
//                   icon: 'success',
//                   title: 'สำเร็จ!',
//                   text: 'User deleted successfully',
//                   confirmButtonText: 'ตกลง',
//                 });
//                 this.loadUserList(); 
//               }
//             },
//             error: (err) => {
//               console.error('Error deleting user:', err);
//               Swal.fire({
//                 icon: 'error',
//                 title: 'Error',
//                 text: 'Failed to delete user.',
//               });
//             }
//           });
//         }
//       });
//     }
//   }

//   onSubmit() {
//     this.isPassword = false;
//     console.log(this.registerForm.value);
//     if (this.passwordValidate()) {
//       const data = this.registerForm.value;
      
//       Swal.fire({
//         icon: 'success',
//         title: 'Form submitted!',
//         text: 'Form data has been successfully submitted.',
//         confirmButtonText: 'ตกลง',
//       });
//     }
//   }

//   passwordValidate(): boolean {
   
//     return true; 
//   }
// }




