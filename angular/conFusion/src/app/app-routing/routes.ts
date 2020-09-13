import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'menu', component: MenuComponent },
    { path: 'about', component: AboutComponent },
    { path: 'dishdetail/:id', component: DishdetailComponent },
    { path: 'contact', component: ContactComponent },
    { path: '', pathMatch: 'full', redirectTo: '/home' }
];


