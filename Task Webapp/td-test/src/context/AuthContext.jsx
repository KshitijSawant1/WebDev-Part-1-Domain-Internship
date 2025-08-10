import { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "../supabaseClient";

const AuthContext = createContext();
export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);

  //Sign Up new user
  const signupNewUser = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      console.log("Error : Problem Sign Up User | ", error);
      return { success: false, error };
    }
    return { success: true, data };
  };

  // Sign in User
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        console.log("Error : Problem Sign In User | ", error);
        return { success: false, error: error.message };
      }
      console.log("Sign In User Success | ", data);
      return { success: true, data };
    } catch (error) {
      console.log("Error : Problem Sign In User | ", error);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  //Sign Out
  const signOut = () => {
    const { error } = supabase.auth.signOut();
    if (error) {
      console.log("Error : Problem Sign Out User | ", error);
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider
      value={{ session, signupNewUser, signInUser, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
