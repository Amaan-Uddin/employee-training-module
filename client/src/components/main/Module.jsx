import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import apiInstance from '@/services/ApiServices'

function Module() {
	const [count, setCount] = useState(0)
	const [total, setTotal] = useState(0)
	useEffect(() => {
		async function fetchCompletedTasks() {
			try {
				const response = await apiInstance.getTask()
				setTotal(response.task.length)
				setCount(response.task.filter((item) => item.completed).length)
			} catch (error) {
				console.log(error)
			}
		}
		fetchCompletedTasks()
	}, [])
	return (
		<div className="flex w-full h-32 border border-1 rounded-md px-6 py-4">
			<Link
				className="flex flex-col justify-between items-center w-full text-blue-500 hover:text-blue-600"
				to={'/home/modules'}
			>
				<h1 className="self-start font-bold text-2xl ">{count ? 'Resume' : 'Start'} training module</h1>
				<div className="flex w-full justify-between font-semibold text-black">
					<div className="flex gap-2 text-lg">
						<h3>competed: </h3>
						<p>
							<span>{count}</span>/<span>{total}</span>
						</p>
					</div>
				</div>
			</Link>
		</div>
	)
}
export default Module
