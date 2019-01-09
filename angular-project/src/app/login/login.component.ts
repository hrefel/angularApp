import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { NzMessageService } from "ng-zorro-antd";
import { Router } from '@angular/router';
import { AuthService } from '../public/auth/auth.service';
import { map } from 'rxjs/operators'
import { iif } from 'rxjs';

interface Response {
  success: boolean,
  msg: string
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  username: String;
  password: String;
  validateForm: FormGroup;
  configData = {
    success: Boolean,
    msg: String
  }
  constructor( private fb: FormBuilder, private router: Router, private message: NzMessageService,
               private authService: AuthService) { }

  ngOnInit() {
    this.validateForm = this.fb.group({
      userName: [ null, [ Validators.required ] ],
      password: [ null, [ Validators.required ] ],
      remember: [ true ]
    });
  }

  submitForm(){
    let data = this.validateForm.value;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    const userLogin = {
      username: data.userName,
      password: data.password
    }    
    this.authService.authenticateUser(userLogin).subscribe();
  }

}
