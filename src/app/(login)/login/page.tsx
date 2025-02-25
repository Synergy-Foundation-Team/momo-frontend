import { LoginForm } from '@/components/auth/LoginForm'
import { LoginSchema } from '@/lib/validations/auth'

export default function LoginPage() {
    async function onSubmit(data: LoginSchema) {
        'use server'
        console.log(data)
        // TODO: Implement login logic
    }

    return (
        <div className="container h-full max-w-md mx-auto flex items-center justify-center">
            <LoginForm onSubmit={onSubmit} />
        </div>
    )
}