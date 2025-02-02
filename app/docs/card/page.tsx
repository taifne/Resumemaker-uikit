import React from "react";
import Card from "../../components/Card/card";

const CardDocumentation = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Card Component Documentation</h1>
      <p className="text-gray-700 mb-6">
        The <code>Card</code> component is a versatile UI element that can be used to display content
        with optional images, buttons, and various styles.
      </p>

      <h2 className="text-2xl font-semibold mb-3">Usage</h2>
      <pre className="bg-gray-100 p-4 rounded-md mb-6 overflow-auto">
        {`import Card from './Card';

<Card 
  title="Beautiful Landscape" 
  description="A scenic view of the mountains during sunset." 
  imageUrl="https://source.unsplash.com/random/400x300" 
  linkUrl="#" 
  buttonText="Explore More" 
  variant="elevated" 
  colorScheme="primary" 
  hoverEffect="shadow" 
  shadow="lg" 
  rounded="lg" 
/>`}
      </pre>

      <h2 className="text-2xl font-semibold mb-3">Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card 
          title="Mountain View" 
          description="A breathtaking view of the mountains." 
          imageUrl="https://source.unsplash.com/random/400x300?mountain" 
          linkUrl="#" 
          buttonText="View More" 
          variant="elevated" 
          colorScheme="primary" 
          hoverEffect="scale" 
          shadow="lg" 
          rounded="md"
        />

        <Card 
          title="Ocean Waves" 
          description="Experience the tranquility of ocean waves." 
          imageUrl="https://source.unsplash.com/random/400x300?ocean" 
          linkUrl="#" 
          buttonText="Discover" 
          variant="outline" 
          colorScheme="secondary" 
          hoverEffect="shadow" 
          shadow="md" 
          rounded="lg"
        />
      </div>
    </div>
  );
};

export default CardDocumentation;
