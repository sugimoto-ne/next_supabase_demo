'use client'
import { useState, FormEvent, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import useStore from '../../store'
import supabase from '../../utils/supabase'
import { toast } from 'react-toastify';

export const AuthForm = () => {
  const [show, setShow] = useState(false)

  const { loginUser } = useStore()
  const [isLogin, setIsLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const router = useRouter()

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      if (error) {
        toast.error(error.message)
      } else {
        toast.success("success login")
        router.push('/dashboard')
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      })
      setEmail('')
      setPassword('')
      
      if (error) {
        toast.success("success login")
        router.push('/dashboard')
        toast.error(error.message)
      } 
    }
  }

  return (
    <>
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">{isLogin ? "Sign in" :"Sign Up"}</h2>
      <p className="text-center text-sm text-gray-600 mt-4"><span className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer" onClick={() => setIsLogin(!isLogin)}> {isLogin ? "Sign up here" :"Sign in here"}</span></p>

      <form onSubmit={handleSubmit} className="my-8 text-sm">
        <div className="flex flex-col my-4">
          <label htmlFor="email" className="text-gray-700">Email Address</label>
          <input 
          value={email}
          onChange={(e) => {
            setEmail(e.target.value)
          }}
          type="email" name="email" id="email" className="mt-2 p-2 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your email" />
        </div>

        <div className="flex flex-col my-4">
          <label htmlFor="password" className="text-gray-700">Password</label>
          <div className="relative flex items-center mt-2">
            <input
             value={password}
             onChange={(e) => {
               setPassword(e.target.value)
             }}
            type={show ? 'text' : 'password'} name="password" id="password" className="flex-1 p-2 pr-10 border border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-300 rounded text-sm text-gray-900" placeholder="Enter your password again" />
            <button onClick={() => setShow((prev) => !prev)} type="button" className="absolute right-2 bg-transparent flex items-center justify-center text-gray-700">
              <svg x-show="!show" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>

              <svg x-show="show" className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ display: "none" }}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
            </button>
          </div>
        </div>

        <div className="my-4 flex items-center justify-end space-x-4">
          <button type='submit' className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase">Sign Up</button>
        </div>

      </form >
    </>
  )
}
