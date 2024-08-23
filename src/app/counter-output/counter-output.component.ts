import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { selectCount } from '../store/selectors/counter.selector';
import { AppState } from '../store/reducers/app.reducer';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrls: ['./counter-output.component.css'],
})
export class CounterOutputComponent implements OnDestroy {
  counter = 0;
  counterServiceSub?: Subscription;
  count$: Observable<number>;

  constructor(private store: Store<AppState>) {
    this.count$ = store.select(selectCount);
  }

  ngOnDestroy() {
    if (this.counterServiceSub) {
      this.counterServiceSub.unsubscribe();
    }
  }
}