import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const GeneratorNode = memo(({ data, selected }) => {
  const [funcName, setFuncName] = useState(data.funcName || 'my_generator');
  const [params, setParams] = useState(data.params || 'n');
  const [yieldExpr, setYieldExpr] = useState(data.yieldExpr || 'i');
  const [loopCode, setLoopCode] = useState(data.loopCode || 'for i in range(n)');

  const helpContent = `
## Generator

Bellek verimli iterable nesneler oluşturur.

### Sözdizimi:
\`\`\`python
def generator():
    for i in range(10):
        yield i

# Kullanım
for value in generator():
    print(value)
\`\`\`

### Avantajları:
- Lazy evaluation
- Bellek tasarrufu
- Sonsuz diziler
- Pipeline oluşturma

### Generator Expression:
\`\`\`python
gen = (x**2 for x in range(10))
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[260px]
      ${selected 
        ? 'border-teal-400 shadow-teal-500/30' 
        : 'border-teal-500/30 hover:border-teal-400/60'} 
      bg-gradient-to-br from-teal-900/90 to-emerald-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-teal-500 !w-3 !h-3 !border-2 !border-teal-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">♾️</span>
        <span className="font-bold text-teal-300 text-sm">Generator</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-teal-500/30 text-teal-200 px-2 py-0.5 rounded-full">Python</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-teal-300 block mb-1">Fonksiyon Adı</label>
            <input
              type="text"
              value={funcName}
              onChange={(e) => setFuncName(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-teal-500/30 focus:border-teal-400 outline-none font-mono"
              placeholder="my_gen"
            />
          </div>
          <div>
            <label className="text-[10px] text-teal-300 block mb-1">Parametreler</label>
            <input
              type="text"
              value={params}
              onChange={(e) => setParams(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-teal-500/30 focus:border-teal-400 outline-none font-mono"
              placeholder="n"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-teal-300 block mb-1">Döngü</label>
          <input
            type="text"
            value={loopCode}
            onChange={(e) => setLoopCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-teal-500/30 focus:border-teal-400 outline-none font-mono"
            placeholder="for i in range(n)"
          />
        </div>

        <div>
          <label className="text-[10px] text-teal-300 block mb-1">Yield İfadesi</label>
          <input
            type="text"
            value={yieldExpr}
            onChange={(e) => setYieldExpr(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-teal-500/30 focus:border-teal-400 outline-none font-mono"
            placeholder="i"
          />
        </div>

        <div className="text-[10px] text-teal-400/70 bg-black/20 p-2 rounded-lg font-mono">
          def {funcName}({params}):<br/>
          &nbsp;&nbsp;{loopCode}:<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;yield {yieldExpr}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-teal-500 !w-3 !h-3 !border-2 !border-teal-300" />
    </div>
  );
});

GeneratorNode.displayName = 'GeneratorNode';
export default GeneratorNode;
