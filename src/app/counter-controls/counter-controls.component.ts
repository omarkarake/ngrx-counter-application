import { Component, OnInit } from '@angular/core';
// import { StoreService } from '../store.service';
import { Store } from '@ngrx/store';
// import { IncrementAction } from '../store/actions/counter.actions';
import {
  decrement,
  decrementBy,
  increment,
  incrementBy,
  reset,
} from '../store/actions/counter.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent implements OnInit {
  counterForm: FormGroup;
  constructor(private store: Store, private fb: FormBuilder) {
    this.counterForm = this.fb.group({
      decrementValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      incrementValue: [
        '',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
    });
  }

  ngOnInit(): void {}

  increment() {
    this.store.dispatch(increment({ value: 2 }));
    // this.store.dispatch(new IncrementAction(2));
  }

  decrement() {
    this.store.dispatch(decrement({ value: 2 }));
  }

  reset() {
    this.store.dispatch(reset());
  }

  onDecrement(): void {
    if (this.counterForm.get('decrementValue')?.valid) {
      const decrementValue: number =
        +this.counterForm.get('decrementValue')?.value;
      this.store.dispatch(decrementBy({ value: decrementValue }));
    }
  }

  onIncrement(): void {
    if (this.counterForm.get('incrementValue')?.valid) {
      const incrementValue: number =
        +this.counterForm.get('incrementValue')?.value;
      this.store.dispatch(incrementBy({ value: incrementValue }));
    }
  }
}
