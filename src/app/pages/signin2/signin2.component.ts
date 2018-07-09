import { Component, OnInit, OnDestroy } from '@angular/core';
import { FuseTranslationLoaderService } from '@fuse/services/translation-loader.service';
import { locale as english } from './i18n/en';
import {FuseConfigService} from '@fuse/services/config.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {fuseAnimations} from '@fuse/animations';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';
import {Validators} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/store.reducers';
import * as fromLoginActions from '@store/login/login.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-signin2',
  templateUrl: './signin2.component.html',
  styleUrls: ['./signin2.component.scss'],
  animations : fuseAnimations
})
export class Signin2Component implements OnInit, OnDestroy {

  loginForm: FormGroup;
  loginFormErrors: any;
  login$: Observable<any>;

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {FuseConfigService} _fuseConfigService
   * @param {FormBuilder} _formBuilder
   * @param {FuseTranslationLoaderService} translationLoader
   * @param {Store<AppState>} store
   */
  constructor(
    private _fuseConfigService: FuseConfigService,
    private _formBuilder: FormBuilder,
    private translationLoader: FuseTranslationLoaderService,
    private store: Store<AppState>
  )
  {
    // Configure the layout
    this._fuseConfigService.config = {
      layout: {
        navbar : {
          hidden: true
        },
        toolbar: {
          hidden: true
        },
        footer : {
          hidden: true
        }
      }
    };

    // Set the defaults
    this.loginFormErrors = {
      email   : {},
      password: {}
    };

    // Set the private defaults
    this._unsubscribeAll = new Subject();

    this.translationLoader.loadTranslations(english);

    this.login$ = this.store.select(state => state.login);
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void
  {
    this.loginForm = this._formBuilder.group({
      email   : ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.onLoginFormValuesChanged();
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void
  {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * On form values changed
   */
  onLoginFormValuesChanged(): void
  {
    for ( const field in this.loginFormErrors )
    {
      if ( !this.loginFormErrors.hasOwnProperty(field) )
      {
        continue;
      }

      // Clear previous errors
      this.loginFormErrors[field] = {};

      // Get the control
      const control = this.loginForm.get(field);

      if ( control && control.dirty && !control.valid )
      {
        this.loginFormErrors[field] = control.errors;
      }
    }
  }

  public login() {
    console.log('Login', this.loginForm)
    const {valid, value} = this.loginForm;
    if (valid) {
      this.store.dispatch(new fromLoginActions.Login(value));
    }
  }

}
