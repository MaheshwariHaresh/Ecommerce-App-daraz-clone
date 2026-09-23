import axios from "../Utils/AxiosConfig";
import { signInWithPopup } from "firebase/auth";
import {
  socialAuth,
  googleProvider,
  facebookProvider,
} from "../../firebase/firebase";
import { toast } from "react-toastify";

// handle social authentication
export const SocialAuthHandler = async ({
  providerType,
  type,
  setLoading,
  setAuth,
  navigate,
}) => {
  try {
    setLoading((prev) => ({ ...prev, social: true }));
    const provider =
      providerType === "google" ? googleProvider : facebookProvider;

    const { user } = await signInWithPopup(socialAuth, provider);
    const idToken = await user.getIdToken();

    const endPoint =
      providerType === "google" ? "google-login" : "facebook-login";

    const { data } = await axios.post(
      `${process.env.REACT_APP_API}/api/v1/auth/${endPoint}`,
      { idToken }
    );
    if (data?.success) {
      setAuth({ user: data.user, token: data.token });

      localStorage.setItem("auth", JSON.stringify(data));
      toast.success(
        `${
          providerType.charAt(0).toUpperCase() + providerType.slice(1)
        }  ${type} Successful`
      );
      navigate("/");
    }
  } catch (error) {
    console.log(error);
    toast.error(
      `${
        providerType.charAt(0).toUpperCase() + providerType.slice(1)
      } ${type} Failed`
    );
  } finally {
    setLoading((prev) => ({ ...prev, social: false }));
  }
};
