const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
            get: (createdAtVal) => dateFormat(createdAtVal)
        }
    },
    {
        toJSON:
        {
            getters: true
        }
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
            get: (createdAtVal) => dateFormat(createdAtVal)
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
const Thought = model('Thoughts', ThoughtSchema);

module.exports = Thought;
