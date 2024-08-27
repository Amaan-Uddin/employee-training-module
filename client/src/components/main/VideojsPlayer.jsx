import { useRef, useState, useEffect } from 'react'
import { Button } from '../ui/button'
import apiInstance from '@/services/ApiServices'

const CustomVideoPlayer = () => {
	const videoRef = useRef(null)
	const [currentVideoIndex, setCurrentVideoIndex] = useState(() => {
		return parseInt(localStorage.getItem('currentIndex')) || 0
	})
	const [isPlaying, setIsPlaying] = useState(false)
	const [isVideoFinished, setIsVideoFinished] = useState(false)
	const [lastPlayedTime, setLastPlayedTime] = useState(0)
	const [videos, setVideos] = useState([])
	const [count, setCount] = useState(0)
	const [total, setTotal] = useState(0)

	async function getTasks() {
		try {
			const response = await apiInstance.getTask()
			console.log(response)
			setVideos(response.task)
		} catch (error) {
			console.log(error)
		}
	}
	async function fetchCompletedTasks() {
		try {
			const response = await apiInstance.getTask()
			setTotal(response.task.length)
			setCount(response.task.filter((item) => item.completed).length)
		} catch (error) {
			console.log(error)
		}
	}
	useEffect(() => {
		getTasks()
		fetchCompletedTasks()
	}, [])

	useEffect(() => {
		const video = videoRef.current

		const handlePlay = () => setIsPlaying(true)
		const handlePause = () => setIsPlaying(false)
		const handleLoadedMetadata = () => {
			setLastPlayedTime(0)
			if (videos.length && videos[currentVideoIndex].completed) setIsVideoFinished(true)
			else setIsVideoFinished(false)
		}
		const handleEnded = async () => {
			setIsVideoFinished(true)
			if (!videos[currentVideoIndex].completed) {
				await apiInstance.updateTask({ videoIndex: currentVideoIndex })
				fetchCompletedTasks()
			}
		}

		// Prevent seeking forward
		const handleSeeking = () => {
			if (video.currentTime > lastPlayedTime) {
				video.currentTime = lastPlayedTime
			}
		}

		const handleTimeUpdate = () => {
			setLastPlayedTime(video.currentTime)
		}

		video.addEventListener('play', handlePlay)
		video.addEventListener('pause', handlePause)
		video.addEventListener('loadedmetadata', handleLoadedMetadata)
		video.addEventListener('ended', handleEnded)
		video.addEventListener('seeking', handleSeeking)
		video.addEventListener('timeupdate', handleTimeUpdate)

		return () => {
			video.removeEventListener('play', handlePlay)
			video.removeEventListener('pause', handlePause)
			video.removeEventListener('loadedmetadata', handleLoadedMetadata)
			video.removeEventListener('ended', handleEnded)
			video.removeEventListener('seeking', handleSeeking)
			video.removeEventListener('timeupdate', handleTimeUpdate)
		}
	}, [lastPlayedTime, currentVideoIndex])

	const togglePlay = () => {
		isPlaying ? videoRef.current.pause() : videoRef.current.play()
	}

	const playNextVideo = () => {
		if ((isVideoFinished || videos[currentVideoIndex].completed) && currentVideoIndex < videos.length - 1) {
			setCurrentVideoIndex(currentVideoIndex + 1)
			localStorage.setItem('currentIndex', currentVideoIndex + 1)
			setLastPlayedTime(0) // Reset for the new video
		}
	}

	const playPreviousVideo = () => {
		if (currentVideoIndex > 0) {
			setCurrentVideoIndex(currentVideoIndex - 1)
			localStorage.setItem('currentIndex', currentVideoIndex - 1)
			setIsPlaying(false)
			setLastPlayedTime(0) // Reset for the previous video
		}
	}

	return (
		<div className="customVideoPlayer container flex mt-10 gap-10">
			<div className="w-1/2 flex flex-col gap-5">
				<Button
					onClick={playPreviousVideo}
					disabled={currentVideoIndex === 0}
					className={` w-min ${currentVideoIndex ? 'bg-gray-950' : 'hidden'}`}
				>
					Previous Module
				</Button>
				{videos[currentVideoIndex] && (
					<div className="flex flex-col justify-between h-full">
						<div>
							<h1 className="font-semibold text-2xl py-2">{videos[currentVideoIndex].name}</h1>
							<p>{videos[currentVideoIndex].description}</p>
						</div>
						<div className="mb-6 self-end px-5 font-bold">
							<p>
								Completed: <span>{count}</span>/<span>{total}</span>
							</p>
						</div>
					</div>
				)}
			</div>
			<div className="w-1/2">
				<div className="playerWrapper">
					<video
						ref={videoRef}
						width="600"
						height="400"
						controls
						src={`${videos.length ? videos[currentVideoIndex].video : ''}`}
					></video>
				</div>
				<div className="flex flex-col gap-4 my-4">
					<Button
						onClick={togglePlay}
						className={`${isPlaying ? 'bg-red-500 hover:bg-red-500' : 'bg-green-500 hover:bg-green-500'}`}
					>
						{isPlaying ? 'Pause' : 'Play'}
					</Button>
					<Button
						onClick={playNextVideo}
						disabled={videos.length && !isVideoFinished && !videos[currentVideoIndex].completed}
						className={`${currentVideoIndex === 2 ? 'hidden' : 'bg-gray-950'}`}
					>
						Next Module, {videos.length ? videos[currentVideoIndex + 1]?.name : ''}
					</Button>
				</div>
			</div>
		</div>
	)
}

export default CustomVideoPlayer
