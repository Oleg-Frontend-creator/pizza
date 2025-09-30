import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {ProductService} from "../../../shared/services/product.service";
import {ProductType} from "../../../../types/product.type";

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  product: ProductType;
  private subscriptionProduct: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute,
              private productService: ProductService,
              private router: Router) {
    this.product = {
      id: 0,
      image: '',
      title: '',
      description: ''
    };
  }

  ngOnInit(): void {
    this.subscriptionProduct = this.activatedRoute.params.subscribe((params) => {
      if (params['id'])
        this.productService.getProduct(+params['id']).subscribe({
          next: data => this.product = data,
          error: err => {
            console.log(err);
            this.router.navigate(['/']);
          }
        });
    });
  }

  ngOnDestroy() {
    this.subscriptionProduct?.unsubscribe();
  }
}
