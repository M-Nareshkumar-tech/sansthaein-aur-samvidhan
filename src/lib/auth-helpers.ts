import { getAuthenticatedUser } from './api-helpers';
import { NextResponse } from 'next/server';

export interface AuthorizedUserResult {
  errorResponse: NextResponse | null;
  user: any | null;
}

/**
 * Validates session and checks role clearance for incoming requests.
 * @param allowedRoles Optional list of roles that are authorized.
 * @returns An object containing either the error response to return immediately, or the authenticated user profile.
 */
export async function getAuthorizedUser(allowedRoles?: string[]): Promise<AuthorizedUserResult> {
  try {
    const user = await getAuthenticatedUser();
    if (!user || !user.profile) {
      return { 
        errorResponse: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }), 
        user: null 
      };
    }
    
    if (allowedRoles && allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
      return { 
        errorResponse: NextResponse.json({ error: 'Forbidden' }, { status: 403 }), 
        user: null 
      };
    }
    
    return { errorResponse: null, user };
  } catch (error) {
    console.error('getAuthorizedUser error:', error);
    return { 
      errorResponse: NextResponse.json({ error: 'Internal Server Error' }, { status: 500 }), 
      user: null 
    };
  }
}
