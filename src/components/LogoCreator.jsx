import React, { useState, useRef } from 'react';
import { Download, Palette, Type, Circle, Square, Triangle } from 'lucide-react';

const LogoCreator = () => {
  const [config, setConfig] = useState({
    text: 'LOGO',
    fontSize: 48,
    fontFamily: 'Arial',
    textColor: '#000000',
    backgroundColor: '#ffffff',
    shape: 'none',
    shapeColor: '#007bff',
    width: 300,
    height: 200,
    borderRadius: 0
  });

  const svgRef = useRef(null);

  const shapes = {
    none: null,
    circle: <circle cx={config.width/2} cy={config.height/2} r={Math.min(config.width, config.height)/3} fill={config.shapeColor} />,
    square: <rect x={config.width/4} y={config.height/4} width={config.width/2} height={config.height/2} fill={config.shapeColor} rx={config.borderRadius} />,
    triangle: <polygon points={`${config.width/2},${config.height/4} ${config.width*3/4},${config.height*3/4} ${config.width/4},${config.height*3/4}`} fill={config.shapeColor} />
  };

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const downloadSVG = () => {
    const svgData = svgRef.current.outerHTML;
    const blob = new Blob([svgData], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'logo.svg';
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadPNG = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = config.width;
    canvas.height = config.height;

    const svgData = svgRef.current.outerHTML;
    const img = new Image();
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      ctx.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'logo.png';
        link.click();
      });
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">ロゴクリエーター</h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5" />
              設定パネル
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">テキスト</label>
                <input
                  type="text"
                  value={config.text}
                  onChange={(e) => updateConfig('text', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">フォントサイズ</label>
                  <input
                    type="range"
                    min="12"
                    max="72"
                    value={config.fontSize}
                    onChange={(e) => updateConfig('fontSize', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{config.fontSize}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">フォント</label>
                  <select
                    value={config.fontFamily}
                    onChange={(e) => updateConfig('fontFamily', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Arial">Arial</option>
                    <option value="Helvetica">Helvetica</option>
                    <option value="Times New Roman">Times New Roman</option>
                    <option value="Georgia">Georgia</option>
                    <option value="Courier New">Courier New</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">テキスト色</label>
                  <input
                    type="color"
                    value={config.textColor}
                    onChange={(e) => updateConfig('textColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">背景色</label>
                  <input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) => updateConfig('backgroundColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">図形</label>
                <div className="flex gap-2">
                  {['none', 'circle', 'square', 'triangle'].map((shape) => (
                    <button
                      key={shape}
                      onClick={() => updateConfig('shape', shape)}
                      className={`px-3 py-2 rounded-md border ${
                        config.shape === shape 
                          ? 'bg-blue-500 text-white border-blue-500' 
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {shape === 'none' && 'なし'}
                      {shape === 'circle' && <Circle className="w-4 h-4" />}
                      {shape === 'square' && <Square className="w-4 h-4" />}
                      {shape === 'triangle' && <Triangle className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {config.shape !== 'none' && (
                <div>
                  <label className="block text-sm font-medium mb-2">図形の色</label>
                  <input
                    type="color"
                    value={config.shapeColor}
                    onChange={(e) => updateConfig('shapeColor', e.target.value)}
                    className="w-full h-10 border border-gray-300 rounded-md"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">幅</label>
                  <input
                    type="range"
                    min="200"
                    max="500"
                    value={config.width}
                    onChange={(e) => updateConfig('width', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{config.width}px</span>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">高さ</label>
                  <input
                    type="range"
                    min="100"
                    max="400"
                    value={config.height}
                    onChange={(e) => updateConfig('height', parseInt(e.target.value))}
                    className="w-full"
                  />
                  <span className="text-sm text-gray-500">{config.height}px</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">プレビュー</h2>
            
            <div className="flex flex-col items-center space-y-4">
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <svg
                  ref={svgRef}
                  width={config.width}
                  height={config.height}
                  style={{ backgroundColor: config.backgroundColor }}
                  className="border border-gray-300 rounded"
                >
                  {shapes[config.shape]}
                  <text
                    x={config.width / 2}
                    y={config.height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={config.fontSize}
                    fontFamily={config.fontFamily}
                    fill={config.textColor}
                    fontWeight="bold"
                  >
                    {config.text}
                  </text>
                </svg>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={downloadSVG}
                  className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  SVGダウンロード
                </button>
                <button
                  onClick={downloadPNG}
                  className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  PNGダウンロード
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoCreator;