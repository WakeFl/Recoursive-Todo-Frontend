import { useAppSelector } from './redux'

export const useSession = () => {
  const session = useAppSelector((state) => state.userReducer.user)
  return session
}
