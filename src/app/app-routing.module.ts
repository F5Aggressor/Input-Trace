import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/auth.guard';
import { roleGuard } from './core/role.guard';

const routes: Routes = [
  // Lazy load Auth Module for login
  {
    path: 'login',
    loadChildren: () => import('./features/login/login.module').then(m => m.LoginModule),
  },
  
  // Lazy load User Dashboard with guards
  {
    path: 'user-dashboard',
    loadChildren: () => import('./features/user/user.module').then(m => m.UserModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['USER'] }, // Restrict access to 'USER' role
  },

  // Lazy load Admin Dashboard with guards
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] }, // Restrict access to 'ADMIN' role
  },

  // Fallback route for undefined paths
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
