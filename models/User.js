const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            // using regex to match and validate correct email
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            ]
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts',
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON:
        {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// to get the total count of the Friends.
UserSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

// to create the Users model using the Users Schema.
const User = model('User', UserSchema);

module.exports = User;
