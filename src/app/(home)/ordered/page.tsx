"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/ui/button"
import { Card, CardContent } from "@/ui/card"
import { motion } from "framer-motion"

export default function OrderSuccess() {
  // We'll define container variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 },
    },
  }

  const productVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    }),
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
      transition: { type: "spring", stiffness: 400, damping: 10 },
    },
  }

  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  }

  const circleVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gray-50 px-4 py-10">
      {/* Success Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8 w-full max-w-lg text-center"
      >
        <motion.div
          className="flex justify-center"
          initial="hidden"
          animate="visible"
        >
          <motion.div className="relative h-32 w-32">
            <motion.div
              className="absolute inset-0 rounded-full bg-green-500"
              variants={circleVariants}
            />

            <motion.div
              className="absolute inset-2 rounded-full bg-white"
              variants={circleVariants}
              transition={{ delay: 0.3 }}
            />

            <motion.div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M12 30L25 43L48 18"
                  stroke="#10B981"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={pathVariants}
                  transition={{ delay: 0.6 }}
                />
              </svg>
            </motion.div>

            {Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-2 w-2 rounded-full bg-green-400"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{
                  x: Math.cos(i * (Math.PI / 4)) * 60,
                  y: Math.sin(i * (Math.PI / 4)) * 60,
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 0],
                }}
                transition={{
                  delay: 1.2 + i * 0.05,
                  duration: 0.8,
                  ease: "easeOut",
                }}
                style={{
                  top: "calc(50% - 4px)",
                  left: "calc(50% - 4px)",
                }}
              />
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="mt-6"
        >
          <h2 className="text-2xl font-semibold">
            สั่งซื้อสินค้าเรียบร้อยแล้ว!
          </h2>
          <p className="mt-2 text-gray-500">
            คำสั่งซื้อของคุณได้รับการดำเนินการเรียบร้อยแล้ว
            และกำลังจัดส่งถึงคุณในไม่ช้า
          </p>
        </motion.div>
      </motion.div>

      {/* Buttons */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 1.5 }}
        className="mt-6 w-full max-w-lg space-y-3"
      >
        <motion.div variants={itemVariants}>
          <Button
            className="relative w-full overflow-hidden bg-green-600 hover:bg-green-700"
            asChild
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <span className="relative z-10">รายละเอียดการสั่งซื้อ</span>
              <motion.span
                className="absolute inset-0 z-0 bg-green-500"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                transition={{
                  delay: 1.8,
                  duration: 0.5,
                  ease: "easeOut",
                }}
              />
            </motion.div>
          </Button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/">
            <Button variant="outline" className="w-full" asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                animate={{
                  boxShadow: [
                    "0px 0px 0px rgba(16, 185, 129, 0)",
                    "0px 0px 15px rgba(16, 185, 129, 0.4)",
                    "0px 0px 0px rgba(16, 185, 129, 0)",
                  ],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  repeatDelay: 1,
                }}
              >
                ช๊อปปิ้งต่อ
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Product Recommendations */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 2 }}
        className="mt-10 w-full max-w-lg"
      >
        <motion.h3
          variants={itemVariants}
          className="mb-4 text-lg font-semibold"
        >
          สินค้าที่คุณอาจสนใจ
        </motion.h3>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            {
              src: "https://placehold.co/150x150",
              alt: "Product 1",
              name: "White Hat Premium",
              price: "$28",
            },
            {
              src: "https://placehold.co/150x150",
              alt: "Product 2",
              name: "Original Tee",
              price: "$28",
            },
            {
              src: "https://placehold.co/150x150",
              alt: "Product 3",
              name: "Classic Hoodie",
              price: "$35",
              hidden: true,
            },
          ].map((product, index) => (
            <motion.div
              key={index}
              custom={index}
              variants={productVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className={product.hidden ? "hidden md:block" : ""}
            >
              <Card className="w-full overflow-hidden">
                <CardContent className="p-2">
                  <motion.div
                    className="overflow-hidden rounded-lg"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    <Image
                      src={product.src}
                      alt={product.alt}
                      width={150}
                      height={150}
                      className="w-full rounded-lg"
                    />
                  </motion.div>
                  <motion.p
                    className="mt-2 text-center text-sm font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5 + index * 0.2 }}
                  >
                    {product.name}
                  </motion.p>
                  <motion.p
                    className="text-center text-gray-600"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.7 + index * 0.2 }}
                  >
                    {product.price}
                  </motion.p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
