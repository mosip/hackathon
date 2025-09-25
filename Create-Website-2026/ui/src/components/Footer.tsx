import image_fe70712a127327592a84bb2ce92b28723292f63f from "figma:asset/fe70712a127327592a84bb2ce92b28723292f63f.png";
import imgFootLogoB from "figma:asset/d01052815fad41170245fccda69e19a12bcd55fc.png";
import imgIiitbNew from "figma:asset/b12ea7d05c7f72a3ee2602703ac1cb43d900b63c.png";
import imgYotubeN from "figma:asset/13047e71e460fe2f1874c9c6e7fc295934e73e44.png";
import imgLinkedinN from "figma:asset/3830b0a76a7bab95fa85912a5a26575dee198f71.png";
import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer
      id="contact"
      className="bg-[#072cb8] text-white py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="screen_width mx-auto">
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:gap-8 lg:items-start">
          {/* MOSIP Logo Section */}
          <div className="lg:col-span-1 flex justify-center">
            <img
              src={image_fe70712a127327592a84bb2ce92b28723292f63f}
              alt="MOSIP Logo"
              className="h-24 w-auto object-contain"
            />
          </div>

          {/* Divider */}
          <div className="flex justify-center items-start pt-8">
            <div className="h-32 w-px bg-white/30"></div>
          </div>

          {/* Incubated by Section */}
          <div className="lg:col-span-1 text-center">
            <h3 className="font-semibold mb-4 text-white">{t("footer.incubatedBy")}</h3>
            <img
              src={imgIiitbNew}
              alt="IIITB Logo"
              className="h-20 w-auto mx-auto object-contain"
            />
          </div>

          {/* Contact Us Section */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-white">{t("footer.contactUs")}</h3>
            <div className="space-y-3">
              <a
                href="mailto:info@mosip.io"
                className="block text-[#e0bd59] hover:text-[#f0cd69] underline transition-colors"
              >
                info@mosip.io
              </a>
              <div className="text-sm leading-relaxed">
                <p>{t("footer.address1")}</p>
                <p>{t("footer.address2")}</p>
              </div>
              <p className="text-sm">+91 8041407777</p>
            </div>
          </div>

          {/* Quick Links Section */}
          <div className="lg:col-span-1">
            <h3 className="font-bold mb-4 text-white">{t("footer.quickLinks")}</h3>
            <div className="space-y-3 mb-6">
              <a
                href="https://www.mosip.io/privacy_policy"
                className="block text-sm hover:text-blue-200 transition-colors"
                target="_blank"
              >
                {t("footer.privacyPolicy")}
              </a>
              <a
                href="https://www.mosip.io/ip_policy"
                className="block text-sm hover:text-blue-200 transition-colors"
                target="_blank"
              >
                {t("footer.ipPolicy")}
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-3">
              <a
                href="https://www.youtube.com/@mosip16"
                className="hover:opacity-80 transition-opacity"
                aria-label="YouTube"
                target="_blank"
              >
                <img
                  src={imgYotubeN}
                  alt="YouTube"
                  className="h-10 w-10 object-contain"
                />
              </a>
              <a
                href="https://www.linkedin.com/company/mosip-project"
                className="hover:opacity-80 transition-opacity"
                aria-label="LinkedIn"
                target="_blank"
              >
                <img
                  src={imgLinkedinN}
                  alt="LinkedIn"
                  className="h-10 w-10 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {/* Logo and Incubated by */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start space-y-6 sm:space-y-0">
            <div className="text-center sm:text-left">
              <img
                src={imgFootLogoB}
                alt="MOSIP Logo"
                className="h-16 w-auto mx-auto sm:mx-0 object-contain mb-4"
              />
            </div>
            <div className="text-center sm:text-right">
              <h3 className="font-semibold mb-4 text-white">{t("footer.incubatedBy")}</h3>
              <img
                src={imgIiitbNew}
                alt="IIITB Logo"
                className="h-12 w-auto mx-auto sm:mx-0 sm:ml-auto object-contain"
              />
            </div>
          </div>

          {/* Contact and Quick Links */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Contact Us */}
            <div>
              <h3 className="font-bold mb-3 text-white">{t("footer.contactUs")}</h3>
              <div className="space-y-2">
                <a
                  href="mailto:info@mosip.io"
                  className="block text-[#e0bd59] hover:text-[#f0cd69] underline transition-colors text-sm"
                >
                  info@mosip.io
                </a>
                <div className="text-xs leading-relaxed text-gray-200">
                  <p>{t("footer.address1")}</p>
                  <p>{t("footer.address2")}</p>
                </div>
                <p className="text-xs">+91 8041407777</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-bold mb-3 text-white">{t("footer.quickLinks")}</h3>
              <div className="space-y-2 mb-4">
                <a
                  href="https://www.mosip.io/privacy_policy"
                  className="block text-sm hover:text-blue-200 transition-colors"
                  target="_blank"
                >
                  {t("footer.privacyPolicy")}
                </a>
                <a
                  href="https://www.mosip.io/ip_policy"
                  className="block text-sm hover:text-blue-200 transition-colors"
                  target="_blank"
                >
                  {t("footer.ipPolicy")}
                </a>
              </div>

              {/* Social Media Icons */}
              <div className="flex space-x-3">
                <a
                  href="https://www.youtube.com/@mosip16"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="YouTube"
                  target="_blank"
                >
                  <img
                    src={imgYotubeN}
                    alt="YouTube"
                    className="h-8 w-8 object-contain"
                  />
                </a>
                <a
                  href="https://www.linkedin.com/company/mosip-project"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                  target="_blank"
                >
                  <img
                    src={imgLinkedinN}
                    alt="LinkedIn"
                    className="h-8 w-8 object-contain"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm text-gray-200">
            {t("footer.allRightsReserved")}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
