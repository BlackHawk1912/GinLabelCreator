import React, { useState } from 'react';

const GinLabelGenerator = () => {
  const [labelData, setLabelData] = useState({
    brandName: 'CELESTIAL GIN',
    tagline: 'Distilled with botanical perfection',
    abv: '43.5',
    batch: '001',
    botanicals: 'Juniper, Coriander, Angelica, Citrus Peel, Cardamom',
    style: 'London Dry',
    location: 'Handcrafted in Small Batches',
    extraText: 'Enjoy responsibly',
    color: '#00264d',
    textColor: '#ffffff',
    accentColor: '#c9a87c',
    fontStyle: 'serif',
    borderStyle: 'ornate'
  });

  const borderStyles = {
    simple: 'border-2',
    double: 'border-4 border-double',
    dashed: 'border-2 border-dashed',
    ornate: 'border-4'
  };

  const fontStyles = {
    serif: 'font-serif',
    sans: 'font-sans',
    mono: 'font-mono'
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLabelData({
      ...labelData,
      [name]: value
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 w-full max-w-6xl p-4">
      {/* Form Controls */}
      <div className="w-full md:w-1/2 space-y-4">
        <h2 className="text-xl font-bold mb-4">Gin Label Designer</h2>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Brand Name</label>
            <input
              type="text"
              name="brandName"
              value={labelData.brandName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Tagline</label>
            <input
              type="text"
              name="tagline"
              value={labelData.tagline}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">ABV %</label>
              <input
                type="text"
                name="abv"
                value={labelData.abv}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Batch #</label>
              <input
                type="text"
                name="batch"
                value={labelData.batch}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Botanicals</label>
            <textarea
              name="botanicals"
              value={labelData.botanicals}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              rows="2"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Gin Style</label>
              <input
                type="text"
                name="style"
                value={labelData.style}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={labelData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Extra Text</label>
            <input
              type="text"
              name="extraText"
              value={labelData.extraText}
              onChange={handleChange}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Main Color</label>
              <input
                type="color"
                name="color"
                value={labelData.color}
                onChange={handleChange}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
            
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Text Color</label>
              <input
                type="color"
                name="textColor"
                value={labelData.textColor}
                onChange={handleChange}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
            
            <div className="w-1/3">
              <label className="block text-sm font-medium mb-1">Accent Color</label>
              <input
                type="color"
                name="accentColor"
                value={labelData.accentColor}
                onChange={handleChange}
                className="w-full h-10 p-1 border rounded"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Font Style</label>
              <select
                name="fontStyle"
                value={labelData.fontStyle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="serif">Serif</option>
                <option value="sans">Sans-serif</option>
                <option value="mono">Monospace</option>
              </select>
            </div>
            
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Border Style</label>
              <select
                name="borderStyle"
                value={labelData.borderStyle}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              >
                <option value="simple">Simple</option>
                <option value="double">Double</option>
                <option value="dashed">Dashed</option>
                <option value="ornate">Ornate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Label Preview */}
      <div className="w-full md:w-1/2 flex justify-center items-start">
        <div 
          className={`w-64 h-96 rounded-lg p-4 flex flex-col items-center justify-between ${borderStyles[labelData.borderStyle]}`}
          style={{ 
            backgroundColor: labelData.color,
            color: labelData.textColor,
            borderColor: labelData.accentColor
          }}
        >
          <div className="text-center w-full mt-4">
            <div className={`text-xs mb-1 ${fontStyles[labelData.fontStyle]}`} style={{ color: labelData.accentColor }}>
              PREMIUM CRAFT
            </div>
            <div className={`text-2xl font-bold mb-1 tracking-wider ${fontStyles[labelData.fontStyle]}`}>
              {labelData.brandName.toUpperCase()}
            </div>
            <div className={`text-sm italic mb-4 ${fontStyles[labelData.fontStyle]}`}>
              {labelData.tagline}
            </div>
          </div>
          
          <div className="text-center flex-grow flex flex-col justify-center w-full">
            <div className={`uppercase text-sm mb-2 ${fontStyles[labelData.fontStyle]}`} style={{ color: labelData.accentColor }}>
              {labelData.style}
            </div>
            <div className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center" style={{ backgroundColor: labelData.accentColor }}>
              <div style={{ color: labelData.color }} className="text-xl">GIN</div>
            </div>
            <div className={`text-xs mt-2 ${fontStyles[labelData.fontStyle]}`}>
              {labelData.location}
            </div>
          </div>
          
          <div className="text-center w-full mb-4">
            <div className={`text-xs mb-2 ${fontStyles[labelData.fontStyle]}`}>
              {labelData.botanicals.split(',').map((botanical, index) => (
                <span key={index}>
                  {botanical.trim()}
                  {index < labelData.botanicals.split(',').length - 1 ? ' • ' : ''}
                </span>
              ))}
            </div>
            
            <div className={`flex justify-between text-xs mb-2 ${fontStyles[labelData.fontStyle]}`}>
              <span>BATCH {labelData.batch}</span>
              <span>{labelData.abv}% ABV</span>
            </div>
            
            <div className={`text-xs italic ${fontStyles[labelData.fontStyle]}`} style={{ color: labelData.accentColor }}>
              {labelData.extraText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GinLabelGenerator;
