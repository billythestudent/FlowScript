import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const ClassNode = memo(({ data, selected }) => {
  const [className, setClassName] = useState(data.className || 'MyClass');
  const [extendsClass, setExtendsClass] = useState(data.extendsClass || '');
  const [implementsInterface, setImplementsInterface] = useState(data.implementsInterface || '');
  const [fields, setFields] = useState(data.fields || 'private String name;');
  const [constructor, setConstructor] = useState(data.constructor || 'this.name = name;');
  const [accessMod, setAccessMod] = useState(data.accessMod || 'public');

  const helpContent = `
## Java Class

Nesne yönelimli programlama için sınıf tanımı.

### Sözdizimi:
\`\`\`java
public class MyClass extends Parent 
    implements Interface {
    
    private String field;
    
    public MyClass(String field) {
        this.field = field;
    }
    
    public void method() {
        // kod
    }
}
\`\`\`

### Erişim Belirleyicileri:
- **public**: Her yerden erişilebilir
- **private**: Sadece sınıf içinden
- **protected**: Sınıf ve alt sınıflar
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-orange-400 shadow-orange-500/30' 
        : 'border-orange-500/30 hover:border-orange-400/60'} 
      bg-gradient-to-br from-orange-900/90 to-amber-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-orange-500 !w-3 !h-3 !border-2 !border-orange-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">📦</span>
        <span className="font-bold text-orange-300 text-sm">Class</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-orange-500/30 text-orange-200 px-2 py-0.5 rounded-full">Java</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-orange-300 block mb-1">Erişim</label>
            <select
              value={accessMod}
              onChange={(e) => setAccessMod(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none"
            >
              <option value="public">public</option>
              <option value="private">private</option>
              <option value="protected">protected</option>
              <option value="">default</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] text-orange-300 block mb-1">Class Adı</label>
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none font-mono"
              placeholder="MyClass"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-orange-300 block mb-1">extends</label>
            <input
              type="text"
              value={extendsClass}
              onChange={(e) => setExtendsClass(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none font-mono"
              placeholder="Parent"
            />
          </div>
          <div>
            <label className="text-[10px] text-orange-300 block mb-1">implements</label>
            <input
              type="text"
              value={implementsInterface}
              onChange={(e) => setImplementsInterface(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none font-mono"
              placeholder="Interface"
            />
          </div>
        </div>

        <div>
          <label className="text-[10px] text-orange-300 block mb-1">Fields</label>
          <textarea
            value={fields}
            onChange={(e) => setFields(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none resize-none font-mono"
            rows="2"
            placeholder="private String name;"
          />
        </div>

        <div>
          <label className="text-[10px] text-orange-300 block mb-1">Constructor Body</label>
          <textarea
            value={constructor}
            onChange={(e) => setConstructor(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-orange-500/30 focus:border-orange-400 outline-none resize-none font-mono"
            rows="2"
            placeholder="this.name = name;"
          />
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-orange-500 !w-3 !h-3 !border-2 !border-orange-300" />
    </div>
  );
});

ClassNode.displayName = 'ClassNode';
export default ClassNode;
