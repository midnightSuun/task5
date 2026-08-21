import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/inputs'
import { Button } from './ui/button'
import { useLoginMutation } from '../auth-api'
import { getErrorMessage } from '../utils/get-error-message'
import styles from './sign-in-form.module.css'

const schema = z.object({
    username: z.string().min(1, 'Enter your username'),
    password: z.string().min(1, 'Enter your password'),
})

const defaultValues = {
    username: '',
    password: '',
}

export const SignInForm = () => {
    const [login, { isLoading, isError, error }] = useLoginMutation()

    const form = useForm({
        resolver: zodResolver(schema),
        defaultValues,
    })

    const handleFormSubmit = async (data) => {
        await login(data)
    }

    return (
        <form
            className={styles.form}
            onSubmit={form.handleSubmit(handleFormSubmit)}
            noValidate
        >
            <Input
                {...form.register('username')}
                className={styles.input}
                label="Username"
                placeholder="emilys"
                autoComplete="username"
                error={form.formState.errors.username?.message}
            />
            <Input
                {...form.register('password')}
                className={styles.input}
                type="password"
                label="Password"
                placeholder="emilyspass"
                autoComplete="current-password"
                error={form.formState.errors.password?.message}
            />
            <Button
                className={styles.submit}
                type="submit"
                disabled={isLoading}
            >
                {isLoading ? 'Signing in…' : 'Sign in'}
            </Button>

            {isError && (
                <p className={styles.error} role="alert">
                    {getErrorMessage(error)}
                </p>
            )}
        </form>
    )
}
