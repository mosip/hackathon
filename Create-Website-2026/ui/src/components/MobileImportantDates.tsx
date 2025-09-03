import React from "react";
import Registration1 from "../imports/Registration1";
import customIcon from "figma:asset/f1afe06bf45db115c7afa170686ecc0ebf300a5d.png";
import megaphoneIcon from "figma:asset/4d7007529e1ac070a3f7d3dd7b9c4fde473a654e.png";
import winnersIcon from "figma:asset/f4f6133b731393444669f67f6836826f7e8c19f2.png";

const MobileImportantDates: React.FC = () => {
  const keyDates = [
    {
      icon: <Registration1 />,
      label: "Registration Opens",
      date: "Sep 3, 2025",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
      iconColor: "text-blue-600",
      textColor: "text-blue-700",
    },
    {
      icon: (
        <img
          src={customIcon}
          alt="Registration Closes"
          className="w-8 h-8 object-contain"
        />
      ),
      label: "Registration Closes",
      date: "Oct 1, 2025",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      iconColor: "text-orange-600",
      textColor: "text-orange-700",
    },
    {
      icon: (
        <img
          src={megaphoneIcon}
          alt="Submissions Due"
          className="w-6 h-6 object-contain"
        />
      ),
      label: "Submissions Due",
      date: "Dec 1, 2025",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      iconColor: "text-green-600",
      textColor: "text-green-700",
    },
    {
      icon: (
        <img
          src={winnersIcon}
          alt="WINNERS TRAVEL TO MOSIP CONNECT 2026"
          className="w-6 h-6 object-contain"
        />
      ),
      label: "WINNERS TRAVEL TO MOSIP CONNECT 2026",
      date: "Feb, 2026",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
      iconColor: "text-purple-600",
      textColor: "text-purple-700",
    },
  ];

  return (
    <section className="block lg:hidden w-full bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Important Dates
          </h3>
          <p className="text-gray-600">Mark your calendar</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {keyDates.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.borderColor} border-2 rounded-xl p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover-scale-102 cursor-pointer group backdrop-blur-sm animate-fade-in-up`}
              style={{ animationDelay: `${0.5 + index * 0.1}s` }}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div
                  className={`${item.iconColor} bg-white p-3 sm:p-4 rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-300 flex-shrink-0`}
                >
                  <div className="w-5 h-5 sm:w-6 sm:h-6">{item.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-xs sm:text-sm font-semibold ${item.textColor} uppercase tracking-wide mb-1 sm:mb-2`}
                  >
                    {item.label}
                  </div>
                  <div className="text-sm sm:text-base md:text-lg font-bold text-gray-900 leading-tight">
                    {item.date}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MobileImportantDates;
