import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfileComponent} from './pages/user-profile/user-profile.component';
import {TestComponent} from './pages/test/test.component';
import {AuthGuard} from './guards/auth.guard';
import {PinboardsComponent} from "./pages/pinboards/pinboards.component";

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
  {
    path: 'pinboards',
    component: PinboardsComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
