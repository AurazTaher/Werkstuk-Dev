const uri = "mongodb+srv://Auraz:Auraz123@devwerkstuk.pdrqk.mongodb.net/DevWerkstuk?retryWrites=true&w=majority";
const dbName = "DevWerkstuk"

async function getTasks(mongodb){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection("Tasks")
    const tasks = await db.find({}).toArray()
    client.close()
    return tasks
}

async function addTask(mongodb,task){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection("Tasks")
    const addedTask = await db.insertOne(task)
    client.close()
    return addedTask
}

async function getTask(mongodb,id){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection("Tasks")
    let task = await db.findOne({_id: id})
    client.close()
    return task
}

async function deleteTask(mongodb,id){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection("Tasks")
    await db.deleteOne({_id: id})
    client.close()
}

async function updateTask(mongodb,id,newTask){
    const client = await mongodb.connect(uri, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true,
    });
    const db = client.db(dbName).collection("Tasks")
    await db.updateOne({_id: id},{$set: newTask})
    client.close()
}

export{
    getTask,
    getTasks,
    addTask,
    deleteTask,
    updateTask
}