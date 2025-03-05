"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface GoogleButtonProps {
  onClick?: () => void
  isLoading?: boolean
}

export default function GoogleButton({ onClick, isLoading = false }: GoogleButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
      <Button
        onClick={onClick}
        disabled={isLoading}
        variant="outline"
        className="w-full bg-white hover:bg-gray-50 text-[16px] font-normal h-[52px] border-[#904902] rounded-[12px] "
      >
        <div className="flex items-center gap-2">
          <Image
            src="https://ik.imagekit.io/yo7dfxczb/workbuddy/google.png?updatedAt=1739016005899"
            alt="Google logo"
            width={24}
            height={24}
            className="object-contain"     
          />

          <span className="text-black font-normal font-inter text-base">
            Continue with Google
          </span>
        </div>
      </Button>
    </motion.div>
  );
}

