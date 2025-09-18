"use client";

import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function SupportButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <Link
        href="https://wa.me/2349116762327" // Replace with your WhatsApp number
        target="_blank"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition"
      >
        <MessageCircle className="text-white w-7 h-7" />
      </Link>

      {/* Telegram */}
      {/* <Link
        href="#" // Replace with your Telegram link
        target="_blank"
        className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg transition"
      >
        <Send className="text-white w-7 h-7" />
      </Link> */}
    </div>
  );
}
