import { Component, OnInit, ViewChild } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/Services/orders.service';
import { CardService } from 'src/app/Services/card.service';
import { AuthenticationService } from 'src/app/Services/authentication.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  
  stocktype = false
  errorMessage = '';

  products:any = [];
  checklist:any = []
  totalNumber: number = 0
  sumTotal: number = 0;
  totTax: number = 0;
  totalDue: number = 0;
  shipping: number = 0;
  totalshipping:number = 0; 
  id:any;
  products_id:any = [];
  Stock:any
  stockMessage = '';
  idstock:any

  item:any

  constructor(private order:OrdersService,
    private auth:AuthenticationService,
    private stock:CardService, 
    private cartitem:CartService,  
    private router:Router) {
      let product:any;
      product = localStorage.getItem("product");
      this.products_id = JSON.parse(product)
     }

  ngOnInit(): void {
    this.cartitem.getProdList().subscribe({
      next:data =>{
        this.products = data; 
        this.totalNumber = data.length;
      }    
    })
    this.getSum();
    this.getTax();
    this.getAmount();
  
  }

  getSum(){
    this.sumTotal = this.cartitem.sumTotal;
  }
  getTax(){
    this.totTax = this.cartitem.tax;
  }
  getAmount(){
   this.totalDue = this.cartitem.totalAmountDue()
  }
 
  removeProduct(item:any){
    this.cartitem.removePerCart(item);
    this.getTax();
    this.getSum();
    this.getAmount();
  }

  removeAllProduct(){
    this.cartitem.removeAllCart();
  }

  Checkout(){
    if(!this.auth.isLoggedIn){
      this.router.navigate(['/login'])
    }else{
      this.router.navigate(['/checkout'])
    }
  }
}
