import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Calendar,
  Users,
  Code,
  Building,
  FileText,
  MapPin,
} from "lucide-react";
import mosipCreateLogo from "figma:asset/16a0df83ffdd74ec73f59ffa5fb576ad10db6761.png";
import mosipCreateLogoNew from "../assets/mosip_create_logo.png";
import mosipReferenceImage from "figma:asset/b1d587260cc88dff00ceb239ce9d542693357dd7.png";
import Registration1 from "../imports/Registration1";
import customIcon from "figma:asset/f1afe06bf45db115c7afa170686ecc0ebf300a5d.png";
import megaphoneIcon from "figma:asset/4d7007529e1ac070a3f7d3dd7b9c4fde473a654e.png";
import winnersIcon from "figma:asset/f4f6133b731393444669f67f6836826f7e8c19f2.png";

interface HeroSectionProps {
  onNavigateToRegistration: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigateToRegistration,
}) => {
  const keyDates = [
    {
      icon: <Registration1 />,
      label: "Registration Opens",
      date: "Sep 4, 2025",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-700",
    },
    {
      icon: (
        <img
          src={customIcon}
          alt="Registration Closes"
          className="w-8 h-8 object-contain"
        />
      ),
      label: "Registration Closes",
      date: "Oct 1, 2025",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      textColor: "text-orange-700",
    },
    {
      icon: (
        <img
          src={megaphoneIcon}
          alt="Submissions Due"
          className="w-6 h-6 object-contain"
        />
      ),
      label: "Submissions Due",
      date: "Dec 1, 2025",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-700",
    },
    {
      icon: (
        <img
          src={winnersIcon}
          alt="WINNERS TRAVEL TO MOSIP CONNECT 2026"
          className="w-6 h-6 object-contain"
        />
      ),
      label: "WINNERS TRAVEL TO MOSIP CONNECT 2026",
      date: "Feb, 2026",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      textColor: "text-purple-700",
    },
  ];

  return (
    <div>
      {/* Main hero content area */}
      <div className="relative h-auto">
        {/* MOSIP-Style Animated Wave Background - Pure CSS */}
        <div className="absolute inset-0 bg-mosip-waves animate-mosip-wave-flow"></div>

        {/* Optional: Very subtle enhancement overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/2 via-transparent to-transparent"></div>
        </div>

        {/* Subtle Floating Elements - Optimized for mobile */}
        <div className="absolute inset-0">
          {/* Main floating orbs - more subtle and responsive */}
          <div className="absolute top-20 right-5 lg:right-10 w-40 h-40 lg:w-80 lg:h-80 bg-gradient-to-br from-blue-400/15 to-indigo-500/15 rounded-full blur-3xl animate-gentle-pulse"></div>
          <div
            className="absolute bottom-20 left-5 lg:left-10 w-32 h-32 lg:w-64 lg:h-64 bg-gradient-to-br from-orange-400/12 to-amber-500/12 rounded-full blur-3xl animate-gentle-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute top-1/3 left-1/3 w-24 h-24 lg:w-48 lg:h-48 bg-gradient-to-br from-emerald-400/10 to-teal-500/10 rounded-full blur-2xl animate-gentle-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        {/* Minimal Geometric Accents - Mobile optimized */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Subtle circles - complementing the organic waves */}
          <div
            className="absolute top-1/4 right-2/3 w-2 h-2 lg:w-3 lg:h-3 bg-blue-400/15 rounded-full animate-float"
            style={{ animationDelay: "1s", animationDuration: "8s" }}
          ></div>
          <div
            className="absolute bottom-1/4 left-2/3 w-1.5 h-1.5 lg:w-2 lg:h-2 bg-emerald-400/15 rounded-full animate-float"
            style={{ animationDelay: "3s", animationDuration: "10s" }}
          ></div>
          <div
            className="absolute top-3/4 right-1/6 w-3 h-3 lg:w-4 lg:h-4 bg-orange-400/12 rounded-full animate-float"
            style={{ animationDelay: "5s", animationDuration: "6s" }}
          ></div>
        </div>

        {/* Animated Lines/Connections - Hidden on mobile for better performance */}
        <div className="absolute inset-0 hidden sm:block">
          <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
            <defs>
              <linearGradient id="line1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="line2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(16, 185, 129, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
              <linearGradient id="line3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(245, 158, 11, 0.15)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            <path
              d="M100,200 Q300,100 500,200 T900,150"
              stroke="url(#line1)"
              strokeWidth="2"
              fill="none"
              className="animate-pulse"
            />
            <path
              d="M200,400 Q400,300 600,400 T1000,350"
              stroke="url(#line2)"
              strokeWidth="1.5"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <path
              d="M50,600 Q250,500 450,600 T850,550"
              stroke="url(#line3)"
              strokeWidth="1"
              fill="none"
              className="animate-pulse"
              style={{ animationDelay: "4s" }}
            />
          </svg>
        </div>

        <div
          className="relative z-10 min-h-screen flex items-center lg:pt-24 lg:pb-12"
          style={{ paddingTop: "8em" }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16 items-center w-full">
              {/* Left side - Content */}
              <div className="text-center lg:text-left space-y-8 sm:space-y-10 lg:space-y-12 max-w-full order-1">
                {/* MOSIP Create Logo */}
                <div className="flex flex-col items-center lg:items-start animate-fade-in mt-[0px] mr-[0px] mb-[10px] ml-[0px]">
                  <img
                    src={mosipCreateLogo}
                    alt="MOSIP Create 2025"
                    className="h-40 xs:h-48 sm:h-56 md:h-32 lg:h-48 xl:h-56 2xl:h-64 w-auto transform hover-scale-105 transition-transform duration-300 mb-4 sm:mb-6 lg:mb-6 max-w-full"
                  />
                  <img
                    src={mosipCreateLogoNew}
                    alt="MOSIP Create Logo"
                    className="h-24 xs:h-24 sm:h-28 md:h-16 lg:h-24 xl:h-28 2xl:h-32 w-auto transform hover-scale-105 transition-transform duration-300 mt-4 sm:mt-6 lg:mt-6 max-w-full"
                  />
                </div>

                {/* Main headline and tagline */}
                <div
                  className="space-y-4 sm:space-y-6 lg:space-y-8 animate-fade-in-up max-w-full mb-4"
                  style={{ animationDelay: "0.2s" }}
                >
                  <p className="sm:text-lg md:text-xl lg:text-[24px] xl:text-[24px] font-semibold leading-tight break-words max-w-full px-2 sm:px-0 text-[20px]">
                    <span className="text-black">Fuelling </span>
                    <span style={{ color: "#01A2FD" }}>Integration</span>
                    <span className="text-black">, </span>
                    <span style={{ color: "#FA8005" }}>Innovation</span>
                    <span className="text-black">, and </span>
                    <span style={{ color: "#0A8754" }}>Impact</span>
                  </p>

                  <p className="sm:text-base md:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0 text-[14px]">
                    Building ready-for-adoption DPI solutions under the
                    mentorship of the makers of MOSIP.
                  </p>
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start animate-fade-in-up"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Button
                    onClick={onNavigateToRegistration}
                    size="default"
                    className="mosip-primary-button font-semibold shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out h-12 lg:h-14 px-6 lg:px-8 text-sm lg:text-base w-full sm:w-auto min-h-[48px] touch-manipulation"
                  >
                    Register Now
                  </Button>

                  <Button
                    variant="outline"
                    size="default"
                    className="font-semibold mosip-secondary-button h-12 lg:h-14 px-6 lg:px-8 text-sm lg:text-base w-full sm:w-auto min-h-[48px] touch-manipulation"
                    onClick={() => {
                      // Enhanced anchor link function targeting "What is MOSIP Create?" accordion
                      const navigateToWhatIsAccordion = () => {
                        // Wait a moment for any pending DOM updates
                        setTimeout(() => {
                          let targetAccordion: Element | null = null;

                          // Strategy 1: Find by exact value match (shadcn/ui uses data-value)
                          const valueSelectors = [
                            '[data-value="what-is-mosip-create"]',
                            '[value="what-is-mosip-create"]',
                            "#what-is-mosip-create",
                          ];

                          for (const selector of valueSelectors) {
                            targetAccordion = document.querySelector(selector);
                            if (targetAccordion) break;
                          }

                          // Strategy 2: Find by position within accordion container (1st item)
                          if (!targetAccordion) {
                            const accordionContainer = document.querySelector(
                              '[data-orientation="vertical"]'
                            );
                            if (accordionContainer) {
                              const accordionItems =
                                accordionContainer.querySelectorAll(
                                  "[data-state]"
                                );
                              // "What is MOSIP Create?" is the 1st item (index 0)
                              if (accordionItems.length >= 1) {
                                targetAccordion =
                                  accordionItems[0].closest("[data-value]") ||
                                  accordionItems[0];
                              }
                            }
                          }

                          // Strategy 3: Search by text content in headers
                          if (!targetAccordion) {
                            const allTriggers =
                              document.querySelectorAll("button[data-state]");
                            for (const trigger of allTriggers) {
                              if (
                                trigger.textContent?.includes(
                                  "What is MOSIP Create?"
                                )
                              ) {
                                // Find the parent accordion item
                                targetAccordion =
                                  trigger.closest("[data-state]") ||
                                  trigger.closest("[data-value]") ||
                                  trigger.closest(".border-none");
                                break;
                              }
                            }
                          }

                          // Strategy 4: Find by Card component with specific content
                          if (!targetAccordion) {
                            const cards =
                              document.querySelectorAll(".shadow-sm");
                            for (const card of cards) {
                              if (
                                card.textContent?.includes(
                                  "What is MOSIP Create?"
                                )
                              ) {
                                targetAccordion =
                                  card.closest("[data-state]") || card;
                                break;
                              }
                            }
                          }

                          if (targetAccordion) {
                            // Find the trigger button within the accordion item
                            const triggerSelectors = [
                              "button[data-state]",
                              "[data-state] button",
                              "button[aria-expanded]",
                              '[role="button"]',
                              "button",
                            ];

                            let trigger: HTMLElement | null = null;
                            for (const selector of triggerSelectors) {
                              trigger = targetAccordion.querySelector(
                                selector
                              ) as HTMLElement;
                              if (trigger) break;
                            }

                            // Check if accordion is already expanded
                            const isExpanded =
                              trigger?.getAttribute("data-state") === "open" ||
                              trigger?.getAttribute("aria-expanded") ===
                                "true" ||
                              targetAccordion.getAttribute("data-state") ===
                                "open";

                            // Expand accordion if not already open
                            if (trigger && !isExpanded) {
                              trigger.click();
                            }

                            // Enhanced scroll with proper timing
                            const performScroll = () => {
                              // Calculate navigation height dynamically
                              const nav =
                                document.querySelector("nav") ||
                                document.querySelector(".fixed");
                              const progressBar =
                                document.querySelector(".fixed .h-1");
                              const navHeight =
                                (nav ? nav.getBoundingClientRect().height : 0) +
                                (progressBar
                                  ? progressBar.getBoundingClientRect().height
                                  : 0) +
                                40; // Extra padding for hero transition

                              // Get current element position
                              const elementRect =
                                targetAccordion!.getBoundingClientRect();
                              const viewportHeight = window.innerHeight;

                              // Calculate optimal scroll position for first accordion
                              const absoluteElementTop =
                                elementRect.top + window.pageYOffset;
                              const targetY =
                                absoluteElementTop - navHeight - 20; // Extra 20px padding

                              // Ensure we don't scroll past boundaries
                              const maxScroll =
                                document.documentElement.scrollHeight -
                                viewportHeight;
                              const finalY = Math.max(
                                0,
                                Math.min(targetY, maxScroll)
                              );

                              // Smooth scroll to target
                              window.scrollTo({
                                top: finalY,
                                behavior: "smooth",
                              });

                              // Add visual highlight with blue theme matching "What is MOSIP Create?"
                              const card = targetAccordion!.querySelector(
                                ".shadow-sm"
                              ) as HTMLElement;
                              if (card) {
                                card.style.transition = "all 0.4s ease";
                                card.style.boxShadow =
                                  "0 0 0 3px rgba(1, 162, 253, 0.3)"; // MOSIP blue highlight
                                card.style.transform = "scale(1.005)";

                                // Add subtle blue glow effect
                                card.style.background =
                                  "linear-gradient(135deg, rgba(1, 162, 253, 0.05) 0%, rgba(116, 185, 255, 0.05) 100%)";

                                setTimeout(() => {
                                  card.style.boxShadow = "";
                                  card.style.transform = "";
                                  card.style.background = "";
                                }, 3000);
                              }
                            };

                            // Wait for accordion animation to complete
                            setTimeout(performScroll, 300);
                          } else {
                            // Enhanced fallback: scroll to accordion sections area
                            const fallbackElement =
                              document.querySelector("#accordion-sections") ||
                              document.querySelector(".max-w-7xl") ||
                              document.querySelector(
                                '[data-orientation="vertical"]'
                              );

                            if (fallbackElement) {
                              // Calculate navigation offset for fallback scroll
                              const nav =
                                document.querySelector("nav") ||
                                document.querySelector(".fixed");
                              const navHeight = nav
                                ? nav.getBoundingClientRect().height + 40
                                : 100;

                              const elementRect =
                                fallbackElement.getBoundingClientRect();
                              const absoluteElementTop =
                                elementRect.top + window.pageYOffset;
                              const targetY = absoluteElementTop - navHeight;

                              window.scrollTo({
                                top: Math.max(0, targetY),
                                behavior: "smooth",
                              });
                            }

                            console.warn(
                              "What is MOSIP Create? accordion not found. Available accordions:",
                              Array.from(
                                document.querySelectorAll("[data-state]")
                              ).map(
                                (el) => el.textContent?.substring(0, 50) + "..."
                              )
                            );
                          }
                        }, 100); // Small delay to ensure DOM is ready after page load
                      };

                      navigateToWhatIsAccordion();
                    }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>

              {/* Right side - Key Dates - Desktop only */}
              <div
                className="hidden lg:block space-y-4 animate-fade-in-up order-2"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="bg-white rounded-2xl lg:rounded-3xl p-6 lg:p-8 shadow-sm border border-gray-200">
                  <div className="text-center mb-8">
                    <h3 className="text-xl lg:text-2xl text-gray-900 mb-2 font-bold">
                      Important Dates
                    </h3>
                    <p className="text-base text-gray-600">
                      Mark your calendar
                    </p>
                  </div>

                  {/* Timeline Container */}
                  <div className="relative">
                    {/* Timeline Line - solid gray */}
                    <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300"></div>

                    {/* Timeline Items */}
                    <div className="space-y-8">
                      {keyDates.map((item, index) => {
                        const colors = [
                          "#00a2e5",
                          "#fec40d",
                          "#f58020",
                          "#d64246",
                        ];
                        const color = colors[index % colors.length];

                        return (
                          <div
                            key={index}
                            className="relative flex items-center group animate-fade-in-up"
                            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                          >
                            {/* Timeline Marker */}
                            <div
                              className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full border-4 shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center"
                              style={{ borderColor: color }}
                            >
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: color }}
                              ></div>
                            </div>

                            {/* Timeline Content */}
                            <div className="ml-6 flex-1">
                              <div className="bg-white border-2 border-gray-200 rounded-xl p-4 lg:p-5 hover:shadow-md transition-all duration-300">
                                <div
                                  className="text-sm font-semibold uppercase tracking-wide mb-2"
                                  style={{ color: color }}
                                >
                                  {item.label}
                                </div>
                                <div className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight">
                                  {item.date}
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Important Dates Section - Separate flow section for mobile */}
      <div className="block lg:hidden w-full bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center mb-4 sm:mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
              Important Dates
            </h3>
            <p className="text-sm text-gray-600">Mark your calendar</p>
          </div>

          {/* Timeline Container */}
          <div className="relative">
            {/* Timeline Line - solid gray */}
            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-gray-300"></div>

            {/* Timeline Items */}
            <div className="space-y-8">
              {keyDates.map((item, index) => {
                const colors = ["#00a2e5", "#fec40d", "#f58020", "#d64246"];
                const color = colors[index % colors.length];

                return (
                  <div
                    key={index}
                    className="relative flex items-center group animate-fade-in-up"
                    style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                  >
                    {/* Timeline Marker */}
                    <div
                      className="relative z-10 flex-shrink-0 w-12 h-12 bg-white rounded-full border-4 shadow-sm group-hover:shadow-md transition-all duration-300 flex items-center justify-center"
                      style={{ borderColor: color }}
                    >
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                      ></div>
                    </div>

                    {/* Timeline Content */}
                    <div className="ml-6 flex-1">
                      <div className="bg-white border-2 border-gray-200 rounded-xl p-4 lg:p-5 hover:shadow-md transition-all duration-300">
                        <div
                          className="text-sm font-semibold uppercase tracking-wide mb-2"
                          style={{ color: color }}
                        >
                          {item.label}
                        </div>
                        <div className="text-base lg:text-lg xl:text-xl font-bold text-gray-900 leading-tight">
                          {item.date}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
