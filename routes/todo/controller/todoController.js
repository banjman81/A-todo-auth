const Todo = require('../model/Todo')
const User = require('../../users/model/User')

const errorHandler = require('../../util/errorHandler')

async function createTodo(req, res){
    try{
        const {task} = req.body

        let decodedData = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedData.email})

        const createdTodo = new Todo({
            task,
            taskOwner : foundUser._id
        })

        let savedTodo = await createdTodo.save()

        foundUser.todoList.push(savedTodo._id)

        await foundUser.save()

        res.json({
            message: "success",
            payload: savedTodo
        })

    }catch(e){
        res.status(500).json({
            message: 'error',
            error: errorHandler(e)
        })
    }
}

async function allTodo(req, res){
    try{
        let allTasks = await Todo.find({})

        let decodedData = res.locals.decodedData

        let foundUser = await User.findOne({email : decodedData.email})

        console.log(`--${allTasks[0].taskOwner}--`, foundUser._id.toString())

        let filteredTask = allTasks.filter((item)=> item.taskOwner.toString() === foundUser._id.toString())

        res.json({
            message : 'success',
            payload: filteredTask
        })
    }catch(e){
        res.status(500).json(errorHandler(e))
    }
}

module.exports = {
    createTodo,
    allTodo
}