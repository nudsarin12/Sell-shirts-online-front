import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CallserviceService } from '../services/callservice.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DataSharingService } from '../DataSharingService';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private callService: CallserviceService,
    private router: Router,
    private dataSharingService: DataSharingService
  ) { }

  ngOnInit() {
    sessionStorage.removeItem("userDetail");
  }

  loginForm = this.formBuilder.group({
    userName: '',
    password: '',
  });

  onSubmit() {
    console.log(this.loginForm.value);

    const userName = this.loginForm.value.userName;
    const password = this.loginForm.value.password;

    this.callService.authen(userName, password).subscribe(res => {
      console.log(res);
      if (res.data) {
        // Swal.fire({
        //   icon: 'success',
        //   title: 'สำเร็จ!',
        //   text: 'เข้าสู่ระบบสำเร็จจ้า',
        //   confirmButtonText: 'ตกลง',
        // });

        sessionStorage.setItem("userDetail", JSON.stringify(res.data));
        this.dataSharingService.userDetail.next(true);

        // Redirect based on role
        if (res.data.roleId === 1) {
          this.router.navigate(['/dashbord-admin']);
        } else if (res.data.roleId === 2) {
          this.router.navigate(['/home']);
        }

      } else {
        Swal.fire({
          icon: 'warning',
          title: 'เข้าสู่ระบบไม่สำเร็จ!',
          text: 'กรุณาตรวจสอบข้อมูลด้วยจ้า',
          confirmButtonText: 'ตกลง',
        });
      }
    });
  }
}
