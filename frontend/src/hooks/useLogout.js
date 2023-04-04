import { useAuthContext } from './useAuthcontext'
import { useWorkoutsContext } from './useWorkoutsContext'
export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: workoutsDispatch } = useAuthContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    workoutsDispatch({ type: 'SET_WORKOUTS', payload: null })
  }

  return { logout }
}