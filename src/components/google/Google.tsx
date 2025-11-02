import { signinSuccess } from '@/app/redux/feature/userSlice';
import { BASE_URL } from '@/constant/Constant';
import { app } from '@/firebase';
import { GoogleAuthProvider,getAuth, signInWithPopup } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import { useDispatch } from 'react-redux';

const Google = () => {
  const dispatch = useDispatch()
  const navigate = useRouter()
  const handleGoogleSignin = async () => {
      try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        const res =await fetch(`${BASE_URL}/api/google`, {
          method: "POST",
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify({name:result.user.displayName,email:result.user.email, image:result.user.photoURL})
        })
        const data = await res.json()
        dispatch(signinSuccess(data))
        navigate.push('/')
        console.log(result,'resullt-----------')
      } catch (error) {
        
        console.log("Can't login with google",error);
      }
  };

  return (
    <button
      type='button'
      onClick={handleGoogleSignin}
      className="flex cursor-pointer items-center justify-center gap-2 w-full border border-gray-300 rounded-lg py-2 hover:bg-gray-50 transition duration-200"
        >
          <FcGoogle className="text-2xl" />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>
  )
}

export default Google