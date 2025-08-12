const AppError = require("./error-codes");
const { StatusCodes } = require("http-status-codes");
class ValidationError extends AppError {
    constructor(error){
        let errorName = error.name;
        let explanation = [];
        error.errors.forEach((err) => {
            explanation.push(err.message);
        });
        super(
            errorName,
            "not able to validate the data sent in the request",
            explanation.join(", "),
            StatusCodes.BAD_REQUEST
        );

    }
}
module.exports = ValidationError;