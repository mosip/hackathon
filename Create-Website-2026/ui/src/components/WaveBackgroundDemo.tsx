import React from 'react';
import { Button } from './ui/button';
import { useTranslation } from 'react-i18next';

const WaveBackgroundDemo: React.FC = () => {
  const { t } = useTranslation();
  const waveStyles = [
    {
      name: t("waveBackgroundDemo.style1Name"),
      description: t("waveBackgroundDemo.style1Description"),
      className: t("waveBackgroundDemo.style1Details"),
      details:t("waveBackgroundDemo.style1Details")
},
    {
      name: t("waveBackgroundDemo.style2Name"),
      description: t("waveBackgroundDemo.style2Description"),
      className: t("waveBackgroundDemo.style2Details"),
      details: t("waveBackgroundDemo.style2Details")
    },
    {
      name: t("waveBackgroundDemo.style3Name"),
      description: t("waveBackgroundDemo.style3Description"),
      className: t("waveBackgroundDemo.style3Details"),
      details: t("waveBackgroundDemo.style3Details")
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="screen_width mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t("waveBackgroundDemo.pageTitle")}
          </h1>
          <p className="text-xl text-gray-600">
            {t("waveBackgroundDemo.pageSubtitle")}
          </p>
        </div>

        <div className="grid gap-8">
          {waveStyles.map((style, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {style.name}
                </h3>
                <p className="text-gray-600 mb-2">{style.description}</p>
                <p className="text-sm text-gray-500">{style.details}</p>
              </div>
              
              {/* Demo Area */}
              <div className={`relative h-64 ${style.className}`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-md">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {t("waveBackgroundDemo.sampleContentTitle")}
                    </h4>
                    <p className="text-gray-600 mb-4">
                      {t("waveBackgroundDemo.sampleContentText")}
                    </p>
                    <Button className="mosip-gradient text-white">
                      {t("waveBackgroundDemo.sampleButton")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Full-width hero demo */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            {t("waveBackgroundDemo.fullWidthDemoTitle")}
          </h2>
          <div className="bg-mosip-waves animate-mosip-wave-flow min-h-screen relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                {t("waveBackgroundDemo.heroTitle")}
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                {t("waveBackgroundDemo.heroSubtitle")}
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="mosip-gradient text-white">
                  {t("waveBackgroundDemo.registerNowButton")}
                </Button>
                <Button size="lg" variant="outline">
                  {t("waveBackgroundDemo.learnMoreButton")}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">{t("waveBackgroundDemo.implementationNotesTitle")}</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>{t("waveBackgroundDemo.note1")}</strong> {t("waveBackgroundDemo.note1Text")}</li>
            <li>• <strong>{t("waveBackgroundDemo.note2")}</strong> {t("waveBackgroundDemo.note2Text")}</li>
            <li>• <strong>{t("waveBackgroundDemo.note3")}</strong> {t("waveBackgroundDemo.note3Text")}</li>
            <li>• <strong>{t("waveBackgroundDemo.note4")}</strong> {t("waveBackgroundDemo.note4Text")}</li>
            <li>• <strong>{t("waveBackgroundDemo.note5")}</strong> {t("waveBackgroundDemo.note5Text")}</li>
            <li>• <strong>{t("waveBackgroundDemo.note6")}</strong> {t("waveBackgroundDemo.note6Text")}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaveBackgroundDemo;