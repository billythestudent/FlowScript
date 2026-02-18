import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const PromiseNode = memo(({ data, selected }) => {
  const [asyncCode, setAsyncCode] = useState(data.asyncCode || 'return await fetch(url)');
  const [thenCode, setThenCode] = useState(data.thenCode || 'console.log(result)');
  const [catchCode, setCatchCode] = useState(data.catchCode || 'console.error(error)');
  const [useAwait, setUseAwait] = useState(data.useAwait ?? true);

  const helpContent = `
## Promise / Async-Await

JavaScript'te asenkron işlemler için kullanılır.

### Örnekler:
- **async/await**: Modern ve okunabilir
- **then/catch**: Promise zinciri
- **Promise.all**: Paralel işlemler

### Kullanım:
\`\`\`javascript
async function fetchData() {
  try {
    const result = await fetch(url);
    return result.json();
  } catch (error) {
    console.error(error);
  }
}
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-sky-400 shadow-sky-500/30' 
        : 'border-sky-500/30 hover:border-sky-400/60'} 
      bg-gradient-to-br from-sky-900/90 to-blue-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-sky-500 !w-3 !h-3 !border-2 !border-sky-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🔮</span>
        <span className="font-bold text-sky-300 text-sm">Promise</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-sky-500/30 text-sky-200 px-2 py-0.5 rounded-full">JS</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <label className="flex items-center gap-1 text-xs text-sky-200 cursor-pointer">
            <input
              type="checkbox"
              checked={useAwait}
              onChange={(e) => setUseAwait(e.target.checked)}
              className="accent-sky-500"
            />
            async/await
          </label>
        </div>

        <div>
          <label className="text-[10px] text-sky-300 block mb-1">
            {useAwait ? 'Async Code' : 'Promise'}
          </label>
          <textarea
            value={asyncCode}
            onChange={(e) => setAsyncCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-sky-500/30 focus:border-sky-400 outline-none resize-none font-mono"
            rows="2"
            placeholder={useAwait ? 'return await fetch(url)' : 'fetch(url)'}
          />
        </div>

        <div>
          <label className="text-[10px] text-green-300 block mb-1">
            {useAwait ? 'Success' : '.then()'}
          </label>
          <textarea
            value={thenCode}
            onChange={(e) => setThenCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-green-500/30 focus:border-green-400 outline-none resize-none font-mono"
            rows="2"
            placeholder="console.log(result)"
          />
        </div>

        <div>
          <label className="text-[10px] text-red-300 block mb-1">
            {useAwait ? 'catch' : '.catch()'}
          </label>
          <textarea
            value={catchCode}
            onChange={(e) => setCatchCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-red-500/30 focus:border-red-400 outline-none resize-none font-mono"
            rows="2"
            placeholder="console.error(error)"
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-sky-500 !w-3 !h-3 !border-2 !border-sky-300" />
    </div>
  );
});

PromiseNode.displayName = 'PromiseNode';
export default PromiseNode;
