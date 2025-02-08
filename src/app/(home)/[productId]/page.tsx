'use client'

import { ProductGallery } from '@/components/products/ProductGallery'
import { Button } from '@/ui/button'
import { RadioGroup, RadioGroupItem } from '@/ui/radio-group'
import { Label } from '@/ui/label'
import { Input } from '@/ui/input'
import { Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState } from 'react'

type PackOption = {
    id: string
    name: string
    price: number
    originalPrice: number
    discountPercentage: number
}

const packOptions: PackOption[] = [
    {
        id: '1-pack',
        name: '1 Pack',
        price: 179,
        originalPrice: 190,
        discountPercentage: 50,
    },
    {
        id: '2-pack',
        name: '2 Pack',
        price: 349,
        originalPrice: 380,
        discountPercentage: 55,
    },
]

export default function ProductPage({ params }: { params: { productId: string } }) {
    const [selectedPack, setSelectedPack] = useState<string>(packOptions[0].id)
    const [quantity, setQuantity] = useState(1)
    console.log(params);


    const selectedOption = packOptions.find((option) => option.id === selectedPack)!

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1)
        }
    }

    const increaseQuantity = () => {
        setQuantity(quantity + 1)
    }

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value) && value > 0) {
            setQuantity(value)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid gap-8 md:grid-cols-2">
                {/* Product Gallery */}
                <ProductGallery
                    images={[
                        '/images/product-1.jpg',
                        '/images/product-2.jpg',
                        '/images/product-3.jpg',
                        '/images/product-4.jpg',
                    ]}
                />

                {/* Product Info */}
                <div className="flex flex-col gap-6">
                    <div>
                        <h1 className="text-2xl font-semibold">เจลล้างมือ ยามาดะ</h1>
                        <p className="mt-2 text-muted-foreground">
                            ยามาดะ แอลกอฮอล์ แฮนด์ เจล
                        </p>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-semibold text-primary">
                            ${selectedOption.price}
                        </span>
                        <span className="text-lg text-muted-foreground line-through">
                            ${selectedOption.originalPrice}
                        </span>
                        <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-600">
                            ลด {selectedOption.discountPercentage}%
                        </span>
                    </div>

                    {/* Pack Options */}
                    <div className="space-y-4">
                        <Label>เลือกแพ็คเกจ</Label>
                        <RadioGroup
                            value={selectedPack}
                            onValueChange={setSelectedPack}
                            className="grid grid-cols-2 gap-4"
                        >
                            {packOptions.map((option) => (
                                <Label
                                    key={option.id}
                                    className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${selectedPack === option.id
                                        ? 'border-primary bg-primary/5'
                                        : 'hover:bg-muted/50'
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value={option.id} id={option.id} />
                                        <span>{option.name}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className="font-medium">${option.price}</div>
                                        <div className="text-sm text-muted-foreground line-through">
                                            ${option.originalPrice}
                                        </div>
                                    </div>
                                </Label>
                            ))}
                        </RadioGroup>
                    </div>

                    {/* Quantity */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium">จำนวน</Label>
                            <div className="text-sm text-muted-foreground">
                                คงเหลือ: 50 ชิ้น
                            </div>
                        </div>
                        <div className="inline-flex items-center rounded-lg border bg-background p-1 w-fit">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={decreaseQuantity}
                                disabled={quantity <= 1}
                                className="h-8 w-8 shrink-0 rounded-md"
                            >
                                <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                                type="number"
                                min="1"
                                max="50"
                                value={quantity}
                                onChange={handleQuantityChange}
                                className="h-8 w-16 border-0 text-center [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                            />
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={increaseQuantity}
                                disabled={quantity >= 50}
                                className="h-8 w-8 shrink-0 rounded-md"
                            >
                                <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Add to Cart */}
                    <Button size="lg" className="mt-4">
                        <ShoppingBag className="mr-2 h-5 w-5" />
                        เพิ่มลงตะกร้า
                    </Button>

                    {/* Product Details */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-semibold">รายละเอียดสินค้า</h2>
                        <div className="space-y-2 text-muted-foreground">
                            <p>Alcohol 75% v/v ไม่มีสีและกลิ่น แห้งเร็ว ไม่เหนียวเหนอะหนะ ปลอดภัย</p>
                            <p>ลดการะสะสมของแบคทีเรีย</p>
                            <ul className="list-inside list-disc space-y-1">
                                <li>ไม่มีสีและกลิ่น</li>
                                <li>แห้งเร็ว ไม่เหนียวเหนอะหนะ</li>
                                <li>ปลอดภัย</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
