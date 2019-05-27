import DataAccessError from "./data-access-error";
import UserError from "./user-error";

export default class ErrorFactory {
    private _error: Error;

    constructor(error: Error) {
        this._error = error;
    }

    buildError = (): any => {
        if (this._error instanceof DataAccessError) {
            return new DataAccessError(this._error.message).ToJson();
        }
        if (this._error instanceof UserError) {
            return new DataAccessError(this._error.message).ToJson();
        }
        return {type: 'unknown', message: this._error.message}
    }
}
