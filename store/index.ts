import { create } from 'zustand'

type LoginUser = {
  id: string | undefined
  email: string | undefined
}

type State = {
  loginUser: LoginUser
  updateLoginUser: (payload: LoginUser) => void
  resetLoginUser: () => void
}


const useStore = create<State>((set) => ({
  loginUser: { id: '', email: '' },
  updateLoginUser: (payload) =>
    set({
      loginUser: payload,
    }),
  resetLoginUser: () => set({ loginUser: { id: '', email: '' } }),
}))

export default useStore