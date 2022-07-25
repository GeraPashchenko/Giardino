import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { routesEnum } from 'src/environments/routes.enum';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  isSubmitted: Boolean = false;

  authForm = new FormGroup({
    email: new FormControl('', { nonNullable: true, validators: [Validators.email, Validators.required] }),
    password: new FormControl('', { nonNullable: true, validators: [Validators.required] })
  })

  ngOnInit(): void { }
  get formControls() { return this.authForm.controls; }

  signIn() {
    this.isSubmitted = true;

    if (this.authForm.invalid) return;

    this.authService.signIn(this.authForm.value);
    this.router.navigateByUrl(routesEnum.HOME);
  }

}
