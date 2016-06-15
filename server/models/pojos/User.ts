/**
 * @description User POJO class for our logic
 * @property {string} name
 * @property {string} password
 * @returns string
 */
export class User {
    private _name: string;
    private _password: string;

    constructor(data: {
        name: string
        password: string
    }) {
        this._name = data.name;
        this._password = data.password;
    }

    get name (): string {
        return this._name;
    }

    get password (): string {
        return this._password;
    }
}