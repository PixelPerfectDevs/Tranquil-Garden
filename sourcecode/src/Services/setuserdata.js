import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function setUserData(user) {
    console.log("data", user.email, user.name, user.interest);
    // console.log("Types:", typeof email, typeof name, typeof interests);

    // if (!email) {
    //     console.error("Invalid user object or email is missing.");
    //     return;
    // }
    try {
        const db = getFirestore(app);
        const userRef = doc(db, "userdata", user.email);
        const dataToUpdate = {
            name: user.name,
            interest: user.interest,
        };
        await setDoc(userRef, dataToUpdate, { merge: true });
    } catch (error) {
        console.error("Failed to set user data:", error);
    }
}