import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Listen to auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Process the photoURL to ensure it's usable
        let photoURL = user.photoURL;

        // If it's a Google photo URL, ensure it's the right size
        if (photoURL && photoURL.includes("googleusercontent.com")) {
          photoURL = photoURL.replace("s96-c", "s400-c");
        }

        // Update or set default avatar if needed
        if (!photoURL) {
          try {
            await updateProfile(user, {
              photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${user.uid}`,
              displayName: user.displayName || user.email?.split("@")[0],
            });
            photoURL = `https://api.dicebear.com/7.x/initials/svg?seed=${user.uid}`;
          } catch (error) {
            console.error("Error updating profile:", error);
          }
        }

        // Set user state with all required information
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email?.split("@")[0],
          photoURL: photoURL,
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, userData = {}) => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Construct display name from user data if provided
      const displayName =
        userData.firstName && userData.lastName
          ? `${userData.firstName} ${userData.lastName}`
          : email.split("@")[0];

      // Set initial profile with user data
      await updateProfile(result.user, {
        displayName: displayName,
        photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${result.user.uid}`,
      });

      return result;
    } catch (error) {
      console.error("Error in signup:", error);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      // Update avatar if not set
      if (!result.user.photoURL) {
        await updateProfile(result.user, {
          photoURL: `https://api.dicebear.com/7.x/initials/svg?seed=${result.user.uid}`,
        });
      }
      return result;
    } catch (error) {
      console.error("Error in login:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      // Always update Google user's avatar to ensure it's accessible
      const googlePhotoUrl =
        result.user.photoURL?.replace("s96-c", "s400-c") || null;
      await updateProfile(result.user, {
        photoURL:
          googlePhotoUrl ||
          `https://api.dicebear.com/7.x/initials/svg?seed=${result.user.uid}`,
      });
      return result;
    } catch (error) {
      console.error("Error in Google login:", error);
      throw error;
    }
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const value = {
    user,
    signup,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
