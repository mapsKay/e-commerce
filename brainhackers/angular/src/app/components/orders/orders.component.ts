import { Component, OnInit, ViewChild } from '@angular/core';
import { OrdersService } from 'src/app/Services/orders.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { AuthenticationService } from 'src/app/Services/authentication.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;

  id :any 
  orderid: any 
  orders:any = [];
  profile:any
  constructor(
    private order:OrdersService,
    private auth:AuthenticationService) { }
  
  ngOnInit(): void {
    // this.id = localStorage.getItem('user_id')
    this.loading = true;
    this.user()
  }

  // get user by id on decoded token 
  user(){
    return this.auth.getUserProfile().subscribe({next:data => {
      this.profile = data
      this.id = this.profile.decoded.id
      this.getOrders(this.id)
    }})  
  }

  //   get all orders 
  getOrders(id:any){
    return this.order.getAllorders(id).subscribe({
      next:data =>{
        this.loading = false;
        this.orders = data;
       
      }
    })
  }

  removeAllTutorials() {
    this.orders.length = 0;
  }
}
