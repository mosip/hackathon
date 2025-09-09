"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import {
  Menu,
  X,
  Github,
  BookOpen,
  Users,
  ChevronDown,
  ExternalLink,
  Home,
  FileText,
  Send,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import mosipCreateLogo from "figma:asset/535962d3aaea113f503698ec8d1995abc5c3dc41.png";
import mosipLogo from "figma:asset/610c93ced2dde18c8cbe68b4af0e7f2bd130461d.png";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface NavigationProps {
  onNavigateHome?: () => void;
  onNavigateToRegistration?: () => void;
  onNavigateToSubmission?: () => void;
  onNavigateToProgramDetails?: () => void;
  onNavigateToSubmissionAccordion?: () => void;
  onNavigateToFAQs?: () => void;
  onNavigateToContactUs?: () => void;
  currentPage?: "home" | "registration" | "submission";
}

const Navigation = ({
  onNavigateHome,
  onNavigateToRegistration,
  onNavigateToSubmission,
  onNavigateToProgramDetails,
  onNavigateToSubmissionAccordion,
  onNavigateToFAQs,
  onNavigateToContactUs,
  currentPage = "home",
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState({
    help: false,
    pastEditions: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"; // prevent background scroll
    } else {
      document.body.style.overflow = ""; // restore scroll
    }

    return () => {
      document.body.style.overflow = ""; // cleanup
    };
  }, [isMobileMenuOpen]);

  const handleHomeClick = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdowns({ help: false, pastEditions: false });
  };

  const handleProgramDetailsClick = () => {
    // Use the proper accordion control function passed from App
    if (onNavigateToProgramDetails) {
      onNavigateToProgramDetails();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdowns({ help: false, pastEditions: false });
  };

  const handleSubmissionClick = () => {
    // Use the proper accordion control function for submission accordion
    if (onNavigateToSubmissionAccordion) {
      onNavigateToSubmissionAccordion();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdowns({ help: false, pastEditions: false });
  };

  const handleContactUsClick = () => {
    // Use the proper accordion control function for contact us accordion
    if (onNavigateToContactUs) {
      onNavigateToContactUs();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdowns({ help: false, pastEditions: false });
  };

  const handleFAQsClick = () => {
    // Use the proper accordion control function for contact us accordion
    if (onNavigateToFAQs) {
      onNavigateToFAQs();
    }
    setIsMobileMenuOpen(false);
    setOpenDropdowns({ help: false, pastEditions: false });
  };

  const toggleMobileDropdown = (dropdown: "help" | "pastEditions") => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const topNavItems = [
    {
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
      href: "https://github.com/mosip",
      external: true,
    },
    {
      label: "Documentation",
      icon: <BookOpen className="w-4 h-4" />,
      href: "https://docs.mosip.io/1.2.0/",
      external: true,
    },
    {
      label: "Community",
      icon: <Users className="w-4 h-4" />,
      href: "https://community.mosip.io",
      external: true,
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-white"
      }`}
    >
      {/* Top utility bar */}
      <div className="hidden lg:block border-b border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-end h-10 space-x-6">
            {topNavItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                target={item.external ? "_blank" : "_self"}
                rel={item.external ? "noopener noreferrer" : undefined}
                className="flex items-center space-x-2 text-sm text-gray-600 hover:text-blue-600 transition-colors nav-item-hover py-1 px-2"
              >
                {item.icon}
                <span>{item.label}</span>
                {item.external && (
                  <ExternalLink className="w-3 h-3 opacity-60" />
                )}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-18">
            {/* Logo */}
            <div className="flex-shrink-0">
              <button
                onClick={handleHomeClick}
                className="flex items-center nav-item-hover p-2 -m-2"
              >
                <img
                  src={mosipCreateLogo}
                  alt="MOSIP Create"
                  className="h-15 w-auto"
                />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <button
                onClick={handleHomeClick}
                className={`nav-item-hover px-3 py-2 text-sm font-medium ${
                  currentPage === "home" ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Home
              </button>

              <button
                onClick={handleProgramDetailsClick}
                className="nav-item-hover px-3 py-2 text-sm font-medium text-gray-700"
              >
                Program Details
              </button>

              <button
                onClick={handleSubmissionClick}
                className="nav-item-hover px-3 py-2 text-sm font-medium text-gray-700"
              >
                Submission
              </button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center nav-item-hover px-3 py-2 text-sm font-medium text-gray-700">
                    Help
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 mt-2 border-gray-200 shadow-lg"
                >
                  <DropdownMenuItem
                    onClick={handleFAQsClick}
                    className="nav-dropdown-hover px-4 py-3 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 mr-3" />
                    FAQs
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={handleContactUsClick}
                    className="nav-dropdown-hover px-4 py-3 cursor-pointer"
                  >
                    <Users className="w-4 h-4 mr-3" />
                    Contact Us
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center nav-item-hover px-3 py-2 text-sm font-medium text-gray-700">
                    Past Editions
                    <ChevronDown className="ml-1 h-4 w-4" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 mt-2 border-gray-200 shadow-lg"
                >
                  <DropdownMenuItem
                    asChild
                    className="nav-dropdown-hover px-4 py-3 cursor-pointer"
                  >
                    <a
                      href="https://www.hackerearth.com/challenges/hackathon/mosip-create"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center"
                    >
                      <Users className="w-4 h-4 mr-3" />
                      MOSIP Create 2024
                    </a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Register Now Button & MOSIP Logo */}
            <div className="hidden lg:flex items-center space-x-6">
              <Button
                onClick={() => {
                  onNavigateToRegistration?.();
                  setOpenDropdowns({ help: false, pastEditions: false });
                }}
                onMouseDown={() => {
                  onNavigateToRegistration?.();
                  setOpenDropdowns({ help: false, pastEditions: false });
                }}
                className="mosip-primary-button px-6 py-2 text-sm font-semibold"
              >
                Register Now
              </Button>

              <button
                onClick={() =>
                  window.open(
                    "https://www.mosip.io",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
                className="nav-icon-hover p-2 rounded-md overflow-hidden transition-all duration-300"
                title="Visit MOSIP Website"
                aria-label="Visit MOSIP Website"
              >
                <ImageWithFallback
                  src={mosipLogo}
                  alt="MOSIP Logo"
                  className="w-15 h-15 object-contain rounded-sm"
                />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                  if (isMobileMenuOpen) {
                    setOpenDropdowns({ help: false, pastEditions: false });
                  }
                }}
                className="flex items-center justify-center nav-icon-hover p-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
            {/* Top bar items for mobile */}
            <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/30">
              <div className="space-y-2">
                {topNavItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    target={item.external ? "_blank" : "_self"}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="flex items-center space-x-3 text-sm text-gray-600 hover:text-blue-600 transition-colors nav-mobile-item-hover px-3 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                    {item.external && (
                      <ExternalLink className="w-3 h-3 opacity-60 ml-auto" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Main navigation items */}
            <div className="px-4 py-3 space-y-2">
              <button
                onClick={handleHomeClick}
                className={`flex items-center space-x-3 nav-mobile-item-hover px-3 py-3 text-base font-medium w-full text-left rounded-md ${
                  currentPage === "home"
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                <Home className="w-5 h-5" />
                <span>Home</span>
              </button>

              <button
                onClick={handleProgramDetailsClick}
                className="flex items-center space-x-3 nav-mobile-item-hover px-3 py-3 text-base font-medium text-gray-700 w-full text-left rounded-md"
              >
                <FileText className="w-5 h-5" />
                <span>Program Details</span>
              </button>

              <button
                onClick={handleSubmissionClick}
                className="flex items-center space-x-3 nav-mobile-item-hover px-3 py-3 text-base font-medium text-gray-700 w-full text-left rounded-md"
              >
                <Send className="w-5 h-5" />
                <span>Submission</span>
              </button>

              {/* Help dropdown for mobile */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("help")}
                  className="flex items-center justify-between nav-mobile-item-hover px-3 py-3 text-base font-medium text-gray-700 w-full text-left rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen className="w-5 h-5" />
                    <span>Help</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdowns.help ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdowns.help && (
                  <div className="ml-8 mt-2 space-y-1">
                    <button
                      onClick={handleFAQsClick}
                      className="block nav-mobile-item-hover px-3 py-2 text-sm text-gray-600 w-full text-left rounded-md"
                    >
                      FAQs
                    </button>
                    <button
                      onClick={handleContactUsClick}
                      className="block nav-mobile-item-hover px-3 py-2 text-sm text-gray-600 w-full text-left rounded-md"
                    >
                      Contact Us
                    </button>
                  </div>
                )}
              </div>

              {/* Past Editions dropdown for mobile */}
              <div>
                <button
                  onClick={() => toggleMobileDropdown("pastEditions")}
                  className="flex items-center justify-between nav-mobile-item-hover px-3 py-3 text-base font-medium text-gray-700 w-full text-left rounded-md"
                >
                  <div className="flex items-center space-x-3">
                    <Users className="w-5 h-5" />
                    <span>Past Editions</span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openDropdowns.pastEditions ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openDropdowns.pastEditions && (
                  <div className="ml-8 mt-2 space-y-1">
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        window.open(
                          "https://www.hackerearth.com/challenges/hackathon/mosip-create",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                      className="block nav-mobile-item-hover px-3 py-2 text-sm text-gray-600 w-full text-left rounded-md"
                    >
                      MOSIP Create 2024
                    </button>
                  </div>
                )}
              </div>

              {/* Mobile Register Button and MOSIP Logo */}
              <div className="pt-4 space-y-3 border-t border-gray-100 mt-4">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onNavigateToRegistration?.();
                    setOpenDropdowns({ help: false, pastEditions: false });
                    setIsMobileMenuOpen(false);
                  }}
                  className="mosip-primary-button w-full py-3 text-base font-semibold"
                >
                  Register Now
                </Button>

                <button
                  onClick={() => {
                    window.open(
                      "https://www.mosip.io",
                      "_blank",
                      "noopener,noreferrer"
                    );
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center space-x-2 nav-mobile-item-hover px-3 py-3 text-sm text-gray-600 w-full text-center rounded-md"
                >
                  <ImageWithFallback
                    src={mosipLogo}
                    alt="MOSIP Logo"
                    className="w-6 h-6 object-contain"
                  />
                  <span>Visit MOSIP</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
