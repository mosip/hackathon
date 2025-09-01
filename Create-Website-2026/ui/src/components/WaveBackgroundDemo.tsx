import React from 'react';
import { Button } from './ui/button';

const WaveBackgroundDemo: React.FC = () => {
  const waveStyles = [
    {
      name: "Horizontal Wave Lines",
      description: "Subtle horizontal wave lines - MOSIP style",
      className: "bg-mosip-waves animate-mosip-wave-flow",
      details: "Pure CSS SVG lines, 60s animation"
    },
    {
      name: "Horizontal Wave Lines (Reverse)",
      description: "Same waves but moving in reverse direction",
      className: "bg-mosip-waves animate-mosip-wave-flow-reverse",
      details: "Pure CSS SVG lines, 80s reverse animation"
    },
    {
      name: "Filled Wave Areas",
      description: "Subtle filled wave areas - Alternative style",
      className: "bg-mosip-waves-filled animate-mosip-wave-flow-filled",
      details: "SVG filled areas, 40s animation"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            MOSIP Wave Background Demo
          </h1>
          <p className="text-xl text-gray-600">
            Pure CSS animated wave backgrounds - Choose your preferred style
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
                      Sample Content
                    </h4>
                    <p className="text-gray-600 mb-4">
                      This is how your content would look over the wave background.
                      The waves are subtle and don't interfere with readability.
                    </p>
                    <Button className="mosip-gradient text-white">
                      Sample Button
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
            Full-Width Hero Section Demo
          </h2>
          <div className="bg-mosip-waves animate-mosip-wave-flow min-h-screen relative rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
              <h1 className="text-5xl font-bold text-gray-900 mb-6">
                MOSIP Create 2025
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Experience the subtle, professional wave animation that perfectly
                complements your content without being distracting.
              </p>
              <div className="flex gap-4">
                <Button size="lg" className="mosip-gradient text-white">
                  Register Now
                </Button>
                <Button size="lg" variant="outline">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Implementation Notes:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• <strong>Pure CSS:</strong> No JavaScript required</li>
            <li>• <strong>Performance:</strong> Uses CSS transforms and background-position for smooth animation</li>
            <li>• <strong>Responsive:</strong> SVG patterns scale perfectly on all screen sizes</li>
            <li>• <strong>Subtle:</strong> Light grey (#eaeaea, #e0e0e0, #f0f0f0) colors that don't interfere with content</li>
            <li>• <strong>Accessibility:</strong> Respects prefers-reduced-motion for users who need less animation</li>
            <li>• <strong>Mobile-friendly:</strong> Patterns won't pixelate or stretch on different devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WaveBackgroundDemo;