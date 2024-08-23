import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
function LandingPage() {
	return (
		<div className="flex flex-col justify-center gap-3 items-center h-screen">
			<h1 className="text-4xl mb-14">Training Module</h1>
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
