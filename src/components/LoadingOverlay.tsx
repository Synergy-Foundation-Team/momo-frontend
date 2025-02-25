'use client'

import { useLoadingStore } from '@/store/loading'
import { Loader2 } from 'lucide-react'

export function LoadingOverlay() {
    const { isLoading, loadingText } = useLoadingStore()

    if (!isLoading) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 shadow-lg">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                {loadingText && (
                    <p className="text-sm text-gray-600">{loadingText}</p>
                )}
            </div>
        </div>
    )
}
