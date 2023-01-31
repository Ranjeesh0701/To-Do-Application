class Task {
    constructor({_title, _desc, _members, _time, _dueBy, _tags, _createdBy, _state, _createdAt, _updatedAt}) {
        this._title = _title;
        this._desc = _desc || '';
        this._members = _members || [];
        this._time = _time || '';
        this._dueBy = _dueBy || '';
        this._tags = _tags || [];
        this._createdBy = _createdBy || '';
        this._state = _state || 'Created';
        this._createdAt = _createdAt || new Date();
        this._updatedAt = _updatedAt || new Date();
    }

    getDetails() {
        return {
            title: this._title,
            desc: this._desc,
            members: this._members,
            time: this._time,
            dueBy: this._dueBy,
            tags: this._tags,
            state: this._state,
            createdBy: this._createdBy,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }
}

export default Task;