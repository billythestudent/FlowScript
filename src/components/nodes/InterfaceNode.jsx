import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const InterfaceNode = memo(({ data, selected }) => {
  const [interfaceName, setInterfaceName] = useState(data.interfaceName || 'MyInterface');
  const [extendsInterface, setExtendsInterface] = useState(data.extendsInterface || '');
  const [methods, setMethods] = useState(data.methods || 'void doSomething();\nString getName();');
  const [defaultMethods, setDefaultMethods] = useState(data.defaultMethods || '');
  const [accessMod, setAccessMod] = useState(data.accessMod || 'public');

  const helpContent = `
## Java Interface

Sözleşme tanımı ve çoklu kalıtım için kullanılır.

### Sözdizimi:
\`\`\`java
public interface MyInterface 
    extends OtherInterface {
    
    // Abstract method
    void method();
    
    // Default method (Java 8+)
    default void defaultMethod() {
        // implementation
    }
    
    // Static method
    static void staticMethod() {
        // implementation
    }
}
\`\`\`

### Özellikler:
- Tüm metodlar varsayılan olarak abstract
- Java 8+ default ve static metodlar
- Çoklu inheritance destekler
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-blue-400 shadow-blue-500/30' 
        : 'border-blue-500/30 hover:border-blue-400/60'} 
      bg-gradient-to-br from-blue-900/90 to-indigo-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-blue-500 !w-3 !h-3 !border-2 !border-blue-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📋</span>
        <span className="font-bold text-blue-300 text-sm">Interface</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-blue-500/30 text-blue-200 px-2 py-0.5 rounded-full">Java</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-blue-300 block mb-1">Erişim</label>
            <select
              value={accessMod}
              onChange={(e) => setAccessMod(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-blue-500/30 focus:border-blue-400 outline-none"
            >
              <option value="public">public</option>
              <option value="">default</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-blue-300 block mb-1">Interface Adı</label>
            <input
              type="text"
              value={interfaceName}
              onChange={(e) => setInterfaceName(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-blue-500/30 focus:border-blue-400 outline-none font-mono"
              placeholder="MyInterface"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-blue-300 block mb-1">extends</label>
          <input
            type="text"
            value={extendsInterface}
            onChange={(e) => setExtendsInterface(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-blue-500/30 focus:border-blue-400 outline-none font-mono"
            placeholder="OtherInterface"
          />
        </div>

        <div>
          <label className="text-[10px] text-blue-300 block mb-1">Abstract Methods</label>
          <textarea
            value={methods}
            onChange={(e) => setMethods(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-blue-500/30 focus:border-blue-400 outline-none resize-none font-mono"
            rows="3"
            placeholder="void method();"
          />
        </div>

        <div>
          <label className="text-[10px] text-blue-300 block mb-1">Default Methods (Opsiyonel)</label>
          <textarea
            value={defaultMethods}
            onChange={(e) => setDefaultMethods(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-blue-500/30 focus:border-blue-400 outline-none resize-none font-mono"
            rows="2"
            placeholder="default void method() { }"
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-blue-500 !w-3 !h-3 !border-2 !border-blue-300" />
    </div>
  );
});

InterfaceNode.displayName = 'InterfaceNode';
export default InterfaceNode;
