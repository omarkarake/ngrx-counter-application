import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppState } from './../store/reducers/app.reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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
  getLastHistoryElement,
  undo,
} from '../store/actions/counter-history.actions';
import {
  historyArray,
  historySum,
  selectCount,
} from '../store/selectors/counter.selector';

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
  count$: Observable<number>;
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

    this.historySum$ = this.store.select(
      (state) => state.counterHistory.historySum
    );
    this.historySum$.pipe(take(1)).subscribe((historySum) => {
      this.store.dispatch(getNewValueFromUndo({ value: 0 }));
    });
    this.count$ = store.select(selectCount);
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
  }

  decrement() {
    this.count$.pipe(take(1)).subscribe((count) => {
      if (count > 0) {
        this.store.dispatch(decrement({ value: 1 }));
        this.store.dispatch(addHistory({ value: -1 }));
        this.store.dispatch(getHistorySum());
      } else {
        console.log('count', count);
      }
    });
  }

  reset() {
    this.store.dispatch(addHistory({ value: 0 }));
    this.store.dispatch(getLastHistoryElement());
    this.store
      .select((state) => state.counterHistory.lastElement)
      .pipe(take(1))
      .subscribe((lastElement) => {
        this.store.dispatch(reset({ value: lastElement }));
        console.log('lastElement', lastElement);
      });
    this.store.dispatch(getHistorySum());
  }

  undo() {
    this.store
      .select(historyArray)
      .pipe(take(1))
      .subscribe((history) => {
        if (history.length > 1) {
          this.store.dispatch(undo());
          this.store.dispatch(getHistorySum());
          this.historySum$ = this.store.select(
            (state) => state.counterHistory.historySum
          );
          this.historySum$.pipe(take(1)).subscribe((historySum) => {
            this.store.dispatch(getNewValueFromUndo({ value: historySum }));
          });
        } else {
          console.log('Cannot undo');
        }
      });
  }

  onDecrement(): void {
    if (this.counterForm.get('decrementValue')?.valid) {
      const decrementValue: number =
        +this.counterForm.get('decrementValue')?.value;
      this.store.dispatch(decrementBy({ value: decrementValue }));
      this.store.dispatch(addHistory({ value: -decrementValue }));
      this.store.dispatch(getHistorySum());
      // we will check if the counter will be less that zero after decrement and then remove the last element from the history
      this.store
        .select(historySum)
        .pipe(take(1))
        .subscribe((sum) => {
          if (sum < 0) {
            this.store.dispatch(undo());
            this.store.dispatch(getHistorySum());
          }
          // console.log('sum', sum, ' and isless', sum < 0);
        });
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
