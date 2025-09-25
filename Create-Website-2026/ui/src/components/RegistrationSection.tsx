import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Calendar,
  Globe,
  Award,
  Code
} from 'lucide-react'
import imgVectorSmartObjectCopy3 from 'figma:asset/090648f5fa21993900783133f6a357aa8dd4541b.png'
import { useTranslation } from 'react-i18next';

const RegistrationSection = () => {
  const { t } = useTranslation();
  const registrationSteps = [
    {
      step: "1",
      title: t("registrationSection.step1Title"),
      description: t("registrationSection.step1Description"),
      icon: <Users className="w-5 h-5" />
    },
    {
      step: "2",
      title: t("registrationSection.step2Title"),
      description: t("registrationSection.step2Description"),
      icon: <Globe className="w-5 h-5" />
    },
    {
      step: "3",
      title: t("registrationSection.step3Title"),
      description: t("registrationSection.step3Description"),
      icon: <Calendar className="w-5 h-5" />
    },
    {
      step: "4",
      title: t("registrationSection.step4Title"),
      description: t("registrationSection.step4Description"),
      icon: <Award className="w-5 h-5" />
    }
  ]

  const keyBenefits = [
    t("registrationSection.benefit1"),
    t("registrationSection.benefit2"),
    t("registrationSection.benefit3"),
    t("registrationSection.benefit4"),
    t("registrationSection.benefit5"),
    t("registrationSection.benefit6")
  ]

  return (
    <section id="register" className="py-20 bg-gray-50">
      <div className="screen_width mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-800 mb-6 px-4 py-2 text-sm font-semibold">
            {t("registrationSection.badgeText")}
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {t("registrationSection.headerTitle")}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("registrationSection.headerSubtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Registration steps */}
          <div className="space-y-8">
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-8 text-gray-900">{t("registrationSection.howToRegisterTitle")}</h3>
                
                <div className="space-y-6">
                  {registrationSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                          {step.step}
                        </div>
                      </div>
                      <div className="flex-1 pt-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="text-blue-600">
                            {step.icon}
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900">{step.title}</h4>
                        </div>
                        <p className="text-gray-600 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Key Benefits */}
            <Card className="bg-white shadow-lg border-0">
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-6 text-gray-900">{t("registrationSection.whyParticipateTitle")}</h3>
                <ul className="space-y-4">
                  {keyBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Registration CTA and visual */}
          <div className="space-y-8">
            <Card className="bg-blue-600 text-white border-0 shadow-xl">
              <CardContent className="p-8 text-center">
                <div className="mb-8">
                  <Clock className="w-16 h-16 mx-auto mb-4 opacity-90" />
                  <h3 className="text-2xl font-bold mb-4">{t("registrationSection.timeRunningOutTitle")}</h3>
                  <p className="text-blue-100 leading-relaxed">
                    {t("registrationSection.timeRunningOutText")}
                  </p>
                </div>

                <div className="bg-white/10 rounded-xl p-6 mb-8">
                  <div className="grid grid-cols-2 gap-6 text-center">
                    <div>
                      <div className="text-3xl font-bold">50+</div>
                      <div className="text-sm text-blue-100">{t("registrationSection.countriesParticipating")}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">6-8</div>
                      <div className="text-sm text-blue-100">{t("registrationSection.winningTeams")}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">3</div>
                      <div className="text-sm text-blue-100">{t("registrationSection.monthsDevelopment")}</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold">Morocco</div>
                      <div className="text-sm text-blue-100">{t("registrationSection.finalEventLocation")}</div>
                    </div>
                  </div>
                </div>

                <Button 
                  size="lg"
                  className="w-full bg-white text-blue-600 hover:bg-gray-50 font-bold py-4 text-lg rounded-lg shadow-lg transition-all duration-300"
                >
                  <Users className="w-5 h-5 mr-2" />
                  {t("registrationSection.registerYourTeamNow")}
                </Button>
                
                <p className="text-sm text-blue-100 mt-4">
                  {t("registrationSection.alreadyRegisteredText")}<a href="#" className="underline hover:no-underline font-semibold">{t("registrationSection.checkYourStatus")}</a>
                </p>
              </CardContent>
            </Card>

            {/* Visual element inspired by homepage ecosystem section */}
            <Card className="bg-white shadow-lg border-0 overflow-hidden">
              <CardContent className="p-0">
                <div className="relative h-64 bg-gradient-to-br from-blue-600 to-blue-800">
                  <div className="absolute inset-0 bg-black/20" />
                  <img
                    src={imgVectorSmartObjectCopy3}
                    alt="Global ecosystem visualization"
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h4 className="text-xl font-bold mb-2">{t("registrationSection.joinEcosystemTitle")}</h4>
                      <p className="text-blue-100">{t("registrationSection.joinEcosystemSubtitle")}</p>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Code className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-gray-900">{t("registrationSection.openSourcePlatform")}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Additional call-to-action section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              {t("registrationSection.questionsTitle")}
            </h3>
            <p className="text-gray-600 mb-6 leading-relaxed">
              {t("registrationSection.questionsText")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg"
              >
                {t("registrationSection.viewFAQButton")}
              </Button>
              <Button 
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg"
              >
                {t("registrationSection.contactSupportButton")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default RegistrationSection