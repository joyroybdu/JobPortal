import { application } from "express";
import mongoose from "mongoose";
const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: {
      type:[String],
    },

    salary: {
      type: Number,
      required: true,
    },
    experienceLevel: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId, //relation between company and users
      ref: "Company",
      required: true,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId, //create relation with user
      ref: "User",
      required: true,
    },
    application: {
      type: mongoose.Schema.Types.ObjectId, //create relation with application
      ref: "Application",
    },
  },
  { timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);
export default Job;
