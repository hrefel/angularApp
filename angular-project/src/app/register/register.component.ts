import { Component, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from "../public/auth/auth.service";
import { NzMessageService } from "ng-zorro-antd";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  validateForm: FormGroup;
  
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private message: NzMessageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      fullname: [null, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      username: [null, [Validators.required]],
      // phoneNumberPrefix: [ '+86' ],
      // phoneNumber      : [ null, [ Validators.required ] ],
      // website          : [ null, [ Validators.required ] ],
      // captcha          : [ null, [ Validators.required ] ],
      agree: [false]
    });
  }

  
  
  submitForm(): void {
    let dataSave = this.validateForm.value;
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (dataSave.agree == false) {
      this.message.create('error','Please Read the Agreement');
    } else {
      let data = {
        name: dataSave.fullname,
        email: dataSave.email,
        username: dataSave.username,
        password: dataSave.password
      };
      this.authService.registerUser(data).subscribe(res => {
        this.message.create('success','Now you are part of us');
        this.router.navigate['/login'];
      });
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() =>
      this.validateForm.controls.checkPassword.updateValueAndValidity()
    );
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
}
