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
            <Button type="submit">Sign in</Button>
        </form>
    )
}