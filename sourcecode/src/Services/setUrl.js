import { getFirestore, doc, setDoc, updateDoc, getDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import app from "../../firebaseconfig";
export default async function setURLS(user) {
    console.log("data",  user);
    const db = getFirestore(app);
    const userRef = doc(db, "userdata", user.email);
    const userDoc = await getDoc(userRef)
    await updateDoc(userRef,{urls: user.urls})

}