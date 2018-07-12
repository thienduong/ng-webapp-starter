import { Component, OnInit, ElementRef, OnDestroy } from '@angular/core';
import * as userManagementActions from '@store/user-management/user-management.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@store/store.reducers';
import { Observable } from 'rxjs/Rx';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';
import {UserManagementService} from '@services/user-management';
import { map } from 'rxjs/operators/map';
import { fuseAnimations } from '@fuse/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: fuseAnimations
})
export class UserManagementComponent implements OnInit, OnDestroy {

  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['Id', 'Name', 'button2'];
  public resultsLength = 0;
  public isLoadingResults = true;
  public onDataChanged: Subject<any> = new Subject();
  public dataSubscription: Subscription;
  public users: Observable<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _userManagement: UserManagementService,
    private store: Store<AppState>,
    private _router: Router,
    private _toastrService: ToastrService
  ) {
  }

  ngOnInit() {
    this.users = this.store.select(state => {
      return state.users;
    });
    this.users.subscribe(
      x => this.dataSource.data = x.users
    );
    this.users.subscribe(
      x => this.resultsLength = x.total
    );
    const searchEvent = Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(500)
      .distinctUntilChanged();
    // If the user changes the sort order or search, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    searchEvent.subscribe(() => this.paginator.pageIndex = 0);
    this.onDataChanged.subscribe(() => this.paginator.pageIndex = 0);
    this.dataSubscription = Observable.merge(this.sort.sortChange, this.paginator.page, searchEvent, this.onDataChanged)
      .pipe(
        startWith({}),
        map(() => {
            const params: any = {
              pageIndex: (this.paginator.pageIndex || 0) + 1,
              pageSize: this.paginator.pageSize || 10,
              textSearch: this.filter.nativeElement.value || '',
            };
            if (this.sort.active && this.sort.direction) {
              params.sortField = this.sort.active;
              params.orderDescending = this.sort.direction === 'desc' ? 'true' : 'false';
            }
            this.store.dispatch(new userManagementActions.GetListUsers({params}));
            this.isLoadingResults = false;
          }
        )
      ).subscribe();
  }

  ngOnDestroy() {
    if (this.dataSubscription) {
      this.dataSubscription.unsubscribe();
    }
  }

  add() {
    this._router.navigate(['user-management', 'users', 'new']);
  }

  edit(Id) {
    debugger
    this._router.navigate(['user-management', 'detail', Id]);
  }

  history(id) {
    this._router.navigate(['user-management', 'users', 'history', id]);
  }

  import(event) {
    if (event.result === 'Error') {
      this._toastrService.error(event.errorMessages && event.errorMessages[0] || 'Import failed.');
    } else if (event.result === 'Success') {
      this._toastrService.success('Import successful.');
      this.onDataChanged.next(event);
    }
  }
}

