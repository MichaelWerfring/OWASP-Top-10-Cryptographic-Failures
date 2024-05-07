import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { GameComponent } from './game/game.component';
import { ProfileComponent } from './profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'game', component: GameComponent },
    { path: 'profile', component: ProfileComponent },
    { path: '**', component: LoginComponent },
  ];
