import { MOCK_USER } from '@/mocks/user';
import type { User } from '../model/types';

/** Stand-in for an authenticated session until sign-in exists. */
export function useCurrentUser(): User {
  return MOCK_USER;
}
