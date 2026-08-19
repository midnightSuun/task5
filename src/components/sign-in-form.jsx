import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/inputs'
import { Button } from './ui/button'
import { useLoginMutation } from '../auth-api'
import styles from './sign-in-form.module.css'

const schema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
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

    const onSubmit = async (data) => {
        console.log(data)
        await login({ username: data.username, password: data.password })
    }

    return (
        <form className={styles.form} onSubmit={form.handleSubmit(onSubmit)}>
            <Input
                {...form.register('username')}
                className={styles.input}
                label="Username"
                placeholder="emilys"
                autoComplete="username"
            />
            <Input
                {...form.register('password')}
                className={styles.input}
                type="password"
                label="Password"
                placeholder="••••••••"
                autoComplete="current-password"
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
                    {error?.data?.message || error.status}
                </p>
            )}
        </form>
    )
}
