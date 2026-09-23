import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel from "../models/userModel.js";
import cartModel from "../models/cartModel.js";
import admin from "../firebase/firebase.js";
import JWT from "jsonwebtoken";
import nodemailer from "nodemailer";

// REGISTER CONTROLLER
export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // validation
    if (!name) {
      return res.send({ message: "Name Is Required" });
    }
    if (!email) {
      return res.send({ message: "Email Is Required" });
    }
    if (!password) {
      return res.send({ message: "Password Is Required" });
    }

    // check user
    const existingUser = await userModel.findOne({ email });

    //checking existing user
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Registered please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      password: hashedPassword,
    }).save();
    // generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

// LOGIN CONTROLLER
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    // check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email Is Not Registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    // generating token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Login API",
      error,
    });
  }
};

// LOGIN WITH GOOGLE
export const googleLoginController = async (req, res) => {
  try {
    const { idToken } = req.body;

    // verify firebase token
    const googleUser = await admin.auth().verifyIdToken(idToken);

    const { email, name } = googleUser;

    let user = await userModel.findOne({ email });

    // if new user -> create

    if (!user) {
      user = await userModel.create({
        name,
        email,
        password: "GOOGLE_LOGIN",
        loginType: "google",
      });
    }

    // generate jwt token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "google login success",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Google login failed",
    });
  }
};

// LOGIN WITH FACEBOOK
export const facebookLoginController = async (req, res) => {
  try {
    const { idToken } = req.body;

    // verify firebase token
    const fbUser = await admin.auth().verifyIdToken(idToken);

    const { email, name, uid } = fbUser;
    // 💥 Facebook often does NOT return email → so generate one
    const finalEmail = email || `${uid}@gmail.com`;

    let user = await userModel.findOne({ email: finalEmail });
    if (!user) {
      user = await userModel.create({
        name,
        email: finalEmail,
        password: "FACEBOOK_LOGIN",
        loginType: "facebook",
      });
    }

    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });
    return res.status(200).send({
      success: true,
      message: "Facebook login successful",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({ success: false, message: "Facebook Login Failed" });
  }
};

// UPDATE USER PROFILE
export const updateProfileController = async (req, res) => {
  try {
    const { name, phone, gender, dateOfBirth } = req.body;
    // const user = await userModel.findById(req.user._id);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        name: name || user.name,
        phone: phone || user.phone,
        gender: gender || user.gender,
        date_of_birth: dateOfBirth || user.date_of_birth,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Profile Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Profile",
      error,
    });
  }
};

// update user address
export const updateAddressController = async (req, res) => {
  try {
    const { address } = req.body;
    console.log(address);

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user._id,
      {
        address,
      },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Address Updated Successfully",
      updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error While Updating Address",
      error,
    });
  }
};

// delete user account & its related data
export const deleteUserAccountController = async (req, res) => {
  try {
    const { _id } = req.user;

    // Delete related collections if needed (cart, orders)
    await cartModel.deleteMany({ user: _id });
    await userModel.findByIdAndDelete(_id);
    res.status(200).send({
      success: true,
      message: "User Account Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error While Deleting User Account ",
      error,
    });
  }
};

// update password
export const updatePasswordController = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      return res.status(200).send({
        success: false,
        message: "Both Old And New Passwords Are Required",
      });
    }

    // if (newPassword.length < 6) {
    //   return res.status(200).send({ success: false,message: "New password must be at least 6 characters long" });
    // }
    const user = await userModel.findById(req.user._id);

    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid Previous Password",
      });
    } else {
      const hashedPassword = await hashPassword(newPassword);
      await userModel.findByIdAndUpdate(req.user._id, {
        password: hashedPassword,
      });
      res
        .status(200)
        .send({ success: true, message: "Password Updated Successfully" });
    }
  } catch (error) {
    return res
      .status(400)
      .send({ success: false, message: "Error While Changing Password" });
  }
};

// forgot password controller
export const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    res.status(400).send({ message: "Please Provide Email" });
  }

  try {
    // check
    const user = await userModel.findOne({ email });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found ",
      });
    }

    // generate token (valid for 15 minutes)
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "15m",
    });
    user.resetToken = token;
    console.log("forgot password called with token", token);
    await user.save();

    // Configure transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    // Compose email
    const reciever = {
      from: "maheshwariharesh060@gmail.com",
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello ${user.name},</p>
        <p>You requested to reset your password. Click below to reset it:</p>
        <a href="${process.env.CLIENT_URL}/reset-password/${token}" 
          style="background:#0d6efd;color:white;padding:10px 15px;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>
        <p>This link will expire in 15 minutes.</p>
      `,
    };
    await transporter.sendMail(reciever);
    return res.status(200).send({
      success: true,
      message: "Password reset link sent to your email!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

// reset password controller
export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  if (!password) {
    return res
      .status(400)
      .send({ success: false, message: "Please provide password" });
  }

  console.log("reset password called", token, password);

  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const user = await userModel.findById(decoded._id);
    // console.log('user found in reset password ', user);

    if (!user || user.resetToken !== token) {
      return res
        .status(400)
        .send({ success: false, message: "Invalid or expired token" });
    }
    const hashedPassword = await hashPassword(password);

    user.password = hashedPassword;
    user.resetToken = "";
    await user.save();
    return res
      .status(200)
      .send({ success: true, message: "Password Updated Successfully" });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: "Error While Updating Password" });
  }
};
