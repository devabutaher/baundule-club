import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth'
import app from '../firebase/firebase.config';
import { useQuery } from 'react-query';
import axios from 'axios';

export const AuthContext = createContext(null);
const auth = getAuth(app);

const UserContext = ({ children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const login = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password);
    }

    const googleProvider = new GoogleAuthProvider();

    const googleSignIn = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    const logOut = () => {
        return signOut(auth).then(() => {
            setUser("")
            setLoading(true)
        }).catch((error) => {

        });
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setLoading(false)
            setUser(currentUser);
        });
        return () => {
            return unsubscribe();
        }

    }, [])


    const { data: tour, isLoading: tourloading } = useQuery("tour", async () => {
        const response = await axios.get("http://localhost:5000/tour");
        return response.data;
    });
    
    const authInfo = {
        user,
        updateUser,
        loading,
        createUser,
        login,
        logOut,
        googleSignIn,
        auth,
        tour,
        tourloading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>

    );
};

export default UserContext;