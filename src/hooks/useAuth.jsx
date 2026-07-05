import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { setPersistence, browserLocalPersistence, browserSessionPersistence } from "firebase/auth";
import { signOut } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [authloading, setAuthLoading] = useState(true);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const triggerError = (message) => {
    setError(message);
    setShowErrorAlert(false);
    setTimeout(() => setShowErrorAlert(true), 100);
  };

  const handleLogin = async (form, rememberMe) => {
  setIsLoading(true);
  try {
   
    await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
    await signInWithEmailAndPassword(auth, form.email, form.password);
    navigate("/entertainment");
  } catch (error) {
  console.log("Firebase login error:", error.code);
  triggerError("Your email or password is incorrect.");
}
finally {
    setIsLoading(false);
  };
}


  const handleSignup = async (form) => {
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth, form.email, form.password
      );
      await updateProfile(userCredential.user, {
        displayName: form.fullName
      });
      navigate("/blog");
    } catch (error) {
      triggerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
  setIsLoading(true);
  try {
    await signOut(auth);
    navigate("/login");
  } catch (error) {
    triggerError(error.message);
  } finally {
    setIsLoading(false);
  }
};


  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/blog");
    } catch (error) {
      triggerError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e, form, isSignUp) => {
    e.preventDefault();
    if (isSignUp) {
      handleSignup(form);
    } else {
      handleLogin(form);
    }
  };

  return {
    user,
    authloading,
    error,
    isLoading,
    showErrorAlert,
    setShowErrorAlert,
    handleSubmit,
    handleGoogleLogin,
    handleLogout,
  };
};


export default useAuth;