import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
        },
        phoneNumber:{
            type:Number,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        role:{
            type:String,
            enum:['student','recruiter'],
            required:true
        },
        profile:{
            bio:{type:String},
            skills:[{type:String}],
            resume:{type:String},//resume file url cloudniary
             resumeOriginalName:{
                type:String},
            company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },

            profilePhoto:{type:String,default:''}
            
        },
       
} ,{timestamps:true} )
export const User = mongoose.model('User', userSchema);
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   fullname: {
//     type: String,
//     required: true
//   },
//   email: {
//     type: String,
//     required: true
//   },
//   phoneNumber: {
//     type: Number,
//     required: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     enum: ['student', 'recruiter'],
//     required: true
//   },
//   profile: {
//     bio: { type: String },
//     skills: [{ type: String }],
//     // Removed resume and resumeOriginalName as requested
//     company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' }
//     // profilePhoto: { type: String, default: '' }
//   }
// }, { timestamps: true });

// export const User = mongoose.model('User', userSchema);
