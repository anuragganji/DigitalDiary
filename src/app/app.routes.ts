import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ErrorComponent} from './error/error.component';
import {ParentPageComponent} from './parent-page/parent-page.component';
import {RecordComponent} from './record/record.component';
import {HistoryComponent} from './history/history.component';
import {authGuard} from "./auth.guard";
import {CollabComponent} from "./collab/collab.component";
import {TripComponent} from "./trip/trip.component";


export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'parent', component: ParentPageComponent, canActivate: [authGuard]},
  {path: 'record', component: RecordComponent},
  {path: 'history', component: HistoryComponent},
  {path: 'collab', component: CollabComponent},
  {path: 'trip/:id', component: TripComponent},
  {path: '**', component: ErrorComponent}
];
