import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./layout/content-layout/content-layout'),
    children: [
      {
        path: 'home',
        loadComponent: () => import('./layout/home-layout/home-layout'),
        title: 'Home',
      },
      {
        path: 'policy',
        loadComponent: () => import('./components/policy/policy'),
        title: 'Privacy Policy',
      },
    ],
  },
  {
    path: 'blog',
    loadComponent: () => import('./layout/blog-layout/blog-layout'),
    title: 'Blog',
  },
  {
    path: '**',
    loadComponent: () => import('./errors/not-found/not-found'),
  },
];
