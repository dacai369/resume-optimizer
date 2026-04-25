
import React from 'react';

export function QuestionCard(props) {
  const { question, selectedOptionId, onSelect, index } = props;
  
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex items-center justify-center w-8 h-8 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
          {index + 1}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
          {question.difficulty === 'easy' ? '简单' : question.difficulty === 'medium' ? '中等' : '较难'}
        </span>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
          {question.category}
        </span>
      </div>
      
      <p className="text-gray-800 font-medium mb-4 leading-relaxed">
        {question.text}
      </p>
      
      <div className="space-y-2">
        {question.options.map((option) => (
          <button
            key={option.id}
            onClick={() => onSelect(option.id)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedOptionId === option.id
                ? 'border-blue-500 bg-blue-50 text-blue-800'
                : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            <span className="flex items-start gap-3">
              <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                selectedOptionId === option.id
                  ? 'border-blue-500 bg-blue-500 text-white'
                  : 'border-gray-300'
              }`}>
                {selectedOptionId === option.id && (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
              <span className="text-sm">{option.text}</span>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

