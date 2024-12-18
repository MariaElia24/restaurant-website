import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactComponent } from './components/contact/contact.component';
import { CartComponent } from './components/cart/cart.component';
import { PlaceOrderComponent } from './components/place-order/place-order.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component'
import { LoginComponent } from './components/login/login.component';
import { ManageHomeComponent } from './components/manage-home/manage-home.component';
import { ManageMenuComponent } from './components/manage-menu/manage-menu.component';
import { ManageAboutUsComponent } from './components/manage-about-us/manage-about-us.component';

const routes: Routes = [  
  {path:'', component:HomeComponent},
  {path:'menu', component:MenuComponent},
  {path:'about-us', component:AboutUsComponent},
  {path:'contact', component:ContactComponent},
  {path:'cart', component:CartComponent},
  {path:'place-order', component:PlaceOrderComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'admin-dashboard', component: AdminDashboardComponent }, 
  { path: 'manage-home', component: ManageHomeComponent },
  { path: 'manage-menu', component: ManageMenuComponent },
  { path: 'manage-about-us', component: ManageAboutUsComponent },
  { path: '**', redirectTo: '' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
