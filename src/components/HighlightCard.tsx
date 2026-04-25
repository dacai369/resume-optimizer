
import React, { useState } from 'react';
import { Copy } from 'lucide-react';

const categoryColors = {
  'skills': 'from-blue-500 to-blue-600',
  'experience': 'from-purple-500 to-purple-600',
  'soft-skills': 'from-teal-500 to-teal-600',
  'achievements': 'from-orange-500 to-orange-600'
};

const categoryIcons = {
  'skills': '💡',
  'experience': '🚀',
  'soft-skills': '🤝',
  'achievements': '🏆'
};

export function HighlightCard(props) {
  const { highlight, index } = props;
  const [copied, setCopied] = useState(false);
  
  const handleCopy = () => {
    const text = `${highlight.title}:\n${highlight.description}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${categoryColors[highlight.category]} flex items-center justify-center text-xl`}>
            {categoryIcons[highlight.category]}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{highlight.title}</h3>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          title="复制"
        >
          {copied ? (
            <span className="text-green-600 text-sm">已复制</span>
          ) : (
            <Copy className="w-4 h-4 text-gray-500" />
          )}
        </button>
      </div>
      
      <p className="text-gray-600 mb-4 leading-relaxed">{highlight.description}</p>
      
      <div className="flex flex-wrap gap-2">
        {highlight.keywords.map((keyword, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
          >
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );
}

