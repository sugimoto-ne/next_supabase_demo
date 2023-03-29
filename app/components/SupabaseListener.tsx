'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import supabase from '../../utils/supabase'
import useStore from '../../store'

export const SupabaseListener = ({
  serverAccessToken,
}: {
  serverAccessToken?: string
}) => {
  const router = useRouter()
  const { updateLoginUser } = useStore()
  useEffect(() => {
    const setUser = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) return

      updateLoginUser({
        id: data.session?.user.id,
        email: data.session?.user.email!,
      })
    }
    setUser()
    supabase.auth.onAuthStateChange((_, session) => {
      updateLoginUser({ id: session?.user.id, email: session?.user.email })
      if (session?.access_token !== serverAccessToken) {
        router.refresh()
      }
    })
  }, [serverAccessToken])
  return null
}