import { Doughnut } from 'react-chartjs-2'
import { useEffect, useState } from 'react'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import apiInstance from '@/services/ApiServices'

// Register required components
ChartJS.register(ArcElement, Tooltip)

function PieChart({ completedSeconds }) {
	const [totalTime, setTotalTime] = useState(0)
	useEffect(() => {
		async function fetchTime() {
			try {
				const response = await apiInstance.getTask()
				const total = response.task.reduce((time, item) => {
					return time + item.time
				}, 0)
				setTotalTime(total)
			} catch (error) {
				console.log(error)
			}
		}
		fetchTime()
	}, [])
	const completedPercentage = (completedSeconds / totalTime) * 100
	const remainingPercentage = 100 - completedPercentage

	const data = {
		datasets: [
			{
				data: [completedPercentage, remainingPercentage],
				backgroundColor: ['#4CAF50', '#D3D3D3'],
				borderWidth: 0, // Remove the border
				cutout: '70%', // Creates the ring effect
			},
		],
	}

	const options = {
		plugins: {
			legend: {
				display: false, // Hide the legend
			},
			tooltip: {
				enabled: true, // Enable tooltips if needed
			},
		},
	}

	return <Doughnut data={data} options={options} />
}

export default PieChart
