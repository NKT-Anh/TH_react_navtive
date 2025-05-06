import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth,db } from './FirebaseConfig';
import { doc, onSnapshot } from 'firebase/firestore';
export const UserContext = createContext();
export const UserProvider = ({children}) => {
    const [user,setUser] = useState();
    useEffect(()=>{
        const unsubscribeAuth = onAuthStateChanged(auth,(firebaseUser)=>{
            if(firebaseUser){
                const userRef = doc(db,"User",firebaseUser.uid);
                const unsubscribeUser = onSnapshot(userRef,(snap)=>{
                    if(snap.exists()){
                        const userData = snap.data();
                        setUser({
                            id:firebaseUser.uid,
                            phone:userData.phone || '',
                            email:userData.email || '',
                            role:userData.role || '',
                            name:userData.name || '',

                        })
                    }
                    else{
                        setUser(null);
                    }
                })
                return () => unsubscribeUser();

            }
            else{
                setUser(null);
            }
        })
        return () => unsubscribeAuth();

    },[]);
    return (
    <UserContext.Provider value = {{user,setUser}}>
        {children}
    </UserContext.Provider>
  )
}
