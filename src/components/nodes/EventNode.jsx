import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const EventNode = memo(({ data, selected }) => {
  const [eventType, setEventType] = useState(data.eventType || 'click');
  const [selector, setSelector] = useState(data.selector || '#button');
  const [handler, setHandler] = useState(data.handler || 'console.log(event)');
  const [useCapture, setUseCapture] = useState(data.useCapture || false);

  const eventTypes = ['click', 'submit', 'change', 'input', 'keydown', 'keyup', 'mouseover', 'mouseout', 'focus', 'blur', 'load', 'scroll'];

  const helpContent = `
## Event Listener

DOM elementlerine olay dinleyici ekler.

### Olay Türleri:
- **click**: Tıklama olayı
- **submit**: Form gönderimi
- **change**: Değer değişikliği
- **keydown/keyup**: Klavye olayları

### Örnek:
\`\`\`javascript
element.addEventListener('click', (event) => {
  console.log('Tıklandı!', event.target);
});
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[260px]
      ${selected 
        ? 'border-pink-400 shadow-pink-500/30' 
        : 'border-pink-500/30 hover:border-pink-400/60'} 
      bg-gradient-to-br from-pink-900/90 to-rose-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-pink-500 !w-3 !h-3 !border-2 !border-pink-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎯</span>
        <span className="font-bold text-pink-300 text-sm">Event</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-pink-500/30 text-pink-200 px-2 py-0.5 rounded-full">JS</span>
      </div>

      <div className="space-y-2">
        <div>
          <label className="text-[10px] text-pink-300 block mb-1">Selector</label>
          <input
            type="text"
            value={selector}
            onChange={(e) => setSelector(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-pink-500/30 focus:border-pink-400 outline-none font-mono"
            placeholder="#element, .class"
          />
        </div>

        <div>
          <label className="text-[10px] text-pink-300 block mb-1">Event Type</label>
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-pink-500/30 focus:border-pink-400 outline-none"
          >
            {eventTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-[10px] text-pink-300 block mb-1">Handler</label>
          <textarea
            value={handler}
            onChange={(e) => setHandler(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-pink-500/30 focus:border-pink-400 outline-none resize-none font-mono"
            rows="3"
            placeholder="console.log(event)"
          />
        </div>

        <label className="flex items-center gap-1 text-xs text-pink-200 cursor-pointer">
          <input
            type="checkbox"
            checked={useCapture}
            onChange={(e) => setUseCapture(e.target.checked)}
            className="accent-pink-500"
          />
          Capture phase
        </label>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-pink-500 !w-3 !h-3 !border-2 !border-pink-300" />
    </div>
  );
});

EventNode.displayName = 'EventNode';
export default EventNode;
