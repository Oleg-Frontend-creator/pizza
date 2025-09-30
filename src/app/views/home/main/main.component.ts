import {Component, OnDestroy, OnInit} from '@angular/core';
import {map, Subject, Subscription} from "rxjs";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  // private observable: Observable<number>;
  private subscription: Subscription | null = null;
  private subject: Subject<number>;

  constructor() {
    this.subject = new Subject<number>();
    let count = 0;
    const interval = setInterval(() => {
      this.subject.next(count++);
    }, 1000);
    const timeInterval = setTimeout(() => {
      this.subject.complete();
    }, 4000);

    // this.observable = from([1, 2, 3, 4, 5]);
    // this.observable = new Observable((observer) => {
    //   let count = 0;
    //   const interval = setInterval(() => {
    //     observer.next(count++);
    //   }, 1000);
    //   const timeInterval1 = setTimeout(() => {
    //     observer.complete();
    //   }, 4000);
    //   const timeInterval2 = setTimeout(() => {
    //     observer.error('This is error text');
    //   }, 5000);
    //
    //   return {
    //     unsubscribe() {
    //       clearInterval(interval);
    //       clearTimeout(timeInterval1);
    //       clearTimeout(timeInterval2);
    //     }
    //   }
    // });
  }

  ngOnInit() {
    console.log(environment.production);
    this.subscription = this.subject.subscribe({
      next: (param: number) => console.log('subscriber 1: ', param),
      error: (err: string) => console.log('This is error text: ' + err)
    })
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  test() {
    this.subject
      .pipe(
        map(number => 'Число: ' + number)
      )
      .subscribe((param: string) => {
        console.log('subscriber 2: ', param);
      })
  }
}
