import { Component, OnInit, ViewChild } from '@angular/core';
import { CardService } from 'src/app/Services/card.service';
import { ngxLoadingAnimationTypes } from 'ngx-loading';
import { NgxLoadingComponent } from 'ngx-loading';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('ngxLoading', { static: false })
  ngxLoadingComponent!: NgxLoadingComponent;
  showingTemplate = false;
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public loading = false;
  
  errorMessage = ''
  Products: any;
  items: any;

  constructor (private cardservice: CardService, private cartService:CartService) { }

  ngOnInit(): void {
    this.loading = true;
    this.cardservice.getCard().subscribe(( respond:any )=>{
      this.loading = false;  
      this.Products = respond;
    })


  // })
 // this.loading = false;
    // this.getProduct();
  }
  // addToCart(product: any): {
  //   this.cartService.addToCart(product);
  // }

    addToCart(item: any): void {
      this.cartService.addToCart(item)
  
    }

    getProductinfo(index: any){
      this.loading = true;
        localStorage.setItem("product",JSON.stringify(this.Products[index]))
        this.loading = false;
       }
       
}


