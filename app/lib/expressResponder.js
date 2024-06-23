import _ from 'lodash';

function Responder() {}

/*
 * This method sends the response to the client.
 */
function sendResponse(res, status, body) {
  if (!res.headersSent) {
    if (body) { return res.status(status).json(body); }
    return res.status(status).send();
  }
  return true;
}

/*
 * These methods are called to respond to the API user with the information on
 * what is the result of the incomming request
 */
Responder.success = (res, message) => {
  const messageString = _.isString(message) ? { message } : message;
  return sendResponse(res, 200, { success: true, ...messageString });
};

Responder.created = (res, object) => sendResponse(res, 201, object);

Responder.deleted = res => sendResponse(res, 204);

Responder.operationFailed = (res, reason) => {
  const { status } = reason;

  if (reason.error.message) {
    return sendResponse(res, status, {
      success: false,
      error: {
        message: reason.error.message,
      },
    });
  }

  return sendResponse(res, status, { success: false, error: { message: reason.error } });
};

export default Responder;
