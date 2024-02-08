import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../../services/users.service';
import { RegisterComponent } from '../register/register.component';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})


export class LoginComponent {

  public modalService = inject(NgbModal);
  public incorrectLogin: boolean = false;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])

  });

  constructor( public userService: UsersService, private router: Router, public config: NgbModalConfig ){}

  login(){
    if (this.loginForm.valid) {
      let formData = this.loginForm.value;
      this.userService.users(JSON.stringify(formData))
      .subscribe(
        {
          next: (res) => {
            this.userService.updateUser(res.accessToken!);
            this.incorrectLogin = false;
            this.closeDialog();
            this.navigateToRegistration();
          },
          error: (e) => {
            console.log(e);
            this.incorrectLogin = true;
          }
        }
      );
    }
  }

  navigateToRegistration(): void {
    this.closeDialog();
    this.modalService.open(RegisterComponent)
  }

  closeDialog(): void {
    this.modalService.dismissAll()
  }


}
