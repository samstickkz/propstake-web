"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface NavItem {
  label: string;
  href: string;
  hasDropdown?: boolean;
  dropdownItems?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Investments",
    href: "/investments",
    hasDropdown: true,
    dropdownItems: [
      { label: "Stocks", href: "/investments/stocks" },
      { label: "Real Estate", href: "/investments/real-estate" },
      { label: "Crypto", href: "/investments/crypto" },
    ],
  },
  {
    label: "Automation",
    href: "/automation",
  },
  {
    label: "Visa Programs",
    href: "/visa-programs",
    hasDropdown: true,
    dropdownItems: [
      { label: "Business Visa", href: "/visa-programs/business" },
      { label: "Investor Visa", href: "/visa-programs/investor" },
      { label: "Work Visa", href: "/visa-programs/work" },
    ],
  },
  {
    label: "Sell",
    href: "/sell",
    hasDropdown: true,
    dropdownItems: [
      { label: "List Property", href: "/sell/property" },
      { label: "Sell Business", href: "/sell/business" },
    ],
  },
  {
    label: "Learn",
    href: "/learn",
    hasDropdown: true,
    dropdownItems: [
      { label: "Articles", href: "/learn/articles" },
      { label: "Guides", href: "/learn/guides" },
      { label: "Webinars", href: "/learn/webinars" },
    ],
  },
];

const languages = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
  { code: "fr", label: "Français" },
  { code: "de", label: "Deutsch" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [languageDropdownOpen, setLanguageDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const toggleDropdown = (label: string) => {
    if (activeDropdown === label) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(label);
    }
  };

  const toggleLanguageDropdown = () => {
    setLanguageDropdownOpen(!languageDropdownOpen);
  };

  const selectLanguage = (language: (typeof languages)[0]) => {
    setSelectedLanguage(language);
    setLanguageDropdownOpen(false);
  };

  return (
    <header className="w-full border-b border-gray-200">
      <div className="container mx-auto md:px-0 px-4">
        <div className="flex py-6 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <div key={item.label} className="relative group">
                <button
                  className="inline-flex items-center px-1 pt-1 text-base font-medium text-gray-900 hover:text-teal-600"
                  onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 mt-4 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem.label}
                          href={dropdownItem.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setActiveDropdown(null)}
                        >
                          {dropdownItem.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            ))}
            {/* Right side items */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Language Selector */}
              <div className="relative">
                <button
                  onClick={toggleLanguageDropdown}
                  className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <Globe className="h-4 w-4 mr-2 text-gray-500" />
                  {selectedLanguage.label}
                  <ChevronDown
                    className={cn(
                      "ml-1 h-4 w-4 text-gray-500 transition-transform duration-200",
                      languageDropdownOpen ? "rotate-180" : ""
                    )}
                  />
                </button>

                {/* Language Dropdown */}
                {languageDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10"
                  >
                    <div className="py-1">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => selectLanguage(language)}
                          className={cn(
                            "block w-full text-left px-4 py-2 text-sm",
                            selectedLanguage.code === language.code
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700 hover:bg-gray-50"
                          )}
                        >
                          {language.label}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Download App Button */}
              <Link
                href="https://play.google.com/store/apps/details?id=com.prostake.app"
                target="_blank"
                className="inline-flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white font-satoshibold bg-[#1E7791] hover:bg-[#1E7791]"
              >
                Download the App
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden"
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <div key={item.label}>
                <button
                  className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
                  onClick={() => item.hasDropdown && toggleDropdown(item.label)}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown
                      className={cn(
                        "ml-1 h-4 w-4 transition-transform duration-200",
                        activeDropdown === item.label ? "rotate-180" : ""
                      )}
                    />
                  )}
                </button>

                {/* Mobile Dropdown */}
                {item.hasDropdown && activeDropdown === item.label && (
                  <div className="pl-4 space-y-1">
                    {item.dropdownItems?.map((dropdownItem) => (
                      <Link
                        key={dropdownItem.label}
                        href={dropdownItem.href}
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {dropdownItem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language Selector (Mobile) */}
            <div className="pt-4 pb-2">
              <button
                onClick={toggleLanguageDropdown}
                className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-gray-500" />
                  {selectedLanguage.label}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform duration-200",
                    languageDropdownOpen ? "rotate-180" : ""
                  )}
                />
              </button>

              {/* Mobile Language Dropdown */}
              {languageDropdownOpen && (
                <div className="pl-4 space-y-1">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => selectLanguage(language)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-base font-medium",
                        selectedLanguage.code === language.code
                          ? "bg-gray-100 text-gray-900"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      {language.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Download App Button (Mobile) */}
            <div className="pt-2 pb-4">
              <Link
                href="https://play.google.com/store/apps/details?id=com.prostake.app"
                target="_blank"
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white font-satoshibold bg-[#1E7791] hover:bg-[#1E7791]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Download the App
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
