import React, { useState } from 'react';
import { Question } from '../types';
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react';

interface QuestionCardProps {
  data: Question;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ data }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Motor': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cerebelo': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ACV': return 'bg-red-100 text-red-800 border-red-200';
      case 'P. Intracraneal': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Clínica': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <span className={`text-xs font-bold px-2 py-1 rounded border ${getCategoryColor(data.category)}`}>
            {data.category}
          </span>
          <span className="text-slate-400 font-mono text-sm">#{data.numberStr}</span>
        </div>
        
        <h3 className="text-lg font-medium text-slate-800 mb-6 leading-relaxed">
          {data.question}
        </h3>

        <div className="relative">
          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isRevealed ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex items-start gap-3">
              <CheckCircle2 className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-slate-900 text-lg mb-1">
                  Opción {data.answerOption}
                </span>
                <p className="text-slate-700">
                  {data.answerText}
                </p>
              </div>
            </div>
          </div>
          
          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-slate-400 text-sm italic">Respuesta oculta</p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-slate-50 px-6 py-3 border-t border-slate-100 flex justify-end">
        <button
          onClick={() => setIsRevealed(!isRevealed)}
          className="flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          {isRevealed ? (
            <>
              <EyeOff size={16} /> Ocultar Respuesta
            </>
          ) : (
            <>
              <Eye size={16} /> Ver Respuesta
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default QuestionCard;