import { RouterEffects } from '@store/router/router.effect';
import { LoginEffects } from '@store/login/login.effects' ;
import {UserManagementEffects} from '@store/user-management/user-management.effects';

export const effects: any[] = [
    RouterEffects,
    LoginEffects,
    UserManagementEffects,
];
