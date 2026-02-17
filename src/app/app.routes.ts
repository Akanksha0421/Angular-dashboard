
import { LandingComponent } from './pages/landing/landing.component';
import { DetailsComponent } from './pages/details/details.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', component: LandingComponent },
	{ path: 'details/:id', component: DetailsComponent },
	{ path: '**', redirectTo: '' }
];
