import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const DecoratorNode = memo(({ data, selected }) => {
  const [decoratorName, setDecoratorName] = useState(data.decoratorName || 'my_decorator');
  const [decoratorCode, setDecoratorCode] = useState(data.decoratorCode || 'print("Before")\nresult = func(*args, **kwargs)\nprint("After")\nreturn result');
  const [targetFunc, setTargetFunc] = useState(data.targetFunc || 'my_function');

  const helpContent = `
## Decorator

Fonksiyonları sarmak ve davranış eklemek için kullanılır.

### Sözdizimi:
\`\`\`python
def decorator(func):
    def wrapper(*args, **kwargs):
        # önceki işlemler
        result = func(*args, **kwargs)
        # sonraki işlemler
        return result
    return wrapper

@decorator
def fonksiyon():
    pass
\`\`\`

### Yaygın Kullanımlar:
- Loglama
- Yetkilendirme
- Performans ölçümü
- Cache
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-violet-400 shadow-violet-500/30' 
        : 'border-violet-500/30 hover:border-violet-400/60'} 
      bg-gradient-to-br from-violet-900/90 to-purple-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-violet-500 !w-3 !h-3 !border-2 !border-violet-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🎀</span>
        <span className="font-bold text-violet-300 text-sm">Decorator</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-violet-500/30 text-violet-200 px-2 py-0.5 rounded-full">Python</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-violet-300 block mb-1">Decorator Adı</label>
            <input
              type="text"
              value={decoratorName}
              onChange={(e) => setDecoratorName(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-violet-500/30 focus:border-violet-400 outline-none font-mono"
              placeholder="my_decorator"
            />
          </div>
          <div>
            <label className="text-[10px] text-violet-300 block mb-1">Hedef Fonksiyon</label>
            <input
              type="text"
              value={targetFunc}
              onChange={(e) => setTargetFunc(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-violet-500/30 focus:border-violet-400 outline-none font-mono"
              placeholder="func_name"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-violet-300 block mb-1">Wrapper İçeriği</label>
          <textarea
            value={decoratorCode}
            onChange={(e) => setDecoratorCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-violet-500/30 focus:border-violet-400 outline-none resize-none font-mono"
            rows="4"
            placeholder="result = func(*args, **kwargs)"
          />
        </div>

        <div className="text-[10px] text-violet-400/70 bg-black/20 p-2 rounded-lg font-mono">
          @{decoratorName}<br/>
          def {targetFunc}(...): ...
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-violet-500 !w-3 !h-3 !border-2 !border-violet-300" />
    </div>
  );
});

DecoratorNode.displayName = 'DecoratorNode';
export default DecoratorNode;
