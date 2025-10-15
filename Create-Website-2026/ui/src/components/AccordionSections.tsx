"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { color, motion } from "motion/react";
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
  Calendar,
  CheckCircle,
  Mail,
  ExternalLink,
  Link as LinkIcon,
  Info,
  CreditCard as CreditCardIcon,
  Plus,
  Minus,
} from "lucide-react";
import networkIcon from "../assets/7100cbf2bdd2edf857b1756b0e7a3e017056d5d3.png";
import ekycIcon from "../assets/3cbf525c4ed461404eed76541658d2ca2685726c.png";
import financialIcon from "../assets/4a90e15aa62cda3b74c6a98b571e5a25425ea5ef.png";
import credentialIcon from "../assets/0cabc3e0a8a5beb5dd7faa4d916036fcfd8f9a2b.png";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

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
  const { t, i18n } = useTranslation();

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
      title: t("accordion.whatIsMosipCreateTitle"),
      color: "#00A2E5",
      borderColor: "border-[#01A2FD]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-4">
              {t("accordion.flagshipProgram")}
            </h4>
            <div className="prose prose-sm max-w-none">
              <p className="text-white leading-relaxed mb-4">
                {t("accordion.programDescription1")}
              </p>
              <p className="text-white leading-relaxed">
                {t("accordion.programDescription2")}
              </p>
            </div>
          </div>

          <div
            className="p-4 rounded-lg border border-gray-200"
            style={{ backgroundColor: "#F58020" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.globalOpportunitiesTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.globalOpportunitiesText")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.dpiSolutionsTitle")}
              </h5>
              <p className="text-sm text-gray-600">
                {t("accordion.dpiSolutionsText")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.countriesAccessTitle")}
              </h5>
              <p className="text-sm text-gray-600">
                {t("accordion.countriesAccessText")}
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.globalVisibilityTitle")}
              </h5>
              <p className="text-sm text-gray-600">
                {t("accordion.globalVisibilityText")}
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "who-is-mosip-create-for",
      title: t("accordion.whoIsMosipCreateForTitle"),
      color: "#FEC40D",
      borderColor: "border-[#0A8754]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-4">
              {t("accordion.onlineProgramTitle")}
            </h4>
            <p className="text-white leading-relaxed mb-4">
              {t("accordion.onlineProgramText")}
            </p>

            <div className="bg-white p-4 rounded-lg border border-gray-200 mt-4">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.readyToStartTitle")}
              </h5>
              <p className="text-sm text-gray-600 mb-3">
                <Trans
                  i18nKey="accordion.readyToStartRichText"
                  components={{ bold: <strong /> }}
                />
              </p>
              <Button
                variant="default"
                size="lg"
                className="mosip-primary-button font-semibold"
                onClick={onNavigateToSubmission}
              >
                {t("accordion.submitYourSolution")}
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              {t("accordion.platformIntegrationTitle")}
            </h5>
            <p className="text-sm text-gray-700">
              <Trans
                i18nKey="accordion.platformIntegrationNote"
                components={{ bold: <strong /> }}
              />
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "themes",
      title: t("accordion.themesTitle"),
      color: "#F58020",
      borderColor: "border-[#FEC401]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3">
              {t("accordion.unGoalsTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.unGoalsText")}
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
                  {t("accordion.digitalIdThemeTitle")}
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  {t("accordion.digitalIdThemeSubtitle")}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("accordion.digitalIdThemeText")}
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
                  {t("accordion.ekycThemeTitle")}
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  {t("accordion.ekycThemeSubtitle")}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("accordion.ekycThemeText")}
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
                  {t("accordion.financialThemeTitle")}
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  {t("accordion.financialThemeSubtitle")}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("accordion.financialThemeText")}
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
                  {t("accordion.credentialThemeTitle")}
                </h5>
              </div>
              <div className="p-5">
                <p className="text-gray-700 mb-4 font-medium">
                  {t("accordion.credentialThemeSubtitle")}
                </p>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {t("accordion.credentialThemeText")}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              {t("accordion.sdgContributionTitle")}
            </h5>
            <p className="text-gray-700 leading-relaxed mb-3">
              <Trans
                i18nKey="accordion.sdgContributionText1"
                components={{
                  sdgLink: (
                    <a
                      href="https://sdgs.un.org/goals"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-800 font-medium underline transition-colors duration-200"
                    />
                  ),
                }}
              />
            </p>
            <p className="text-sm text-gray-600">
              {t("accordion.sdgContributionText2")}{" "}
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
                {t("accordion.visitEvaluation")}
                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
              </a>{" "}
              {t("accordion.forMoreDetails")}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "prizes",
      title: t("accordion.prizesTitle"),
      color: "#D64246",
      borderColor: "border-[#D64045]",
      content: (
        <div className="space-y-6">
          {/* Top Winners */}
          <div
            className="p-6 rounded-xl border-2 border-gray-300"
            style={{ backgroundColor: "#F58020" }}
          >
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              {t("accordion.topWinnersTitle")}
            </h5>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <h6 className="font-semibold text-gray-900 mb-2">
                  {t("accordion.connectTravelTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.connectTravelText")}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <h6 className="font-semibold text-gray-900 mb-2">
                  {t("accordion.discoverySpaceTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.discoverySpaceText")}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                <h6 className="font-semibold text-gray-900 mb-2">
                  {t("accordion.mainStageTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.mainStageText")}
                </p>
              </div>
            </div>
          </div>

          {/* All Completed Submissions */}
          <div
            className="p-6 rounded-xl border-2 border-gray-300"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h5 className="font-bold text-white mb-4 flex items-center gap-2">
              {t("accordion.allSubmissionsTitle")}
              <Badge
                variant="outline"
                className="ml-2 text-xs text-white onBadgeHover"
                onClick={() => setOpenAccordionValue("submission")}
              >
                {t("accordion.submissionCriteriaBadge")}
              </Badge>
            </h5>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className="text-white"
                    style={{ backgroundColor: "#00A2E5" }}
                  >
                    {t("accordion.catalystBadge")}
                  </Badge>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  {t("accordion.marketplaceTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.marketplaceText")}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className="text-white"
                    style={{ backgroundColor: "#F58020" }}
                  >
                    {t("accordion.videoFeatureBadge")}
                  </Badge>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  {t("accordion.experienceCenterTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.experienceCenterText")}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    className="text-white"
                    style={{ backgroundColor: "#098855" }}
                  >
                    {t("accordion.recognitionBadge")}
                  </Badge>
                </div>
                <h6 className="font-medium text-gray-900 mb-2">
                  {t("accordion.awardsTitle")}
                </h6>
                <p className="text-sm text-gray-600">
                  {t("accordion.awardsText")}
                </p>
              </div>
            </div>
          </div>

          {/* Expert Jury */}
          <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
            <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              {t("accordion.juryTitle")}
            </h5>
            <p className="text-gray-700 mb-4">{t("accordion.juryText")}</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div
                className="text-center p-4 rounded-lg text-white"
                style={{ backgroundColor: "#00A2E5" }}
              >
                <h6 className="font-medium">{t("accordion.techExperts")}</h6>
              </div>
              <div
                className="text-center p-4 rounded-lg text-white"
                style={{ backgroundColor: "#F58020" }}
              >
                <h6 className="font-medium">
                  {t("accordion.academicLeaders")}
                </h6>
              </div>
              <div
                className="text-center p-4 rounded-lg text-white"
                style={{ backgroundColor: "#098855" }}
              >
                <h6 className="font-medium">{t("accordion.practitioners")}</h6>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              {t("accordion.importantNoteTitle")}
            </h5>
            <p className="text-sm text-gray-700">
              {t("accordion.importantNoteText")}
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "timeline",
      title: t("accordion.timelineTitle"),
      color: "#098855",
      borderColor: "border-[#014DAF]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-blue-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.timelineOfficialTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.timelineText")}
            </p>
          </div>

          {/* Timeline Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className="text-white"
                  style={{ backgroundColor: "#00A2E5" }}
                >
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      {t("accordion.milestone")}
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      {t("accordion.date")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#098855" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.launchAndRegistration")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.launchAndRegistrationDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#D64246" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.registrationClosure")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.registrationClosureDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#FEC40D" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.amaSessions")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.amaSessionsDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#00A2E5" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.submissionClosure")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.submissionClosureDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#1B52A4" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.evaluationDemo")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.evaluationDemoDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#098855" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.winnersAnnouncement")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      <Trans
                        i18nKey="accordion.winnersAnnouncementDate"
                        components={{
                          brTag: <br />,
                        }}
                      />
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#D64246" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.showcasePreparation")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.showcasePreparationDate")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="p-2 rounded-lg mr-3"
                          style={{ backgroundColor: "#F58020" }}
                        ></div>
                        <span className="font-medium text-gray-900">
                          {t("accordion.marketplaceListing")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-[#014DAF]">
                      {t("accordion.marketplaceListingDate")}
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
      title: t("accordion.submissionCriteriaTitle"),
      color: "#1B52A4",
      borderColor: "border-[#FA8005]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-orange-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.submissionRequirementsTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.submissionRequirementsText")}
            </p>
          </div>

          {/* Required Artefacts Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4" style={{ backgroundColor: "#098855" }}>
              <h5 className="font-bold text-white flex items-center gap-2">
                {t("accordion.requiredArtefactsTitle")}
              </h5>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      {t("accordion.artefact")}
                    </th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-900">
                      {t("accordion.description")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.presentationTitle")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.presentationText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.videoDemoTitle")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.videoDemoText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.marketplaceVideoTitle")}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.marketplaceVideoText")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Submission Process */}
          <div
            className="bg-white rounded-lg border border-gray-200 shadow-sm"
            id="submission-process"
          >
            <div className="p-4" style={{ backgroundColor: "#00A2E5" }}>
              <h5 className="font-bold text-white flex items-center gap-2">
                {t("accordion.submissionProcessTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                {t("accordion.submissionProcessText")}
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div
                    className="font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: "#F58020" }}
                  >
                    1
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900">
                      {t("accordion.step2Title")}
                    </h6>
                    <p className="text-sm text-gray-600">
                      <Trans
                        i18nKey="accordion.step2Text1"
                        components={{
                          formLink: (
                            <button
                              onClick={onNavigateToSubmission}
                              className="text-gray-600 hover:text-gray-800 underline font-medium transition-colors duration-200"
                              style={{ minHeight: "auto" }}
                            />
                          ),
                        }}
                      />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: "#098855" }}
                  >
                    2
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900">
                      {t("accordion.step1Title")}
                    </h6>
                    <p className="text-sm text-gray-600">
                      {t("accordion.step1TextPart1")}{" "}
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setOpenAccordionValue("submission");

                          // wait for DOM update
                          requestAnimationFrame(() => {
                            const el = document.getElementById("submission");
                            if (el) {
                              const yOffset = -100; // adjust if you have a fixed header
                              const y =
                                el.getBoundingClientRect().top +
                                window.pageYOffset +
                                yOffset;
                              window.scrollTo({ top: y, behavior: "smooth" });
                            }
                          });
                        }}
                        className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                      >
                        {t("accordion.step1TextPart2")}
                      </a>{" "}
                      {t("accordion.step1TextPart3")}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div
                    className="text-white font-bold text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  >
                    3
                  </div>
                  <div>
                    <h6 className="font-semibold text-gray-900">
                      {t("accordion.step3Title")}
                    </h6>
                    <p className="text-sm text-gray-600">
                      {t("accordion.step3Text")}
                    </p>
                  </div>
                </div>

                <p>{t("accordion.step1SubText")}</p>
              </div>

              <div className="text-center mt-8">
                <Button
                  onClick={onNavigateToSubmission}
                  className="mosip-primary-button-orange font-semibold px-8 py-3"
                  size="lg"
                >
                  {t("accordion.submitYourSolution")}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "evaluation",
      title: t("accordion.evaluationTitle"),
      color: "#00A2E5",
      borderColor: "border-[#6f42c1]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.evaluationFrameworkTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.evaluationFrameworkText")}
            </p>
          </div>

          {/* Evaluation Criteria Table */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead
                  className="text-white"
                  style={{ backgroundColor: "#1B52A4" }}
                >
                  <tr>
                    <th className="px-6 py-3 text-left font-semibold">
                      {t("accordion.criteriaTableTitle")}
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      {t("accordion.weightTableTitle")}
                    </th>
                    <th className="px-6 py-3 text-left font-semibold">
                      {t("accordion.descriptionTableTitle")}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.impactTitle")}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {t("accordion.impactSubtitle")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className="bg-blue-100 text-white"
                        style={{ backgroundColor: "#00A2E5" }}
                      >
                        25%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.impactText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.integrationTitle")}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {t("accordion.integrationSubtitle")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: "#098855" }}
                      >
                        25%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.integrationText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.usabilityTitle")}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {t("accordion.usabilitySubtitle")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: "#D64246" }}
                      >
                        20%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.usabilityText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.innovationTitle")}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {t("accordion.innovationSubtitle")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: "#1B52A4" }}
                      >
                        15%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.innovationText")}
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-gray-900">
                          {t("accordion.feasibilityTitle")}
                        </span>
                        <div className="text-xs text-gray-500 mt-1">
                          {t("accordion.feasibilitySubtitle")}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        className="text-white"
                        style={{ backgroundColor: "#F58020" }}
                      >
                        15%
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {t("accordion.feasibilityText")}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-gradient-to-r from-amber-50 to-yellow-50 p-4 rounded-lg border border-amber-200">
            <h5 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              {t("accordion.importantNoteTitle")}
            </h5>
            <p className="text-sm text-gray-700">
              <Trans
                i18nKey="accordion.themesNote"
                components={{
                  themesLink: (
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenAccordionValue("themes");

                        // wait for DOM update
                        requestAnimationFrame(() => {
                          const el = document.getElementById("themes");
                          if (el) {
                            const yOffset = -100; // adjust if you have a fixed header
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset +
                              yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        });
                      }}
                      className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                    />
                  ),
                }}
              />
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "resources",
      title: t("accordion.resourcesTitle"),
      color: "#FEC40D",
      borderColor: "border-[#28a745]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-4">
              {t("accordion.productResourcesTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.productResourcesText")}
            </p>
          </div>

          <div className="space-y-8">
            {/* MOSIP Identity Platform */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#00A2E5" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">
                {t("accordion.platformResourcesTitle")}
              </h5>

              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.documentationTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://docs.mosip.io/1.2.0"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.platformDocsLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle")}
                  </h6>
                  <div className="ml-4 space-y-2">
                    <div>
                      <a
                        href="https://youtu.be/3wd0TzqcCkE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.mosipFunctionalOverviewLink")}
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/watch?v=e3HJAmp2GRU"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.idRegistrationDemoLink")}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.mosipYoutubeChannelTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://www.youtube.com/channel/UCxvEtyjmc3_KR45BOKMLJLA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.mosipYoutubeChannelLink")}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Inji Stack */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#098855" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">Inji Stack</h5>

              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.injiStackTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://docs.inji.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.injiStackDocsLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle")}
                  </h6>
                  <div className="ml-4">
                    <div>
                      <a
                        href="https://www.youtube.com/watch?v=WQI3qan8egY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiStackOverviewDemoLink")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inji Wallet (Mobile & Web) */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#D64246" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">
                {t("accordion.injiWalletTitle")}
              </h5>

              <div className="space-y-6">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.documentationTitle")}
                  </h6>
                  <div className="ml-4 space-y-2">
                    <div>
                      <a
                        href="https://docs.inji.io/inji-wallet/inji-mobile/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiWalletMobileDocsLink")}
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://docs.inji.io/inji-wallet/inji-web/overview"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiWalletWebDocsLink")}
                      </a>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle")}
                  </h6>
                  <div className="ml-4 space-y-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.injiWalletOverviewDemoTitle")}
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=hO12UQXtkqI"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.injiWalletMobileOverviewDemoLink")}
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://youtu.be/hcCn2AGe6AY"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.injiWalletWebOverviewDemoLink")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.injiWalletTechnicalOverviewTitle")}
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div>
                          <a
                            href="https://youtu.be/yzK6arInf40"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.mimotoSetupLink")}
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://youtu.be/QYUI-ovSVX8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.localSetupWebWalletLink")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.injiWalletDemosTitle")}
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=9Z1WuTd8q0M"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.vcDownloadOfflineAuthLink")}
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=n8bUVpjtnF4"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.vcDownloadEsignedLink")}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inji Certify */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#1B52A4" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">
                {t("accordion.injiCertifyTitle")}
              </h5>

              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.documentationTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://docs.inji.io/inji-certify/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.injiCertifyDocsLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle")}
                  </h6>
                  <div className="ml-4 space-y-2">
                    <div>
                      <a
                        href="https://youtu.be/VdF3UpTb6wY"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.mosipFunctionalOverviewLink")}
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://www.youtube.com/watch?v=r_HnbLYQfVo&list=PLJH-POb_55z_kaiEpAzaT_H4hUdGW6QcQ&index=13"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiVerifyDocsLink")}
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://youtu.be/3jMP-X8PAvM"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiCertifyLocalSetupLink")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Inji Verify */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#098855" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">Inji Verify</h5>

              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.documentationTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://docs.inji.io/inji-verify/overview"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.injiVerifyDocsLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle")}
                  </h6>
                  <div className="ml-4 space-y-2">
                    <div>
                      <a
                        href="https://youtu.be/0mDMG-4anaE"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiStackOverviewDemoLink")}
                      </a>
                    </div>
                    <div>
                      <a
                        href="https://youtu.be/odf_bo38NKI"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                      >
                        {t("accordion.injiVerifyTechDeepDiveLink")}
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* eSignet */}
            <div
              className="rounded-lg shadow-sm p-6"
              style={{ backgroundColor: "#F58020" }}
            >
              <h5 className="text-xl font-bold text-white mb-6">
                {t("accordion.esignetTitle")}
              </h5>

              <div className="space-y-4">
                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.aboutEsignetTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://www.youtube.com/watch?v=ZfUPRv71s_0&t=3s"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.introEsignetLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.esignetDocsTitle")}
                  </h6>
                  <div className="ml-4">
                    <a
                      href="https://docs.esignet.io/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                    >
                      {t("accordion.esignetDocsLink")}
                    </a>
                  </div>
                </div>

                <div>
                  <h6 className="font-semibold text-white mb-3">
                    {t("accordion.masterclassSessionsTitle3")}
                  </h6>
                  <div className="ml-4 space-y-4">
                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.injiWalletOverviewDemoTitle")}
                      </h6>
                      <div className="ml-4">
                        <a
                          href="https://youtu.be/etd7bBx0XTM"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                        >
                          {t("accordion.esignetFunctionalOverviewLink")}
                        </a>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.technicalOverviewTitle")}
                      </h6>
                      <div className="ml-4 space-y-2">
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=pcHux8GVrQE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.esignetAuthLink")}
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=7XAxKm_YW7w&list=PLJH-POb_55z_kaiEpAzaT_H4hUdGW6QcQ&index=3"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.esignetSignupLink")}
                          </a>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h6 className="font-medium text-white mb-2">
                        {t("accordion.demoTitle")}
                      </h6>
                      <div className="ml-4">
                        <div>
                          <a
                            href="https://www.youtube.com/watch?v=uNKlmw9KRFg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white hover:text-blue-100 underline transition-colors duration-200 font-medium"
                          >
                            {t("accordion.onlineAuthDemoLink")}
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
      title: t("accordion.rulesTitle"),
      color: "#F58020",
      borderColor: "border-[#dc3545]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.officialRulesTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.officialRulesText")}
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#1B52A4" }}
                >
                  1
                </div>
                <p className="text-gray-700">{t("accordion.rule1")}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#098855" }}
                >
                  2
                </div>
                <p className="text-gray-700">{t("accordion.rule2")}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#00A2E5" }}
                >
                  3
                </div>
                <p className="text-gray-700">{t("accordion.rule3")}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#FEC40D" }}
                >
                  4
                </div>
                <p className="text-gray-700">{t("accordion.rule4")}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#F58020" }}
                >
                  5
                </div>
                <p className="text-gray-700">{t("accordion.rule5")}</p>
              </div>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6">
              <div className="flex items-start gap-3">
                <div
                  className="text-white font-bold text-lg w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#D64246" }}
                >
                  6
                </div>
                <p className="text-gray-700">
                  <Trans
                    i18nKey="accordion.rule6"
                    components={{
                      conductLink: (
                        <a
                          href="https://docs.mosip.io/1.2.0/community/code-of-conduct"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ),
                      ipLink: (
                        <a
                          href="https://www.mosip.io/ip_policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ),
                      privacyLink: (
                        <a
                          href="https://www.mosip.io/privacy_policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#01A2FD] hover:text-[#0056cc] underline underline-offset-2 hover:no-underline transition-colors duration-200 inline-flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ),
                    }}
                  />
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "contact",
      title: t("accordion.contactTitle"),
      color: "#D64246",
      borderColor: "border-[#17a2b8]",
      content: (
        <div className="space-y-6">
          <div
            className="text-white p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.getInTouchTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.getInTouchText")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.communityForumTitle")}
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                {t("accordion.communityForumText")}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a
                  href="https://community.mosip.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-3 h-3 mr-2" />
                  {t("accordion.visitForum")}
                </a>
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.directEmailTitle")}
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                {t("accordion.directEmailText")}
              </p>
              <Button asChild variant="outline" size="sm" className="w-full">
                <a href="mailto:create@mosip.io">
                  <Mail className="w-3 h-3 mr-2" />
                  create@mosip.io
                </a>
              </Button>
            </div>

            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 text-center">
              <h5 className="font-semibold text-gray-900 mb-2">
                {t("accordion.liveAmaSessionsTitle")}
              </h5>
              <p className="text-sm text-gray-600 mb-4">
                {t("accordion.liveAmaSessionsText")}
              </p>
              <Button
                variant="outline"
                size="sm"
                className="w-full"
                style={{ marginTop: "1.3em", padding: "0.5rem 0.75rem" }}
                disabled
              >
                <Calendar className="w-3 h-3 mr-2" />
                {t("accordion.stayTuned")}
              </Button>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "faqs",
      title: t("accordion.faqsTitle"),
      color: "#098855",
      borderColor: "border-[#6f42c1]",
      content: (
        <div className="space-y-6">
          <div
            className="text-white p-6 rounded-xl border border-purple-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.faqsIntroTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.faqsIntroText")}
            </p>
          </div>

          <div className="space-y-6">
            {/* Registration and Idea Submission */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4" style={{ backgroundColor: "#D64246" }}>
                <h5 className="font-bold text-white">
                  {t("accordion.registrationFaqsTitle")}
                </h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq1Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq1Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq2Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq2Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq3Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq3Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq4Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq4Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq5Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq5Text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Creating & Submitting Solutions */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4" style={{ backgroundColor: "#FEC40D" }}>
                <h5 className="font-bold text-white">
                  {t("accordion.creatingSubmittingSolutionsTitle")}
                </h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq6Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq6TextPart1")}{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenAccordionValue("submission");

                        // wait for DOM update
                        requestAnimationFrame(() => {
                          const el = document.getElementById("submission");
                          if (el) {
                            const yOffset = -100; // adjust if you have a fixed header
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset +
                              yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        });
                      }}
                      className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                    >
                      {t("accordion.faq6TextPart2")}
                    </a>{" "}
                    {t("accordion.faq6TextPart3")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq7Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq7Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq8Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq8Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq9Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    <Trans
                      i18nKey="accordion.faq9Text"
                      components={{
                        submissionLink: (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              setOpenAccordionValue("submission");

                              // wait for DOM update
                              requestAnimationFrame(() => {
                                const el =
                                  document.getElementById("submission-process");
                                if (el) {
                                  const yOffset = -125; // adjust if you have a fixed header
                                  const y =
                                    el.getBoundingClientRect().top +
                                    window.pageYOffset +
                                    yOffset;
                                  window.scrollTo({
                                    top: y,
                                    behavior: "smooth",
                                  });
                                }
                              });
                            }}
                            className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                          />
                        ),
                      }}
                    />
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq10Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq10Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq11Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq11Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq12Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq12Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq13Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq13Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq14Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq14Text1")}
                  </p>
                  <p className="text-sm text-gray-600 mt-4">
                    {t("accordion.faq14Text2")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq15Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq15Text1")}{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenAccordionValue("submission");

                        // wait for DOM update
                        requestAnimationFrame(() => {
                          const el =
                            document.getElementById("submission-process");
                          if (el) {
                            const yOffset = -125; // adjust if you have a fixed header
                            const y =
                              el.getBoundingClientRect().top +
                              window.pageYOffset +
                              yOffset;
                            window.scrollTo({ top: y, behavior: "smooth" });
                          }
                        });
                      }}
                      className="text-blue-600 underline hover:text-blue-800 cursor-pointer"
                    >
                      {t("accordion.faq15Text2")}
                    </a>{" "}
                    {t("accordion.faq15Text3")}
                  </p>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4" style={{ backgroundColor: "#1B52A4" }}>
                <h5 className="font-bold text-white">
                  {t("accordion.resultsTitle")}
                </h5>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq16Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq16Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq17Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq17Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq18Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq18Text")}
                  </p>
                </div>
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq19Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq19Text")}
                  </p>
                </div>
              </div>
            </div>

            {/* Communication */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
              <div className="p-4" style={{ backgroundColor: "#F58020" }}>
                <h5 className="font-bold text-white">Communication</h5>
              </div>
              <div className="p-6">
                <div>
                  <h6 className="font-semibold text-gray-900 mb-2">
                    {t("accordion.faq20Title")}
                  </h6>
                  <p className="text-sm text-gray-600">
                    {t("accordion.faq20Text")}
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
      title: t("accordion.termsTitle"),
      color: "#1B52A4",
      borderColor: "border-[#495057]",
      content: (
        <div className="space-y-6">
          <div
            className="p-6 rounded-xl border border-gray-200"
            style={{ backgroundColor: "#1B52A4" }}
          >
            <h4 className="font-bold text-white mb-3 flex items-center gap-2">
              {t("accordion.privacyPolicyTitle")}
            </h4>
            <p className="text-white leading-relaxed">
              {t("accordion.privacyPolicyIntro")}
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#F58020" }}>
              <h5 className="font-bold text-white">
                {t("accordion.controllerInfoTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base">
                {t("accordion.controllerInfoText")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#D64246" }}>
              <h5 className="font-bold text-white">
                {t("accordion.applicabilityTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.applicabilityText1")}
              </p>
              <p className="text-gray-700 text-base">
                {t("accordion.applicabilityText2")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#098855" }}>
              <h5 className="font-bold text-white">
                {t("accordion.dataCollectionTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.dataCollectionIntro")}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint1")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint2")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint3")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint4")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint5")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#098855" }}
                  ></div>
                  {t("accordion.dataCollectionPoint6")}
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#1B52A4" }}>
              <h5 className="font-bold text-white">
                {t("accordion.whyDataCollectedTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.whyDataCollectedIntro")}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  ></div>
                  {t("accordion.whyDataCollectedPoint1")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  ></div>
                  {t("accordion.whyDataCollectedPoint2")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  ></div>
                  {t("accordion.whyDataCollectedPoint3")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  ></div>
                  {t("accordion.whyDataCollectedPoint4")}
                </li>
                <li className="flex items-start gap-2">
                  <div
                    className="w-2 h-2  rounded-full mt-2 flex-shrink-0"
                    style={{ backgroundColor: "#1B52A4" }}
                  ></div>
                  {t("accordion.whyDataCollectedPoint5")}
                </li>
              </ul>
              <p className="text-gray-700 mt-4">
                {t("accordion.whyDataCollectedOutro")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#00A2E5" }}>
              <h5 className="font-bold text-white">
                {t("accordion.howDataStoredTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.howDataStoredText1")}
              </p>
              <p className="text-gray-700 text-base">
                {t("accordion.howDataStoredText2")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#FEC40D" }}>
              <h5 className="font-bold text-white">
                {t("accordion.dataDisclosureTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.dataDisclosureText")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#F58020" }}>
              <h5 className="font-bold text-white">
                {t("accordion.childrenDataTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.childrenDataText1")}
              </p>
              <p className="text-gray-700 text-base">
                {t("accordion.childrenDataText2")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#D64246" }}>
              <h5 className="font-bold text-white">
                {t("accordion.yourRightsTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base mb-4">
                {t("accordion.yourRightsText1")}
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  {t("accordion.yourRightsPoint1")}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  {t("accordion.yourRightsPoint2")}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  {t("accordion.yourRightsPoint3")}
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  {t("accordion.yourRightsPoint4")}
                </li>
              </ul>
              <p className="text-gray-700 mt-4 text-base">
                {t("accordion.yourRightsText2")}
              </p>
              <p className="text-gray-700 mt-4 text-base">
                {t("accordion.yourRightsText3")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#098855 " }}>
              <h5 className="font-bold text-white">
                {t("accordion.contactInfoTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-base">
                {t("accordion.contactInfoText")}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
            <div className="p-4" style={{ backgroundColor: "#00A2E5" }}>
              <h5 className="font-bold text-white">
                {t("accordion.updatesTitle")}
              </h5>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4 text-base">
                {t("accordion.updatesText1")}
              </p>
              <p className="text-gray-700 text-base">
                {t("accordion.updatesText2")}
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
              {t("accordion.programDetailsTitle")}
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {t("accordion.everythingYouNeedToKnow")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("accordion.programDescription")}
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
                id={item.id}
              >
                <div ref={(el) => (accordionRefs.current[item.id] = el)}>
                  <Card className="overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                    <AccordionTrigger className="px-0 py-0 hover:no-underline [&>svg]:hidden">
                      <div
                        className={`flex items-center gap-4 text-left transition-all duration-300 rounded-lg p-6 w-full bg-white`}
                        style={{
                          paddingBottom:
                            openAccordionValue === item.id ? "0px" : "20px",
                          color:
                            openAccordionValue === item.id
                              ? item.color
                              : "text-gray-900",
                        }}
                      >
                        <div className="flex-1">
                          <h3
                            className={`text-lg font-semibold transition-all duration-300 mb-0`}
                            style={{
                              color:
                                openAccordionValue === item.id
                                  ? item.color
                                  : "text-gray-900",
                            }}
                          >
                            {item.title}
                          </h3>
                        </div>
                        <div className="flex items-center justify-center ml-4">
                          {openAccordionValue === item.id ? (
                            <Minus
                              className="w-5 h-5 transition-all duration-300"
                              style={{ color: item.color }}
                            />
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
