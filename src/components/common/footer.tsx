"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const footerLinks = [
  {
    title: "Investments",
    links: [
      { name: "United Arab Emirates", href: "/investments/uae" },
      { name: "Saudi Arabia", href: "/investments/saudi-arabia" },
      { name: "USA", href: "/investments/usa" },
      { name: "Others", href: "/investments/others" },
    ],
  },
  {
    title: "Sell",
    links: [
      { name: "Exit Windows", href: "/sell/exit-windows" },
      { name: "Sell your Property", href: "/sell/property" },
    ],
  },
  {
    title: "Visa Programs",
    links: [
      { name: "Golden", href: "/visa/golden" },
      { name: "Retirement Plan", href: "/visa/retirement" },
    ],
  },
  {
    title: "Learn",
    links: [
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
      { name: "Guides", href: "/guides" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About us", href: "/about" },
      { name: "How it works", href: "/how-it-works" },
      { name: "Contact", href: "/contact" },
      { name: "Investors", href: "/investors" },
    ],
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Instagram, href: "https://instagram.com" },
  { icon: Twitter, href: "https://twitter.com" },
  { icon: Linkedin, href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-0 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {/* Logo Column */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="https://ik.imagekit.io/4pztqoubze/landing-page/Property%20Stake%20with%20write%20up%201.png?updatedAt=1741191496767"
                alt="Prop Stake"
                width={101}
                height={40}
              />
            </Link>
          </div>

          {/* Link Columns */}
          {footerLinks.map((column) => (
            <div key={column.title} className="col-span-1">
              <h3 className="text-black text-base font-extrabold mb-4">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-[#000929] text-base transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-[#E8E6F9] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#000929]/50 text-base">
            &copy;2025 Realify. All rights reserved
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="text-[#000929]/50 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{social.icon.name}</span>
                  <Icon className="h-5 w-5" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
