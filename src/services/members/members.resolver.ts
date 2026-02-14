import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Member } from 'src/core/Members';
import { catchError, of } from 'rxjs';

export const membersResolver: ResolveFn<Member[]> = () => {
  return inject(HttpClient)
    .get<Member[]>('https://localhost:5001/api/members/')
    .pipe(
      catchError((error) => {
        console.error('Error fetching members:', error);
        return of([]); // Return empty array on error
      }),
    );
};
