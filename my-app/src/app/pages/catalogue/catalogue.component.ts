import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Product {
  para: string;
  price: string;
  image_url: string
}

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  constructor(private http: HttpClient) { }
  products: any[] = [];
  CartProducts: any[] = [];

  ngOnInit(): void {
    this.http.get<any[]>(
      `http://localhost:4000/data`
    ).subscribe(
      (data) => {
        // Handle the response data here
        this.products = data
      //  console.log('p', this.products)

      },
      (error) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );


    this.http.get<any[]>(
      `http://localhost:4000/cart`
    ).subscribe(
      (data) => {
        this.CartProducts = data

      //  console.log('cart', this.CartProducts)

      },
      (error) => {
        console.error('An error occurred:', error);
      }
    );
  }

  addItemToCart(product: any) {
    // console.log('product',product)
    this.http.patch(`http://localhost:4000/data/${product.id}`, { quantity: 1 }).subscribe(
      (response) => {
        console.log('API Response  PATCH:', response);
        this.products = this.products.map(item => {
          if (item.id == product.id) {
            item.quantity = 1;
          }
          return item
        })



      },
      (error) => {
        console.error('API Error:', error);
      }
    );

    this.http.post('http://localhost:4000/cart', product).subscribe(
      (response) => {
        console.log('API Response POST:', response);
        alert('Procts added to cart')

      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }






  incrementQuantity(id: number, quantity: number) {




    this.http.patch(`http://localhost:4000/data/${id}`, { quantity: quantity + 1 }).subscribe(
      (response) => {
        // console.log('API Response:', response);
        this.products = this.products.map(item => {
          if (item.id == id) {
            item.quantity = quantity + 1;
          }
          return item
        })

      },
      (error) => {
        console.error('API Error:', error);
      }
    );
    this.http.patch(`http://localhost:4000/cart/${id}`, { quantity: quantity + 1 }).subscribe(
      (response) => {
        // console.log('API Response:', response);


      },
      (error) => {
        console.error('API Error:', error);
      }
    );
  }



  decrementQuantity(id: any, quantity: any) {
    //console.log('q',quantity)
    if (quantity == 1) {
      this.http.patch(`http://localhost:4000/data/${id}`, { quantity: quantity - 1 }).subscribe(
        (response) => {
          // console.log('API Response:', response);

          this.products = this.products.map(item => {
            if (item.id == id) {
              item.quantity = quantity - 1;
            }
            return item
          })
        },
        (error) => {
          console.error('API Error:', error);
        }
      );

      this.http.delete(`http://localhost:4000/cart/${id}`).subscribe(
        (response) => {
          // console.log('API Response:', response);
          console.log('Product remove from cart')

        },
        (error) => {
          console.error('API Error:', error);
        }
      );
    } else {

      this.http.patch(`http://localhost:4000/cart/${id}`, { quantity: quantity - 1 }).subscribe(
        (response) => {
          // console.log('API Response:', response);

          this.products = this.products.map(item => {
            if (item.id == id) {
              item.quantity = quantity - 1;
            }
            return item
          })
        },
        (error) => {
          console.error('API Error:', error);
        }
      );

      this.http.patch(`http://localhost:4000/data/${id}`, { quantity: quantity - 1 }).subscribe(
        (response) => {
          // console.log('API Response:', response);

          this.products = this.products.map(item => {
            if (item.id == id) {
              item.quantity = quantity - 1;
            }
            return item
          })
        },
        (error) => {
          console.error('API Error:', error);
        }
      );


    }
  }

}
