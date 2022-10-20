import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
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
    loadChildren: () => import('./pages/players-page/players-page.module')
      .then(m => m.PlayersPageModule)
  },
  {
    path: 'game',
    loadChildren: () => import('./pages/game-page/game-page.module')
      .then(m => m.GamePageModule)
  },
  {
    path: 'rooms',
    loadChildren: () => import('./pages/rooms-page/rooms-page.module')
      .then(m => m.RoomsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
