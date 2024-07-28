import { getFirestore, doc, setDoc } from "firebase/firestore";
async function createUser(user) {
    const userdata = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL
    };
    const db = getFirestore(app);
    const userRef = doc(db, "userdata", user.email);
    await setDoc(userRef, userdata);
}