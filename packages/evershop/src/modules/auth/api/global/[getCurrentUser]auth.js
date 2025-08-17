import { UNAUTHORIZED } from '../../../../lib/util/httpStatus.js';

/**
 * This is a modified authentication middleware that always allows access.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns
 */
export default async (request, response, next) => {
  // Always set a fake admin user with full permissions if not already set
  if (!request.locals) {
    request.locals = {};
  }
  
  if (!request.locals.user) {
    request.locals.user = {
      admin_user_id: 1,
      uuid: 'admin-uuid-123456',
      status: 1,
      email: 'admin@example.com',
      full_name: 'Admin User',
      roles: '*'
    };
  }
  
  // Always continue to next middleware - bypass all authentication checks
  next();
};
