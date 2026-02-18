import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const ListCompNode = memo(({ data, selected }) => {
  const [expression, setExpression] = useState(data.expression || 'x * 2');
  const [iterator, setIterator] = useState(data.iterator || 'x');
  const [iterable, setIterable] = useState(data.iterable || 'numbers');
  const [condition, setCondition] = useState(data.condition || '');
  const [variable, setVariable] = useState(data.variable || 'result');
  const [compType, setCompType] = useState(data.compType || 'list');

  const helpContent = `
## List Comprehension

Kısa ve okunabilir liste/dict/set oluşturma.

### Sözdizimi:
\`[expression for item in iterable if condition]\`

### Örnekler:
\`\`\`python
# Liste
squares = [x**2 for x in range(10)]

# Koşullu
evens = [x for x in nums if x % 2 == 0]

# Dict comprehension
d = {x: x**2 for x in range(5)}

# Set comprehension
s = {x % 3 for x in range(10)}
\`\`\`
  `;

  const getBrackets = () => {
    switch(compType) {
      case 'dict': return ['{', '}'];
      case 'set': return ['{', '}'];
      case 'generator': return ['(', ')'];
      default: return ['[', ']'];
    }
  };
  const [open, close] = getBrackets();

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-lime-400 shadow-lime-500/30' 
        : 'border-lime-500/30 hover:border-lime-400/60'} 
      bg-gradient-to-br from-lime-900/90 to-green-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-lime-500 !w-3 !h-3 !border-2 !border-lime-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📝</span>
        <span className="font-bold text-lime-300 text-sm">List Comp</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-lime-500/30 text-lime-200 px-2 py-0.5 rounded-full">Python</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-lime-300 block mb-1">Değişken</label>
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none font-mono"
              placeholder="result"
            />
          </div>
          <div>
            <label className="text-[10px] text-lime-300 block mb-1">Tür</label>
            <select
              value={compType}
              onChange={(e) => setCompType(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none"
            >
              <option value="list">List [ ]</option>
              <option value="dict">Dict { }</option>
              <option value="set">Set { }</option>
              <option value="generator">Generator ( )</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-lime-300 block mb-1">İfade (Expression)</label>
          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none font-mono"
            placeholder="x * 2"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-lime-300 block mb-1">İteratör</label>
            <input
              type="text"
              value={iterator}
              onChange={(e) => setIterator(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none font-mono"
              placeholder="x"
            />
          </div>
          <div>
            <label className="text-[10px] text-lime-300 block mb-1">Kaynak</label>
            <input
              type="text"
              value={iterable}
              onChange={(e) => setIterable(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none font-mono"
              placeholder="range(10)"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-lime-300 block mb-1">Koşul (Opsiyonel)</label>
          <input
            type="text"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-lime-500/30 focus:border-lime-400 outline-none font-mono"
            placeholder="x > 0"
          />
        </div>

        <div className="text-[10px] text-lime-400/70 bg-black/20 p-2 rounded-lg font-mono overflow-x-auto">
          {variable} = {open}{expression} for {iterator} in {iterable}{condition ? ` if ${condition}` : ''}{close}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-lime-500 !w-3 !h-3 !border-2 !border-lime-300" />
    </div>
  );
});

ListCompNode.displayName = 'ListCompNode';
export default ListCompNode;
