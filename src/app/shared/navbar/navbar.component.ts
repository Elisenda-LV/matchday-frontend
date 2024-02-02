import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../services/users.service';
import { LoginComponent } from '../../components/auth/login/login.component';
import { MainPageComponent } from '../../pages/main-page/main-page.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  public modalService = inject(NgbModal);

  constructor( public userService: UsersService, public config: NgbModal ){}

  openLogin(){
    this.modalService.open(LoginComponent);

  }

  openRegister(){}

  logout(){
    this.modalService.open(MainPageComponent);

  }

}
