import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const LambdaNode = memo(({ data, selected }) => {
  const [params, setParams] = useState(data.params || 'x');
  const [expression, setExpression] = useState(data.expression || 'x * 2');
  const [variable, setVariable] = useState(data.variable || 'double');

  const helpContent = `
## Lambda Fonksiyon

Tek satırlık anonim fonksiyonlar.

### Sözdizimi:
\`lambda args: expression\`

### Örnekler:
\`\`\`python
# Basit lambda
double = lambda x: x * 2

# Birden fazla parametre
add = lambda x, y: x + y

# Filtre ile kullanım
list(filter(lambda x: x > 0, numbers))

# Map ile kullanım  
list(map(lambda x: x**2, numbers))
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[260px]
      ${selected 
        ? 'border-fuchsia-400 shadow-fuchsia-500/30' 
        : 'border-fuchsia-500/30 hover:border-fuchsia-400/60'} 
      bg-gradient-to-br from-fuchsia-900/90 to-purple-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-fuchsia-500 !w-3 !h-3 !border-2 !border-fuchsia-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">⚡</span>
        <span className="font-bold text-fuchsia-300 text-sm">Lambda</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-fuchsia-500/30 text-fuchsia-200 px-2 py-0.5 rounded-full">Python</span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-fuchsia-300 block mb-1">Değişken Adı</label>
          <input
            type="text"
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-fuchsia-500/30 focus:border-fuchsia-400 outline-none font-mono"
            placeholder="func"
          />
        </div>

        <div>
          <label className="text-[10px] text-fuchsia-300 block mb-1">Parametreler</label>
          <input
            type="text"
            value={params}
            onChange={(e) => setParams(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-fuchsia-500/30 focus:border-fuchsia-400 outline-none font-mono"
            placeholder="x, y"
          />
        </div>

        <div>
          <label className="text-[10px] text-fuchsia-300 block mb-1">İfade (Expression)</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-fuchsia-500/30 focus:border-fuchsia-400 outline-none font-mono"
            placeholder="x * 2"
          />
        </div>

        <div className="text-[10px] text-fuchsia-400/70 bg-black/20 p-2 rounded-lg font-mono">
          {variable} = lambda {params}: {expression}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-fuchsia-500 !w-3 !h-3 !border-2 !border-fuchsia-300" />
    </div>
  );
});

LambdaNode.displayName = 'LambdaNode';
export default LambdaNode;
