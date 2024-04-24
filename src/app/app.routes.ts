import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { ParentPageComponent } from './parent-page/parent-page.component';
import { RecordComponent } from './record/record.component';
import { HistoryComponent } from './history/history.component';


export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path:'login', component: LoginComponent},
    {path:'home', component: HomeComponent},
    {path:'parent', component: ParentPageComponent},
    {path:'record', component: RecordComponent},
    {path:'histtory', component: HistoryComponent},
    {path:'**', component: ErrorComponent}
];
