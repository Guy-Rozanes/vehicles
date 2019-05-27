export default class DataAccessError extends Error {
    private _message: string;

    constructor(message: string) {
        super(message);
        this._message = message;
    }

    public ToJson() {
        return {
            type: "DataAccessError",
            message: this._message
        }
    }
}