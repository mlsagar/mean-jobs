const express = require("express");
const { allJobs, addJob, oneJob, fullyUpdateJob, partiallyUpdateJob, removeJob } = require("../controllers/job-controller");

const router = express.Router();

router.route("/jobs")
    .get(allJobs)
    .post(addJob)

router.route("/jobs/:jobId")
    .get(oneJob)
    .put(fullyUpdateJob)
    .patch(partiallyUpdateJob)
    .delete(removeJob)

module.exports = router;