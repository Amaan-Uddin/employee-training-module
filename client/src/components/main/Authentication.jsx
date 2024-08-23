import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import ErrorMessage from '../utils/ErrorMessage'
import authInstance from '@/services/AuthenticationServices'

function Authentication({ authType }) {
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		clearErrors,
	} = useForm()

	const { setUser } = useContext(UserContext)
	const navigate = useNavigate()
	async function authenticateUser(data) {
		try {
			console.log(data)
			const response = authType == 'signup' ? await authInstance.signup(data) : await authInstance.login(data)
			console.log(response)
			setUser({ ...response.user, loggedIn: true })
			navigate('/home')
		} catch (error) {
			console.error(error)
			if (error.field) {
				setError(error.field, { type: 'manual', message: error.message })
			} else {
				setError('server', { type: 'server', message: error.message })
			}
		}
	}

	return (
		<div className="container">
			<form
				onSubmit={handleSubmit(authenticateUser)}
				className="flex flex-col gap-3 md:w-1/2 sm:w-3/4 mx-auto h-screen justify-center"
			>
				<h1 className="text-4xl text-center">{authType}</h1>
				{errors.server && (
					<div className="p-2 bg-red-200">
						<ErrorMessage>{errors.server.message}</ErrorMessage>
					</div>
				)}
				{authType == 'signup' ? (
					<div>
						<Input
							{...register('name', {
								required: 'Name is required.',
								onChange: () => clearErrors('server'),
							})}
							placeholder="Enter your name"
							label="Name"
						/>
						{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
					</div>
				) : null}
				<div>
					<Input
						{...register('email', {
							required: 'Email is required.',
							onChange: () => clearErrors('server'),
						})}
						type="email"
						placeholder="Enter your email"
						label="Email"
					/>
					{errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
				</div>
				<div>
					<Input
						{...register('password', {
							required: 'Password is required.',
							onChange: () => clearErrors('server'),
						})}
						type="password"
						placeholder="Enter a password"
						label="Password"
					/>
					{errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
				</div>
				<Button>{authType == 'signup' ? 'Sign up' : 'Login'}</Button>
			</form>
		</div>
	)
}
export default Authentication
