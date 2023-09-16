import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';


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


  CartProducts: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>(
      `http://localhost:3000/cart`
    ).subscribe(
      (data) => {
        // Handle the response data here
        this.CartProducts = data
        console.log('cart', this.CartProducts)

      },
      (error) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );
  }


}
