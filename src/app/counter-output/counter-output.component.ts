import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent {
  counter = 0;
  counterServiceSub?: Subscription;
  count$: Observable<number>;
  constructor(private store: Store<{ counter: number }>) {
    this.count$ = store.select('counter');
  }
}
