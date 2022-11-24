const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
    {
        Username:
        {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        Email:
        {
            type: String,
            required: true,
            unique: true,
            // using regex to match and validate correct email
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/
            ]
        },
        Thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thoughts'
            }
        ],
        Friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Users'
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
UserSchema.virtual('friendCount').get(() => {
    return this.Friends.length;
});

// to create the Users model using the Users Schema.
const Users = model('Users', UserSchema);

module.exports = Users;
