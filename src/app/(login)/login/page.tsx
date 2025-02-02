'use client'

import { Button } from '@/ui/button'
import { Checkbox } from '@/ui/checkbox'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { LoginSchema, loginSchema } from '@/lib/validations/auth'

export default function LoginPage() {
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
        <div className="container max-w-md mx-auto py-8 px-4">
            <div className="text-center mb-8">
                <div className="text-sm text-muted-foreground">เข้าสู่ระบบ</div>
                <h1 className="text-2xl font-semibold">สมัครสมาชิก</h1>
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
                                    <Input
                                        type='password'
                                        placeholder='รหัสผ่าน'
                                        {...field}
                                    />
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
                </form>
            </Form>
        </div>
    )
}