import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/main-page/main-page.module')
      .then(m => m.MainPageModule)
  },
  {
    path: 'auth',
    loadChildren: () => import('./pages/auth-page/auth-page.module')
      .then(m => m.AuthPageModule)
  },
  {
    path: 'players',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/players-page/players-page.module')
      .then(m => m.PlayersPageModule)
  },
  {
    path: 'game',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/game-page/game-page.module')
      .then(m => m.GamePageModule)
  },
  {
    path: 'rooms',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/rooms-page/rooms-page.module')
      .then(m => m.RoomsPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
