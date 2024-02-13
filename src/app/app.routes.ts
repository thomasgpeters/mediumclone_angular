import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
        path: 'register',
        loadChildren: () => import('../app/auth/auth.routes').then((m) => m.registerRoutes)
    },
   {
        path: 'login',
        loadChildren: () => import('../app/auth/auth.routes').then((m) => m.loginRoutes)
    }
];
