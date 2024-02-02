import { Component, inject } from '@angular/core';
import { UsersService } from '../../../services/users.service';
import { NgbConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../../validators/custom.validators';
import { CommonModule } from '@angular/common';

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

  register(){}

  closeDialog(){}

  navigateToLogin(){}

}
