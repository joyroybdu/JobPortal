import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


// REGISTER CONTROLLER
export const register = async (req, res) => {
  try {
    let { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res
        .status(400)
        .json({ msg: "Please enter all fields", success: false });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

// LOGIN CONTROLLER
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please enter all fields", success: false });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    // Role check
    if (user.role !== role) {
      return res.status(400).json({
        message: "Check your role",
        success: false,
      });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    const userData = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `${user.fullname}, you are welcome back`,
        success: true,
        user: userData,
      });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};

export const logout = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      error: error.message,
      success: false,
    });
  }
};



export const authMiddleware = (req, res, next) => {
  try {
    // Example: get token from headers or cookies
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided", success: false });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = { id: decoded.id };  

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized: Invalid token", success: false });
  }
};
 
export const userUpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file; 
    const userId = req.id;

    // Convert skills string to array
    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",").map(skill => skill.trim());
    }

    // Find user
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    // Update fields if provided
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.bio = bio;
    if (skillsArray) user.skills = skillsArray;

    await user.save();

    // Prepare response
    const updatedUser = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      bio: user.bio,
      skills: user.skills
    };

    return res.status(200).json({
      message: "Profile updated successfully",
      success: true,
      user: updatedUser
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
      success: false,
      error: error.message
    });
  }
};
