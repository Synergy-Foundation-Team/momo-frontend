'use client'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/lib/validations/auth'
import { Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            nationalId: '',
            password: '',
            remember: false
        }
    })

    const onSubmit = async (data: LoginSchema) => {
        console.log(data)
        // TODO: Implement login logic
    }

    return (
        <div className="container h-full max-w-md mx-auto flex items-center justify-center">
            <div className="w-full px-4">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-semibold">เข้าสู่ระบบ</h1>
                </div>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
                        <FormField
                            control={form.control}
                            name='nationalId'
                            render={({ field }) => (
                                <FormItem>

                                    <FormControl>
                                        <Input placeholder="เลขบัตรประชาชน" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name='password'
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder='รหัสผ่าน'
                                                {...field}
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? (
                                                    <EyeOff className="h-4 w-4" />
                                                ) : (
                                                    <Eye className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className='flex items-center justify-between'>
                            <FormField
                                control={form.control}
                                name='remember'
                                render={({ field }) => (
                                    <FormItem className='flex items-center space-x-2 space-y-0'>
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="text-sm">จดจำไว้</div>
                                    </FormItem>
                                )}
                            />
                            <Link
                                href='/forgot-password'
                                className='text-sm font-medium text-primary hover:underline'
                            >
                                ลืมรหัสผ่าน
                            </Link>
                        </div>

                        <Button type='submit' className='w-full'>
                            เข้าสู่ระบบ
                        </Button>

                        <div className="text-center mt-4">
                            <span className="text-sm text-muted-foreground">ยังไม่มีบัญชี? </span>
                            <Link href="/register" className="text-sm font-medium text-primary hover:underline">
                                ลงทะเบียน
                            </Link>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}