import { Job } from "../models/job.model.js"; 

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId
    } = req.body;

    const userId = req.id;

    // Validate required fields
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    // Create new job post
    const job = await Job.create({
      title,
      description,
      requirements:requirements.split(","),
      salary:Number(salary),
      location,
      jobType,
      experienceLevel:experience,
      position,
      company:companyId,
      created_by:userId,
    });

    return res.status(201).json({
      message: "Job posted successfully",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
      success: false,
    });
  }
};

//logic to serach job throuh search bar and url also
export const getAllJobs=async(req,res)=>{
try {
    const keyword=req.query.keyword||"";
    const query={
        $or:[
            {title:{$regex:keyword,$options:"i"} },
            {description:{$regex:keyword,$options:"i"} }
        ]
    };
    const jobs=await Job.find(query).populate({
        path: "company",
   }).sort({createdAt:-1});;
    if(!jobs){
        return res.status(404).json({
            message: "No jobs found",
            success: false,
        })
    };
    return res.status(200).json({
        jobs,
        success: true,
    })
} catch (error) {
   console.log(error) ;
}
}
export const getJobById=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                success: false,
            })
        }
        return res.status(200).json({job,success:true})
    } catch (error) {
        console.log(error)
    }
}
//get jobs by admin
export const getAdminJobs=async(req,res)=>{
    try {
        const adminId=req.id;
        const jobs=await Job.find({created_by:adminId});
        if(!jobs){
            return res.status(404).json({
                message: "No jobs found",
                success: false,
            })
        };
        return res.status(200).json({
            jobs,
            success: true,
        })
    } catch (error) {
        console.log(error)
    }
}
// import { Job } from "../models/job.model.js";

// export const postJob = async (req, res) => {
//   try {
//     const {
//       title,
//       description,
//       requirements,
//       salary,
//       location,
//       jobType,
//       experience,
//       position,
//       companyId
//     } = req.body;

//     const userId = req.id;

//     if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//       return res.status(400).json({ message: "All fields are required", success: false });
//     }

//     const job = await Job.create({
//       title,
//       description,
//       requirements: requirements.split(",").map(req => req.trim()), // clean split
//       salary: Number(salary),
//       location,
//       jobType,
//       experienceLevel: Number(experience),
//       position: Number(position),
//       company: companyId,
//       createdBy: userId,
//     });

//     return res.status(201).json({ message: "Job posted successfully", job, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getAllJobs = async (req, res) => {
//   try {
//     const keyword = req.query.keyword || "";
//     const query = {
//       $or: [
//         { title: { $regex: keyword, $options: "i" } },
//         { description: { $regex: keyword, $options: "i" } }
//       ]
//     };

//     const jobs = await Job.find(query).populate({
//         path: "company",
//     }).sort({createdAt:-1});

//     if (jobs.length === 0) {
//       return res.status(404).json({ message: "No jobs found", success: false });
//     }

//     return res.status(200).json({ jobs, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getJobById = async (req, res) => {
//   try {
//     const jobId = req.params.id;
//     const job = await Job.findById(jobId);

//     if (!job) {
//       return res.status(404).json({ message: "Job not found", success: false });
//     }

//     return res.status(200).json({ job, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };

// export const getAdminJobs = async (req, res) => {
//   try {
//     const adminId = req.id;
//     const jobs = await Job.find({ createdBy: adminId });

//     if (jobs.length === 0) {
//       return res.status(404).json({ message: "No jobs found", success: false });
//     }

//     return res.status(200).json({ jobs, success: true });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "Server error", success: false });
//   }
// };
