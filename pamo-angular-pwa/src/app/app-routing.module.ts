import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";
import {MemberListComponent} from "./member-list/member-list.component";
import {MemberDetailComponent} from "./member-detail/member-detail.component";
import {ItemListComponent} from './item-list/item-list.component';
import {ItemDetailComponent} from './item-detail/item-detail.component';
import {UserItemListComponent} from './user-item-list/user-item-list.component';
import {ItemEditComponent} from './item-edit/item-edit.component';


const routes: Routes = [
  //{path: '', component: HomeComponent},
  // {path: '',
  //   runGuardsAndResolvers: "always",
  //   canActivate: [authGuard],
  //   children: [
  //     {path: 'members', component: MemberListComponent},
  //     {path: 'members/:id', component: MemberDetailComponent},
  //   ]
  // },
  { path: '', component: ItemListComponent },
  { path: 'item/:id', component: ItemDetailComponent },
  { path: 'user/item', component: UserItemListComponent },
  { path: 'edit/item/:id', component: ItemEditComponent },
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'members', component: MemberListComponent},
  {path: 'member-detail', component: MemberDetailComponent},
  {path: '**', component: HomeComponent,pathMatch: "full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
