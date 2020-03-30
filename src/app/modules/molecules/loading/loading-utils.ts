import { Observable ,  Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

export class LoadingEntity<T> {

  runs = 0;

  loading = false;

  error: any = null;

  result: T = null;

  private stopSubject = new Subject();

  constructor(public loadingStateAfterFirstSuccess = true) {
  }

  /**
   * Tracks the status of an observable
   */
  run(observable: Observable<T>): Observable<T> {
    this.runs++;
    if (this.loadingStateAfterFirstSuccess && this.result !== null || this.result === null || this.error) {
      this.loading = true;
      this.result = null;
    }
    this.complete();
    this.error = null;
    return observable.pipe(
      tap(result => {
        this.loading = false;
        this.result = result;
      }, error => {
        this.loading = false;
        this.error = error;
      }, () => {
        this.loading = false;
      }),
      takeUntil(this.stopSubject)
    );
  }

  /**
   * This can complete and unsubscribe all observers
   */
  complete() {
    this.stopSubject.next();
  }

  reset() {
    this.complete();
    this.error = null;
    this.loading = false;
    this.result = null;
  }

}
