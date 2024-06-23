// import { Component, OnInit } from '@angular/core';
// import { CallserviceService } from '../services/callservice.service';
// import { ActivatedRoute, Router } from '@angular/router';
// import { FormBuilder } from '@angular/forms';
// import { last } from 'rxjs';

// @Component({
//   selector: 'app-register',
//   templateUrl: './register.component.html',
//   styleUrls: ['./register.component.css']
// })
// export class RegisterComponent implements OnInit {

//   constructor(
//   private CallService : CallserviceService,
//   private formBuilder: FormBuilder,
//     private router: Router,
//     private activated: ActivatedRoute
// ) { }

// roleList : any = [];


//   ngOnInit() {
//     this.getAllRole();
//   }

//   registerForm = this.formBuilder.group({
//     fristName : [''],
//     lastName : [''],
//     phone : [''],
//     age : [''],
//     role : [''],
//     username : [''],
//     password : [''],
//     confirmPassword : ['']
//   })

//   getAllRole() {
//     this.CallService.getAllRole().subscribe(res=>{
//       if(res){
//         this.roleList = res;
//       }
//     })
//   }

  
//   roleList : any[] = [];
//   isPassword  : boolean = false;
  
//   onSubmit(){
//     this.isPassword = false
//     console.log(this.registerForm.value)
//     if(this.passwordValidate()){
//       console.log("SUCCESS")
//     }
//   }

//   passwordValidate(){
//     const password = this.registerForm.value.password;
//     const confirmPassword = this.registerForm.value.confirmPassword;

//     if(password != confirmPassword){
//       this.isPassword = true;
//       return false;
//     }else{
//       return true;
//     }
//   }
// }


import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { last } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private CallService: CallserviceService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  roleList: any = [];
  isPassword: boolean = false;

  ngOnInit() {
    this.getAllRole();
  }

  registerForm = this.formBuilder.group({
    fristName: [''],
    lastName: [''],
    phone: [''],
    age: [''],
    roleId: [''],
    userName: [''],
    password: [''],
    confirmPassword: ['']
  })

  getAllRole() {
    this.CallService.getAllRole().subscribe(res => {
      if (res) {
        this.roleList = res;
      }
    })
  }

  onSubmit(){
    this.isPassword = false
    console.log(this.registerForm.value)
    if(this.passwordValidate()){
      const data = this.registerForm.value;
        Swal.fire({
          title: 'ต้องการสมัครสมาชิก?',
          text: "คุณต้องการสมัครสมาชิกใช่หรือไม่!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#56C596',
          cancelButtonColor: '#d33',
          confirmButtonText: 'บันทึก',
          cancelButtonText: 'ยกเลิก'
        }).then((result) => {
          if (result.isConfirmed) {
            this.CallService.saveRegister(data).subscribe(res=>{
              if(res.data){
                Swal.fire({
                  icon: 'success',
                  title: 'สำเร็จ!',
                  text: 'สมัครสมาชิกสำเร็จ',
                  confirmButtonText: 'ตกลง',
                });
                this.router.navigate(['/login']);
              }else{
                Swal.fire({
                  icon: 'warning',
                  title: 'บันทึกไม่สำเสร็จจ้า !',
                  text: 'กรุณาตรวจสอบข้อมูลด้วยจ้า',
                  confirmButtonText: 'ตกลง',
                });
              }
            })
          }
        });
      }
  }

  passwordValidate() {
    const password = this.registerForm.value.password;
    const confirmPassword = this.registerForm.value.confirmPassword;

    if (password != confirmPassword) {
      this.isPassword = true;
      return false;
    } else {
      return true;
    }
  }
}
