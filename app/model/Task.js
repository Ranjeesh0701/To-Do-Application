class Task {
    constructor({_id, _title, _desc, _members, _time, _dueBy, _endTime, _endDate, _tags, _createdBy, _state, _createdAt, _updatedAt}) {
        this._id = _id || null;
        this._title = _title;
        this._desc = _desc || '';
        this._members = _members || [];
        this._time = _time || '';
        this._dueBy = _dueBy || '';
        this._endTime = _endTime || '';
        this._endDate = _endDate || '';
        this._tags = _tags || [];
        this._createdBy = _createdBy || '';
        this._state = _state || 'Created';
        this._createdAt = _createdAt || new Date();
        this._updatedAt = _updatedAt || new Date();
    }

    setTitle(_title) {
        this._title = _title;
    }

    setDesc(_desc) {
        this._desc = _desc;
    }

    setTags(_tags) {
        this._tags = _tags;
    }

    setTime(_time) {
        this._time = _time;
    }

    setDate(_dueBy) {
        this._dueBy = _dueBy;
    }

    setUpdatedAt() {
        this._updatedAt = new Date();
    }

    getDetails() {
        return {
            id: this._id,
            title: this._title,
            desc: this._desc,
            members: this._members,
            time: this._time,
            dueBy: this._dueBy,
            endTime: this._endTime,
            endDate: this._endDate,
            tags: this._tags,
            state: this._state,
            createdBy: this._createdBy,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }
}

export default Task;