class Notification {
    constructor({ _title, _desc, _createdAt, _notifyTo }) {
        this._title = _title;
        this._desc = _desc;
        this._createdAt = _createdAt || new Date();
        this._notifyTo = _notifyTo || [];
    }

    getNotification() {
        return {
            title: this._title,
            desc: this._desc,
            createdAt: this._createdAt,
            notifyTo: this._notifyTo
        }
    }
}