import { Component } from '@angular/core';
import { StoreService } from '../store.service';
import { Store } from '@ngrx/store';
import { increment } from '../store/actions/counter.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent {
  constructor(private store: Store) {}
  increment() {
    this.store.dispatch(increment({ value: 2 }));
  }

  decrement() {}

  reset() {}
}
