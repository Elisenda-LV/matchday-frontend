import { Component, inject } from '@angular/core';
import { NgbConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UsersService } from '../../../services/users.service';
import { CustomValidators } from '../../../validators/custom.validators';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})


export class RegisterComponent {

  public modalService = inject(NgbModal);
  public repeatedEmail: boolean = false;

  registerForm = new FormGroup({
    name: new FormControl ('', [Validators.required, Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email],),
    password: new FormControl('', [Validators.required, Validators.minLength(8), CustomValidators.passwordValidator])
  })

  constructor( public userService: UsersService, public config: NgbConfig ){}

  public register(){
    if(this.registerForm.valid){
      let formData = this.registerForm.value;

      //check emaiL:
      this.userService.isEmailRegistered(formData.email!).subscribe(
        isRegistered => {
          if(!isRegistered){
            this.repeatedEmail = false;
            this.userService.users(JSON.stringify(formData))
              .subscribe({
                next: (res) => {
                  console.log(res);
                  this.closeDialog();
                  const loginData = { email: formData.email!, password: formData.password! };
                  this.userService.users(JSON.stringify(loginData)).subscribe(
                    {
                      next: (res) => {
                        this.userService.updateUser(res.accessToken!);
                      },
                      error: e => console.log(e)
                    });
                  },
                });

          }else{
            this.repeatedEmail = true;
          }
        }
      );
    }




  }

  public closeDialog(): void {
    this.modalService.dismissAll()
  }

  public navigateToLogin(): void {
    this.closeDialog();
    this.modalService.open(LoginComponent)
  }

}
