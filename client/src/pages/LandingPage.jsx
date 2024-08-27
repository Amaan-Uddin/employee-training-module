import { Button } from '@/components/ui/button'
import { UserContext } from '@/context/UserContext'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function LandingPage() {
	const navigate = useNavigate()
	const { user } = useContext(UserContext)
	if (user.loggedIn) navigate('/home')
	return (
		<div className="flex flex-col justify-center gap-3 items-center h-screen">
			<h1 className="text-4xl mb-14">Lizmotors Assignment</h1>
			<Link to={'/signup'} className="w-1/4">
				<Button className={'w-full hover:bg-sky-600'}>Sign up</Button>
			</Link>
			<Link to={'/login'} className="w-1/4">
				<Button className={'w-full hover:bg-green-500'}>Login</Button>
			</Link>
		</div>
	)
}
export default LandingPage
