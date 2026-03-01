import { Routes } from '@angular/router';
import { authGuard } from 'src/core/guards/auth.guard';
import { membersResolver } from 'src/services/members/members.resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./../layout/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: '',
    runGuardsAndResolvers: 'always',
    canActivate: [authGuard],
    children: [
      {
        path: 'members',
        loadComponent: () =>
          import('./../features/members/members-list/members-list.component').then(
            (m) => m.MembersListComponent,
          ),
        resolve: { members: membersResolver },
      },
      {
        path: 'members/:id',
        loadComponent: () =>
          import('./../features/members/members-detailed/members-detailed.component').then(
            (m) => m.MembersDetailedComponent,
          ),
      },
      {
        path: 'lists',
        loadComponent: () =>
          import('./../features/lists/lists.component').then(
            (m) => m.ListsComponent,
          ),
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./../features/messages/messages.component').then(
            (m) => m.MessagesComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
