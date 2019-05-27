export default class UserError extends Error {
    private _message: string;

    constructor(message: string) {
        super(message);
        this._message = message;
    }

    public ToJson() {
        return {
            type: "UserError",
            message: this._message
        }
    }
}
