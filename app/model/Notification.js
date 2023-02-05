import { constants } from "../common-util/constants";

class Notification {
    constructor({ _id, _type, _createdAt, _notifyTo, _createdBy }) {
        this._id = _id || null;
        this._type = _type || constants().ERROR.SOMETHING_WENT_WRONG;
        this._createdAt = _createdAt || new Date();
        this._notifyTo = _notifyTo || [];
        this._createdBy = _createdBy || '';
    }

    getNotification() {
        return {
            id: this._id,
            type: this._type,
            createdAt: this._createdAt,
            notifyTo: this._notifyTo,
            createdBy: this._createdBy
        }
    }
}

export default Notification;