import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function getHistory(user) {
    const db = getFirestore(app);
    const userRef = doc(db, "History", user.email);
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists) {
        const history = userDocSnap.data();
        return history;
    } else {
        console.log("No user data found for:", userEmail);
        return null; 
    }
}