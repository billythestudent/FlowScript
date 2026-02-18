import { memo, useState } from 'react';
import { Handle, Position } from '@xyflow/react';
import HelpTooltip from './HelpTooltip';

const ThreadNode = memo(({ data, selected }) => {
  const [threadName, setThreadName] = useState(data.threadName || 'myThread');
  const [runCode, setRunCode] = useState(data.runCode || 'System.out.println("Running...")');
  const [threadType, setThreadType] = useState(data.threadType || 'runnable');
  const [startImmediately, setStartImmediately] = useState(data.startImmediately ?? true);

  const helpContent = `
## Java Thread

Paralel çalışma için thread oluşturma.

### Runnable ile:
\`\`\`java
Runnable task = () -> {
    System.out.println("Running");
};
Thread thread = new Thread(task);
thread.start();
\`\`\`

### Thread extends ile:
\`\`\`java
class MyThread extends Thread {
    public void run() {
        System.out.println("Running");
    }
}
new MyThread().start();
\`\`\`

### ExecutorService:
\`\`\`java
ExecutorService executor = 
    Executors.newFixedThreadPool(4);
executor.submit(() -> {
    // task
});
\`\`\`
  `;

  return (
    <div className={`px-4 py-3 rounded-xl shadow-xl border-2 transition-all duration-300 min-w-[280px]
      ${selected 
        ? 'border-red-400 shadow-red-500/30' 
        : 'border-red-500/30 hover:border-red-400/60'} 
      bg-gradient-to-br from-red-900/90 to-rose-900/90 backdrop-blur-sm`}>
      
      <Handle type="target" position={Position.Top} className="!bg-red-500 !w-3 !h-3 !border-2 !border-red-300" />
      
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">🧵</span>
        <span className="font-bold text-red-300 text-sm">Thread</span>
        <HelpTooltip content={helpContent} />
        <span className="ml-auto text-[10px] bg-red-500/30 text-red-200 px-2 py-0.5 rounded-full">Java</span>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-[10px] text-red-300 block mb-1">Thread Adı</label>
            <input
              type="text"
              value={threadName}
              onChange={(e) => setThreadName(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-red-500/30 focus:border-red-400 outline-none font-mono"
              placeholder="myThread"
            />
          </div>
          <div>
            <label className="text-[10px] text-red-300 block mb-1">Tür</label>
            <select
              value={threadType}
              onChange={(e) => setThreadType(e.target.value)}
              className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-red-500/30 focus:border-red-400 outline-none"
            >
              <option value="runnable">Runnable</option>
              <option value="thread">Thread class</option>
              <option value="executor">ExecutorService</option>
              <option value="completable">CompletableFuture</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[10px] text-red-300 block mb-1">run() İçeriği</label>
          <textarea
            value={runCode}
            onChange={(e) => setRunCode(e.target.value)}
            className="w-full bg-black/30 text-white text-xs p-2 rounded-lg border border-red-500/30 focus:border-red-400 outline-none resize-none font-mono"
            rows="3"
            placeholder="System.out.println(...);"
          />
        </div>

        <label className="flex items-center gap-1 text-xs text-red-200 cursor-pointer">
          <input
            type="checkbox"
            checked={startImmediately}
            onChange={(e) => setStartImmediately(e.target.checked)}
            className="accent-red-500"
          />
          Hemen başlat (.start())
        </label>

        <div className="text-[10px] text-red-400/70 bg-black/20 p-2 rounded-lg font-mono">
          {threadType === 'runnable' && (
            <>
              Runnable {threadName} = () -{'>'} {'{'}<br/>
              &nbsp;&nbsp;{runCode.split('\n')[0]}<br/>
              {'}'};
              {startImmediately && <><br/>new Thread({threadName}).start();</>}
            </>
          )}
          {threadType === 'executor' && (
            <>
              executor.submit(() -{'>'} {'{'}<br/>
              &nbsp;&nbsp;{runCode.split('\n')[0]}<br/>
              {'}'});
            </>
          )}
          {threadType === 'completable' && (
            <>
              CompletableFuture.runAsync(() -{'>'} {'{'}<br/>
              &nbsp;&nbsp;{runCode.split('\n')[0]}<br/>
              {'}'});
            </>
          )}
        </div>
      </div>

      <Handle type="source" position={Position.Bottom} className="!bg-red-500 !w-3 !h-3 !border-2 !border-red-300" />
    </div>
  );
});

ThreadNode.displayName = 'ThreadNode';
export default ThreadNode;
