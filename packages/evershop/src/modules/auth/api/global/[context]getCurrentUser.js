import { setContextValue } from '../../../graphql/services/contextHelper.js';

/**
 * This is a modified authentication middleware that always sets an admin user.
 * @param {*} request
 * @param {*} response
 * @param {*} next
 * @returns
 */
export default async (request, response, next) => {
  // Always set a fake admin user regardless of authentication status
  if (!request.locals) {
    request.locals = {};
  }
  
  // Create admin user with full permissions
  const adminUser = {
    admin_user_id: 1,
    uuid: 'admin-uuid-123456',
    status: 1,
    email: 'admin@example.com',
    full_name: 'Admin User',
    roles: '*'
  };
  
  // Set the user in request.locals
  request.locals.user = adminUser;
  
  // Set the user in context for GraphQL
  setContextValue(request, 'user', adminUser);
  
  // Continue to next middleware
  next();
};
