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
  total: number = 0;

  ngOnInit(): void {
    this.http.get<any[]>(
      `http://localhost:4000/cart`
    ).subscribe(
      (data) => {
        this.CartProducts = data
        this.total = this.CartProducts.reduce((sum, product) => sum + product.rs, 0);
        //console.log('cart', this.CartProducts)

      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  removeItemfromCart(id:any){
    this.http.delete(`http://localhost:4000/cart/${id}`).subscribe(
      (response) => {
       // console.log('API Response:', response);
      alert('Product remove from cart')
      this.CartProducts = this.CartProducts.filter(item=>item.id!=id)
      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }

}
