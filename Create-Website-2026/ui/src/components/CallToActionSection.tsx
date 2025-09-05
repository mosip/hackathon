"use client";

import React from "react";
import { motion } from "motion/react";
import { Button } from "./ui/button";

interface CallToActionSectionProps {
  onNavigateToRegistration?: () => void;
  onNavigateToSubmission?: () => void;
}

const CallToActionSection: React.FC<CallToActionSectionProps> = ({
  onNavigateToRegistration,
  onNavigateToSubmission,
}) => {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-gradient-to-br from-blue-50/80 via-slate-50/60 to-gray-50/80 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-mosip-waves opacity-30" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join MOSIP Create 2025 and be part of building the future of
              Digital Public Infrastructure. Registration opens September 5th,
              2025.
            </p>
          </div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            {/* Primary CTA - Register */}
            <Button
              size="lg"
              className="mosip-primary-button font-semibold px-8 py-3 rounded-lg min-w-[200px]"
              onClick={onNavigateToRegistration}
            >
              Register for MOSIP Create
            </Button>

            {/* Secondary CTA - Submit */}
            <Button
              variant="outline"
              size="lg"
              className="mosip-secondary-button font-semibold px-8 py-3 rounded-lg min-w-[200px]"
              onClick={onNavigateToSubmission}
              disabled
            >
              Submit Your Solution
            </Button>
          </motion.div>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 pt-6 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 max-w-2xl mx-auto">
              <strong>Registration Timeline:</strong> Applications open on
              September 5th, 2025. Don't miss your chance to be part of our
              journey towards building innovative & inclusive digital identity
              solutions.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-100 rounded-full opacity-50 blur-xl animate-gentle-pulse" />
      <div
        className="absolute bottom-10 right-10 w-32 h-32 bg-sky-100 rounded-full opacity-40 blur-xl animate-gentle-pulse"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-indigo-100 rounded-full opacity-30 blur-lg animate-gentle-pulse"
        style={{ animationDelay: "4s" }}
      />
    </section>
  );
};

export default CallToActionSection;
