"use client";

import React, { useState, useRef } from "react";
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
import { ExternalLink, AlertCircle, Loader2, ArrowLeft } from "lucide-react";
import { toast } from "sonner@2.0.3";
import mosipCreateLogo from "figma:asset/b6bfb4740d2a7a77a523484516cbc2e77f82379d.png";
import ReCAPTCHA from "react-google-recaptcha";

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
    recaptchaToken: "",
  });

  const captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
  const _reCaptchaRef = useRef(null);

  const themes = [
    "Digital ID for Service Access",
    "eKYC for Inclusive Identity Verification",
    "Financial Inclusion through Digital Identity",
    "Credential Facilitation for Empowerment",
  ];

  const teamSizes = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

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

  const [isFullNameError, setFullNameError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isOrganizationNameError, setOrganizationNameError] = useState(false);
  const [isTeamNameError, setTeamNameError] = useState(false);
  const [isIdeaTitleError, setIdeaTitleError] = useState(false);
  const [isIdeaDescriptionError, setIdeaDescriptionError] = useState(false);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "fullName") {
      // ✅ Only allows alphabets and spaces
      const fullNameRegex = /^[A-Za-z ]+$/;

      if (value.trim() && !fullNameRegex.test(value.trim())) {
        setFullNameError(true);
      } else {
        setFullNameError(false);
      }
    }

    if (name === "email") {
      // ✅ Only allows alphabets, numbers, ., -, _, @
      // ✅ Must contain one @, domain parts with dots, TLD 2-63 letters
      const emailRegex = /^[A-Za-z0-9._-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/;

      if (value.trim() && !emailRegex.test(value.trim())) {
        setEmailError(true);
      } else {
        setEmailError(false);
      }
    }

    if (name === "organizationName") {
      // ✅ Only allows alphabets and spaces
      const organizationNameRegex = /^[A-Za-z ]+$/;

      if (value.trim() && !organizationNameRegex.test(value.trim())) {
        setOrganizationNameError(true);
      } else {
        setOrganizationNameError(false);
      }
    }
    if (name === "teamName") {
      // ✅ Only alphabets, numbers, hyphens (-), and spaces
      const teamNameRegex = /^[A-Za-z0-9- ]+$/;

      if (value.trim() && !teamNameRegex.test(value.trim())) {
        setTeamNameError(true);
      } else {
        setTeamNameError(false);
      }
    }

    if (name === "ideaTitle") {
      // ✅ Only alphabets, numbers, hyphens (-), and spaces
      const ideaTitleRegex = /^[A-Za-z0-9- ]+$/;

      if (value.trim() && !ideaTitleRegex.test(value.trim())) {
        setIdeaTitleError(true);
      } else {
        setIdeaTitleError(false);
      }
    }

    if (name === "ideaDescription") {
      // ✅ Only alphabets, numbers, hyphens (-), and spaces
      const ideaDescriptionRegex = /^[A-Za-z0-9- ]+$/;

      if (value.trim() && !ideaDescriptionRegex.test(value.trim())) {
        setIdeaDescriptionError(true);
      } else {
        setIdeaDescriptionError(false);
      }
    }
  };

  /**
   * Reset the captcha widget
   * & its token value
   */
  const resetCaptcha = () => {
    _reCaptchaRef.current?.reset();
  };

  const handleCaptchaChange = (value) => {
    handleInputChange("recaptchaToken", value);
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
      toast.error("Please fill in all mandatory fields");
      return false;
    }

    if (!formData.consent) {
      toast.error("Please provide consent to proceed");
      return false;
    }

    if (!formData.recaptchaToken) {
      toast.error("Please complete the reCAPTCHA verification");
      return false;
    }

    if (isFullNameError) {
      toast.error("Please enter a valid Full Name");
      return false;
    }

    if (isEmailError) {
      toast.error("Please enter a valid E-Mail address");
      return false;
    }

    if (isOrganizationNameError) {
      toast.error("Please enter a valid Organization Name");
      return false;
    }

    if (isTeamNameError) {
      toast.error("Please enter a valid Team Name");
      return false;
    }

    if (isIdeaTitleError) {
      toast.error("Please enter a valid Idea Title");
      return false;
    }

    if (isIdeaDescriptionError) {
      toast.error("Please enter a valid Idea Description");
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
          "Thank you for registering for MOSIP Create. Continue building your solution and stay tuned for more updates."
        );
        resetCaptcha();
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
        recaptchaToken: "",
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
      recaptchaToken: "",
    });
    toast.success("Form cleared successfully");
  };

  // Mock reCAPTCHA Component
  const MockRecaptcha: React.FC<{
    onChange: (verified: boolean) => void;
    verified: boolean;
  }> = ({ onChange, verified }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleCheck = async () => {
      if (verified || isLoading) return;

      setIsLoading(true);
      // Simulate reCAPTCHA verification delay
      await new Promise((resolve) => setTimeout(resolve, 0));
      onChange(true);
      setIsLoading(false);
    };

    const handleReset = () => {
      if (isLoading) return;
      onChange(false);
    };

    return (
      <div className="border-2 border-gray-300 rounded-lg p-4 bg-white shadow-sm max-w-xs w-full">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-[#1B52A4] border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Checkbox
                checked={verified}
                onCheckedChange={handleCheck}
                className="w-5 h-5 border-2 border-gray-400 data-[state=checked]:bg-[#1B52A4] data-[state=checked]:border-[#1B52A4]"
                disabled={verified || isLoading}
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-sm text-gray-700 font-medium">
              {isLoading ? "Verifying..." : "I'm not a robot"}
            </span>
          </div>
          <div className="flex flex-col items-center text-xs text-gray-500 flex-shrink-0">
            <div className="mb-1">
              <svg className="w-8 h-6" viewBox="0 0 32 24" fill="none">
                <rect width="32" height="24" rx="2" fill="#4285f4" />
                <path
                  d="M8 7h16v2H8V7zm0 4h12v2H8v-2zm0 4h8v2H8v-2z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="font-medium">reCAPTCHA</span>
          </div>
        </div>
        {verified && (
          <div className="mt-3 flex justify-end border-t border-gray-200 pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-white h-auto py-1 px-2"
              disabled={isLoading}
            >
              Reset
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 register">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-gray-600 hover:text-white"
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
          <div
            className="text-white rounded-2xl p-6 md:p-8 mb-6"
            style={{ backgroundColor: "#1B52A4" }}
          >
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
                Personal Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-1">
                    Full Name<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Enter your full name"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isFullNameError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>Only letters and spaces are allowed.</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-1">
                    Country<span className="text-red-600">*</span>
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
                Organization Information
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      E-Mail (Organization)
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      name="email"
                      onBlur={handleBlur}
                      placeholder="youremail@organization.com"
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />
                    {isEmailError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>
                          Please enter a valid email address (e.g.,
                          name@domain.com).
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationName"
                      className="flex items-center gap-1"
                    >
                      Organization Name<span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      onBlur={handleBlur}
                      placeholder="Enter organization name"
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />

                    {isOrganizationNameError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>Only letters and spaces are allowed.</span>
                      </div>
                    )}
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
                Team Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="flex items-center gap-1">
                    Team Size<span className="text-red-600">*</span>
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
                    Team Name<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={(e) =>
                      handleInputChange("teamName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Enter your team name"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isTeamNameError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>
                        Only letters, numbers, hyphens (-), and spaces are
                        allowed.
                      </span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    Please remember your team name and use the exact same name
                    during solution submission.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                Solution Information
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="themeChosen"
                    className="flex items-center gap-1"
                  >
                    Theme Chosen<span className="text-red-600">*</span>
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
                    Idea Title<span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="ideaTitle"
                    name="ideaTitle"
                    value={formData.ideaTitle}
                    onChange={(e) =>
                      handleInputChange("ideaTitle", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Enter your solution idea title"
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isIdeaTitleError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>
                        Only letters, numbers, hyphens (-), and spaces are
                        allowed.
                      </span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ideaDescription"
                    className="flex items-center gap-1"
                  >
                    Idea Description<span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="ideaDescription"
                    name="ideaDescription"
                    value={formData.ideaDescription}
                    onChange={(e) =>
                      handleInputChange("ideaDescription", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder="Briefly describe your solution idea, target audience, and how it addresses the chosen theme"
                    rows={4}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff] resize-none"
                  />
                  {isIdeaDescriptionError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>
                        Only letters, numbers, hyphens (-), and spaces are
                        allowed.
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Consent */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
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
                        href={`${window.location.origin}/terms-and-conditions`}
                        className="text-[#007aff] hover:underline hover:text-[#0056cc] transition-colors duration-200"
                        target="_blank"
                      >
                        Terms & Conditions
                        <ExternalLink className="w-3 h-3 inline ml-1 align-text-top" />
                      </a>
                      .
                    </Label>
                    {!formData.consent && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>Consent is required to proceed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* reCAPTCHA Verification */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Security Verification
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Label className="text-sm">
                    Please complete the security verification below
                    <span className="text-red-600">*</span>
                  </Label>

                  <div className="flex justify-start">
                    <div className="flex justify-center mt-5 mb-5">
                      <ReCAPTCHA
                        ref={_reCaptchaRef}
                        onChange={handleCaptchaChange}
                        sitekey={captchaSiteKey}
                      />
                    </div>
                  </div>

                  {!formData.recaptchaToken && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>reCAPTCHA verification is required to proceed</span>
                    </div>
                  )}
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
              className="flex-1 mosip-primary-button text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>Submit Registration</>
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
            Return to MOSIP Create Homepage
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
