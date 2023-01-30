class User {
    constructor(_id, _email, _username, _followers, _following, _teams, _createdAt, _updatedAt) {
        this._id = _id;
        this._email = _email;
        this._username = _username;
        this._followers = _followers || 0,
        this._following = _following || 0,
        this._teams = _teams || [],
        this._createdAt = _createdAt || new Date(),
        this._updatedAt = _updatedAt || new Date()
    }

    _getDetails() {
        return {
            id: this._id,
            email: this._email,
            username: this._username,
            followers: this._followers,
            following: this._following,
            teams: this._teams,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }

}

export default User;