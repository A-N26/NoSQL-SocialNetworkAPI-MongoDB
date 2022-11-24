const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// schema for Reactions
const ReactionsSchema = new Schema(
    {
        reactionId:
        {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody:
        {
            type: String,
            required: true,
            maxlength: 280
        },
        Username:
        {
            type: String,
            required: true
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('MMM dd, yyyy [at] HH:mm:ss a'),
        }
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

// Schema for Thoughts
const ThoughtsSchema = new Schema(
    {
        thoughtText:
        {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('MMM dd, yyyy [at] HH:mm:ss a')
        },
        Username:
        {
            type: String,
            required: true
        },
        // data validation using ReactionsSchema
        Reactions: [ReactionsSchema]
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

ThoughtsSchema.virtual('reactionCount').get(() => {
    return this.Reactions.length;
});

// to create the Thoughts model using the Thoughts Schema.
const Thoughts = model('Thoughts', ThoughtsSchema);

module.exports = Thoughts;
