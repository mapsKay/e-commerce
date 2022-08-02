import { Component, OnInit, ViewChild } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { CartService } from 'src/app/Services/cart.service'
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;


  name: any 
  email: any
  profile:any
  fullname: any
  totalNumber: number = 0
  isLoggedIn: boolean = true
  constructor(
    private cartitem:CartService, 
    private router: Router,
    public auth:AuthenticationService) { }

  ngOnInit(): void {
    this.cartitem.getProdList().subscribe({
      next:data =>{
        this.totalNumber = data.length;
        //console.log(this.totalNumber)
      }
    })
    this.user()
  }


  Logout(){
    this.auth.doLogout()
  }

  user(){
    return this.auth.getUserProfile().subscribe({next:data => {
      this.profile = data
      this.name = this.profile.decoded.name
      this.email = this.profile.decoded.email
      this.fullname =  this.transform(this.name)
    }})
  }

  transform(value:string): string {
    let first = value.substr(0,1).toUpperCase();
    return first + value.substr(1); 
  }
}
