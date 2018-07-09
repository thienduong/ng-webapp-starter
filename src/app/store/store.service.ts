import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';
import { AppState } from '@store/store.reducers';

const typeCache: { [label: string]: boolean } = {};

@Injectable()
export class AppStoreService {
  constructor(private store: Store<AppState>) {

  }

  public getState() {
    let state: AppState;

    this.store.take(1).subscribe((s) => state = s);

    return state;
  }

  public static createActionType<T>(label: T | ''): T {
    if (typeCache[<string>label]) {
      throw new Error(`Action type "${label}" is not unique"`);
    }

    typeCache[<string>label] = true;

    return <T>label;
  }
}
