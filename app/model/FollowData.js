class FollowData {
    constructor({ _follower, _following, _createdAt, _updatedAt }) {
        this._follower = _follower;
        this._following = _following;
        this._createdAt = _createdAt || new Date();
        this._updatedAt = _updatedAt || new Date();
    }

    getFollowData() {
        return {
            follower: this._follower,
            following: this._following,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt
        }
    }
}