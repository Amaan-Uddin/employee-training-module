import { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import authInstance from '@/services/AuthenticationServices'

export const UserContext = createContext()
export function UserProvider({ children }) {
	const [user, setUser] = useState({
		_id: undefined,
		name: undefined,
		email: undefined,
		loggedIn: false,
	})
	const navigate = useNavigate()
	useEffect(() => {
		async function fetchCurrentUser() {
			try {
				const response = await authInstance.getCurrentUser()
				console.log(response, 'helllo')
				setUser({ ...response, loggedIn: true })
			} catch (error) {
				console.error(error)
				navigate('/')
			}
		}
		fetchCurrentUser()
	}, [])
	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
