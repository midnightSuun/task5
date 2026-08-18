import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Input } from './ui/inputs'
import { Button } from './ui/button'
import { useLoginMutation } from '../auth-api'

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
        await login({ username, password })
    }

    return (
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <Input {...form.register('username')} label="Username" />
            <Input {...form.register('password')} label="Password" />
            <Button type="submit" disabled={isLoading}>Sign in</Button>
            
            {isError && <p>Error: {error?.data?.message || error.status}</p>}
        </form>
    )
}