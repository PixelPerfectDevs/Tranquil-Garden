import app from "../../firebaseconfig";
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
export default async function SignInService() {
    const provider = new GoogleAuthProvider()
    const auth = getAuth(app)
    const result = await signInWithPopup(auth,provider)
    const user = result.user
    const credential = GoogleAuthProvider.credentialFromResult(result)
    const token = credential.accessToken
    console.log("user details",user,token) 
}
