import { Component, OnInit, ElementRef } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import * as userManagementActions from '@store/user-management/user-management.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@store/store.reducers';
import { Observable } from 'rxjs/Rx';
import { ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import {UserManagementService} from '@services/user-management';
import { map } from 'rxjs/operators/map';
import { catchError } from 'rxjs/operators/catchError';
import { of as observableOf } from 'rxjs/observable/of';
import {ListUserAState, ListUserState} from '@store/user-management/user-management.reducers';
import { fuseAnimations } from '@fuse/animations';


@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
  animations: fuseAnimations
})
export class UserManagementComponent implements OnInit {
  public users: Observable<any>;
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  // displayedColumns = ['id', 'name', 'progress', 'color'];
  // dataSource: MatTableDataSource<UserData>;
  public dataSource = new MatTableDataSource();
  public displayedColumns: string[] = ['Id','Name'];
  public resultsLength = 0;
  public onDataChanged: Subject<any> = new Subject();
  public dataSubscription: Subscription;

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('filter') filter: ElementRef;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _userManagement: UserManagementService,
    private store: Store<AppState>


    // private _userManagementServicea: AuthService
  )
  {


    // Create 100 users
    // const users: UserData[] = [];
    // for (let i = 1; i <= 100; i++) { users.push(createNewUser(i)); }
    //
    // // Assign the data to the data source for the table to render
    // this.dataSource = new MatTableDataSource(users);
    // // this._fuseTranslationLoaderService.loadTranslations(english);

  }

  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
    // this.users = this.store.select(state => { ; return state.users; });
    // this.users = this.store.select(state => state.users);

    // this.users = this._userManagementService.getUsers();



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
        switchMap(() => {
          const params: any = {
            pageIndex: (this.paginator.pageIndex || 0) + 1,
            pageSize: this.paginator.pageSize || 10,
            textSearch: this.filter.nativeElement.value || '',
          };
          if (this.sort.active && this.sort.direction) {
            params.sortField = this.sort.active;
            params.orderDescending = this.sort.direction === 'desc' ? 'true' : 'false';
          }
          return this._userManagement.getUsers(params);
        }),
        map((data: ListUserAState) => {

          // Flip flag to show that loading has finished.
          this.resultsLength = data.total;
          return data.ProductList;
        }),
        catchError(() => {

          return observableOf([]);
        })
      ).subscribe(data =>
         this.dataSource.data = data );
   console.log('this.dataSource', this.dataSource);

  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  getUser(){
    this.store.dispatch(new userManagementActions.GetListUsers('adsf'));
  }
}
// /** Builds and returns a new User. */
// function createNewUser(id: number): UserData {
//   const name =
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
//     NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';
//
//   return {
//     id: id.toString(),
//     name: name
//   };
// }
// const COLORS = ['maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple',
//   'fuchsia', 'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray'];
// const NAMES = ['Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack',
//   'Charlotte', 'Theodore', 'Isla', 'Oliver', 'Isabella', 'Jasper',
//   'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'];
//
// export interface UserData {
//   id: string;
//   name: string;
//   progress: string;
//   color: string;
// }
