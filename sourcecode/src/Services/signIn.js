import app from "../../firebaseconfig";
import {getAuth, signInWithPopup, GoogleAuthProvider, getAdditionalUserInfo} from "firebase/auth";
export default async function SignInService() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth,provider)
    const user = result.user
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    const additionalUserInfo = getAdditionalUserInfo(result);
    const isNewUser = additionalUserInfo.isNewUser;
    console.log("user details",user,token)
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("photo", user.photoURL);
    return isNewUser; 
}