const AppError = require("./error-codes");
const { StatusCodes } = require("http-status-codes");
class ClientError extends AppError {
    constructor(error){
        let errorName = error.name;
        let message = error.message;
        let explanation = error.explanation;

        super(
            errorName,
         message,
            explanation,
            StatusCodes.NOT_FOUND
        );

    }
}
module.exports = ClientError;