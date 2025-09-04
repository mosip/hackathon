"use client";

import { useEffect, useState } from "react";
import { Button } from "./components/ui/button";
import Navigation from "./components/Navigation";
import HeroSection from "./components/HeroSection";
import AccordionSections from "./components/AccordionSections";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";
import RegistrationPage from "./components/RegistrationPage";
import SubmissionPage from "./components/SubmissionPage";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "registration" | "submission"
  >("home");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [openAccordionFn, setOpenAccordionFn] = useState<
    ((accordionId: string) => void) | null
  >(null);

  // Navigation functions
  const navigateToRegistration = () => {
    setCurrentPage("registration");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSubmission = () => {
    setCurrentPage("submission");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToHome = () => {
    setCurrentPage("home");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Function to handle accordion control from navigation
  const handleAccordionControl = (
    openAccordionFunction: (accordionId: string) => void
  ) => {
    setOpenAccordionFn(() => openAccordionFunction);
  };

  // Function to open specific accordion (called from navigation)
  const openProgramDetailsAccordion = () => {
    if (currentPage !== "home") {
      navigateToHome();
      // Wait for page navigation to complete, then open accordion
      setTimeout(() => {
        if (openAccordionFn) {
          openAccordionFn("what-is-mosip-create");
        }
      }, 500);
    } else {
      // Already on home page, just open the accordion
      if (openAccordionFn) {
        openAccordionFn("what-is-mosip-create");
      }
    }
  };

  // Function to open submission criteria accordion (6th accordion)
  const openSubmissionAccordion = () => {
    if (currentPage !== "home") {
      navigateToHome();
      // Wait for page navigation to complete, then open accordion
      setTimeout(() => {
        if (openAccordionFn) {
          console.log(
            "Opening submission-criteria accordion after page navigation"
          );
          openAccordionFn("submission");
        } else {
          console.warn(
            "openAccordionFn not available after navigation, retrying..."
          );
          // Retry after additional delay if function not available
          setTimeout(() => {
            if (openAccordionFn) {
              openAccordionFn("submission");
            }
          }, 300);
        }
      }, 600);
    } else {
      // Already on home page, just open the accordion
      if (openAccordionFn) {
        console.log("Opening submission-criteria accordion directly");
        openAccordionFn("submission");
      } else {
        console.warn(
          "openAccordionFn not available yet, waiting for initialization..."
        );
        // Wait for accordion control to be available
        const waitForAccordionControl = (attempts = 0) => {
          if (openAccordionFn) {
            console.log(
              "openAccordionFn now available, opening submission-criteria"
            );
            openAccordionFn("submission");
          } else if (attempts < 10) {
            setTimeout(() => waitForAccordionControl(attempts + 1), 100);
          } else {
            console.error(
              "Failed to initialize accordion control after 10 attempts"
            );
          }
        };
        waitForAccordionControl();
      }
    }
  };

  // Function to open contact us accordion
  const openContactUsAccordion = () => {
    if (currentPage !== "home") {
      navigateToHome();
      // Wait for page navigation to complete, then open accordion
      setTimeout(() => {
        if (openAccordionFn) {
          console.log("Opening contact-us accordion after page navigation");
          openAccordionFn("contact");
        } else {
          console.warn(
            "openAccordionFn not available after navigation, retrying..."
          );
          // Retry after additional delay if function not available
          setTimeout(() => {
            if (openAccordionFn) {
              openAccordionFn("contact");
            }
          }, 300);
        }
      }, 600);
    } else {
      // Already on home page, just open the accordion
      if (openAccordionFn) {
        console.log("Opening contact-us accordion directly");
        openAccordionFn("contact");
      } else {
        console.warn(
          "openAccordionFn not available yet, waiting for initialization..."
        );
        // Wait for accordion control to be available
        const waitForAccordionControl = (attempts = 0) => {
          if (openAccordionFn) {
            console.log("openAccordionFn now available, opening contact-us");
            openAccordionFn("contact");
          } else if (attempts < 10) {
            setTimeout(() => waitForAccordionControl(attempts + 1), 100);
          } else {
            console.error(
              "Failed to initialize accordion control after 10 attempts"
            );
          }
        };
        waitForAccordionControl();
      }
    }
  };

  // Function to open faqs accordion
  const openFAQsAccordion = () => {
    if (currentPage !== "home") {
      navigateToHome();
      // Wait for page navigation to complete, then open accordion
      setTimeout(() => {
        if (openAccordionFn) {
          console.log("Opening faqs accordion after page navigation");
          openAccordionFn("faqs");
        } else {
          console.warn(
            "openAccordionFn not available after navigation, retrying..."
          );
          // Retry after additional delay if function not available
          setTimeout(() => {
            if (openAccordionFn) {
              openAccordionFn("faqs");
            }
          }, 300);
        }
      }, 600);
    } else {
      // Already on home page, just open the accordion
      if (openAccordionFn) {
        console.log("Opening faqs accordion directly");
        openAccordionFn("faqs");
      } else {
        console.warn(
          "openAccordionFn not available yet, waiting for initialization..."
        );
        // Wait for accordion control to be available
        const waitForAccordionControl = (attempts = 0) => {
          if (openAccordionFn) {
            console.log("openAccordionFn now available, opening faqs");
            openAccordionFn("faqs");
          } else if (attempts < 10) {
            setTimeout(() => waitForAccordionControl(attempts + 1), 100);
          } else {
            console.error(
              "Failed to initialize accordion control after 10 attempts"
            );
          }
        };
        waitForAccordionControl();
      }
    }
  };

  // Function to open terms-&-conditions accordion
  const openTandCAccordion = () => {
    if (currentPage !== "home") {
      navigateToHome();
      // Wait for page navigation to complete, then open accordion
      setTimeout(() => {
        if (openAccordionFn) {
          console.log(
            "Opening terms-&-conditions accordion after page navigation"
          );
          openAccordionFn("terms-conditions");
        } else {
          console.warn(
            "openAccordionFn not available after navigation, retrying..."
          );
          // Retry after additional delay if function not available
          setTimeout(() => {
            if (openAccordionFn) {
              openAccordionFn("terms-conditions");
            }
          }, 300);
        }
      }, 600);
    } else {
      // Already on home page, just open the accordion
      if (openAccordionFn) {
        console.log("Opening terms-&-conditions accordion directly");
        openAccordionFn("terms-conditions");
      } else {
        console.warn(
          "openAccordionFn not available yet, waiting for initialization..."
        );
        // Wait for accordion control to be available
        const waitForAccordionControl = (attempts = 0) => {
          if (openAccordionFn) {
            console.log(
              "openAccordionFn now available, opening terms-&-conditions"
            );
            openAccordionFn("terms-conditions");
          } else if (attempts < 10) {
            setTimeout(() => waitForAccordionControl(attempts + 1), 100);
          } else {
            console.error(
              "Failed to initialize accordion control after 10 attempts"
            );
          }
        };
        waitForAccordionControl();
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(currentProgress);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (window.location.hash === "#terms-and-conditions") {
    openTandCAccordion();

    setTimeout(() => {
      // Clean up the URL (remove hash)
      window.history.replaceState(
        {},
        document.title,
        window.location.origin + "/"
      );
    }, 1);
  }

  // Render submission page
  if (currentPage === "submission") {
    return (
      <div className="min-h-screen bg-white">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div
            className="h-1 mosip-gradient transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation with proper props */}
        <Navigation
          onNavigateHome={navigateToHome}
          onNavigateToRegistration={navigateToRegistration}
          onNavigateToSubmission={navigateToSubmission}
          onNavigateToProgramDetails={openProgramDetailsAccordion}
          onNavigateToSubmissionAccordion={openSubmissionAccordion}
          onNavigateToFAQs={openFAQsAccordion}
          onNavigateToContactUs={openContactUsAccordion}
          currentPage={currentPage}
        />

        <SubmissionPage onNavigateHome={navigateToHome} />

        <Toaster position="top-right" expand={false} richColors closeButton />
      </div>
    );
  }

  // Render registration page
  if (currentPage === "registration") {
    return (
      <div className="min-h-screen bg-white">
        {/* Progress indicator */}
        <div className="fixed top-0 left-0 right-0 z-50">
          <div
            className="h-1 mosip-gradient transition-all duration-300 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Navigation with proper props */}
        <Navigation
          onNavigateHome={navigateToHome}
          onNavigateToRegistration={navigateToRegistration}
          onNavigateToSubmission={navigateToSubmission}
          onNavigateToProgramDetails={openProgramDetailsAccordion}
          onNavigateToSubmissionAccordion={openSubmissionAccordion}
          onNavigateToFAQs={openFAQsAccordion}
          onNavigateToContactUs={openContactUsAccordion}
          currentPage={currentPage}
        />

        <RegistrationPage onNavigateHome={navigateToHome} />

        <Toaster position="top-right" expand={false} richColors closeButton />
      </div>
    );
  }

  // Render homepage
  return (
    <div className="min-h-screen bg-white">
      {/* Progress indicator with professional MOSIP gradient */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <div
          className="h-1 mosip-gradient transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation with proper props */}
      <Navigation
        onNavigateHome={navigateToHome}
        onNavigateToRegistration={navigateToRegistration}
        onNavigateToSubmission={navigateToSubmission}
        onNavigateToProgramDetails={openProgramDetailsAccordion}
        onNavigateToSubmissionAccordion={openSubmissionAccordion}
        onNavigateToFAQs={openFAQsAccordion}
        onNavigateToContactUs={openContactUsAccordion}
        currentPage={currentPage}
      />

      {/* Main Content */}
      <main className="w-full">
        {/* Hero Section */}
        <section id="hero" className="w-full min-h-screen">
          <HeroSection onNavigateToRegistration={navigateToRegistration} />
        </section>

        {/* Accordion Sections - Consistent container pattern */}
        <section className="w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto">
            <AccordionSections
              onNavigateToSubmission={navigateToSubmission}
              onNavigateToRegistration={navigateToRegistration}
              onAccordionControl={handleAccordionControl}
            />
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection
          onNavigateToRegistration={navigateToRegistration}
          onNavigateToSubmission={navigateToSubmission}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notifications */}
      <Toaster position="top-right" expand={false} richColors closeButton />

      {/* Accessibility: Skip to main content link */}
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Back to top button */}
      {scrollProgress > 20 && (
        <Button
          variant="default"
          size="icon"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 md:bottom-8 md:right-8 mosip-primary-button shadow-lg hover:shadow-xl transition-all duration-300 z-40 w-12 h-12 md:w-14 md:h-14"
          aria-label="Back to top"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </Button>
      )}
    </div>
  );
}
