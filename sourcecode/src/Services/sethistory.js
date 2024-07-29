import { getFirestore, doc, setDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function setHistory(history, date, user) {
    // console.log("data", history, date, user);
    const db = getFirestore(app);
    const userRef = doc(db, "History", user.email);
    const dataToUpdate = {
        [date]: Array.isArray(history) ? history : [history]
    };
    await setDoc(userRef, dataToUpdate, { merge: true });
}