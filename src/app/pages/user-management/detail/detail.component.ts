import { Component, OnDestroy, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { fuseAnimations } from '@fuse/animations';
import { BaseComponent } from '@modules/base/base.component';
import { FuseConfirmDialogComponent } from '@fuse/components/confirm-dialog/confirm-dialog.component';
import { Gender } from '@modules/base/base.model';
import { AppConstant } from '@common/services';
import {UserModel} from '@common/models/UserModel';
import {UserManagementService} from '@services/user-management';
import {Store} from '@ngrx/store';
import {AppState} from '@store/store.reducers';

@Component({
  selector: 'app-user-detail, button[formButton]',
  templateUrl: 'detail.component.html',
  styleUrls: ['detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class UserDetailComponent extends BaseComponent implements OnInit {
  @Input() label: string;
  public users: Observable<any>;
  public data: UserModel = new UserModel();
  public pageType = 'new';
  public Gender = Gender;
  public confirmDialogRef: MatDialogRef<FuseConfirmDialogComponent>;
  public saveOb: Observable<any>;
  public resetPassOb: Observable<any>;
  public frm: FormGroup;
  public controlConfig = {
    Id: new FormControl('', [Validators.required]),
    Name: new FormControl('' )
  };
  public formErrors = {
    Id: '',
    Name: '',
  };
  public validationMessages = {
    Id: {
      required: 'Id is required.',
    }
  };

  constructor(
              private _userManagement: UserManagementService,
              private _activatedRoute: ActivatedRoute,
              private _router: Router,
              private store: Store<AppState>,
              private _dialog: MatDialog,
              private _toastrService: ToastrService) {

    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this._activatedRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.users = this.store.select(state => {
        console.log(state.users);
        var a = state.users.users.filter(x => x.Id === id)
        return a;
      });

      if (!id) {
        this.pageType = 'new';
      } else {
        this.pageType = 'edit';
        this.users.subscribe((resp) => {
          this.data = new UserModel(resp);

          this.frm.patchValue(this.data);
          this.frm.get('username').disable();

        }, (err) => {
          this._router.navigate(['user-management']);
        });
      }
    });

  }
}


