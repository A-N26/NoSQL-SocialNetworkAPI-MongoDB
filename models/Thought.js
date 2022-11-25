const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

// schema for Reactions
const ReactionSchema = new Schema(
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
        username:
        {
            type: String,
            required: true
        },
        createdAt:
        {
            type: Date,
            default: Date.now,
            get: (createdAtValue) => moment(createdAtValue).format('MMM dd, yyyy [at] hh:mm:ss a'),
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
const ThoughtSchema = new Schema(
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
            get: (createdAtValue) => moment(createdAtValue).format('MMM dd, yyyy [at] hh:mm:ss a')
        },
        username:
        {
            type: String,
            required: true
        },
        // data validation using ReactionsSchema
        reactions: [ReactionSchema]
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

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

// to create the Thoughts model using the Thoughts Schema.
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;
