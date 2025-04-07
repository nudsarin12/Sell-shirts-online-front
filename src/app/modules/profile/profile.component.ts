import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userDetail: any;
  roleList: any;
  userId: any;
  title: any;

  updateForm = this.formBuilder.group({
    firstName: '',
    lastName: '',
    phone: '',
    age: '',
    roleId: '',
    userName: '',
    email: '',
    line:''
  });

  constructor(
    private formBuilder: FormBuilder,
    private callService: CallserviceService,
    private router: Router,
    private activated: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getAllRole();

    this.userId = this.activated.snapshot.paramMap.get("userId");
    if (this.userId) {
      this.callService.getByUserId(this.userId).subscribe(res => {
        if (res.data) {
          this.title = "Edit user profile";
          this.userDetail = res.data;
          this.setDataForm(this.userDetail);
        }
      });
    } else {
      this.title = "Edit profile";
      let userDetailSession: any = sessionStorage.getItem("userDetail");
      this.userDetail = JSON.parse(userDetailSession);
      this.setDataForm(this.userDetail);
    }
  }

  setDataForm(data: any) {
    console.log('User email:', data.email);  
    this.updateForm.patchValue({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      age: data.age,
      roleId: data.roleId,
      userName: data.userName,
      email: data.email,
      line:data.line  
    });
  }

  getAllRole() {
    this.callService.getAllRole().subscribe(res => {
      if (res) {
        this.roleList = res;
      }
    });
  }

  onSubmit() {
    const data = this.updateForm.value;
    this.callService.updateProfile(data, this.userDetail.userId).subscribe(res => {
      if (res.data) {
        Swal.fire({
          icon: 'success',
          title: 'success!',
          text: 'Saved successfully',
          confirmButtonText: 'ok'
        });
        if (this.userId) {
          this.router.navigate(['/profile/' + this.userId]);
        } else {
          this.getUserById(res.data);
          this.router.navigate(['/profile']);
        }
        console.log(res.data)
      } else {
        Swal.fire({
          icon: 'warning',
          title: 'Failed to save!',
          text: 'Please check the information.',
          confirmButtonText: 'ok'
        });
      }
    });
  }

  getUserById(userId: any) {
    this.callService.getByUserId(userId).subscribe(res => {
      if (res.data) {
        this.setDataForm(res.data);
        sessionStorage.removeItem("userDetail");
        sessionStorage.setItem("userDetail", JSON.stringify(res.data));
      }
    });
  }
}
