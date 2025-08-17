
import { UNAUTHORIZED } from '../../../../lib/util/httpStatus.js';

export default async (request, response, next) => {
  // Bypass authentication by setting a fake admin user
  if (!request.locals) {
    request.locals = {};
  }
  request.locals.user = {
    admin_user_id: 1,
    uuid: 'admin-uuid-123456',
    status: 1,
    email: 'admin@example.com',
    full_name: 'Admin User',
    roles: '*'
  };
  
  // Always continue to next middleware
  next();
};
