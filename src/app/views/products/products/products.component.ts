import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Subscription, tap} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";
import {CartService} from "../../../shared/services/cart.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: ProductType[] = [];
  subscriptionProducts: Subscription | null = null;
  loading: boolean = false;

  constructor(private productService: ProductService,
              private cartService: CartService,
              private router: Router,
              private http: HttpClient) {
  }


  ngOnInit() {
    this.loading = true;
    this.subscriptionProducts = this.productService.getProducts()
      .pipe(tap(() => this.loading = false))
      .subscribe(
        {
          next: data => this.products = data,
          error: err => {
            console.log(err);
            this.router.navigate(['/'])
          }
        });
  }

  ngOnDestroy() {
    this.subscriptionProducts?.unsubscribe();
  }
}
