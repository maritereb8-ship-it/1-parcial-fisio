import React, { useState, useMemo } from 'react';
import { questions } from './data';
import QuestionCard from './components/QuestionCard';
import { Search, Brain, Stethoscope, BookOpen } from 'lucide-react';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');

  const categories = ['Todos', ...Array.from(new Set(questions.map(q => q.category)))];

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchesSearch = q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            q.answerText.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'Todos' || q.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              NeuroRepaso
            </h1>
          </div>
          <div className="text-sm text-slate-500 font-medium hidden sm:block">
            Dr. Transcript V1.0
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Intro Section */}
        <div className="mb-10 text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Revisión de Examen</h2>
          <p className="text-slate-600 max-w-2xl">
            Transcripción interactiva de la sesión de revisión de neurología. 
            Cubre síndromes motores, cerebelosos, ACV e hipertensión intracraneal.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-full text-blue-600">
              <BookOpen size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Total Preguntas</p>
              <p className="text-2xl font-bold">{questions.length}</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-full text-green-600">
              <Stethoscope size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Casos Clínicos</p>
              <p className="text-2xl font-bold">
                {questions.filter(q => q.category === 'Clínica').length}
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-full text-purple-600">
              <Brain size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500">Neuroanatomía</p>
              <p className="text-2xl font-bold">
                {questions.filter(q => q.category === 'Motor' || q.category === 'Cerebelo').length}
              </p>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 sticky top-20 z-10 bg-slate-50/95 p-4 rounded-xl backdrop-blur-sm border border-slate-200/50 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar por palabra clave (ej: Parkinson, Babinski)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sm:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none bg-white cursor-pointer"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Questions Grid */}
        {filteredQuestions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredQuestions.map((q) => (
              <QuestionCard key={q.id} data={q} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
            <div className="text-slate-400 mb-2">No se encontraron resultados</div>
            <p className="text-slate-500 text-sm">Intenta ajustar tus filtros de búsqueda</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;