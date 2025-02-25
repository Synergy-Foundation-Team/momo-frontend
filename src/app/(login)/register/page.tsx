import { RegisterForm } from '@/components/auth/RegisterForm'
import { RegisterSchema } from '@/lib/validations/auth'

export default function RegisterPage() {
    async function onSubmit(data: RegisterSchema) {
        'use server'
        try {
            console.log(data)
            // TODO: Implement registration logic
        } catch (error) {
            console.error('Registration failed:', error)
            throw error
        }
    }

    return (
        <div className="container h-full max-w-md mx-auto flex items-center justify-center">
            <RegisterForm onSubmit={onSubmit} />
        </div>
    )
}
