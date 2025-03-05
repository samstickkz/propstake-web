"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function DashHeader() {
  return (
    <header
      className="w-full md:py-1 py-5 fixed z-50"
      style={{
        backgroundImage:
          "url('https://ik.imagekit.io/shiga/dantes-place/Frame%201618870144(1).png?updatedAt=1740524797971')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="container mx-auto flex py-2 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://ik.imagekit.io/shiga/dantes-place/logo.png?updatedAt=1740524514721"
            alt="Work buddy"
            width={70}
            height={48}
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          <Link
            href="/my-tickets"
            className="text-base font-spline font-semibold text-[#FF6B00] hover:text-[#FF8533] transition-colors"
          >
            My Tickets
          </Link>
          <Button className="rounded-[2px] overflow-hidden border border-black p-0 m-0 w-[160px] h-[40px]">
            <div className="bg-gradient-to-r from-[#FF6B00] to-[#FF3366] w-full h-full flex items-center justify-center">
              <h3 className="text-white font-semibold font-spline text-base p-0 m-0">
                Get Tickets
              </h3>
            </div>
            <div
              style={{
                height: "30px",
                width: "33px",
                backgroundImage:
                  "url('https://ik.imagekit.io/shiga/dantes-place/66164c09a29f594863a07b01_Wrist-Stick.svg%20fill.png?updatedAt=1740535868404')",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
              }}
            />
          </Button>
        </nav>
      </div>
    </header>
  );
}
