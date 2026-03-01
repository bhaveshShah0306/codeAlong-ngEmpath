import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from 'src/services/account.service';
import { ToastService } from 'src/services/toast.service';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountService);
  const toast = inject(ToastService);

  if (!accountService.currentUser()) {
    toast.show('You shall not pass!', 'error');
    return false;
  }

  return true;
};
