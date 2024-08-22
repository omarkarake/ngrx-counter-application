import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnDestroy {
  counter = 0;
  counterServiceSub?: Subscription;
  count$: Observable<number>;

  constructor(private store: Store<{ counter: { counter: number } }>) {
    this.count$ = store.select(state => state.counter.counter);
  }

  ngOnDestroy() {
    if (this.counterServiceSub) {
      this.counterServiceSub.unsubscribe();
    }
  }
}