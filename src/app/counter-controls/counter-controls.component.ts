import { Component } from '@angular/core';
import { StoreService } from '../store.service';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent {
  constructor(private store: StoreService) {}
  increment() {
    this.store.increment();
  }

  decrement() {
    this.store.decrement();
  }

  reset() {
    this.store.reset();
  }
}
