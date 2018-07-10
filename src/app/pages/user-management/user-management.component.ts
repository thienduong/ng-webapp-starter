import { Component, OnInit } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import * as userManagementActions from '@store/user-management/user-management.actions';
import {Store} from '@ngrx/store';
import {AppState} from '@store/store.reducers';
import { Observable } from 'rxjs';
import {GetListUsers} from '@store/user-management/user-management.actions';

@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {
  public users: Observable<any>;
  /**
   * Constructor
   *
   * @param {FuseTranslationLoaderService} _fuseTranslationLoaderService
   */
  constructor(
    private _fuseTranslationLoaderService: FuseTranslationLoaderService,
    private store: Store<AppState>
    // private _userManagementServicea: AuthService
  )
  {
    // this._fuseTranslationLoaderService.loadTranslations(english);

  }

  ngOnInit() {
    this.users = this.store.select(state => { console.log(state.users); return state.users; });
    // this.users = this.store.select(state => state.users);

    // this.users = this._userManagementService.getUsers();
  }

  getUser(){
    this.store.dispatch(new userManagementActions.GetListUsers('adsf'));
  }
}
