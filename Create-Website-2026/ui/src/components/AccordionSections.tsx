"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "./ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Globe,
  Users,
  Target,
  Trophy,
  Calendar,
  FileText,
  Star,
  BookOpen,
  Shield,
  MessageCircle,
  CheckCircle,
  ArrowRight,
  MapPin,
  DollarSign,
  CreditCard,
  UserCheck,
  Mail,
  Phone,
  HelpCircle,
  AlertTriangle,
  ExternalLink,
  Clock,
  Award,
  Eye,
  Share2,
  Zap,
  Database,
  Code,
  Video,
  Download,
  Link as LinkIcon,
  Building,
  Lightbulb,
  Palette,
  Smartphone,
  ShieldCheck,
  Scale,
  Cpu,
  BarChart3,
  FileCheck,
  Briefcase,
  GraduationCap,
  Heart,
  Landmark,
  AlertCircle,
  Info,
  SendHorizontal,
  ClipboardCheck,
  Layers,
  Plane,
  Monitor,
  Camera,
  Handshake,
  Coins,
  CreditCard as CreditCardIcon,
  Banknote,
  Wallet,
  Settings,
  Play,
  ChevronRight,
  X,
  Users2,
  Lock,
  Calendar1,
  Percent,
  Plus,
  Minus,
  Upload,
} from "lucide-react";
import networkIcon from "../assets/7100cbf2bdd2edf857b1756b0e7a3e017056d5d3.png";
import ekycIcon from "../assets/3cbf525c4ed461404eed76541658d2ca2685726c.png";
import financialIcon from "../assets/4a90e15aa62cda3b74c6a98b571e5a25425ea5ef.png";
import credentialIcon from "../assets/0cabc3e0a8a5beb5dd7faa4d916036fcfd8f9a2b.png";
import what_is_mosip_createIcon from "../assets/what_is_mosip_create.png";
import who_is_mosip_create_forIcon from "../assets/who_is_mosip_create_for.png";
import themesIcon from "../assets/themes.png";
import prizesIcon from "../assets/prizes.png";
import timelineIcon from "../assets/timeline.png";
import resourcesIcon from "../assets/resources.png";
import evaluation_criteriaIcon from "../assets/evaluation_criteria.png";
import submission_criteriaIcon from "../assets/submission_criteria.png";
import rulesIcon from "../assets/rules.png";
import terms_and_conditionsIcon from "../assets/terms_and_conditions.png";
import faqsIcon from "../assets/faqs.png";
import contant_usIcon from "../assets/contact_us.png";

interface AccordionSectionsProps {
  onNavigateToSubmission?: () => void;
  onNavigateToRegistration?: () => void;
  onAccordionControl?: (openAccordion: (accordionId: string) => void) => void;
}

const AccordionSections: React.FC<AccordionSectionsProps> = ({
  onNavigateToSubmission,
  onNavigateToRegistration,
  onAccordionControl,
}) => {
  // State for managing accordion expansion and auto-scroll
  const [openAccordionValue, setOpenAccordionValue] = useState<string>("");
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Smart scroll function that aligns accordion top with viewport top
  const scrollToAccordionTop = useCallback((accordionId: string) => {
    const accordionElement = accordionRefs.current[accordionId];
    if (!accordionElement) return;

    // Calculate navigation height dynamically
    const nav =
      document.querySelector("nav") || document.querySelector(".fixed");
    const progressBar = document.querySelector(".fixed .h-1");
    const navHeight =
      (nav ? nav.getBoundingClientRect().height : 0) +
      (progressBar ? progressBar.getBoundingClientRect().height : 0) +
      20; // Extra padding

    // Get accordion position
    const accordionRect = accordionElement.getBoundingClientRect();
    const absoluteElementTop = accordionRect.top + window.pageYOffset;

    // Calculate target scroll position (align top of accordion with top of viewport, accounting for nav)
    const targetScrollY = absoluteElementTop - navHeight;

    // Ensure we don't scroll past boundaries
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const finalScrollY = Math.max(0, Math.min(targetScrollY, maxScroll));

    // Smooth scroll to position
    window.scrollTo({
      top: finalScrollY,
      behavior: "smooth",
    });

    // Add visual highlight to indicate the active accordion
    const card = accordionElement.querySelector(".shadow-sm") as HTMLElement;
    if (card) {
      card.style.transition = "all 0.4s ease";
      card.style.boxShadow = "0 0 0 3px rgba(1, 162, 253, 0.2)";
      card.style.transform = "scale(1.002)";

      // Remove highlight after a delay
      setTimeout(() => {
        card.style.boxShadow = "";
        card.style.transform = "";
      }, 2000);
    }
  }, []);

  // Function to programmatically open an accordion
  const openAccordion = useCallback(
    (accordionId: string) => {
      setOpenAccordionValue(accordionId);

      // Wait for accordion to render, then scroll to it
      setTimeout(() => {
        scrollToAccordionTop(accordionId);
      }, 300);
    },
    [scrollToAccordionTop]
  );

  // Expose the openAccordion function to parent components
  useEffect(() => {
    if (onAccordionControl) {
      onAccordionControl(openAccordion);
    }
  }, [onAccordionControl, openAccordion]);

  // Handle accordion value change with smart scrolling
  const handleAccordionChange = useCallback(
    (newValue: string) => {
      const previousValue = openAccordionValue;

      // If clicking the same accordion that's already open, collapse it (optional behavior)
      if (newValue === previousValue) {
        setOpenAccordionValue("");
        return; // Don't scroll when collapsing
      }

      // If a new accordion is being opened
      if (newValue && newValue !== previousValue) {
        setOpenAccordionValue(newValue);

        // Wait for accordion expansion animation to complete before scrolling
        setTimeout(() => {
          scrollToAccordionTop(newValue);
        }, 300); // Match accordion animation duration
      } else {
        setOpenAccordionValue(newValue);
      }
    },
    [openAccordionValue, scrollToAccordionTop]
  );

  // Complete MOSIP Create 2025 accordion data with exact content provided
  const accordionData = [
    {
      id: "what-is-mosip-create",
      title: "What is MOSIP Create?",
      icon: (
        <img
          src={what_is_mosip_createIcon}
          alt="What is MOSIP Create Icon"
          className="w-8 h-8"
        />
      ),
      color: "#01A2FD",
      bgGradient: "from-[#01A2FD] to-[#0077CC]",
      borderColor: "border-[#01A2FD]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-4">
              MOSIP's Flagship Global Programme
            </h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                MOSIP Create is MOSIP's flagship global programme initiated to
                support and advance digital identity solutions from around the
                world. Designed for established technology companies, startups,
                and the broader commercial ecosystem, the programme provides a
                structured platform to develop and integrate ready-to-market
                digital identity solutions with MOSIP.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Leveraging MOSIP's open-source ID platform and suite of
                products, participants refine their solutions to contribute to
                Digital Public Infrastructure (DPI) — whether through
                authentication, eKYC, wallet-based technologies such as the Inji
                Stack, or other approaches — addressing real-world use cases
                aligned with the United Nations Sustainable Development Goals
                (SDGs).
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-green-600" />
              Global Opportunities & Support
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Supported by the MOSIP team, top solutions will gain access to
              more than 11 countries where MOSIP serves as the national ID
              system, global visibility through the MOSIP Marketplace, and the
              opportunity to be present among representatives from over 30
              countries at the upcoming edition of MOSIP Connect 2026.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                DPI Solutions
              </h5>
              <p className="text-sm text-gray-600">
                Build ready-to-market digital identity solutions contributing to
                Digital Public Infrastructure
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building className="w-6 h-6 text-green-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                11+ Countries
              </h5>
              <p className="text-sm text-gray-600">
                Access to countries where MOSIP serves as the national ID system
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Award className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Global Visibility
              </h5>
              <p className="text-sm text-gray-600">
                Showcase at MOSIP Marketplace and Connect 2026 with 30+ country
                representatives
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "who-is-mosip-create-for",
      title: "Who is MOSIP Create for?",
      icon: (
        <img
          src={who_is_mosip_create_forIcon}
          alt="Who is MOSIP Create for Icon"
          className="w-8 h-8"
        />
      ),
      color: "#0A8754",
      bgGradient: "from-[#0A8754] to-[#086B43]",
      borderColor: "border-[#0A8754]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-gray-900 mb-4">
              Global Online Programme
            </h4>
            <p className="text-gray-700 leading-relaxed mb-4">
              MOSIP Create is an online programme, allowing participants to join
              from anywhere in the world. Focused on solution integration and
              showcasing, it is open to technology companies and the broader
              commercial ecosystem, both established and emerging.
            </p>

            <div className="bg-white p-4 rounded-lg border border-green-200 mt-4">
              <h5 className="font-semibold text-gray-900 mb-2">
                Ready to Start?
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                Register Now to be a part of our work in{" "}
                <strong>Empowering Lives, One Unique ID at a Time</strong>.
              </p>
              <Button
                variant="default"
                size="lg"
                className="mosip-primary-button-green font-semibold"
                onClick={onNavigateToRegistration}
              >
                Register Now
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-600" />
              Platform Integration Options
            </h5>
            <p className="text-sm text-gray-700">
              <strong>Note:</strong> Participants are encouraged to leverage any
              of MOSIP's solutions, including the core identity platform and/or
              Inji stack, and/or eSignet.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "themes",
      title: "Themes",
      icon: <img src={themesIcon} alt="Themes Icon" className="w-8 h-8" />,
      color: "#FEC401",
      bgGradient: "from-[#FEC401] to-[#E5B001]",
      borderColor: "border-[#FEC401]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border border-yellow-200">
            <h4 className="font-bold text-gray-900 mb-3">
              UN Sustainable Development Goals Aligned
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Informed by the UN's Sustainable Development Goals, MOSIP Create's
              themes invite solutions that address the on-ground needs of
              countries establishing their national digital infrastructures. We
              hope to find ready-for-adoption, robust projects that hold the key
              to unlocking wide-ranging impacts on the ground, in the lives of
              diverse communities around the world.
            </p>
          </div>

          <div className="space-y-6">
            {/* Theme 1 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-white to-gray-200 p-4">
                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                  <img
                    src={networkIcon}
                    alt="Network Icon"
                    className="w-5 h-5"
                  />
                  Digital ID for Service Access
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  Improve the delivery of social services or benefits to
                  citizens via digital identity and/or its solutions.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  From government scholarships to disaster and emergency relief,
                  identity verification assures the timely delivery of services
                  to the intended beneficiary. MOSIP's foundational and scalable
                  ID verification and authentication systems eliminate the
                  challenges around multiple siloed systems. Your solution could
                  be a part of enabling the timely generation of registries,
                  ensuring support and relief to residents who need it.
                </p>
              </div>
            </div>

            {/* Theme 2 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-white to-gray-200 p-4">
                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                  <img
                    src={ekycIcon}
                    alt="eKYC Icon"
                    className="h-5 object-contain"
                  />
                  eKYC for Inclusive Identity Verification
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  Develop or integrate secure eKYC solutions for global identity
                  infrastructure.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Smooth and secure Know Your Customer solutions are integral
                  for today's businesses. Given that most countries in the world
                  today mandate eKYC and legally-verifiable identity,
                  integrating your solution with eSignet ensures it will be
                  compatible with local laws and regulations in MOSIP-adopting
                  nations.
                </p>
              </div>
            </div>

            {/* Theme 3 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-white to-gray-200 p-4">
                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                  <img
                    src={financialIcon}
                    alt="Financial Analytics Icon"
                    className="h-5 object-contain"
                  />
                  Financial Inclusion through Digital Identity
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  Leverage digital identity to expand universal access to
                  financial services.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Digital banking has brought the world to the cusp of bringing
                  banks into individuals' homes. MOSIP's eSignet, Authentication
                  API, and Inji stack have the potential to bring MOSIP-adopting
                  countries closer to a place where all residents, without
                  exception, have access to financial services, including
                  banking, loans, and insurance. MOSIP envisions inclusive
                  financial solutions, with both assisted and unassisted modes,
                  with inclusion as a priority. Integrate with MOSIP to help
                  make this dream a reality.
                </p>
              </div>
            </div>

            {/* Theme 4 */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-white to-gray-200 p-4">
                <h5 className="font-bold text-gray-800 flex items-center gap-2">
                  <img
                    src={credentialIcon}
                    alt="Credential Icon"
                    className="h-5 object-contain"
                  />
                  Credential Facilitation for Empowerment
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  Innovate solutions linked to digital identity and/or MOSIP's
                  credentialing solutions.
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  It is still a very real challenge in the world today that
                  several residents in a country are excluded from the formal
                  economy as a result of reliance on paper-based credentials
                  that cannot be digitally verified. Integrated compliant
                  wallets, for e.g. MOSIP's Inji stack, based on W3C verifiable
                  credentials, are designed to close this gap, allowing the
                  digitisation, storage, and easy sharing of
                  digitally-verifiable credentials. Your solution could empower
                  individuals to join and participate in the growing digital
                  economy.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200">
            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Target className="w-5 h-5 text-indigo-600" />
              Contribute to SDGs
            </h5>
            <p className="text-gray-700 leading-relaxed mb-3">
              Each theme for MOSIP Create corresponds to, and aims to address,
              the{" "}
              <a
                href="https://sdgs.un.org/goals"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors duration-200"
              >
                United Nations' Sustainable Development Goals
              </a>
              .
            </p>
            <p className="text-sm text-gray-600">
              Adherence to these SDGs in the ideation of your product is highly
              encouraged, and will contribute positively to your evaluation.{" "}
              <a
                href="#evaluation"
                onClick={(e) => {
                  e.preventDefault();
                  // Enhanced navigation to evaluation accordion with MOSIP visual feedback
                  const navigateToEvaluationAccordion = () => {
                    setTimeout(() => {
                      let targetAccordion: Element | null = null;

                      // Strategy 1: Find by exact value match (shadcn/ui uses data-value)
                      const valueSelectors = [
                        '[data-value="evaluation"]',
                        '[value="evaluation"]',
                        "#evaluation",
                      ];

                      for (const selector of valueSelectors) {
                        targetAccordion = document.querySelector(selector);
                        if (targetAccordion) break;
                      }

                      // Strategy 2: Find by position within accordion container
                      if (!targetAccordion) {
                        const accordionContainer = document.querySelector(
                          '[data-orientation="vertical"]'
                        );
                        if (accordionContainer) {
                          const accordionItems =
                            accordionContainer.querySelectorAll("[data-value]");
                          // Look for evaluation accordion by checking data-value attributes
                          for (const item of accordionItems) {
                            if (
                              item.getAttribute("data-value") === "evaluation"
                            ) {
                              targetAccordion = item;
                              break;
                            }
                          }
                        }
                      }

                      // Strategy 3: Search by text content in headers
                      if (!targetAccordion) {
                        const allTriggers =
                          document.querySelectorAll("button[data-state]");
                        for (const trigger of allTriggers) {
                          if (
                            trigger.textContent?.includes("Evaluation Criteria")
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
                        const cards = document.querySelectorAll(".shadow-sm");
                        for (const card of cards) {
                          if (
                            card.textContent?.includes("Evaluation Criteria")
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
                          trigger?.getAttribute("aria-expanded") === "true" ||
                          targetAccordion.getAttribute("data-state") === "open";

                        // Expand accordion if not already open
                        if (trigger && !isExpanded) {
                          trigger.click();
                        }

                        // Enhanced scroll with MOSIP blue visual feedback
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
                            40;

                          // Get current element position
                          const elementRect =
                            targetAccordion!.getBoundingClientRect();
                          const viewportHeight = window.innerHeight;

                          // Calculate optimal scroll position
                          const absoluteElementTop =
                            elementRect.top + window.pageYOffset;
                          const targetY = absoluteElementTop - navHeight - 20; // Extra 20px padding

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

                          // Add MOSIP blue visual highlight
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
                        setTimeout(performScroll, 350);
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
                          "Evaluation Criteria accordion not found. Available accordions:",
                          Array.from(
                            document.querySelectorAll("[data-state]")
                          ).map(
                            (el) => el.textContent?.substring(0, 50) + "..."
                          )
                        );
                      }
                    }, 150); // DOM readiness delay
                  };

                  navigateToEvaluationAccordion();
                }}
                className="inline-flex items-center gap-1 text-mosip-blue hover:text-mosip-dark-blue font-medium transition-all duration-300 hover:underline underline-offset-2 hover:shadow-sm rounded-md px-2 py-1 hover:bg-mosip-blue/5 group"
              >
                <BarChart3 className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                Visit Evaluation Criteria
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>{" "}
              for more details.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "prizes",
      title: "Prizes",
      icon: <img src={prizesIcon} alt="Prizes Icon" className="w-8 h-8" />,
      color: "#D64045",
      bgGradient: "from-[#D64045] to-[#B5353A]",
      borderColor: "border-[#D64045]",
      content: (
        <div className="space-y-6">
          {/* Top Winners */}
          <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-6 rounded-xl border-2 border-yellow-300">
            <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-600" />
              Top 6-8 Winning Solutions/Teams
            </h5>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Plane className="w-6 h-6 text-blue-600" />
                </div>
                <h6 className="font-semibold text-gray-900 mb-2">
                  Travel to MOSIP Connect 2026
                </h6>
                <p className="text-sm text-gray-600">
                  Win a return flight ticket (one per team) to Morocco to attend
                  MOSIP Connect 2026.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Monitor className="w-6 h-6 text-green-600" />
                </div>
                <h6 className="font-semibold text-gray-900 mb-2">
                  Showcase at MOSIP Create Solution Discovery Space
                </h6>
                <p className="text-sm text-gray-600">
                  Secure shared booth space in the MOSIP Create solution
                  discovery area to present your solution to a global audience.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h6 className="font-semibold text-gray-900 mb-2">
                  Main Stage Spotlight
                </h6>
                <p className="text-sm text-gray-600">
                  Get demo time on the MOSIP Connect main stage, showcasing your
                  work to delegates, partners, and decision-makers from around
                  the world.
                </p>
              </div>
            </div>
          </div>

          {/* All Completed Submissions */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border-2 border-blue-300">
            <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              All Completed Solution Submissions/Teams
              <Badge variant="outline" className="ml-2 text-xs">
                As per submission criteria
              </Badge>
            </h5>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className="bg-green-100 text-green-700">
                    Concept Catalyst Badge
                  </Badge>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  MOSIP Marketplace
                </h6>
                <p className="text-sm text-gray-600">
                  Earn the Concept Catalyst badge upon completing your solution,
                  showcasing your innovation in the MOSIP Marketplace.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Camera className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium">Video Feature</span>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  Display at MOSIP's Experience Center and Marketplace
                </h6>
                <p className="text-sm text-gray-600">
                  Have your solution video featured at MOSIP's Experience Center
                  at IIIT Bangalore and the MOSIP Marketplace. This exposure to
                  delegates and partner countries can lead to valuable
                  collaboration and growth opportunities.
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium">Recognition</span>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  Awards & Recognition
                </h6>
                <p className="text-sm text-gray-600">
                  Receive merit certificates and/or awards across various
                  categories, celebrating your contribution and impact.
                </p>
              </div>
            </div>
          </div>

          {/* Expert Jury */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-[#D64045]" />
              Expert Jury for Evaluation
            </h5>
            <p className="text-gray-700 mb-4">
              Winners will be chosen by an esteemed external panel comprising
              of:
            </p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gradient-to-b from-blue-50 to-blue-100 rounded-lg">
                <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                <h6 className="font-medium">International Technical Experts</h6>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-green-50 to-green-100 rounded-lg">
                <GraduationCap className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <h6 className="font-medium">Renowned Academic Leaders</h6>
              </div>
              <div className="text-center p-4 bg-gradient-to-b from-purple-50 to-purple-100 rounded-lg">
                <Handshake className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <h6 className="font-medium">
                  Practitioners from MOSIP Partner Countries
                </h6>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              Important Note
            </h5>
            <p className="text-sm text-gray-700">
              All decisions rest solely with the panelists/jury. The number of
              solutions selected may be higher or lower than indicated, based on
              the defined evaluation criteria. The decision of the
              panelists/jury will be final and binding.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "timeline",
      title: "Timeline",
      icon: <img src={timelineIcon} alt="Timeline Icon" className="w-8 h-8" />,
      color: "#014DAF",
      bgGradient: "from-[#014DAF] to-[#013D8A]",
      borderColor: "border-[#014DAF]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#014DAF]" />
              MOSIP Create 2025 Official Timeline
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Follow this comprehensive timeline to stay on track throughout the
              MOSIP Create journey.
            </p>
          </div>

          {/* Timeline Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#014DAF] to-[#013D8A] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Milestone
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <Play className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Event Launch & Opening of Registration
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      03-Sep-2025
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <Clock className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Registration Closure
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      01-Oct-2025
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-blue-100 p-2 rounded-lg mr-3">
                          <Video className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Kick-Off Webinar
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      06-Oct-2025
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                          <MessageCircle className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Bi-Weekly AMA Sessions
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      15-Oct-2025 onwards
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-red-100 p-2 rounded-lg mr-3">
                          <SendHorizontal className="w-4 h-4 text-red-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Solution Submission Closure
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      01-Dec-2025
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-yellow-100 p-2 rounded-lg mr-3">
                          <Eye className="w-4 h-4 text-yellow-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Evaluation: Panel-Level Demo
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      Until 20-Dec-2025
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-green-100 p-2 rounded-lg mr-3">
                          <Trophy className="w-4 h-4 text-green-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Winners Announcement
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      20-Dec-2025 to 24-Dec-2025 (All participants)
                      <br />
                      10-Feb-2026 (Official announcement)
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-orange-100 p-2 rounded-lg mr-3">
                          <Settings className="w-4 h-4 text-orange-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Preparation for Travel & Solution Showcase
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      24-Dec-2025 onwards
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="bg-purple-100 p-2 rounded-lg mr-3">
                          <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="font-medium text-gray-900">
                          Marketplace Listing
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      Before Connect 2026 | Continues...
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "submission",
      title: "Submission Criteria",
      icon: (
        <img
          src={submission_criteriaIcon}
          alt="Submission Criteria Icon"
          className="w-8 h-8"
        />
      ),
      color: "#FA8005",
      bgGradient: "from-[#FA8005] to-[#E8740A]",
      borderColor: "border-[#FA8005]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 p-6 rounded-xl border border-orange-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <SendHorizontal className="w-5 h-5 text-[#FA8005]" />
              Complete Submission Requirements
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Please follow the detailed submission format below to ensure your
              solution meets all the necessary requirements and standards:
            </p>
          </div>

          {/* Required Artefacts Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h5 className="font-bold text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Required Artefacts
              </h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      Artefact
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Solution Presentation or Slide Deck*
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Teams must have a presentation that outlines the problem,
                      solution, technology stack, target audience, and potential
                      impact of the solution. Used during the final pitch to the
                      jury, this slide deck should convey the project's value
                      proposition and key features.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Video Demo*
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      A team can submit a short video (typically 2-5 minutes)
                      that demonstrates the project in action. The video can
                      include live demos or screen recordings and should
                      demonstrate the problem being addressed, depict the
                      functioning of the solution, and highlight the main
                      characteristics of the project.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Camera className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          Video for Marketplace Showcase*
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Teams must submit a 3-minute use case video for the MOSIP
                      Marketplace, meeting the defined guidelines, intended to
                      showcase the core integration. This can include live demos
                      or screen recordings, with a refined marketing version
                      produced later for wider outreach.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Process */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <h5 className="font-bold text-white flex items-center gap-2">
                <ClipboardCheck className="w-5 h-5" />
                Solution Submission Process
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Please follow the guidelines below to submit your final
                deliverables for MOSIP Create.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 text-blue-600 font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    01
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900 mb-2">
                      Deliverables:
                    </h6>
                    <p className="text-sm text-gray-600">
                      Place the mandatory artefacts to a cloud storage
                      repository, e.g. Google Drive.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-green-100 text-green-600 font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    02
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900 mb-2">
                      Submit:
                    </h6>
                    <p className="text-sm text-gray-600 mb-3">
                      Fill out the{" "}
                      <button
                        onClick={onNavigateToSubmission}
                        className="text-gray-600 hover:text-gray-800 underline font-medium transition-colors duration-200"
                        disabled
                      >
                        submission form
                      </button>{" "}
                      with the following details and any other relevant
                      information:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>■ Team Name</li>
                      <li>■ Theme chosen</li>
                      <li>■ URLs (Google drive etc.)</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-purple-100 text-purple-600 font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">
                    03
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900 mb-2">
                      Access:
                    </h6>
                    <p className="text-sm text-gray-600">
                      Ensure all links and files are accessible to MOSIP and
                      have the necessary permissions.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={onNavigateToSubmission}
                  className="mosip-primary-button-orange font-semibold px-8 py-3"
                  size="lg"
                  disabled
                >
                  Submit Your Solution
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "evaluation",
      title: "Evaluation Criteria",
      icon: (
        <img
          src={evaluation_criteriaIcon}
          alt="Evaluation Criteria Icon"
          className="w-8 h-8"
        />
      ),
      color: "#6f42c1",
      bgGradient: "from-[#6f42c1] to-[#5d359a]",
      borderColor: "border-[#6f42c1]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#6f42c1]" />
              Comprehensive Evaluation Framework
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Solutions will be evaluated by expert panels using these weighted
              criteria. Focus on demonstrating excellence across all dimensions
              for maximum impact.
            </p>
          </div>

          {/* Evaluation Criteria Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#6f42c1] to-[#5d359a] text-white">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      Criteria
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Weight
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-medium text-gray-900">
                          Impact & Relevance
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Practical value and real-world application
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-blue-100 text-blue-700">25%</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      Solutions will be assessed based on their potential to
                      enhance people's lives, considering both the breadth and
                      depth of their societal or economic impact.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Code className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">
                          Integration with MOSIP Solutions
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Use of auth, eKYC, or wallet-based technologies
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-green-100 text-green-700">25%</Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      This criterion evaluates how effectively the solution
                      leverages MOSIP's core capabilities, such as
                      authentication, eKYC, and wallet-based technologies, to
                      deliver value. It focuses on the depth of integration
                      within the MOSIP ecosystem, and the potential to enable
                      secure and inclusive digital identity-driven services.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="font-medium text-gray-900">
                          Usability & Design
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          User-friendliness and inclusiveness
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-purple-100 text-purple-700">
                        20%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      This criterion evaluates the solution's ability to meet
                      the target group's needs while ensuring inclusiveness and
                      accessibility, with a focus on its intuitiveness,
                      user-friendliness, and aesthetic appeal.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Lightbulb className="w-4 h-4 text-yellow-600" />
                        <span className="font-medium text-gray-900">
                          Innovation
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Novelty and creativity of the idea
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-yellow-100 text-yellow-700">
                        15%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      This criterion evaluates the originality and creativity of
                      the solution, focusing on its distinctiveness from
                      existing approaches and its forward-thinking perspective.
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Settings className="w-4 h-4 text-orange-600" />
                        <span className="font-medium text-gray-900">
                          Feasibility, Scalability & Interoperability
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          Ease of implementation and potential to scale
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className="bg-orange-100 text-orange-700">
                        15%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      This criterion examines the practicality of implementing
                      the solution in real-world scenarios, its scalability
                      potential, and its adherence to open standards for
                      compatibility, interoperability and integration with
                      existing systems.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-600" />
              Important Note
            </h5>
            <p className="text-sm text-gray-700">
              We strongly encourage participants to submit new, innovative
              solutions aligned with the defined themes.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "resources",
      title: "Resources",
      icon: (
        <img src={resourcesIcon} alt="Resources Icon" className="w-8 h-8" />
      ),
      color: "#28a745",
      bgGradient: "from-[#28a745] to-[#218838]",
      borderColor: "border-[#28a745]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h4 className="font-bold text-gray-900 mb-3">
              Development Resources & Support
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Access all relevant MOSIP product resources in one place to help
              you understand the platform, explore integration options, and
              develop your solution effectively.
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-200">
              <h4 className="font-bold text-gray-900 mb-4">
                MOSIP Product Resources
              </h4>
              <p className="text-gray-700 leading-relaxed">
                Access all relevant MOSIP product resources in one place to help
                you understand the platform, explore integration options, and
                develop your solution effectively.
              </p>
            </div>

            <div className="space-y-8">
              {/* 1. MOSIP Identity Platform */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-l-4 border-[#01A2FD] shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="bg-gradient-to-r from-[#01A2FD] to-[#0077CC] text-white p-4 rounded-lg mb-6 -mx-2 -mt-2">
                  <h5 className="text-xl font-bold mb-2">
                    1. MOSIP Identity Platform
                  </h5>
                  <p className="text-blue-100 text-sm">
                    Core digital identity infrastructure
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                      <h6 className="font-semibold text-blue-900 mb-2">
                        1.1.{" "}
                        <a
                          href="https://docs.mosip.io/1.2.0"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#01A2FD] hover:text-[#0077CC] underline transition-colors duration-200"
                        >
                          Documentation
                        </a>
                      </h6>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                      <h6 className="font-semibold text-blue-900 mb-2">
                        1.2. Masterclass Sessions:
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div className="bg-blue-50 p-3 rounded-md border-l-3 border-[#01A2FD]">
                          <span className="font-medium text-blue-800">
                            1.2.a.{" "}
                          </span>
                          <a
                            href="https://youtu.be/3wd0TzqcCkE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#01A2FD] hover:text-[#0077CC] underline transition-colors duration-200"
                          >
                            Functional Overview
                          </a>
                        </div>
                        <div className="bg-blue-50 p-3 rounded-md border-l-3 border-[#01A2FD]">
                          <span className="font-medium text-blue-800">
                            1.2.b.{" "}
                          </span>
                          <a
                            href="https://www.youtube.com/watch?v=e3HJAmp2GRU"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#01A2FD] hover:text-[#0077CC] underline transition-colors duration-200"
                          >
                            Demo - ID Registration & Issuance Process
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200 shadow-sm">
                      <h6 className="font-semibold text-blue-900 mb-2">
                        1.3.{" "}
                        <a
                          href="https://www.youtube.com/channel/UCxvEtyjmc3_KR45BOKMLJLA"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#01A2FD] hover:text-[#0077CC] underline transition-colors duration-200"
                        >
                          MOSIP YouTube
                        </a>
                      </h6>
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Inji */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-l-4 border-[#0A8754] shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="bg-gradient-to-r from-[#0A8754] to-[#086B43] text-white p-4 rounded-lg mb-6 -mx-2 -mt-2">
                  <h5 className="text-xl font-bold mb-2">2. Inji</h5>
                  <p className="text-green-100 text-sm">
                    Digital wallet and credentialing ecosystem
                  </p>
                </div>

                <div className="space-y-6">
                  {/* 2.1. Inji Stack */}
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                      <h6 className="font-semibold text-green-900 mb-3">
                        2.1. Inji Stack
                      </h6>
                      <div className="ml-4 space-y-3">
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.1.1.{" "}
                          </span>
                          <a
                            href="https://docs.inji.io/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                          >
                            Documentation
                          </a>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.1.2. Masterclass Sessions:
                          </span>
                          <div className="ml-6 mt-2">
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.1.2.a.{" "}
                              </span>
                              <a
                                href="https://www.youtube.com/watch?v=WQI3qan8egY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Functional Overview & Demo
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2.2. Inji Wallet */}
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                      <h6 className="font-semibold text-green-900 mb-3">
                        2.2. Inji Wallet (Mobile & Web)
                      </h6>
                      <div className="ml-4 space-y-3">
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.2.1. Documentation:
                          </span>
                          <div className="ml-6 mt-2 space-y-1">
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.2.1.a.{" "}
                              </span>
                              <a
                                href="https://docs.inji.io/inji-wallet/inji-mobile/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Mobile Wallet
                              </a>
                            </div>
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.2.1.b.{" "}
                              </span>
                              <a
                                href="https://docs.inji.io/inji-wallet/inji-web/overview"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Web Wallet
                              </a>
                            </div>
                          </div>
                        </div>

                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.2.2. Masterclass Sessions:
                          </span>
                          <div className="ml-6 mt-2 space-y-2">
                            <div className="bg-green-100 p-3 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.2.2.a. Functional Overview & Demo:
                              </span>
                              <div className="ml-4 mt-1 space-y-1">
                                <div className="bg-white p-2 rounded border border-green-200">
                                  •{" "}
                                  <a
                                    href="https://www.youtube.com/watch?v=hO12UQXtkqI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                                  >
                                    Mobile Wallet
                                  </a>
                                </div>
                                <div className="bg-white p-2 rounded border border-green-200">
                                  •{" "}
                                  <a
                                    href="https://youtu.be/hcCn2AGe6AY"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                                  >
                                    Web Wallet
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="bg-green-100 p-3 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.2.2.b. Technical Overview:
                              </span>
                              <div className="ml-4 mt-1 space-y-1">
                                <div className="bg-white p-2 rounded border border-green-200">
                                  •{" "}
                                  <a
                                    href="https://youtu.be/yzK6arInf40"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                                  >
                                    Mimoto Setup: Wallet
                                  </a>
                                </div>
                                <div className="bg-white p-2 rounded border border-green-200">
                                  •{" "}
                                  <a
                                    href="https://youtu.be/QYUI-ovSVX8"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                                  >
                                    Local Setup Guide: Web Wallet
                                  </a>
                                </div>
                              </div>
                            </div>
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.2.2.c.{" "}
                              </span>
                              <a
                                href="https://www.youtube.com/watch?v=n8bUVpjtnF4"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Demo
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2.3. Inji Certify */}
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                      <h6 className="font-semibold text-green-900 mb-3">
                        2.3. Inji Certify
                      </h6>
                      <div className="ml-4 space-y-3">
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.3.1.{" "}
                          </span>
                          <a
                            href="https://docs.inji.io/inji-certify/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                          >
                            Documentation
                          </a>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.3.2. Masterclass Sessions:
                          </span>
                          <div className="ml-6 mt-2 space-y-1">
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.3.2.a.{" "}
                              </span>
                              <a
                                href="https://youtu.be/VdF3UpTb6wY"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Functional Overview
                              </a>
                            </div>
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.3.2.b.{" "}
                              </span>
                              <a
                                href="https://www.youtube.com/watch?v=r_HnbLYQfVo&list=PLJH-POb_55z_kaiEpAzaT_H4hUdGW6QcQ&index=13"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Technical Deep Dive - VC Issuance
                              </a>
                            </div>
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.3.2.c.{" "}
                              </span>
                              <a
                                href="https://youtu.be/3jMP-X8PAvM"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Local Setup & Deployment using Docker Compose
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2.4. Inji Verify */}
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200 shadow-sm">
                      <h6 className="font-semibold text-green-900 mb-3">
                        2.4. Inji Verify
                      </h6>
                      <div className="ml-4 space-y-3">
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.4.1.{" "}
                          </span>
                          <a
                            href="https://docs.inji.io/inji-verify/overview"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                          >
                            Documentation
                          </a>
                        </div>
                        <div className="bg-green-50 p-3 rounded-md border-l-3 border-[#0A8754]">
                          <span className="font-medium text-green-800">
                            2.4.2. Masterclass Sessions:
                          </span>
                          <div className="ml-6 mt-2 space-y-1">
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.4.2.a.{" "}
                              </span>
                              <a
                                href="https://youtu.be/0mDMG-4anaE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Functional Overview & Demo
                              </a>
                            </div>
                            <div className="bg-green-100 p-2 rounded border-l-2 border-[#0A8754]">
                              <span className="font-medium text-green-800">
                                2.4.2.b.{" "}
                              </span>
                              <a
                                href="https://youtu.be/odf_bo38NKI"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#0A8754] hover:text-[#086B43] underline transition-colors duration-200"
                              >
                                Technical Deep Dive
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. eSignet */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-lg border-l-4 border-[#FA8005] shadow-sm hover:shadow-md transition-all duration-300 p-6">
                <div className="bg-gradient-to-r from-[#FA8005] to-[#E5720A] text-white p-4 rounded-lg mb-6 -mx-2 -mt-2">
                  <h5 className="text-xl font-bold mb-2">3. eSignet</h5>
                  <p className="text-orange-100 text-sm">
                    Authentication and identity verification services
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                      <h6 className="font-semibold text-orange-900 mb-2">
                        3.1.{" "}
                        <a
                          href=" https://www.youtube.com/watch?v=ZfUPRv71s_0&t=3s"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                        >
                          About eSignet
                        </a>
                      </h6>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                      <h6 className="font-semibold text-orange-900 mb-2">
                        3.2.{" "}
                        <a
                          href="https://docs.esignet.io/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                        >
                          Documentation
                        </a>
                      </h6>
                    </div>
                  </div>

                  <div className="ml-4">
                    <div className="bg-white p-4 rounded-lg border border-orange-200 shadow-sm">
                      <h6 className="font-semibold text-orange-900 mb-2">
                        3.3. Masterclass Sessions:
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div className="bg-orange-50 p-3 rounded-md border-l-3 border-[#FA8005]">
                          <span className="font-medium text-orange-800">
                            3.3.a.{" "}
                          </span>
                          <a
                            href="https://youtu.be/etd7bBx0XTM"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                          >
                            Functional Overview & Demo
                          </a>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-md border-l-3 border-[#FA8005]">
                          <span className="font-medium text-orange-800">
                            3.3.b. Technical Overview:
                          </span>
                          <div className="ml-4 mt-1 space-y-1">
                            <div className="bg-orange-100 p-2 rounded border-l-2 border-[#FA8005]">
                              •{" "}
                              <a
                                href="https://www.youtube.com/watch?v=pcHux8GVrQE"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                              >
                                eSignet Authentication - Solution Building &
                                Integration
                              </a>
                            </div>
                            <div className="bg-orange-100 p-2 rounded border-l-2 border-[#FA8005]">
                              •{" "}
                              <a
                                href="https://www.youtube.com/watch?v=7XAxKm_YW7w&list=PLJH-POb_55z_kaiEpAzaT_H4hUdGW6QcQ&index=3"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                              >
                                eSignet Signup - Technical Deepdive
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="bg-orange-50 p-3 rounded-md border-l-3 border-[#FA8005]">
                          <span className="font-medium text-orange-800">
                            3.3.c.{" "}
                          </span>
                          <a
                            href="https://www.youtube.com/watch?v=uNKlmw9KRFg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[#FA8005] hover:text-[#E5720A] underline transition-colors duration-200"
                          >
                            Demo - Online Authentication
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "rules",
      title: "Rules",
      icon: <img src={rulesIcon} alt="Rules Icon" className="w-8 h-8" />,
      color: "#dc3545",
      bgGradient: "from-[#dc3545] to-[#c82333]",
      borderColor: "border-[#dc3545]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#dc3545]" />
              Official Competition Rules & Guidelines
            </h4>
            <p className="text-gray-700 leading-relaxed">
              All participants must adhere to these official rules and
              guidelines. Violation of any rule may result in disqualification
              from MOSIP Create 2025.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-blue-100 text-blue-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  1
                </div>
                <p className="text-gray-700">
                  This is a team participation event. You can have 1-10 members
                  in your team.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 text-green-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  2
                </div>
                <p className="text-gray-700">
                  MOSIP Create 2025 has 4 broad themes. Your solution must align
                  with one of these themes. While not mandatory, sticking to the
                  suggested problem statements is encouraged.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-purple-100 text-purple-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  3
                </div>
                <p className="text-gray-700">
                  You can submit your solution as many times as you want, and
                  the last submission within the specified window will be
                  considered for final evaluation.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 text-yellow-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  4
                </div>
                <p className="text-gray-700">
                  You may utilise open-source libraries, datasets (e.g., Kaggle,
                  Hugging Face), and freely available systems/services (e.g.,
                  Google Maps, Facebook Connect, Twitter feeds).
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-orange-100 text-orange-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  5
                </div>
                <p className="text-gray-700">
                  The intellectual property of your code belongs only to your
                  team.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div className="bg-red-100 text-red-600 font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  6
                </div>
                <p className="text-gray-700">
                  Participants are requested to adhere to the official{" "}
                  <a
                    href="https://docs.mosip.io/1.2.0/community/code-of-conduct"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Code of Conduct
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  ,{" "}
                  <a
                    href="https://www.mosip.io/ip_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    IP Policy
                    <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  and{" "}
                  <a
                    href="https://www.mosip.io/privacy_policy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                  >
                    Privacy Policy
                    <ExternalLink className="w-3 h-3" />
                  </a>{" "}
                  of MOSIP. The MOSIP team reserves the right to remove, edit,
                  or reject comments, commits, code, wiki edits, issues, and
                  other contributions that are not aligned to this Code of
                  Conduct , and will communicate reasons for moderation
                  decisions when appropriate.
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: "Contact Us",
      icon: (
        <img src={contant_usIcon} alt="Contact Us Icon" className="w-8 h-8" />
      ),
      color: "#17a2b8",
      bgGradient: "from-[#17a2b8] to-[#138496]",
      borderColor: "border-[#17a2b8]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-6 rounded-xl border border-cyan-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#17a2b8]" />
              Get in Touch
            </h4>
            <p className="text-gray-700 leading-relaxed">
              We're here to support you throughout your MOSIP Create journey.
              Choose the best way to reach us based on your needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Community Discussion Forum
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                For quick questions, discussions, or general queries about the
                event, visit our community forum.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <ExternalLink className="w-3 h-3 mr-2" />
                Visit Forum
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Direct Email Support
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                For targeted solution-specific queries, email us directly. We
                will respond or arrange one-on-one discussions.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Mail className="w-3 h-3 mr-2" />
                create@mosip.io
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Video className="w-6 h-6 text-purple-600" />
              </div>
              <h5 className="font-semibold text-gray-900 mb-2">
                Live AMA Sessions
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                You can also join us live for our bi-weekly AMA sessions
                starting 15-Oct-2025.
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Calendar className="w-3 h-3 mr-2" />
                Stay tuned for more updates!
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faqs",
      title: "FAQs",
      icon: <img src={faqsIcon} alt="FAQs Icon" className="w-8 h-8" />,
      color: "#6f42c1",
      bgGradient: "from-[#6f42c1] to-[#5d359a]",
      borderColor: "border-[#6f42c1]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-6 rounded-xl border border-purple-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-[#6f42c1]" />
              Frequently Asked Questions
            </h4>
            <p className="text-gray-700 leading-relaxed">
              Find answers to common questions about MOSIP Create 2025. Can't
              find what you're looking for? Contact our support team.
            </p>
          </div>

          <div className="space-y-6">
            {/* Registration and Idea Submission */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
                <h5 className="font-bold text-white">
                  Registration and Idea Submission
                </h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    1. Is there a registration fee? Do I need to pay any money
                    to register for MOSIP Create?
                  </h6>
                  <p className="text-sm text-gray-600">
                    No, registration for MOSIP Create is free.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    2. Do I need to have any specific qualifications to be a
                    participant for the event?
                  </h6>
                  <p className="text-sm text-gray-600">
                    No specific qualifications are required to participate in
                    the event. Anyone with a solution for integration
                    representing a registered organization is eligible to
                    participate in MOSIP Create.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    3. How many people can a team consist of?
                  </h6>
                  <p className="text-sm text-gray-600">
                    There can be a maximum of 10 members per team.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    4. How do I add more people to my team, or register as an
                    organisation?
                  </h6>
                  <p className="text-sm text-gray-600">
                    One participant can register on behalf of the entire team
                    using the form link provided here.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    5. How and where do I submit my idea?
                  </h6>
                  <p className="text-sm text-gray-600">
                    You can describe the Idea briefly during registration.
                  </p>
                </div>
              </div>
            </div>

            {/* Creating & Submitting Solutions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
                <h5 className="font-bold text-white">
                  Creating & Submitting Solutions
                </h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    6. How and where do I submit the deliverables?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Please refer to the Submission Criteria section for details.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    7. Do we need to have the solution fully working?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes, the solution must be implementable to be reviewed by
                    the jury.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    8. Can one team register across multiple themes?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes. Teams can submit solutions across multiple themes;
                    however, each organisation may submit a maximum of three of
                    their best solutions across all four themes.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    9. Does one have to be online and available for the entire
                    duration of the event?
                  </h6>
                  <p className="text-sm text-gray-600">
                    No, one does not need to be logged in or be online for the
                    entire duration. You can develop the application on your
                    local system based on the given themes and then submit it as
                    per the submission process defined.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    10. Will there be any training?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes, participants will have access to training resources and
                    regular AMA sessions, including ad-hoc calls on request
                    basis. Write to us at create@mosip.io, and we can
                    accommodate your ad-hoc requests to connect.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    11. Do I need to give a demo for the solution that I have
                    built?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes, providing a demo of your solution is mandatory.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    12. Are there any specific technologies or programming
                    languages we must use?
                  </h6>
                  <p className="text-sm text-gray-600">
                    No specific technologies or programming languages are
                    required; however, your solution must include at least one
                    MOSIP touch point.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    13. Are we allowed to use third party components like open
                    source libraries etc. to implement a solution - are there
                    limitations on components?
                  </h6>
                  <p className="text-sm text-gray-600">
                    You may utilise open-source libraries, datasets and freely
                    available systems/services.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    14. How is the environment? Will your environment support
                    any language?
                  </h6>
                  <p className="text-sm text-gray-600">
                    MOSIP will provide a sandbox environment, called MOSIP
                    Collab/Synergy, which supports English, French, and Arabic.
                    In the interim, participants may begin developing solutions
                    in their own local environments.
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    Please note that all data in the sandbox environment will be
                    securely deleted upon conclusion of the event.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    15. How do I submit my final deliverables/artefacts?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Follow the submission process outlined in the Submission
                    Criteria section to share your final deliverables/artefacts
                    for MOSIP Create.
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
                <h5 className="font-bold text-white">Results</h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    16. How do I know if my solution was shortlisted?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Results will be communicated to participants via email from
                    create@mosip.io or through the SPOC's phone number provided
                    in the registration form. In addition, a formal announcement
                    of the winners will be made to the larger ecosystem and
                    community at MOSIP Connect 2026, where winners will be
                    formally acknowledged.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    17. Who will own the IP (Intellectual Property) Rights of
                    the product/code that I have built?
                  </h6>
                  <p className="text-sm text-gray-600">
                    The developer/developers of the solution will have all
                    rights and own the IP of the solution submitted.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    18. Will I be able to sell/commercialise my projects after
                    the event?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes, you will retain the rights to sell or commercialise
                    your project after the event.
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    19. Will MOSIP take care of the travel and accommodation
                    arrangements for MOSIP Connect 2026?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Yes. MOSIP will arrange travel and accommodation for one
                    representative from each of the top six to eight winning
                    teams.
                  </p>
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
                <h5 className="font-bold text-white">Communication</h5>
              </div>
              <div className="p-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    20. What platforms will be used for communication and
                    collaboration?
                  </h6>
                  <p className="text-sm text-gray-600">
                    Primary communication will be through the community forum at
                    community.mosip.io for general queries, email at
                    create@mosip.io for solution-specific questions, and regular
                    AMA sessions for live interactions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "terms-conditions",
      title: "Terms & Conditions",
      icon: (
        <img
          src={terms_and_conditionsIcon}
          alt="Terms & Conditions Icon"
          className="w-8 h-8"
        />
      ),
      color: "#495057",
      bgGradient: "from-[#495057] to-[#343a40]",
      borderColor: "border-[#495057]",
      content: (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-6 rounded-xl border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-[#495057]" />
              MOSIP CREATE PRIVACY POLICY
            </h4>
            <p className="text-gray-700 leading-relaxed">
              This Privacy Policy ("Policy") contains information about the
              collection, use, storage, and processing of personal data
              collected in connection with your registration and participation
              in the competition, MOSIP Create.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
              <h5 className="font-bold text-white">Controller Information</h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                MOSIP Create is organised by The International Institute of
                Information Technology, Bangalore (hereinafter referred to as
                "MOSIP", "us", "we", "our"), which will be the controller of
                your personal data.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-green-500 to-green-600 p-4">
              <h5 className="font-bold text-white">Applicability</h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                This Policy applies to all registrants, participants, judges,
                speakers, guests, and any other persons engaged with MOSIP
                Create ("you", "your").
              </p>
              <p className="text-gray-700">
                Your protection and security is important to us. We have
                designed the event in a manner that only personal and other
                information required for your participation and our public
                display and promotion of the event(s) is collected.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 p-4">
              <h5 className="font-bold text-white">What data do we collect?</h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                To organise and conduct MOSIP Create we will collect the
                personal data related to you as described below:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Information required for your registration i.e. full name,
                  email address, phone number, and username/ nickname.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Team name and team participants' information (in the event you
                  apply as a group). You are responsible to procure relevant
                  consents from any participants that you sign up for MOSIP
                  Create.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Physical address or any address for receipt of physical
                  delivery of awards or certificates.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Your profession, designation, field of work, professional
                  experience, organisation/ institution/ affiliated association
                  or company.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Photographs and video recordings made through your
                  participation in MOSIP Create.
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                  Additional information that can be provided through MOSIP
                  Create, its related events, social media, or other types of
                  interaction with us.
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4">
              <h5 className="font-bold text-white">
                Why do we collect your data?
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                MOSIP will use the personal data directly collected from you in
                accordance with the following purposes:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  In order to conduct, broadcast, deliberate upon, and otherwise
                  organise MOSIP Create
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  In order to provide you with the resources necessary to
                  participate in MOSIP Create, including any necessary materials
                  or audio-video conferencing services
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  In order to provide you with any administrative or technical
                  assistance
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  To communicate with you regarding MOSIP Create
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  Where we need to comply with a legal or regulatory obligation
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                We will not use personal data for any other purpose than the
                above-stated purposes unless it is necessitated by laws and
                regulations. Where required under applicable law, we will
                procure your consent before any change in processing your
                personal data.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4">
              <h5 className="font-bold text-white">
                How do we store your data?
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Your personal data will be held in a secure environment by
                MOSIP. Access to your personal data is limited to those
                personnel of MOSIP that require it, and only for the purposes
                outlined above. MOSIP maintains appropriate technical and
                organisational measures to protect against unauthorised or
                unlawful processing of personal data and/or against accidental
                loss, alteration, disclosure or access, or accidental or
                unlawful destruction of or damage to personal data.
              </p>
              <p className="text-gray-700">
                MOSIP will keep your personal data for a maximum period of 90
                days after declaring the results of MOSIP Create. We will delete
                your personal data when it is no longer required for the
                purposes stated earlier.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 p-4">
              <h5 className="font-bold text-white">
                Do we disclose any information to outside parties?
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                We do not sell, trade, or otherwise transfer to outside parties
                your personally identifiable information. This does not include
                trusted third parties who assist us in operating our site,
                conducting our business, or servicing you, so long as those
                parties agree to keep this information confidential. We may also
                release your information when we believe release is appropriate
                to comply with the law, enforce our site policies, or protect
                ours or others rights, property, or safety.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-pink-500 to-pink-600 p-4">
              <h5 className="font-bold text-white">
                How do we protect children's data?
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Another part of our priority is adding protection for children
                while using the internet. We encourage parents and guardians to
                observe, participate in, and/or monitor and guide their online
                activity.
              </p>
              <p className="text-gray-700">
                MOSIP does not knowingly collect any Personal Identifiable
                Information from children under the age of 13. If you think that
                your child provided this kind of information on our website, we
                strongly encourage you to contact us immediately and we will do
                our best efforts to promptly remove such information from our
                records.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-4">
              <h5 className="font-bold text-white">
                What are your rights over the collected data?
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                You have certain rights regarding your personal data, subject to
                applicable laws. These include the following rights to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  Access your personal data
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  Rectify the personal data that MOSIP holds about you
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  Erase your personal data
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  Object to MOSIP's use of your personal data
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                If you believe that your personal data has been misused, leaked,
                or mishandled, you can file a complaint with the Data Protection
                Board.
              </p>
              <p className="text-gray-700 mt-4">
                If you would like to discuss or exercise such rights, please
                contact legal@mosip.io. However, please note that the applicable
                law may restrict your right to exercise some of the
                above-mentioned rights. We will contact you if we need
                additional information from you in order to honour your
                requests.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 p-4">
              <h5 className="font-bold text-white">Contact Information</h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700">
                For any questions regarding this Policy, please contact
                legal@mosip.io who will respond to your inquiry without undue
                delay.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="bg-gradient-to-r from-slate-500 to-slate-600 p-4">
              <h5 className="font-bold text-white">Updates</h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                In case of any changes to this Policy, we will update it on this
                page.
              </p>
              <p className="text-gray-700">
                This document is CC-BY-SA. It was last updated September 5th,
                2024.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="accordion-sections" className="py-16 bg-gray-50">
      <div
        id="accordion-sections"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-gray-200 mb-4">
            <Info className="w-4 h-4 text-[#01A2FD]" />
            <span className="text-sm font-medium text-gray-600">
              Program Details
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive information about MOSIP Create 2025, from program
            details to submission guidelines
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Accordion
            type="single"
            collapsible
            className="space-y-4"
            value={openAccordionValue}
            onValueChange={handleAccordionChange}
          >
            {accordionData.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-none"
              >
                <div ref={(el) => (accordionRefs.current[item.id] = el)}>
                  <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <AccordionTrigger className="px-0 py-0 hover:no-underline [&>svg]:hidden">
                      <div
                        className={`flex items-center gap-4 text-left transition-all duration-300 rounded-lg p-6 w-full ${
                          openAccordionValue === item.id
                            ? `bg-gradient-to-r ${item.bgGradient} text-white`
                            : "bg-white text-gray-900"
                        }`}
                      >
                        <div
                          className={`p-3 rounded-lg transition-all duration-300 ${
                            openAccordionValue === item.id
                              ? "bg-white"
                              : "bg-gray-100"
                          }`}
                        >
                          {React.cloneElement(item.icon, {
                            style: {
                              color:
                                openAccordionValue === item.id
                                  ? "white"
                                  : item.color,
                            },
                          })}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold transition-all duration-300 ${
                              openAccordionValue === item.id
                                ? "text-white"
                                : "text-gray-900"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center ml-4">
                          {openAccordionValue === item.id ? (
                            <Minus className="w-5 h-5 transition-all duration-300 text-white" />
                          ) : (
                            <Plus
                              className="w-5 h-5 transition-all duration-300"
                              style={{ color: item.color }}
                            />
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <CardContent className="px-6 pb-6 pt-2">
                        {item.content}
                      </CardContent>
                    </AccordionContent>
                  </Card>
                </div>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default AccordionSections;
