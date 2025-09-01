"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Users,
  Mail,
  Building,
  Globe,
  User,
  Lightbulb,
  FileText,
  ExternalLink,
  CheckCircle,
  AlertCircle,
  Loader2,
  ArrowLeft,
  Home,
} from "lucide-react";
import { toast } from "sonner@2.0.3";
import mosipCreateLogo from "figma:asset/b6bfb4740d2a7a77a523484516cbc2e77f82379d.png";

interface RegistrationPageProps {
  onNavigateHome: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onNavigateHome,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    email: "",
    organizationName: "",
    teamSize: "",
    teamName: "",
    themeChosen: "",
    ideaTitle: "",
    ideaDescription: "",
    linkedinUrl: "",
    consent: false,
  });

  const themes = [
    "Digital ID for Service Access",
    "eKYC for Inclusive Identity Verification",
    "Financial Inclusion through Digital Identity",
    "Credential Facilitation for Empowerment",
  ];

  const teamSizes = [
    "1 member",
    "2-3 members",
    "4-5 members",
    "6-7 members",
    "8-10 members",
  ];

  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Belarus",
    "Belgium",
    "Bosnia and Herzegovina",
    "Brazil",
    "Bulgaria",
    "Cambodia",
    "Canada",
    "Chile",
    "China",
    "Colombia",
    "Croatia",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Ecuador",
    "Egypt",
    "Estonia",
    "Ethiopia",
    "Finland",
    "France",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Guatemala",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland",
    "Israel",
    "Italy",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kuwait",
    "Latvia",
    "Lebanon",
    "Lithuania",
    "Luxembourg",
    "Malaysia",
    "Malta",
    "Mexico",
    "Morocco",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nigeria",
    "Norway",
    "Pakistan",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russia",
    "Saudi Arabia",
    "Serbia",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "South Africa",
    "South Korea",
    "Spain",
    "Sri Lanka",
    "Sweden",
    "Switzerland",
    "Thailand",
    "Tunisia",
    "Turkey",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Vietnam",
    "Other",
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "country",
      "email",
      "organizationName",
      "teamSize",
      "teamName",
      "themeChosen",
      "ideaTitle",
      "ideaDescription",
    ];

    const missingFields = requiredFields.filter(
      (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (!formData.consent) {
      toast.error("Please provide consent to proceed");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate form submission
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(import.meta.env.VITE_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          "Registration submitted successfully! Check your email for confirmation."
        );
      } else {
        toast.error("Registration failed. Please try again.");
      }

      // Reset form
      setFormData({
        fullName: "",
        country: "",
        email: "",
        organizationName: "",
        teamSize: "",
        teamName: "",
        themeChosen: "",
        ideaTitle: "",
        ideaDescription: "",
        linkedinUrl: "",
        consent: false,
      });

      // Navigate back to homepage after successful submission
      setTimeout(() => {
        onNavigateHome();
      }, 2000);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      country: "",
      email: "",
      organizationName: "",
      teamSize: "",
      teamName: "",
      themeChosen: "",
      ideaTitle: "",
      ideaDescription: "",
      linkedinUrl: "",
      consent: false,
    });
    toast.success("Form cleared successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Button>

            <div className="flex items-center gap-3"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header - Fixed Section */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-[#0A8754] to-[#01A2FD] text-white rounded-2xl p-6 md:p-8 mb-6">
            <div className="text-center mb-4">
              <div className="mb-4">
                <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                  MOSIP Create 2025
                </h1>
                <div className="text-lg md:text-xl font-semibold text-white/90 mt-1">
                  Registration Form
                </div>
              </div>
            </div>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed">
              Please complete all required fields to submit your registration
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <strong>Note:</strong> Fields with{" "}
            <span className="text-red-600 font-bold">*</span> are mandatory.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <User className="w-5 h-5 text-[#007aff]" />
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-1">
                    Full Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-1">
                    Country <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Organization Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#28a745]" />
                Organization Information
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      E-Mail (Organization){" "}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      placeholder="organization@company.com"
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationName"
                      className="flex items-center gap-1"
                    >
                      Organization Name <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="organizationName"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      placeholder="Enter organization name"
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">
                    LinkedIn URL (Organization){" "}
                    <span className="text-gray-500 text-sm">- Optional</span>
                  </Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    placeholder="https://linkedin.com/company/your-organization"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Team Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-[#ffc107]" />
                Team Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="flex items-center gap-1">
                    Team Size <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) =>
                      handleInputChange("teamSize", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue placeholder="Select team size" />
                    </SelectTrigger>
                    <SelectContent>
                      {teamSizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="teamName" className="flex items-center gap-1">
                    Team Name <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamName"
                    value={formData.teamName}
                    onChange={(e) =>
                      handleInputChange("teamName", e.target.value)
                    }
                    placeholder="Enter your team name"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  <p className="text-xs text-gray-500">
                    Remember this name - use the exact same name during solution
                    submission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-[#dc3545]" />
                Solution Information
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="themeChosen"
                    className="flex items-center gap-1"
                  >
                    Theme Chosen <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.themeChosen}
                    onValueChange={(value) =>
                      handleInputChange("themeChosen", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue placeholder="Select a theme" />
                    </SelectTrigger>
                    <SelectContent>
                      {themes.map((theme) => (
                        <SelectItem key={theme} value={theme}>
                          {theme}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ideaTitle"
                    className="flex items-center gap-1"
                  >
                    Idea Title <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="ideaTitle"
                    value={formData.ideaTitle}
                    onChange={(e) =>
                      handleInputChange("ideaTitle", e.target.value)
                    }
                    placeholder="Enter your solution idea title"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ideaDescription"
                    className="flex items-center gap-1"
                  >
                    Idea Description <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="ideaDescription"
                    value={formData.ideaDescription}
                    onChange={(e) =>
                      handleInputChange("ideaDescription", e.target.value)
                    }
                    placeholder="Briefly describe your solution idea, target audience, and how it addresses the chosen theme..."
                    rows={4}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff] resize-none"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#6f42c1]" />
                Consent & Agreement
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 pt-0.5">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) =>
                        handleInputChange("consent", checked as boolean)
                      }
                      className="w-4 h-4"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Label
                      htmlFor="consent"
                      className="text-sm leading-relaxed cursor-pointer block"
                    >
                      I consent to the collection of the above data for the
                      purpose of facilitating my participation in MOSIP Create.
                      I understand that my data will be used solely for this
                      purpose and will not be shared with any other party. By
                      clicking below, I also agree to the{" "}
                      <a
                        href="#"
                        className="text-[#007aff] hover:underline hover:text-[#0056cc] transition-colors duration-200"
                        onClick={(e) => {
                          e.preventDefault();
                          // This would open T&C in a new tab/modal
                          toast.info(
                            "Terms & Conditions will open in a new window"
                          );
                        }}
                      >
                        Terms & Conditions
                        <ExternalLink className="w-3 h-3 inline ml-1 align-text-top" />
                      </a>
                      .
                    </Label>
                    {!formData.consent && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600">
                        <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                        <span>Consent is required to proceed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-8">
            <Button
              type="button"
              variant="outline"
              onClick={handleClearForm}
              className="flex-1 font-semibold"
              disabled={isSubmitting}
            >
              Clear Form
            </Button>

            <Button
              type="submit"
              className="flex-1 mosip-gradient hover:opacity-90 text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Submit Registration
                </>
              )}
            </Button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mx-auto"
          >
            <Home className="w-4 h-4" />
            Return to MOSIP Create Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
