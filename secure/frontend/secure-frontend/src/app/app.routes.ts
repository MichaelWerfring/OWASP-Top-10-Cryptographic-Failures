import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent },
    { path: 'profile', component: ProfileComponent,},
    { path: 'unauthorized', component: UnauthorizedComponent },
    { path: '**', component: LoginComponent },
  ];
