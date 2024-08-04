const mongoose = require("mongoose");

const Job = mongoose.model("Job");

const allJobs = function(request, response) {
    let count = 5;
    let offset = 0;
    const maxCount = 10;

    if(request.query && request.query.offset) {
        offset = parseInt(request.query.offset, 10);
    }
    if(request.query && request.query.count) {
        count = parseInt(request.query.count, 10);
    }
    if(isNaN(count) || isNaN(offset)) {
        response.status(401).json({message: "Invalid count or offset"});
        return;
    }
    if(count > maxCount) {
        response.status(401).json({message: "Count should be less or equal to", maxCount});
        return;
    }

    const responseCollection = _createResponseCollection();

    Job.find().skip(offset).limit(count).exec().then(jobs => {
        if(!jobs) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Jobs not found"};
            return;
        }

        responseCollection.status = 200;
        responseCollection.message = jobs;
    }, (error) => {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(()=> {
        _sendReponse(response, responseCollection);
    })
    
}

const addJob = function(request, response) {
    const newJob = {
        title: request.body.title,
        salary: request.body.salary,
        location: request.body.location,
        description: request.body.description,
        experience: request.body.experience,
        skills: []
    }

    const responseCollection = _createResponseCollection();

    Job.create(newJob).then((response)=> {
        console.log("create job");
        if(!response) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Not able to create job"}
            return
        }

        responseCollection.status = 200,
        responseCollection.message = {message: "Job posted successfully"}
    }).catch((error)=> {
        responseCollection.status = 500;
        responseCollection.message = error
    }).finally(() => {
        _sendReponse(response, responseCollection);
    })
}

const oneJob = function(request, response) {
    const jobId = request.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        response.status(401).json({message: "Invalid Job ID"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Job.findById(jobId).exec().then(job => {
        if (!job) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Job ID not found"}
            return
        }

        responseCollection.status = 200;
        responseCollection.message = job;
    }, (error) => {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(() => {
        _sendReponse(response, responseCollection);
    })
}

const fullyUpdateJob = function(request, response) {
    const jobId = request.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        response.status(401).json({message: "Invalid Job ID"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Job.findById(jobId).exec().then(job => {
        if (!job) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Job ID not found"}
            return
        }

        job.title = request.body.title;
        job.salary = request.body.salary;
        job.location = request.body.location;
        job.description = request.body.description;
        job.experience = request.body.experience;
        job.skills = request.body.skills;

        return job.save();
    }).then(savedJob => {
        if(savedJob){
            responseCollection.status = 200;
            responseCollection.message = {message: "Job fully updated successfully"}
        }
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(() => {
        _sendReponse(response, responseCollection);
    })
}

const partiallyUpdateJob = function(request, response) {
    const jobId = request.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        response.status(401).json({message: "Invalid Job ID"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Job.findById(jobId).exec().then(job => {
        if (!job) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Job ID not found"}
            return
        }

        if (request.body && request.body.title) {job.title = request.body.title};
        if (request.body && request.body.salary) {job.salary = request.body.salary};
        if (request.body && request.body.location) {job.location = request.body.location};
        if (request.body && request.body.description) {job.description = request.body.description};
        if (request.body && request.body.experience) {job.experience = request.body.experience};
        if (request.body && request.body.skills) {job.skills = request.body.skills};

        return job.save();
    }).then(savedJob => {
        if(savedJob){
            responseCollection.status = 200;
            responseCollection.message = {message: "Job partially updated successfully"}
        }
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(() => {
        _sendReponse(response, responseCollection);
    })
}


const removeJob = function(request, response) {
    const jobId = request.params.jobId;

    if (!mongoose.isValidObjectId(jobId)) {
        response.status(401).json({message: "Invalid Job ID"});
        return;
    }

    const responseCollection = _createResponseCollection();

    Job.findByIdAndDelete(jobId).exec().then(response => {
        if (!response) {
            responseCollection.status = 404;
            responseCollection.message = {message: "Job ID not found"}
            return
        }

        responseCollection.status = 200;
        responseCollection.message = {message: "Job Post Deleted Successfully"}
    }).catch(error => {
        responseCollection.status = 500;
        responseCollection.message = error;
    }).finally(() => {
        _sendReponse(response, responseCollection);
    })
}

const _createResponseCollection = function(){
    return {
        status: 201,
        message: ""
    }
}

const _sendReponse = function(response, responseCollection) {
    response.status(responseCollection.status).json(responseCollection.message);
}

module.exports = {
    allJobs,
    addJob,
    oneJob,
    fullyUpdateJob,
    partiallyUpdateJob,
    removeJob
}