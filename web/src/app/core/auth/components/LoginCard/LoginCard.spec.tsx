import { build, perBuild } from '@jackfranklin/test-data-bot'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { AuthContext, AuthContextValue } from '../../contexts/AuthContext'

import LoginCard from './LoginCard'

const buildLoginProvider = build<AuthContextValue['login']>({
	fields: {
		withEmail: jest.fn(),
		withGoogle: jest.fn(),
		withTwitter: jest.fn(),
	},
})

const buildAuthContext = build<AuthContextValue>({
	fields: {
		isAuthenticated: false,
		logout: jest.fn(),
		onAuthChanged: jest.fn(),
		signup: { withEmail: jest.fn() },
		user: null,
		login: perBuild(() => buildLoginProvider()),
	},
})

describe('Login card', () => {
	it('should display a blank form by default', () => {
		render(
			<MemoryRouter>
				<LoginCard />
			</MemoryRouter>
		)

		const emailField = screen.getByLabelText(/email/i)
		expect(emailField).toHaveValue('')

		const passwordField = screen.getByLabelText(/password/i)
		expect(passwordField).toHaveValue('')

		const signInButton = screen.getByRole('button', { name: /sign in/i })
		expect(signInButton).not.toBeEnabled()
	})

	it('navigate to the sign up page', async () => {
		render(
			<MemoryRouter>
				<LoginCard />
			</MemoryRouter>
		)

		const signUpButton = screen.getByRole('button', { name: /sign up/i, exact: false })
		await userEvent.click(signUpButton)

		expect(screen.getByText(/sign up/i)).toBeInTheDocument()
	})

	describe('login with email', () => {
		it('should login successfully', async () => {
			const loginWithEmail = jest.fn()
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withEmail: loginWithEmail } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const emailField = screen.getByLabelText(/email/i)
			await userEvent.type(emailField, 'test@test.com')

			const passwordField = screen.getByLabelText(/password/i)
			await userEvent.type(passwordField, 'password1')

			const signInButton = screen.getByRole('button', { name: /sign in/i })
			expect(signInButton).toBeEnabled()

			await userEvent.click(signInButton)

			expect(loginWithEmail).toHaveBeenCalledWith('test@test.com', 'password1')
		})

		it('should not be able to login if no password is provided', async () => {
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider(),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const emailField = screen.getByLabelText(/email/i)
			await userEvent.type(emailField, 'test@test.com')

			const signInButton = screen.getByRole('button', { name: /sign in/i })
			expect(signInButton).toBeDisabled()
		})

		it('should display error message if email is invalid format', async () => {
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider(),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const emailField = screen.getByLabelText(/email/i)
			await userEvent.type(emailField, 'notanemail')

			const passwordField = screen.getByLabelText(/password/i)
			await userEvent.type(passwordField, 'password1')

			expect(screen.getByText('Must be a valid email address')).toBeInTheDocument()

			const signInButton = screen.getByRole('button', { name: /sign in/i })
			expect(signInButton).toBeDisabled()
		})

		it('should display an error if login failed', async () => {
			const loginWithEmail = jest.fn().mockRejectedValue(new Error('Bang!'))
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withEmail: loginWithEmail } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const emailField = screen.getByLabelText(/email/i)
			await userEvent.type(emailField, 'test@test.com')

			const passwordField = screen.getByLabelText(/password/i)
			await userEvent.type(passwordField, 'password1')

			const signInButton = screen.getByRole('button', { name: /sign in/i })
			expect(signInButton).toBeEnabled()

			await userEvent.click(signInButton)

			expect(loginWithEmail).toHaveBeenCalledWith('test@test.com', 'password1')

			expect(
				screen.getByText('An error occured logging in. Please try again.')
			).toBeInTheDocument()

			expect(signInButton).toBeEnabled()
		})
	})

	describe('login with twitter', () => {
		it('should login successfully', async () => {
			const loginWithTwitter = jest.fn()
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withTwitter: loginWithTwitter } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const signInButton = screen.getByLabelText('Login with twitter')
			await userEvent.click(signInButton)

			expect(loginWithTwitter).toHaveBeenCalled()
		})

		it('should display an error if login failed', async () => {
			const loginWithTwitter = jest.fn().mockRejectedValue(new Error('Bang!'))
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withTwitter: loginWithTwitter } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const signInButton = screen.getByLabelText('Login with twitter')
			await userEvent.click(signInButton)

			expect(loginWithTwitter).toHaveBeenCalled()

			expect(
				screen.getByText('An error occured logging in. Please try again.')
			).toBeInTheDocument()

			expect(signInButton).toBeEnabled()
		})
	})

	describe('login with google', () => {
		it('should login successfully', async () => {
			const loginWithGoogle = jest.fn()
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withGoogle: loginWithGoogle } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const signInButton = screen.getByLabelText('Login with google')
			await userEvent.click(signInButton)

			expect(loginWithGoogle).toHaveBeenCalled()
		})

		it('should display an error if login failed', async () => {
			const loginWithGoogle = jest.fn().mockRejectedValue(new Error('Bang!'))
			const provider = buildAuthContext({
				overrides: {
					login: buildLoginProvider({ overrides: { withGoogle: loginWithGoogle } }),
				},
			})

			render(
				<MemoryRouter>
					<AuthContext.Provider value={provider}>
						<LoginCard />
					</AuthContext.Provider>
				</MemoryRouter>
			)

			const signInButton = screen.getByLabelText('Login with google')
			await userEvent.click(signInButton)

			expect(loginWithGoogle).toHaveBeenCalled()

			expect(
				screen.getByText('An error occured logging in. Please try again.')
			).toBeInTheDocument()

			expect(signInButton).toBeEnabled()
		})
	})
})
