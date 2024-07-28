import { getFirestore, doc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function getUser(user) {
    const db = getFirestore(app);
    const userRef = doc(db, "userdata", user.email);
    const userDocSnap = await getDoc(userRef);
    if (userDocSnap.exists) {
        const userData = userDocSnap.data();
        sessionStorage.setItem("user", JSON.stringify(userData));
        return userData;
      } else {
        console.log("No user data found for:", userEmail);
        return null; 
      }
}