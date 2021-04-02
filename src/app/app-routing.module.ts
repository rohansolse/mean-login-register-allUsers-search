import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlluserComponent } from './alluser/alluser.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { RegistrationComponent } from './registration/registration.component';

const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'allusers', component: AlluserComponent },
    { path: 'not-found', component: NotfoundComponent },
    { path: '**', redirectTo: 'not-found' },

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
