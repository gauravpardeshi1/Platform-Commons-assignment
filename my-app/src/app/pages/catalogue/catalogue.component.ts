import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface Product {
  para: string;
  price: string;
  image_url:string
} 

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.css']
})
export class CatalogueComponent {
  constructor(private http: HttpClient) {}
  products: any[] = [];

  ngOnInit(): void {
    this.http .get<any[]>(
      `http://localhost:3000/data`
    ).subscribe(
      (data) => {
        // Handle the response data here
        this.products=data
        console.log('p',this.products)

      },
      (error) => {
        // Handle errors here
        console.error('An error occurred:', error);
      }
    );
  }
}
