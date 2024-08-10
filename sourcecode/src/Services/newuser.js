import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function createUser(user) {
    const userdata = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        interest: user.interests,
        urls: []
    };
    const db = getFirestore(app);
    const userRef = doc(db, "userdata", user.email);
    sessionStorage.setItem("user", JSON.stringify(userdata));
    await setDoc(userRef, userdata);
}