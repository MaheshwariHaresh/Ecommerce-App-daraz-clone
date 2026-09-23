import { Router } from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  registerController,
  loginController,
  googleLoginController,
  facebookLoginController,
  forgotPasswordController,
  resetPasswordController,
  updatePasswordController,
  updateProfileController,
  deleteUserAccountController,
  updateAddressController,
} from "../controllers/authController.js";

const router = Router();

// REGISTER  || METHOD POST
router.post("/register", registerController);

// LOGIN  || METHOD POST
router.post("/login", loginController);

// SOCIAL LOGIN
router.post("/google-login", googleLoginController);
router.post("/facebook-login", facebookLoginController);

// FORGOT PASSWORD  || METHOD POST
router.post("/forgot-password", forgotPasswordController);

// RESET PASSWORD  || METHOD POST
router.post("/reset-password", resetPasswordController);

// PROTECTED  || METHOD GET
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// PROTECTED ROUTE FOR ADMIN || METHOD GET
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

// UPDATE USER PROFILE
router.put("/profile", requireSignIn, updateProfileController);

// UPDATE USER ADDRESS
router.put("/update-address", requireSignIn, updateAddressController);

// UPDATE PASSWORD
router.put("/change-password", requireSignIn, updatePasswordController);

// DELETE USER ACCOUNT
router.delete("/delete-account", requireSignIn, deleteUserAccountController);

export default router;
