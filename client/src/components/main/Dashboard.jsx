import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'
function Dashboard() {
	const { user } = useContext(UserContext)
	return <div>{JSON.stringify(user)}</div>
}
export default Dashboard
