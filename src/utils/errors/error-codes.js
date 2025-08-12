// const ClientErrorCodes = Object.freeze({
//     BAD_REQUEST: 400,
//     UNAUTHORIZED: 401,
//     FORBIDDEN: 403,
//     NOT_FOUND: 404,
// });
// const ServerErrorCodes = Object.freeze(
//     {
//         INTERNAL_SERVER_ERROR: 500,
//         SERVICE_UNAVAILABLE: 503,
//         GATEWAY_TIMEOUT: 504,
//     });

// const Successcodes = Object.freeze({
//     OK: 200,
//     CREATED: 201,
// })

// module.exports = {
//     ClientErrorCodes,
//     ServerErrorCodes,
//     Successcodes
// }
const { StatusCodes} = require("http-status-codes");

class AppError extends Error {
  constructor(
    name = "App Error",
    message = "Something went wrong",
    explanation = "Something went Wrong",
    statusCode = StatusCodes.InternalServeError
  ) {
    super();
    this.message = message;
    this.name = name;
    this.explanation = explanation;
    this.statusCode = statusCode;
  }
}
module.exports = AppError;
