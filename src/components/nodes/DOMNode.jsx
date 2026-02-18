import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const DOMNode = memo(({ data, selected }) => {
  const [operation, setOperation] = useState(data.operation || 'querySelector');
  const [selector, setSelector] = useState(data.selector || '#element');
  const [property, setProperty] = useState(data.property || 'textContent');
  const [value, setValue] = useState(data.value || 'Hello World');
  const [variable, setVariable] = useState(data.variable || 'element');

  const operations = [
    { value: 'querySelector', label: 'querySelector' },
    { value: 'querySelectorAll', label: 'querySelectorAll' },
    { value: 'getElementById', label: 'getElementById' },
    { value: 'createElement', label: 'createElement' },
    { value: 'appendChild', label: 'appendChild' },
    { value: 'removeChild', label: 'removeChild' },
    { value: 'setAttribute', label: 'setAttribute' },
    { value: 'classList', label: 'classList.add/remove' },
  ];

  const helpContent = `
## DOM İşlemleri

DOM elementleri ile etkileşim kurun.

### Metodlar:
- **querySelector**: Element seç
- **createElement**: Element oluştur
- **appendChild**: Alt element ekle
- **setAttribute**: Özellik ayarla

### Örnek:
\`\`\`javascript
const el = document.querySelector('#box');
el.textContent = 'Hello';
el.classList.add('active');
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[260px]
      ${selected 
        ? 'border-cyan-400 shadow-cyan-500/30' 
        : 'border-cyan-500/30 hover:border-cyan-400/60'} 
      bg-gradient-to-br from-cyan-900/90 to-teal-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-cyan-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🌳</span>
        <span className="font-bold text-cyan-300 text-sm">DOM</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-cyan-500/30 text-cyan-200 px-2 py-0.5 rounded-full">JS</span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-cyan-300 block mb-1">Operation</label>
          <select
            value={operation}
            onChange={(e) => setOperation(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none"
          >
            {operations.map(op => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-cyan-300 block mb-1">Selector / Tag</label>
          <input
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
            placeholder="#id, .class, div"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-cyan-300 block mb-1">Property</label>
            <input
              type="text"
              value={property}
              onChange={(e) => setProperty(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
              placeholder="textContent"
            />
          </div>
          <div>
            <label className="text-[10px] text-cyan-300 block mb-1">Variable</label>
            <input
              type="text"
              value={variable}
              onChange={(e) => setVariable(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
              placeholder="element"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-cyan-300 block mb-1">Value</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-cyan-500/30 focus:border-cyan-400 outline-none font-mono"
            placeholder="Hello World"
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-cyan-500 !w-3 !h-3 !border-2 !border-cyan-300" />
    </div>
  );
});

DOMNode.displayName = 'DOMNode';
export default DOMNode;
