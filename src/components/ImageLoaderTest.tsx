import React, { useEffect, useState } from 'react';

interface ImageModule {
  default: string;
}

const ImageLoaderTest: React.FC = () => {
  const [modules, setModules] = useState<Record<string, ImageModule>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const testImageLoading = async () => {
      try {
        console.log('Testing import.meta.glob...');
        
        // Test the glob pattern
        const imageModules = import.meta.glob('/src/assets/**/*.{jpg,jpeg,png,webp}', { eager: true });
        
        console.log('Found modules:', Object.keys(imageModules));
        console.log('Full modules object:', imageModules);
        
        // Test specific folder patterns
        const sprintersPattern = Object.keys(imageModules).filter(path => 
          path.toLowerCase().includes('sprinters')
        );
        console.log('Sprinters images:', sprintersPattern);
        
        const vClassPattern = Object.keys(imageModules).filter(path => 
          path.toLowerCase().includes('v class')
        );
        console.log('V Class images:', vClassPattern);
        
        setModules(imageModules);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    testImageLoading();
  }, []);

  if (loading) {
    return <div className="p-4">Loading image test...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-bold mb-4">Image Loader Test</h3>
      <div className="mb-4">
        <strong>Total modules found: {Object.keys(modules).length}</strong>
      </div>
      <div className="max-h-96 overflow-y-auto">
        <h4 className="font-semibold mb-2">Module Paths:</h4>
        <ul className="text-sm space-y-1">
          {Object.keys(modules).map((path, index) => (
            <li key={index} className="font-mono text-xs bg-white p-1 rounded">
              {path}
            </li>
          ))}
        </ul>
      </div>
      
      {Object.keys(modules).length > 0 && (
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Sample Images:</h4>
          <div className="grid grid-cols-3 gap-2">
            {Object.entries(modules).slice(0, 6).map(([path, module]) => (
              <div key={path} className="text-center">
                <img 
                  src={(module as ImageModule).default} 
                  alt={path.split('/').pop()} 
                  className="w-full h-20 object-cover rounded"
                  onError={(e) => {
                    console.error('Failed to load image:', path);
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                <p className="text-xs mt-1 truncate">{path.split('/').pop()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageLoaderTest;