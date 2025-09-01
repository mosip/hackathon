"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
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
  Loader2
} from "lucide-react";
import { toast } from "sonner@2.0.3";

interface RegistrationFormProps {
  children: React.ReactNode;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ children }) => {
  const [open, setOpen] = useState(false);
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
    consent: false
  });

  const themes = [
    "Digital ID for Service Access",
    "eKYC for Inclusive Identity Verification", 
    "Financial Inclusion through Digital Identity",
    "Credential Facilitation for Empowerment"
  ];

  const teamSizes = [
    "1 member",
    "2-3 members", 
    "4-5 members",
    "6-7 members",
    "8-10 members"
  ];

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", 
    "Austria", "Azerbaijan", "Bahrain", "Bangladesh", "Belarus", "Belgium", 
    "Bosnia and Herzegovina", "Brazil", "Bulgaria", "Cambodia", "Canada", 
    "Chile", "China", "Colombia", "Croatia", "Cyprus", "Czech Republic", 
    "Denmark", "Ecuador", "Egypt", "Estonia", "Ethiopia", "Finland", "France", 
    "Georgia", "Germany", "Ghana", "Greece", "Guatemala", "Hungary", "Iceland", 
    "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Japan", 
    "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon", "Lithuania", 
    "Luxembourg", "Malaysia", "Malta", "Mexico", "Morocco", "Nepal", "Netherlands", 
    "New Zealand", "Nigeria", "Norway", "Pakistan", "Peru", "Philippines", 
    "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", 
    "Serbia", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", 
    "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Tunisia", 
    "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
    "Uruguay", "Vietnam", "Other"
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'fullName', 'country', 'email', 'organizationName', 
      'teamSize', 'teamName', 'themeChosen', 'ideaTitle', 'ideaDescription'
    ];
    
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
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
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Registration submitted successfully! Check your email for confirmation.");
      setOpen(false);
      
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
        consent: false
      });
      
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
      consent: false
    });
    toast.success("Form cleared successfully");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <div className="bg-gradient-to-r from-[#01A2FD] to-[#0077CC] p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Users className="w-6 h-6" />
              </div>
              MOSIP Create 2025 Registration
            </DialogTitle>
            <DialogDescription className="text-blue-100 text-lg">
              Join the global challenge to build ready-for-adoption DPI solutions under MOSIP mentorship
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-[#01A2FD]" />
                  Personal Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="flex items-center gap-1">
                      Full Name <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      placeholder="Enter your full name"
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="flex items-center gap-1">
                      Country <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Select value={formData.country} onValueChange={(value) => handleInputChange('country', value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]">
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
                  <Building className="w-5 h-5 text-[#0A8754]" />
                  Organization Information
                </h3>
                
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-1">
                        E-Mail (Organization) <Badge variant="destructive" className="text-xs">Required</Badge>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="organization@company.com"
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organizationName" className="flex items-center gap-1">
                        Organization Name <Badge variant="destructive" className="text-xs">Required</Badge>
                      </Label>
                      <Input
                        id="organizationName"
                        value={formData.organizationName}
                        onChange={(e) => handleInputChange('organizationName', e.target.value)}
                        placeholder="Enter organization name"
                        className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="linkedinUrl">
                      LinkedIn URL (Organization) <span className="text-gray-500 text-sm">- Optional</span>
                    </Label>
                    <Input
                      id="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                      placeholder="https://linkedin.com/company/your-organization"
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Team Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#FA8005]" />
                  Team Information
                </h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="teamSize" className="flex items-center gap-1">
                      Team Size <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Select value={formData.teamSize} onValueChange={(value) => handleInputChange('teamSize', value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]">
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
                      Team Name <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Input
                      id="teamName"
                      value={formData.teamName}
                      onChange={(e) => handleInputChange('teamName', e.target.value)}
                      placeholder="Enter your team name"
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                    <p className="text-xs text-gray-500">
                      Remember this name - use the exact same name during solution submission.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Solution Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-[#FEC401]" />
                  Solution Information
                </h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="themeChosen" className="flex items-center gap-1">
                      Theme Chosen <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Select value={formData.themeChosen} onValueChange={(value) => handleInputChange('themeChosen', value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]">
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
                    <Label htmlFor="ideaTitle" className="flex items-center gap-1">
                      Idea Title <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Input
                      id="ideaTitle"
                      value={formData.ideaTitle}
                      onChange={(e) => handleInputChange('ideaTitle', e.target.value)}
                      placeholder="Enter your solution idea title"
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD]"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="ideaDescription" className="flex items-center gap-1">
                      Idea Description <Badge variant="destructive" className="text-xs">Required</Badge>
                    </Label>
                    <Textarea
                      id="ideaDescription"
                      value={formData.ideaDescription}
                      onChange={(e) => handleInputChange('ideaDescription', e.target.value)}
                      placeholder="Briefly describe your solution idea, target audience, and how it addresses the chosen theme..."
                      rows={4}
                      className="bg-gray-50 border-gray-200 focus:border-[#01A2FD] resize-none"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Consent */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#D64045]" />
                  Consent & Agreement
                </h3>
                
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="consent"
                      checked={formData.consent}
                      onCheckedChange={(checked) => handleInputChange('consent', checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="consent" className="text-sm leading-relaxed cursor-pointer">
                        I consent to the collection of the above data for the purpose of facilitating my participation in MOSIP Create. 
                        I understand that my data will be used solely for this purpose and will not be shared with any other party. 
                        By clicking below, I also agree to the{" "}
                        <a 
                          href="#" 
                          className="text-[#01A2FD] hover:underline inline-flex items-center gap-1"
                          onClick={(e) => {
                            e.preventDefault();
                            // This would open T&C in a new tab/modal
                            toast.info("Terms & Conditions will open in a new window");
                          }}
                        >
                          Terms & Conditions <ExternalLink className="w-3 h-3" />
                        </a>
                        .
                      </Label>
                      {!formData.consent && (
                        <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          Consent is required to proceed
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                className="flex-1 bg-[#01A2FD] hover:bg-[#0077CC] text-white font-semibold"
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RegistrationForm;