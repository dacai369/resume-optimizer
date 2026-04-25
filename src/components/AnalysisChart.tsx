
import React from 'react';

export function AnalysisChart(props) {
  const { dimensions } = props;
  
  return (
    <div className="space-y-4">
      {dimensions.map((dimension, index) => {
        const percentage = Math.round((dimension.score / dimension.maxScore) * 100);
        
        return (
          <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-800">{dimension.name}</span>
              <span className="text-blue-600 font-semibold">{percentage}%</span>
            </div>
            <div className="text-sm text-gray-500 mb-3">{dimension.description}</div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

