import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const StreamNode = memo(({ data, selected }) => {
  const [source, setSource] = useState(data.source || 'list');
  const [operations, setOperations] = useState(data.operations || '.filter(x -> x > 0)\n.map(x -> x * 2)');
  const [terminal, setTerminal] = useState(data.terminal || 'collect(Collectors.toList())');
  const [variable, setVariable] = useState(data.variable || 'result');

  const helpContent = `
## Java Stream API

Koleksiyonlar üzerinde fonksiyonel operasyonlar.

### Ara Operasyonlar:
- **filter**: Filtreleme
- **map**: Dönüştürme
- **sorted**: Sıralama
- **distinct**: Tekil değerler
- **limit**: Sınırlama

### Terminal Operasyonlar:
- **collect**: Liste/Set/Map'e dönüştür
- **forEach**: Her eleman için
- **reduce**: Birleştir
- **count**: Say
- **findFirst**: İlk eleman

### Örnek:
\`\`\`java
List<Integer> result = numbers.stream()
    .filter(n -> n > 0)
    .map(n -> n * 2)
    .collect(Collectors.toList());
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-cyan-400 shadow-cyan-500/30' 
        : 'border-cyan-500/30 hover:border-cyan-400/60'} 
      bg-gradient-to-br from-cyan-900/90 to-blue-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-cyan-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🌊</span>
        <span className="font-bold text-cyan-300 text-sm">Stream</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded-full">Java</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-cyan-300 block mb-1">Değişken</label>
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
              placeholder="result"
            />
          </div>
          <div>
            <label className="text-[10px] text-cyan-300 block mb-1">Kaynak</label>
            <input
              type="text"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
              placeholder="list"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-cyan-300 block mb-1">Ara Operasyonlar</label>
          <textarea
            value={operations}
            onChange={(e) => setOperations(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none resize-none font-mono"
            rows="3"
            placeholder=".filter(x -> x > 0)"
          />
        </div>

        <div>
          <label className="text-[10px] text-cyan-300 block mb-1">Terminal Operasyon</label>
          <input
            type="text"
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
            placeholder="collect(Collectors.toList())"
          />
        </div>

        <div className="text-[10px] text-cyan-400/70 bg-black/20 p-2 rounded-lg font-mono overflow-x-auto">
          {variable} = {source}.stream()<br/>
          {operations.split('\n').map((op, i) => (
            <span key={i}>&nbsp;&nbsp;{op}<br/></span>
          ))}
          &nbsp;&nbsp;.{terminal};
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-cyan-300" />
    </div>
  );
});

StreamNode.displayName = 'StreamNode';
export default StreamNode;
