import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-counter-output',
  templateUrl: './counter-output.component.html',
  styleUrl: './counter-output.component.css',
})
export class CounterOutputComponent implements OnDestroy {
  counter = 0;
  counterServiceSub?: Subscription;
  constructor(private store: StoreService) {
    this.counterServiceSub = this.store.counterChanged.subscribe(
      (newVal) => (this.counter = newVal)
    );
  }

  ngOnDestroy() {
    if (this.counterServiceSub) {
      this.counterServiceSub?.unsubscribe();
    }
  }
}
