import { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, RotateCcw, Save } from 'lucide-react';
import api from '../services/api';

const Compiler = () => {
  const [code, setCode] = useState('public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    setIsRunning(true);
    setOutput('Compiling and Running...');
    try {
      const response = await api.post('/compiler/execute', { code, input });
      setOutput(response.data.output);
    } catch (error) {
      setOutput('Error connecting to compiler service.');
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      <div className="flex-1 flex flex-col glass rounded-2xl border border-white/5 overflow-hidden">
        <div className="p-4 border-b border-white/10 flex justify-between items-center bg-black/20">
          <h2 className="font-bold flex items-center gap-2">
            <span className="text-spideyRed">{'</>'}</span> Java Editor
          </h2>
          <div className="flex gap-3">
            <button 
              className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center gap-2 transition-colors"
              onClick={() => setCode('public class Main {\n    public static void main(String[] args) {\n        \n    }\n}')}
            >
              <RotateCcw size={16} /> Reset
            </button>
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <Save size={16} /> Save
            </button>
            <button 
              onClick={handleRun}
              className="px-4 py-2 bg-gradient-to-r from-spideyRed to-spideyBlue text-white rounded-lg text-sm font-medium flex items-center gap-2 shadow-[0_0_10px_rgba(229,0,0,0.3)] hover:shadow-[0_0_15px_rgba(229,0,0,0.6)] transition-all"
            >
              <Play size={16} fill="white" /> Run Code
            </button>
          </div>
        </div>
        <div className="flex-1">
          <Editor
            height="100%"
            defaultLanguage="java"
            theme="vs-dark"
            value={code}
            onChange={(value) => setCode(value)}
            options={{
              minimap: { enabled: false },
              fontSize: 16,
              fontFamily: 'Fira Code, monospace',
              padding: { top: 20 },
            }}
          />
        </div>
      </div>
      
      <div className="w-1/3 flex flex-col gap-6">
        <div className="glass rounded-2xl border border-white/5 p-6 flex-1 flex flex-col">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-spideyBlue"></span> Input
          </h3>
          <textarea 
            className="w-full flex-1 bg-black/40 border border-white/10 rounded-xl p-4 text-gray-300 focus:border-spideyBlue focus:outline-none resize-none font-mono text-sm"
            placeholder="Custom input..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          ></textarea>
        </div>
        
        <div className="glass rounded-2xl border border-white/5 p-6 flex-1 flex flex-col">
          <h3 className="font-bold mb-4 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span> Output
          </h3>
          <div className="w-full flex-1 bg-black/60 border border-white/10 rounded-xl p-4 text-gray-300 font-mono text-sm overflow-auto">
            {output ? (
              <pre>{output}</pre>
            ) : (
              <span className="text-gray-500 italic">Run your code to see output...</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compiler;
