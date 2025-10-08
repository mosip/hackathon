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
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";

interface RegistrationPageProps {
  onNavigateHome: () => void;
}

const RegistrationPage: React.FC<RegistrationPageProps> = ({
  onNavigateHome,
}) => {
  const { t, i18n } = useTranslation();
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
      // ✅ Only letters, numbers, hyphens (-), full stops (.), spaces, commas (,), colons (:), semicolons (;), and apostrophes (') are allowed.

      const ideaDescriptionRegex = /^[A-Za-z0-9-.,:;'\u2019\s]+$/s;

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
      "consent",
      "recaptchaToken",
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
        body: JSON.stringify({
          ...formData,
          formType: "registration",
        }),
      });

      if (res.ok) {
        toast.success(t("registration.submissionSuccess"));
        resetCaptcha();
      } else {
        toast.error(t("registration.submissionFailure"));
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
      }, 12000);
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
    resetCaptcha();
    toast.success("Form cleared successfully");
  };

  return (
    <div className="min-h-screen bg-gray-50 register">
      {/* Header with Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="screen_width mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button
              variant="ghost"
              onClick={onNavigateHome}
              className="flex items-center gap-2 text-gray-600 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("registration.backToHomepage")}
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
                  {t("registration.pageTitle")}
                </h1>
                <div className="text-lg md:text-xl font-semibold text-white/90 mt-1">
                  {t("registration.formTitle")}
                </div>
              </div>
            </div>
            <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed">
              {t("registration.formDescription")}
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            <strong>{t("registration.note")}</strong>{" "}
            {t("registration.mandatoryFields")}{" "}
            <span className="text-red-600 font-bold">*</span>{" "}
            {t("registration.mandatoryFields2")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {t("registration.personalInfoTitle")}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="flex items-center gap-1">
                    {t("registration.fullNameLabel")}{" "}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={(e) =>
                      handleInputChange("fullName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder={t("registration.fullNameLabel")}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isFullNameError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>{t("registration.fullNameError")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country" className="flex items-center gap-1">
                    {t("registration.countryLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.country}
                    onValueChange={(value) =>
                      handleInputChange("country", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue
                        placeholder={t("registration.countryPlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent className="max-h-48">
                      {t("forms.countries", { returnObjects: true }).map(
                        (country) => (
                          <SelectItem key={country} value={country}>
                            {country}
                          </SelectItem>
                        )
                      )}
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
                {t("registration.organizationInfoTitle")}
              </h3>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      {t("registration.emailLabel")}
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
                      placeholder={t("registration.emailPlaceholder")}
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />
                    {isEmailError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>{t("registration.emailError")}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="organizationName"
                      className="flex items-center gap-1"
                    >
                      {t("registration.organizationNameLabel")}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Input
                      id="organizationName"
                      name="organizationName"
                      value={formData.organizationName}
                      onChange={(e) =>
                        handleInputChange("organizationName", e.target.value)
                      }
                      onBlur={handleBlur}
                      placeholder={t(
                        "registration.organizationNamePlaceholder"
                      )}
                      className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                    />

                    {isOrganizationNameError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>
                          placeholder={t("registration.organizationNameError")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedinUrl">
                    {t("registration.linkedinUrlLabel")}{" "}
                    <span className="text-gray-500 text-sm">
                      {t("registration.linkedinUrlOptional")}
                    </span>
                  </Label>
                  <Input
                    id="linkedinUrl"
                    value={formData.linkedinUrl}
                    onChange={(e) =>
                      handleInputChange("linkedinUrl", e.target.value)
                    }
                    placeholder={t("registration.linkedinUrlPlaceholder")}
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
                {t("registration.teamInfoTitle")}
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize" className="flex items-center gap-1">
                    {t("registration.teamSizeLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.teamSize}
                    onValueChange={(value) =>
                      handleInputChange("teamSize", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue
                        placeholder={t("registration.teamSizePlaceholder")}
                      />
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
                    {t("registration.teamNameLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="teamName"
                    name="teamName"
                    value={formData.teamName}
                    onChange={(e) =>
                      handleInputChange("teamName", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder={t("registration.teamNamePlaceholder")}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isTeamNameError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>{t("registration.teamNameError")}</span>
                    </div>
                  )}
                  <p className="text-xs text-gray-500">
                    {t("registration.teamNameNote")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Solution Information */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                {t("registration.solutionInfoTitle")}
              </h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="themeChosen"
                    className="flex items-center gap-1"
                  >
                    {t("registration.themeChosenLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Select
                    value={formData.themeChosen}
                    onValueChange={(value) =>
                      handleInputChange("themeChosen", value)
                    }
                  >
                    <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#007aff]">
                      <SelectValue
                        placeholder={t("registration.themeChosenPlaceholder")}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {t("forms.themes", { returnObjects: true }).map(
                        (theme) => (
                          <SelectItem key={theme} value={theme}>
                            {theme}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ideaTitle"
                    className="flex items-center gap-1"
                  >
                    {t("registration.ideaTitleLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Input
                    id="ideaTitle"
                    name="ideaTitle"
                    value={formData.ideaTitle}
                    onChange={(e) =>
                      handleInputChange("ideaTitle", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder={t("registration.ideaTitlePlaceholder")}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff]"
                  />
                  {isIdeaTitleError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>{t("registration.ideaTitleError")}</span>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="ideaDescription"
                    className="flex items-center gap-1"
                  >
                    {t("registration.ideaDescriptionLabel")}
                    <span className="text-red-600">*</span>
                  </Label>
                  <Textarea
                    id="ideaDescription"
                    name="ideaDescription"
                    value={formData.ideaDescription}
                    onChange={(e) =>
                      handleInputChange("ideaDescription", e.target.value)
                    }
                    onBlur={handleBlur}
                    placeholder={t("registration.ideaDescriptionPlaceholder")}
                    rows={4}
                    className="bg-gray-50 border-gray-200 focus:border-[#007aff] resize-none"
                  />
                  {isIdeaDescriptionError && (
                    <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                      <AlertCircle
                        className="w-3 h-3 flex-shrink-0 "
                        style={{ marginTop: "1px" }}
                      />
                      <span>{t("registration.ideaDescriptionError")}</span>
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
                {t("registration.consentTitle")}
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
                      <Trans
                        i18nKey="registration.consentLabel"
                        components={{
                          termsLink: (
                            <a
                              href={`${window.location.origin}/${i18n.language}/#terms-and-conditions`}
                              className="text-[#01A2FD] hover:underline hover:text-[#0077CC] transition-colors duration-200"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3 inline ml-1 align-text-top" />
                            </a>
                          ),
                        }}
                      />
                    </Label>
                    {!formData.consent && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                          className="w-3 h-3 flex-shrink-0 "
                          style={{ marginTop: "1px" }}
                        />
                        <span>{t("registration.consentError")}</span>
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
                {t("registration.securityVerificationTitle")}
              </h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-4">
                  <Label className="text-sm">
                    {t("registration.securityVerificationLabel")}
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
                      <span>{t("registration.captchaError")}</span>
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
              {t("registration.clearFormButton")}
            </Button>

            <Button
              type="submit"
              className="flex-1 mosip-primary-button text-white font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("registration.submittingButton")}
                </>
              ) : (
                <>{t("registration.submitButton")}</>
              )}
            </Button>
          </div>
        </form>

        {/* Footer Navigation */}
        <div className="text-center mt-8 pt-8 border-t border-gray-200">
          <Button
            variant="ghost"
            onClick={onNavigateHome}
            className="flex items-center gap-2 text-gray-600 hover:text-white mx-auto"
          >
            {t("registration.returnToHomepageButton")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
