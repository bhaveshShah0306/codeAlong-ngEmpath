import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Member } from 'src/core/Members';

export const membersResolver: ResolveFn<Member[]> = async () => {
  const http = inject(HttpClient);
  try {
    return await lastValueFrom(
      http.get<Member[]>('https://localhost:5001/api/members/'),
    );
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};
