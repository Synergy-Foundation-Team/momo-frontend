'use client'

import { Button } from '@/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/ui/form'
import { Input } from '@/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { RegisterSchema, registerSchema } from '@/lib/validations/auth'
import { Checkbox } from '@/ui/checkbox'
import Link from 'next/link'
import React from 'react'

export interface RegisterFormProps {
    onSubmit: (data: RegisterSchema) => Promise<void>
}

export function RegisterForm({ onSubmit }: Readonly<RegisterFormProps>) {
    const form = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: '',
            nationalId: '',
            phone: '',
            password: '',
            isShop: false
        }
    })

    const [otpFormPopup, setOtpFormPopup] = React.useState<boolean>(false)
    const [isSendingCode, setIsSendingCode] = React.useState<boolean>(false)
    const [countdown, setCountdown] = React.useState<number | undefined>(3)

    const onSendCode = async () => {
        setIsSendingCode(true)
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 3000))
            setOtpFormPopup(true)
        } catch (error) {
            console.error('Failed to send code:', error)
        } finally {
            setIsSendingCode(false)
        }
    }

    return (
        <div className="min-h-full w-full px-4">
            <h1 className="text-2xl font-semibold mb-8 text-center">ลงทะเบียน</h1>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="ชื่อ-นามสกุล" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="nationalId"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="เลขบัตรประชาชน" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-2">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input placeholder="เบอร์โทร" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                        </div>
                        <Button
                            variant="outline"
                            onClick={onSendCode}
                            isLoading={isSendingCode}
                            type="button"
                        >
                            ขอรหัส
                        </Button>
                    </div>

                    {/* <div className="flex gap-2">
                        <div className="flex-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input type="password" placeholder="รหัส" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div> */}

                    <FormField
                        control={form.control}
                        name="isShop"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="text-sm">สมัครเป็นร้านค้า?</div>
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="w-full">
                        ลงทะเบียน
                    </Button>

                    <div className="text-center mt-4">
                        <span className="text-sm text-muted-foreground">มีบัญชีอยู่แล้ว? </span>
                        <Link href="/login" className="text-sm font-medium text-primary hover:underline">
                            เข้าสู่ระบบ
                        </Link>
                    </div>
                </form>
            </Form>
        </div>
    )
}
