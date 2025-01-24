import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';

const routes: Routes = [
   // Direct route for Login
  {
    path: 'Input-Trace/login',
    component: LoginComponent, // Use the LoginComponent directly
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
