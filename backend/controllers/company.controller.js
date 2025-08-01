import { Company } from "../models/company.model.js"; 


export const registerCompany = async (req, res) => {
  try {
    const { companyName, description } = req.body;

    if (!companyName || !description) {
      return res.status(400).json({ message: "Company name and description are required", success: false });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({ message: "Company already exists", success: false });
    }

    company = await Company.create({
      name: companyName,
      description,
      userId: req.id
    });

    return res.status(201).json({ message: "Company created successfully", company, success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server error", success: false });
  }
};

 export const getCompany=async(req,res)=>{
try {
    const userId=req.id;
    const companies=await Company.find({userId});
  if (!companies || companies.length === 0) {
  return res.status(404).json({ message: "Companies not found", success: false });
}
return res.status(200).json({ companies, success: true });

} catch (error) {
    console.log(error);
}
 }
 export const getCompanyById=async (req,res)=>{
    try {
        const companyId=req.params.id;
        const company=await Company.findById(companyId);
        if(!company){
            return res.status(404).json({ message: "Company not found", company, success:false})

        }
        return res.status(200).json({ company, success: true });
    } catch (error) {
        console.log(error);
    }
 }
 export const updateCompany=async (req,res)=>{
    try {
        const {name,description,website,location}=req.body;
        const file=req.file;
        //cloudnary
        const updateData={name,description,website,location};
        const company=await Company.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!company){
            return res.status(404).json({ message: "Company not found", company, success:false})
        }
        return res.status(200).json({message:"Comapny information updated", company, success: true });
        
    }catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Server error", success: false });
}

 }