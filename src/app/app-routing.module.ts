import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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

  },

  // Lazy load Admin Dashboard with guards
  {
    path: 'admin-dashboard',
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),

  },

  // Fallback route for undefined paths
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
