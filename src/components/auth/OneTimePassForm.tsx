import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/ui/dialog"
import { Button } from "@/ui/button"
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/ui/form"
import {
    InputOTP,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/ui/input-otp"
import { Loader2 } from "lucide-react"

const otpSchema = z.object({
    otp: z.string().min(6, 'OTP ต้องมีอย่างน้อย 6 ตัวอักษร').max(6)
})

type OtpFormData = z.infer<typeof otpSchema>

type Props = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onSubmit: (otp: string) => void
    isVerifying?: boolean
}

export default function OneTimePassForm({ open, onOpenChange, onSubmit, isVerifying = false }: Readonly<Props>) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false)

    const form = useForm<OtpFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: { otp: '' }
    })

    const handleSubmit = (data: OtpFormData) => {
        onSubmit(data.otp)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white p-6 max-w-[90vw] w-[400px] rounded-lg shadow-lg">
                <DialogHeader>
                    <DialogTitle className="text-lg font-semibold text-gray-800">
                        กรอกรหัสยืนยัน
                    </DialogTitle>
                    <DialogDescription className="text-sm text-gray-500">
                        กรุณากรอกรหัส 6 หลักที่เราส่งไปยังหมายเลขโทรศัพท์ของคุณ
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="otp"
                            render={({ field }) => (
                                <FormItem className="flex flex-col items-center">
                                    <FormLabel className="text-sm font-medium text-gray-700">
                                        Verification Code
                                    </FormLabel>
                                    <FormControl>
                                        <InputOTP
                                            maxLength={6}
                                            {...field}
                                            className="flex justify-center gap-2 text-lg font-semibold tracking-widest"
                                        >

                                            <InputOTPSlot
                                                index={0}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />
                                            <InputOTPSlot
                                                index={1}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />
                                            <InputOTPSlot
                                                index={2}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />
                                            <InputOTPSeparator className="mx-2 text-gray-400">-</InputOTPSeparator>
                                            <InputOTPSlot
                                                index={3}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />
                                            <InputOTPSlot
                                                index={4}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />
                                            <InputOTPSlot
                                                index={5}
                                                className='border-2 border-gray-200 rounded-md w-10 h-12 text-center text-lg font-semibold shadow-sm focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all'
                                            />

                                        </InputOTP>
                                    </FormControl>
                                    <FormMessage className="text-red-500 text-sm mt-1" />
                                </FormItem>
                            )}
                        />
                        <Button
                            type="submit"
                            className="w-full py-2 text-white bg-primary hover:bg-primary/90 rounded-md transition duration-200"
                            disabled={isVerifying}
                            isLoading={isLoading}
                        >
                            {isVerifying ? (
                                <div className="flex items-center gap-2">
                                    <Loader2 className="animate-spin h-5 w-5" />
                                    Verifying...
                                </div>
                            ) : (
                                "Verify Code"
                            )}
                        </Button>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
