import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { db, auth } from './FirebaseConfig';
import { collection,serverTimestamp, onSnapshot, where, query,addDoc, getDocs, setDoc, doc, getDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Alert,TouchableOpacity } from 'react-native';
import { useContext } from 'react';

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const registerUser = async (email, password, name, phone) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        await setDoc(doc(db, 'User', user.uid), {
            name: name || '',
            email: email || '',
            phone: phone || '',
            createdAt: new Date().toISOString(),
        });

        return user;
    } catch (error) {
        throw error;
    }
};
export const logoutUser = async () => {
    try {
        await signOut(auth);
    } catch (error) {
        throw new Error(error.message);
    }
};
export const getServices = (callback) => {
    try {
        const servicesCollection = collection(db, "Services");
        const unsubscribe = onSnapshot(servicesCollection, (snapshot) => {
            const servicesList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(servicesList);
        },
    
    );

        return unsubscribe;
    } catch (error) {
        console.error("Error fetching services in realtime:", error.message);
        throw new Error("Không thể lấy danh sách dịch vụ. Vui lòng thử lại!");
    }
};
export const addService = async (service) => {
    try {
        const servicesCollection = collection(db, "Services");
        const docRef = await addDoc(servicesCollection, {
            ...service,
            createdAt: serverTimestamp(),
        });
        return { id: docRef.id, ...service, createdAt: new Date() };
    } catch (error) {
        console.error("Error adding service:", error.message);
        throw new Error("Không thể thêm dịch vụ. Vui lòng thử lại!");
    }
};
export const deleteService = async (serviceId) => {
    try {
        const serviceRef = doc(db, "Services", serviceId);
        await deleteDoc(serviceRef);
    } catch (error) {
        console.error("Error deleting service:", error.message);
        throw new Error("Không thể xóa dịch vụ. Vui lòng thử lại!");
    }
};
export const getServiceDetail = async (serviceId) => {
    try {
        const serviceRef = doc(db, "Services", serviceId);
        const serviceSnapshot = await getDoc(serviceRef);
        if (serviceSnapshot.exists()) {
            return { id: serviceSnapshot.id, ...serviceSnapshot.data() };
        } else {
            throw new Error("Dịch vụ không tồn tại.");
        }
    } catch (error) {
        console.error("Error fetching service detail:", error.message);
        throw new Error("Không thể lấy thông tin dịch vụ. Vui lòng thử lại!");
    }
}
export const updateService = async (serviceId, updatedData) => {
    try {
        const serviceRef = doc(db, "Services", serviceId);
        await updateDoc(serviceRef, updatedData);
    } catch (error) {
        console.error("Error updating service:", error.message);
        throw new Error("Không thể cập nhật dịch vụ. Vui lòng thử lại!");
    }
}