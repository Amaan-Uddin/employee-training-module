import Dashboard from './Dashboard'
import Module from './Module'

function Home() {
	return (
		<div className="flex h-screen justify-between mt-28 gap-8 mx-52">
			<Module />
			<Dashboard />
		</div>
	)
}
export default Home
