// address.component.ts

import { Component, OnInit } from '@angular/core';
import { CallserviceService } from '../services/callservice.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  address = {
    userId: '1',
    firstName: '',
    lastName: '',
    phone: '',
    city: '',
    zipcode: '',
    country: '',
    address: ''
  };

  addresses: any[] = []; // เก็บรายการที่อยู่ที่ดึงมา

  constructor(private callservice: CallserviceService) { }

  ngOnInit() {
    this.getAddresses(); // เรียกใช้งานเมื่อคอมโพเนนต์เริ่มต้น
  }

  saveAddress() {
    this.callservice.saveAddress(this.address).subscribe(
      response => {
        console.log('Address saved successfully', response);
        // แสดงข้อมูลที่อยู่ใหม่เมื่อบันทึกสำเร็จ
        this.getAddresses();
      },
      error => {
        console.error('Error saving address', error);
        // Handle error
      }
    );
  }

  getAddresses() {
    this.callservice.getAllAddresses().subscribe(
      data => {
        this.addresses = data;
        console.log('Addresses loaded successfully', this.addresses);
      },
      error => {
        console.error('Error loading addresses', error);
        // Handle error
      }
    );
  }
}
