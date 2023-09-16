import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { formatDate } from '@angular/common';


interface CartProduct {
  para: string;
  price: string;
  image_url: string
}


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  constructor(private http: HttpClient) { }
  currentDate: any;


  CartProducts: any[] = [];
  total: number = 0;

  ngOnInit(): void {

    this.currentDate = formatDate(new Date(), 'MM/dd/yyyy', 'en-US');

    this.http.get<any[]>(
      `https://lumpy-husky-address.glitch.me/cart`
    ).subscribe(
      (data) => {
        this.CartProducts = data
        this.total = this.CartProducts.reduce((sum, product) => sum + (product.rs*product.quantity), 0);
        //console.log('cart', this.CartProducts)

      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  removeItemfromCart(id:any){
    this.http.delete(`https://lumpy-husky-address.glitch.me/cart/${id}`).subscribe(
      (response) => {
       // console.log('API Response:', response);
      alert('Product remove from cart')
      this.CartProducts = this.CartProducts.filter(item=>item.id!=id)
      },
      (error) => {
        console.error('API Error:', error);
      }
    );

    this.http.patch(`https://lumpy-husky-address.glitch.me/data/${id}`, { quantity: 0 }).subscribe(
      (response) => {
        // console.log('API Response:', response);

      
      },
      (error) => {
        console.error('API Error:', error);
      }
    );



  }

  

}
