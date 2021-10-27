const mongoose = require('mongoose')

const TodoSchema = new mongoose.Schema(
    {
        task: {
            type : String
        },
        done : {
            type : Boolean,
            default : false
        },
        taskOwner : {
            type : mongoose.Schema.ObjectId,
            ref : "user"
        }
    },
    {
        timestamps : true
    }
)

module.exports = mongoose.model("todo", TodoSchema)