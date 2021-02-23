import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiauthService } from '../services/apiauth.service';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  public loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  /*public loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });*/

  constructor(public apiauth: ApiauthService, private router: Router, private formBuilder: FormBuilder) {
    if(this.apiauth.userData){
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {}

  login() {
    console.log(this.loginForm.value);
    this.apiauth.login(this.loginForm.value).subscribe((resp) => {
      if (resp.successful === 1) {
        this.router.navigate(['/']);
      }
    });
  }
}
