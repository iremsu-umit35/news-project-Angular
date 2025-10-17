// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { SearchComponent } from './pages/search/search';
import { AboutComponent } from './pages/about/about';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryComponent },
  { path: 'search', component: SearchComponent },
  { path: 'about', component: AboutComponent }
];
