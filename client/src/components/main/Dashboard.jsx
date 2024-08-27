import { UserContext } from '@/context/UserContext'
import { useContext, useEffect, useState } from 'react'
import { Button } from '../ui/button'
import PieChart from '../utils/PieChart'
import apiInstance from '@/services/ApiServices'
import authInstance from '@/services/AuthenticationServices'
import { useNavigate } from 'react-router-dom'

function Dashboard() {
	const { user } = useContext(UserContext)
	const [timeCompleted, setTimeCompleted] = useState(0)
	const navigate = useNavigate()

	useEffect(() => {
		async function fetchTime() {
			try {
				const response = await apiInstance.getTask()
				const total = response.task.reduce((time, item) => {
					if (item.completed) return time + item.time
				}, 0)
				console.log(total)
				setTimeCompleted(total || 0)
			} catch (error) {
				console.log(error)
			}
		}
		fetchTime()
	}, [])

	async function logout() {
		try {
			const response = await authInstance.logout()
			console.log(response)
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div className="w-96 border border-1 rounded-md h-72 px-4 py-3 flex flex-col justify-between">
			<div className="h-32 w-full border border-1 rounded-md flex justify-center p-4">
				<PieChart completedSeconds={timeCompleted} />
			</div>
			<div className="p-2 flex flex-col gap-1 items-start text-xl">
				<p className="font-semibold text-black">{user.name}</p>
				<p className="font-light text-gray-500">{user.email}</p>
			</div>
			<Button
				onClick={() => {
					logout()
				}}
				className="hover:bg-red-500"
			>
				Logout
			</Button>
		</div>
	)
}
export default Dashboard
