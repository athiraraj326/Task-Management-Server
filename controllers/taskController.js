const tasks = require('../models/taskModal')

// add tasks
exports.addTaskController = async (req,res)=>{
    console.log("Inside addTaskController");
    const userId = req.userId
    console.log(userId);
    const {title,description,startDate,endDate,status,percentage} = req.body
    try{
        const existingTask = await tasks.findOne({title})
        if(existingTask){
            res.status(406).json("Task already exist in our collection... Please upload another!!!")
        }else{
            const newTask = new tasks({
                title,description,startDate,endDate,status,percentage,userId 
            })
            await newTask.save()
            res.status(200).json(newTask)
        }
    }catch(err){
        res.status(401).json(err)
    }
}

// get user tasks
exports.userTaskController = async (req,res)=>{
    console.log("Inside userTaskController");
    const userId = req.userId
    try{
        const allUserTasks = await tasks.find({userId})
        res.status(200).json(allUserTasks)
    }catch(err){
        res.status(401).json(err)
    }
}

// edit task
exports.editTaskController = async (req,res)=>{
    console.log("Inside editTaskController");
    const id = req.params.id
    const userId = req.userId
    const {title,description,startDate,endDate,status,percentage} = req.body
    try{
        const updateTask = await tasks.findByIdAndUpdate({_id:id},{
            title,description,startDate,endDate,status,percentage
        },{new:true})
        await updateTask.save()
        res.status(200).json(updateTask)
    }catch(err){
        res.status(401).json(err)
    }
}

// delete task
exports.deleteTaskController = async (req,res)=>{
    console.log("Inside deleteTaskController");
    const id = req.params.id
    try{
        const deleteTask = await tasks.findByIdAndDelete({_id:id})
        res.status(200).json(deleteTask)
    }catch(err){
        res.status(401).json(err)
    }
}