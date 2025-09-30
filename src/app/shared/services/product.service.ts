import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProductType} from "../../../types/product.type";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  // вариант со всякими настройками http
  // public getProducts(): Observable<ProductType[]> {
  // return this.http.get<{ data: ProductType[] }>('https://testologia.ru/pizzas', {
  //   headers: new HttpHeaders({
  //     Authorization: 'auth-token'
  //   }),
  //   params: (new HttpParams()).set('extraField', 1)
  // })
  //   .pipe(
  //     tap(res => console.log(res)),
  //     map(result => result.data)
  //   );
  // }
  public getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>(environment.apiURL + '/pizzas');
  }

  public getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(environment.apiURL + `/pizzas?id=${id}`);
  }

  public createOrder(data: { product: string, address: string, phone: string }) {
    return this.http.post<{ success: boolean, message?: string }>(environment.apiURL + '/order-pizza', data);
  }
}
