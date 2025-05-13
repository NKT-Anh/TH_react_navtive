import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updatePassword } from 'firebase/auth';
import { db, auth } from './FirebaseConfig';
import { collection,serverTimestamp, onSnapshot, where, query,addDoc, getDocs, setDoc, doc, getDoc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Alert,TouchableOpacity } from 'react-native';
import { useContext } from 'react';

export const loginUser = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        const userDoc = await getDoc(doc(db, 'User', user.uid));
        if (userDoc.exists()) {
            return { ...userDoc.data(), uid: user.uid };
        } else {
            throw new Error('Không tìm thấy thông tin người dùng!');
        }
    } catch (error) {
        // Xử lý các mã lỗi cụ thể từ Firebase
        switch (error.code) {
            case 'auth/invalid-email':
                throw new Error('Email không hợp lệ');
            case 'auth/user-disabled':
                throw new Error('Tài khoản đã bị vô hiệu hóa');
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                throw new Error('Email hoặc mật khẩu không chính xác');
            case 'auth/too-many-requests':
                throw new Error('Quá nhiều lần đăng nhập thất bại. Vui lòng thử lại sau');
            default:
                throw new Error('Email hoặc mật khẩu không chính xác');
        }
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
            role: 'user',
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
export const deleteUser = async (userId) => {
    try {
        const userRef = doc(db, "User", userId);
        await deleteDoc(userRef);
    } catch (error) {
        console.error("Error deleting user:", error.message);
        throw new Error("Không thể xóa người dùng. Vui lòng thử lại!");
    }
}

// Customer Profile Management
export const updateProfile = async (userId, updatedData) => {
    try {
        const userRef = doc(db, "User", userId);
        await updateDoc(userRef, {
            ...updatedData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating profile:", error.message);
        throw new Error("Không thể cập nhật thông tin cá nhân. Vui lòng thử lại!");
    }
};

export const changePassword = async (newPassword) => {
    try {
        const user = auth.currentUser;
        if (user) {
            await updatePassword(user, newPassword);
        } else {
            throw new Error("Không tìm thấy người dùng đang đăng nhập");
        }
    } catch (error) {
        console.error("Error changing password:", error.message);
        throw new Error("Không thể thay đổi mật khẩu. Vui lòng thử lại!");
    }
};

// Appointments Management
export const createAppointment = async (appointmentData) => {
    try {
        const appointmentsCollection = collection(db, "Appointments");
        const docRef = await addDoc(appointmentsCollection, {
            ...appointmentData,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return { id: docRef.id, ...appointmentData };
    } catch (error) {
        console.error("Error creating appointment:", error.message);
        throw new Error("Không thể tạo lịch hẹn. Vui lòng thử lại!");
    }
};

export const getAppointments = (userId, callback) => {
    try {
        const appointmentsCollection = collection(db, "Appointments");
        let q;
        
        if (userId) {
            q = query(appointmentsCollection, where("userId", "==", userId));
        } else {
            q = query(appointmentsCollection);
        }
        
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const appointmentsList = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            callback(appointmentsList);
        });

        return unsubscribe;
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        throw new Error("Không thể lấy danh sách lịch hẹn. Vui lòng thử lại!");
    }
};

export const updateAppointment = async (appointmentId, updatedData) => {
    try {
        const appointmentRef = doc(db, "Appointments", appointmentId);
        await updateDoc(appointmentRef, {
            ...updatedData,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error("Error updating appointment:", error.message);
        throw new Error("Không thể cập nhật lịch hẹn. Vui lòng thử lại!");
    }
};

export const deleteAppointment = async (appointmentId) => {
    try {
        const appointmentRef = doc(db, "Appointments", appointmentId);
        await deleteDoc(appointmentRef);
    } catch (error) {
        console.error("Error deleting appointment:", error.message);
        throw new Error("Không thể xóa lịch hẹn. Vui lòng thử lại!");
    }
};

// Service Search
export const searchServicesByName = async (searchTerm) => {
    try {
        const servicesCollection = collection(db, "Services");
        const q = query(
            servicesCollection,
            where("name", ">=", searchTerm),
            where("name", "<=", searchTerm + '\uf8ff')
        );
        
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
    } catch (error) {
        console.error("Error searching services:", error.message);
        throw new Error("Không thể tìm kiếm dịch vụ. Vui lòng thử lại!");
    }
};

export const getCurrentUser = async () => {
    try {
        const user = auth.currentUser;
        if (!user) {
            throw new Error('Không tìm thấy người dùng');
        }

        const userDoc = await getDoc(doc(db, 'User', user.uid));
        if (!userDoc.exists()) {
            throw new Error('Không tìm thấy thông tin người dùng');
        }

        return {
            id: user.uid,
            email: user.email,
            ...userDoc.data()
        };
    } catch (error) {
        console.error('Error getting current user:', error);
        throw error;
    }
};

export const getUsers = async () => {
    try {
        const usersSnapshot = await getDocs(collection(db, 'User'));
        const users = [];
        usersSnapshot.forEach((doc) => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return users;
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
};