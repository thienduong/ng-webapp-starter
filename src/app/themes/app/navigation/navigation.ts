import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id       : 'applications',
        title    : 'Applications',
        translate: 'NAV.APPLICATIONS',
        type     : 'group',
        children : [
            {
                id       : 'sample',
                title    : 'Sample',
                translate: 'NAV.SAMPLE.TITLE',
                type     : 'item',
                icon     : 'email',
                url      : '/sample',
                badge    : {
                    title    : '25',
                    translate: 'NAV.SAMPLE.BADGE',
                    bg       : '#F44336',
                    fg       : '#FFFFFF'
                }
            },
          {
            id       : 'user-management',
            title    : 'User Management',
            translate: 'NAV.USER_MANAGEMENT.TITLE',
            type     : 'item',
            icon     : 'email',
            url      : '/user-management',
            badge    : {
              title    : '25',
              translate: 'NAV.USER_MANAGEMENT.BADGE',
              bg       : '#F44336',
              fg       : '#FFFFFF'
            }
          }
        ]
    }
];
