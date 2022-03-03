import { BehaviorSubject, Observable, Operator } from "rxjs";

// https://timdeschryver.dev/blog/unlocking-reactivity-with-svelte-and-rxjs#refactored-typehead

export class StoreSubject<T> extends BehaviorSubject<T> {
  set (value: T) {
    super.next(value);
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const subject = new StoreSubject(super.getValue());
    subject.operator = operator as any;
    return subject as any;
  }
}