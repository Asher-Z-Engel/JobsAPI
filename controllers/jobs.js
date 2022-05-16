const Job = require('../models/Job')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getAllJobs = async (req, res) => {
  const { userId } = req.user
  const jobs = await Job.find({createdBy: userId})
  res.status(StatusCodes.OK).json({success: true, jobs, total: jobs.length})
}

const getJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req
  const job = await Job.findOne({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError('Resource not found')
  }
  res.status(StatusCodes.OK).json({success: true, job})
}

const createJob = async (req, res) => {
  const { company, position, status } = req.body
  if (!company || !position) {
    throw new BadRequestError('Company and position are required')
  }
  const job = await Job.create({
    company,
    position,
    status,
    createdBy: req.user.userId
  })
  res.status(StatusCodes.CREATED).json({success: true, job})
}

const updateJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
    body: {company, position, status}
  } = req
  if (!company || !position) {
    throw new BadRequestError('Company and position are required')
  }
  const job = await Job.findOneAndUpdate({ _id: jobId, createdBy: userId },
    { company, position, status }, {runValidators: true, new: true})
  if (!job) {
    throw new NotFoundError('Resource not found')
  }
  res.status(StatusCodes.OK).json({success: true, job})
}

const deleteJob = async (req, res) => {
  const { user: { userId }, params: { id: jobId } } = req
  const job = await Job.findOneAndDelete({ _id: jobId, createdBy: userId })
  if (!job) {
    throw new NotFoundError('Resource not found')
  }
  res.status(StatusCodes.OK).json({success: true, job})
}

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}