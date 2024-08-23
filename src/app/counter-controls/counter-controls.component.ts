import { Observable } from 'rxjs';
import { AppState } from './../store/reducers/app.reducer';
import { Component, OnInit } from '@angular/core';
// import { StoreService } from '../store.service';
import { Store } from '@ngrx/store';
// import { IncrementAction } from '../store/actions/counter.actions';
import {
  decrement,
  decrementBy,
  getNewValueFromUndo,
  increment,
  incrementBy,
  reset,
} from '../store/actions/counter.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  addHistory,
  getHistorySum,
  undo,
} from '../store/actions/counter-history.actions';

@Component({
  selector: 'app-counter-controls',
  templateUrl: './counter-controls.component.html',
  styleUrl: './counter-controls.component.css',
})
export class CounterControlsComponent implements OnInit {
  counterForm: FormGroup;
  historySum$: Observable<number> = this.store.select(
    (state) => state.counterHistory.historySum
  );
  constructor(private store: Store<AppState>, private fb: FormBuilder) {
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

  getDecrementErrorMessage(): string {
    const control = this.counterForm.get('decrementValue');
    if (control?.touched) {
      if (control.hasError('required')) {
        return 'Value is required';
      }
      if (control.hasError('pattern')) {
        return 'Only numbers are allowed';
      }
    }
    return '';
  }

  getIncrementErrorMessage(): string {
    const control = this.counterForm.get('incrementValue');
    if (control?.touched) {
      if (control.hasError('required')) {
        return 'Value is required';
      }
      if (control.hasError('pattern')) {
        return 'Only numbers are allowed';
      }
    }
    return '';
  }

  increment() {
    this.store.dispatch(increment({ value: 1 }));
    this.store.dispatch(addHistory({ value: 1 }));
    this.store.dispatch(getHistorySum());
    // this.store.dispatch(new IncrementAction(2));
  }

  decrement() {
    this.store.dispatch(decrement({ value: 1 }));
    this.store.dispatch(addHistory({ value: -1 }));
    this.store.dispatch(getHistorySum());
  }

  reset() {
    this.store.dispatch(addHistory({ value: 0 }));
    this.store.dispatch(reset());
    this.store.dispatch(getHistorySum());
  }

  undo() {
    this.store.dispatch(undo());
    this.store.dispatch(getHistorySum());
    // let's get the history sum
    this.historySum$ = this.store.select(
      (state) => state.counterHistory.historySum
    );
    this.historySum$.subscribe((historySum) => {
      this.store.dispatch(getNewValueFromUndo({ value: historySum }));
    });
  }

  onDecrement(): void {
    if (this.counterForm.get('decrementValue')?.valid) {
      const decrementValue: number =
        +this.counterForm.get('decrementValue')?.value;
      this.store.dispatch(decrementBy({ value: decrementValue }));
      this.store.dispatch(addHistory({ value: -decrementValue }));
      this.store.dispatch(getHistorySum());
    }
  }

  onIncrement(): void {
    if (this.counterForm.get('incrementValue')?.valid) {
      const incrementValue: number =
        +this.counterForm.get('incrementValue')?.value;
      this.store.dispatch(incrementBy({ value: incrementValue }));
      this.store.dispatch(addHistory({ value: incrementValue }));
      this.store.dispatch(getHistorySum());
    }
  }
}
