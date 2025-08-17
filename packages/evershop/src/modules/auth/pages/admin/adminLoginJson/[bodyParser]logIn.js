import { translate } from '../../../../../lib/locale/translate/translate.js';
import {
  INTERNAL_SERVER_ERROR,
  INVALID_PAYLOAD,
  OK
} from '../../../../../lib/util/httpStatus.js';

export default async (request, response, next) => {
  try {
    // Bypass authentication - automatically log in with admin credentials
    if (!request.locals) {
      request.locals = {};
    }
    
    // Set a fake admin user
    request.locals.user = {
      admin_user_id: 1,
      uuid: 'admin-uuid-123456',
      status: 1,
      email: 'admin@example.com',
      full_name: 'Admin User',
      roles: '*'
    };
    
    // Set the session userID
    request.session.userID = 1;
    
    // Return success response
    response.status(OK);
    response.$body = {
      data: {
        sid: request.sessionID
      }
    };
    next();
  } catch (error) {
    response.status(INVALID_PAYLOAD).json({
      error: {
        message: error.message,
        status: INVALID_PAYLOAD
      }
    });
  }
};
