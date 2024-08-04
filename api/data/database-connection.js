const mongoose = require("mongoose");
require("./job-model");
mongoose.connect(process.env.DATABASE_URL);

mongoose.connection.on("connected", ()=> console.log("Mongoose is connected"));
mongoose.connection.on("disconnected", ()=> console.log("Mongoose is disconnected"));
mongoose.connection.on("error", (error)=> console.log("Mongoose error", error));

process.on("SIGINT", ()=> {
    mongoose.connection.close().then(()=> {
        console.log("Process end by interruption");
        process.exit(0)
    })
})
process.on("SIGTERM", ()=> {
    mongoose.connection.close().then(()=> {
        console.log("Process end by termination");
        process.exit(0)
    })
})
process.on("SIGUSR2", ()=> {
    mongoose.connection.close().then(()=> {
        console.log("Process restarted");
        process.kill(process.pid, "SIGUSR2")
    })
})