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
import { ExternalLink, AlertCircle, Loader2, ArrowLeft, X } from "lucide-react";
import { toast } from "sonner@2.0.3";
import mosipCreateLogo from "figma:asset/b6bfb4740d2a7a77a523484516cbc2e77f82379d.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useTranslation } from 'react-i18next';

interface SubmissionPageProps {
  onNavigateHome: () => void;
}

const SubmissionPage: React.FC<SubmissionPageProps> = ({ onNavigateHome }) => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    teamName: "",
    email: "",
    themeChosen: "",
    ideaTitle: "",
    ideaDescription: "",
    problemChallenge: "",
    targetAudience: "",
    additionalComments: "",
    consent: false,
    recaptchaToken: "",
    uploadedFiles: [] as string[],
  });

  const captchaSiteKey = import.meta.env.VITE_CAPTCHA_SITE_KEY;
  const _reCaptchaRef = useRef(null);

  const themes = [
    "Digital ID for Service Access",
    "eKYC for Inclusive Identity Verification",
    "Financial Inclusion through Digital Identity",
    "Credential Facilitation for Empowerment",
  ];

  const [isFullNameError, setFullNameError] = useState(false);
  const [isEmailError, setEmailError] = useState(false);
  const [isTeamNameError, setTeamNameError] = useState(false);
  const [isIdeaTitleError, setIdeaTitleError] = useState(false);
  const [isIdeaDescriptionError, setIdeaDescriptionError] = useState(false);
  const [isProblemChallengeError, setProblemChallengeError] = useState(false);
  const [isTargetAudienceError, setTargetAudienceError] = useState(false);

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
      // ✅ Only letters, numbers, hyphens (-) full stops (.) and spaces are allowed.

      const ideaDescriptionRegex = /^[A-Za-z0-9-. \s]+$/;

      if (value.trim() && !ideaDescriptionRegex.test(value.trim())) {
        setIdeaDescriptionError(true);
      } else {
        setIdeaDescriptionError(false);
      }
    }

    if (name === "problemChallenge") {
      // ✅ Only letters, numbers, hyphens (-) full stops (.) and spaces are allowed.

      const problemChallengeRegex = /^[A-Za-z0-9-. \s]+$/;

      if (value.trim() && !problemChallengeRegex.test(value.trim())) {
        setProblemChallengeError(true);
      } else {
        setProblemChallengeError(false);
      }
    }

    if (name === "targetAudience") {
      // ✅ Only letters, numbers, hyphens (-) full stops (.) and spaces are allowed.

      const targetAudienceRegex = /^[A-Za-z0-9-. \s]+$/;

      if (value.trim() && !targetAudienceRegex.test(value.trim())) {
        setTargetAudienceError(true);
      } else {
        setTargetAudienceError(false);
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

  const handleFileUpload = async (
      event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files: File[] = event.target.files
        ? Array.from(event.target.files)
        : [];

    const allowedTypes = [
      "application/pdf",
      "application/vnd.ms-powerpoint",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/zip",
      "application/x-zip-compressed",
    ];

    const maxSize = 10 * 1024 * 1024; // 10MB limit

    const validFiles = files.filter((file) => {
      if (!allowedTypes.includes(file.type)) {
        toast.error(
            `${file.name}: Unsupported file type. Please upload PDF, PPT, DOCX, or ZIP files.`
        );
        return false;
      }
      if (file.size > maxSize) {
        toast.error(`${file.name}: File size exceeds 10MB limit.`);
        return false;
      }
      return true;
    });

    const uploadedFileNames: string[] = [];

    for (const file of validFiles) {
      try {
        const fileName = await uploadFile(file); // returns string
        uploadedFileNames.push(fileName);
      } catch (err) {
        toast.error(`${file.name}: Upload failed.`);
      }
    }

    // Update state only if there are new uploaded files
    if (uploadedFileNames.length > 0) {
      setUploadedFiles((prev) => {
        const updated = [...prev, ...uploadedFileNames];
        setFormData((prevFormData) => ({
          ...prevFormData,
          uploadedFiles: updated,
        }));
        return updated;
      });

      toast.success(
          `${uploadedFileNames.length} file(s) uploaded successfully.`
      );
    }
  };

  // Utility function to call Lambda and upload file to S3
  async function uploadFile(file: File): Promise<string> {
    // 1️⃣ Get presigned POST from Lambda
    const res = await fetch(import.meta.env.VITE_FILE_UPLOAD_LAMBDA_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ fileName: file.name, fileType: file.type }),
    });

    if (!res.ok) throw new Error("Failed to get presigned URL");

    const { url, fields, fileName } = await res.json(); // Lambda returns presigned fields + fileName

    // 2️⃣ Upload to S3
    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) =>
        formData.append(key, value as string)
    );
    formData.append("file", file);

    const upload = await fetch(url, { method: "POST", body: formData });
    if (!upload.ok) throw new Error("File upload failed. Please try again.");

    return fileName; // final S3 file name to store in state
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // ✅ required to allow drop
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    // ✅ Convert FileList to Array<File>
    const files = Array.from(e.dataTransfer.files);

    // ✅ Create a fake event to reuse handleFileUpload
    const fakeEvent = {
      target: { files } as unknown as HTMLInputElement,
    } as React.ChangeEvent<HTMLInputElement>;

    handleFileUpload(fakeEvent);
  };

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      // update formData too
      setFormData((prevFormData) => ({
        ...prevFormData,
        uploadedFiles: updated,
      }));
      return updated;
    });
    toast.success(t("submission.fileRemovedSuccess"));
  };

  const validateForm = () => {
    const requiredFields = [
      "fullName",
      "teamName",
      "email",
      "themeChosen",
      "ideaTitle",
      "ideaDescription",
      "uploadedFiles",
      "problemChallenge",
      "targetAudience",
      "consent",
      "recaptchaToken",
    ];

    const missingFields = requiredFields.filter(
        (field) => !formData[field as keyof typeof formData]
    );

    if (missingFields.length > 0) {
      toast.error(t("submission.fillAllFieldsError"));
      return false;
    }

    if (uploadedFiles.length === 0) {
      toast.error(t("submission.uploadAttachment"));
      return false;
    }

    if (!formData.consent) {
      toast.error(t("submission.provideConsent"));
      return false;
    }

    if (!formData.recaptchaToken) {
      toast.error(t("submission.completeCaptcha"));
      return false;
    }

    if (isFullNameError) {
      toast.error(t("submission.invalidFullName"));
      return false;
    }

    if (isEmailError) {
      toast.error(t("submission.invalidEmail"));
      return false;
    }

    if (isTeamNameError) {
      toast.error(t("submission.invalidTeamName"));
      return false;
    }

    if (isIdeaTitleError) {
      toast.error(t("submission.invalidIdeaTitle"));
      return false;
    }

    if (isIdeaDescriptionError) {
      toast.error(t("submission.invalidIdeaDescription"));
      return false;
    }

    if (isProblemChallengeError) {
      toast.error(t("submission.invalidProblemChallenge"));
      return false;
    }

    if (isTargetAudienceError) {
      toast.error(t("submission.invalidTargetAudience"));
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

      const res = await fetch(import.meta.env.VITE_SOLUTION_SUBMISSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          formType: "submission",
        }),
      });

      if (res.ok) {
        toast.success(
            t("submission.submissionSuccess")
        );
        resetCaptcha();
      } else {
        toast.error(t("submission.submissionFailure"));
      }

      // Reset form
      setFormData({
        fullName: "",
        teamName: "",
        email: "",
        themeChosen: "",
        ideaTitle: "",
        ideaDescription: "",
        problemChallenge: "",
        targetAudience: "",
        additionalComments: "",
        consent: false,
        recaptchaToken: "",
        uploadedFiles: [],
      });
      setUploadedFiles([]);

      // Navigate back to homepage after successful submission
      setTimeout(() => {
        onNavigateHome();
      }, 12000);
    } catch (error) {
      toast.error("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearForm = () => {
    setFormData({
      fullName: "",
      teamName: "",
      email: "",
      themeChosen: "",
      ideaTitle: "",
      ideaDescription: "",
      problemChallenge: "",
      targetAudience: "",
      additionalComments: "",
      consent: false,
      recaptchaToken: "",
      uploadedFiles: [],
    });
    setUploadedFiles([]);
    resetCaptcha();
    toast.success("Form cleared successfully");
  };

  return (
      <div className="min-h-screen bg-gray-50 submission">
        {/* Header with Back Button */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="screen_width mx-auto px-4 sm:px-6 lg:px-8 pt-[4em] lg:pt-[7em]">
            <div className="flex items-center justify-between h-16">
              <Button
                  variant="ghost"
                  onClick={onNavigateHome}
                  className="flex items-center gap-2 text-gray-600 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
                {t("submission.backToHomepage")}
              </Button>

              <div className="flex items-center gap-3"></div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="text-center mb-8">
            <div
                className="text-white rounded-2xl p-6 md:p-8 mb-6"
                style={{ backgroundColor: "#1B52A4" }}
            >
              <div className="text-center mb-4">
                <div className="mb-4">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight">
                    {t("submission.pageTitle")}
                  </h1>
                  <div className="text-lg md:text-xl font-semibold text-white/90 mt-1">
                    {t("submission.formTitle")}
                  </div>
                </div>
              </div>
              <p className="text-white/90 text-base md:text-lg max-w-3xl mx-auto text-center leading-relaxed">
                {t("submission.formDescription")}
              </p>
            </div>
          </div>

          {/* Mandatory Fields Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <strong>{t("submission.note")}:</strong> {t("submission.mandatoryFields")}{" "}
              <span className="text-red-600 font-bold">*</span> {t("submission.mandatoryFields2")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.personalInfoTitle")}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      {t("submission.fullNameLabel")}<span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={(e) =>
                            handleInputChange("fullName", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.fullNamePlaceholder")}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />

                    {isFullNameError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>{t("submission.fullNameError")}</span>
                        </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="teamName" className="flex items-center gap-1">
                      {t("submission.teamNameLabel")}<span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="teamName"
                        name={t("submission.teamNameLabel")}
                        value={formData.teamName}
                        onChange={(e) =>
                            handleInputChange("teamName", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.teamNamePlaceholder")}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                    {isTeamNameError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>
                        {t("submission.teamNameError")}
                      </span>
                        </div>
                    )}
                    <p className="text-xs text-gray-500">
                      {t("submission.teamNameNote")}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organization Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.organizationInfoTitle")}
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center gap-1">
                    {t("submission.emailLabel")}<span className="text-red-600">*</span>
                  </Label>
                  <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      onBlur={handleBlur}
                      placeholder={t("submission.emailPlaceholder")}
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                  />
                  {isEmailError && (
                      <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                        <AlertCircle
                            className="w-3 h-3 flex-shrink-0 "
                            style={{ marginTop: "1px" }}
                        />
                        <span>
                      {t("submission.emailError")}
                    </span>
                      </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Solution Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.solutionInfoTitle")}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                        htmlFor="themeChosen"
                        className="flex items-center gap-1"
                    >
                      {t("submission.themeChosenLabel")}<span className="text-red-600">*</span>
                    </Label>
                    <Select
                        value={formData.themeChosen}
                        onValueChange={(value) =>
                            handleInputChange("themeChosen", value)
                        }
                    >
                      <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]">
                        <SelectValue placeholder={t("submission.themeChosenPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {t("forms.themes", { returnObjects: true }).map((theme) => (
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
                      {t("submission.ideaTitleLabel")}<span className="text-red-600">*</span>
                    </Label>
                    <Input
                        id="ideaTitle"
                        name="ideaTitle"
                        value={formData.ideaTitle}
                        onChange={(e) =>
                            handleInputChange("ideaTitle", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.ideaTitlePlaceholder")}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                    {isIdeaTitleError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>
                        {t("submission.ideaTitleError")}
                      </span>
                        </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                        htmlFor="ideaDescription"
                        className="flex items-center gap-1"
                    >
                      {t("submission.ideaDescriptionLabel")}<span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="ideaDescription"
                        name="ideaDescription"
                        value={formData.ideaDescription}
                        onChange={(e) =>
                            handleInputChange("ideaDescription", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.ideaDescriptionPlaceholder")}
                        rows={4}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD] resize-none"
                    />

                    {isIdeaDescriptionError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>
                        {t("submission.ideaDescriptionError")}
                      </span>
                        </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Attachments */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.attachmentsTitle")}<span className="text-red-600">*</span>
                </h3>

                <div className="space-y-4">
                  <div
                      className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center"
                      onDragOver={handleDragOver}
                      onDrop={handleDrop}
                  >
                    <Label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-[#01A2FD] hover:text-[#0077CC] font-medium">
                      {t("submission.fileUploadPlaceholder1")}
                    </span>
                      <span className="text-gray-500">{t("submission.fileUploadPlaceholder2")}</span>
                    </Label>
                    <Input
                        id="file-upload"
                        type="file"
                        multiple
                        accept=".pdf,.ppt,.pptx,.doc,.docx,.zip"
                        onChange={handleFileUpload}
                        className="hidden"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      {t("submission.fileFormats")}
                    </p>
                  </div>

                  {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <Label className="text-sm font-medium">
                          {t("submission.uploadedFilesLabel")}
                        </Label>
                        {uploadedFiles.map((file, index) => (
                            <div
                                key={file}
                                className="flex items-center justify-between bg-gray-100 p-3 rounded-lg"
                            >
                              <div className="flex items-center gap-2 flex-1">
                          <span className="text-sm text-gray-700 truncate">
                            {file}
                          </span>
                              </div>
                              <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeFile(index)}
                                  className="text-red-600 hover:text-red-800"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                            </div>
                        ))}
                      </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Problem & Audience */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.problemAudienceTitle")}
                </h3>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                        htmlFor="problemChallenge"
                        className="flex items-center gap-1"
                    >
                      {t("submission.problemLabel")}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="problemChallenge"
                        name="problemChallenge"
                        value={formData.problemChallenge}
                        onChange={(e) =>
                            handleInputChange("problemChallenge", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.problemPlaceholder")}
                        rows={4}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD] resize-none"
                    />
                    {isProblemChallengeError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>
                        {t("submission.problemError")}
                      </span>
                        </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label
                        htmlFor="targetAudience"
                        className="flex items-center gap-1"
                    >
                      {t("submission.targetAudienceLabel")}
                      <span className="text-red-600">*</span>
                    </Label>
                    <Textarea
                        id="targetAudience"
                        name="targetAudience"
                        value={formData.targetAudience}
                        onChange={(e) =>
                            handleInputChange("targetAudience", e.target.value)
                        }
                        onBlur={handleBlur}
                        placeholder={t("submission.targetAudiencePlaceholder")}
                        rows={3}
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD] resize-none"
                    />
                    {isTargetAudienceError && (
                        <div className="flex items-start gap-1.5 text-xs text-red-600 ">
                          <AlertCircle
                              className="w-3 h-3 flex-shrink-0 "
                              style={{ marginTop: "1px" }}
                          />
                          <span>
                        {t("submission.targetAudienceError")}
                      </span>
                        </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Comments */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.additionalInfoTitle")}
                </h3>

                <div className="space-y-2">
                  <Label htmlFor="additionalComments">
                    {t("submission.additionalCommentsLabel")}{" "}
                    <span className="text-gray-500 text-sm">{t("submission.additionalCommentsOptional")}</span>
                  </Label>
                  <Textarea
                      id="additionalComments"
                      value={formData.additionalComments}
                      onChange={(e) =>
                          handleInputChange("additionalComments", e.target.value)
                      }
                      placeholder={t("submission.additionalCommentsPlaceholder")}
                      rows={3}
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD] resize-none"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  {t("submission.consentTitle")}
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
                        {t("submission.consentLabel")}{" "}
                        <a
                            href={`${window.location.origin}/#terms-and-conditions`}
                            className="text-[#01A2FD] hover:underline hover:text-[#0077CC] transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                          {t("accordion.termsTitle")}
                          <ExternalLink className="w-3 h-3 inline ml-1 align-text-top" />
                        </a>
                        .
                      </Label>
                      {!formData.consent && (
                          <div className="flex items-start gap-1.5 text-xs text-red-600">
                            <AlertCircle
                                className="w-3 h-3 flex-shrink-0 mt-0.5"
                                style={{ marginTop: "1px" }}
                            />
                            <span>{t("submission.consentError")}</span>
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
                  {t("submission.securityVerificationTitle")}
                </h3>

                <div className="space-y-4">
                  <div className="flex flex-col gap-4">
                    <Label className="text-sm">
                      {t("submission.securityVerificationLabel")}
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
                          <span>{t("submission.captchaError")}</span>
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
                {t("submission.clearFormButton")}
              </Button>

              <Button
                  type="submit"
                  className="flex-1 mosip-primary-button font-semibold"
                  disabled={isSubmitting}
              >
                {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t("submission.submittingButton")}
                    </>
                ) : (
                    <>{t("submission.submitButton")}</>
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
              {t("submission.returnToHomepageButton")}
            </Button>
          </div>
        </div>
      </div>
  );
};

export default SubmissionPage;
