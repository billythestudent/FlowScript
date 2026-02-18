import InputNode from './InputNode';
import FunctionNode from './FunctionNode';
import LogicNode from './LogicNode';
import OutputNode from './OutputNode';
import MathNode from './MathNode';
import TextNode from './TextNode';
import DelayNode from './DelayNode';
import MergeNode from './MergeNode';
import RandomNode from './RandomNode';
import NoteNode from './NoteNode';
import DateNode from './DateNode';
import JSONNode from './JSONNode';
import ArrayNode from './ArrayNode';
import APINode from './APINode';
import RegexNode from './RegexNode';
import FetchNode from './FetchNode';
import LoopNode from './LoopNode';
import ConditionalNode from './ConditionalNode';
import StorageNode from './StorageNode';
import ConsoleNode from './ConsoleNode';
import TryCatchNode from './TryCatchNode';
import FileReadNode from './FileReadNode';
import FileWriteNode from './FileWriteNode';
// JavaScript özel
import PromiseNode from './PromiseNode';
import EventNode from './EventNode';
import DOMNode from './DOMNode';
// Python özel
import LambdaNode from './LambdaNode';
import ListCompNode from './ListCompNode';
import DecoratorNode from './DecoratorNode';
import GeneratorNode from './GeneratorNode';
// Java özel
import ClassNode from './ClassNode';
import InterfaceNode from './InterfaceNode';
import StreamNode from './StreamNode';
import ThreadNode from './ThreadNode';

export const nodeTypes = {
  input: InputNode,
  function: FunctionNode,
  logic: LogicNode,
  output: OutputNode,
  math: MathNode,
  text: TextNode,
  delay: DelayNode,
  merge: MergeNode,
  random: RandomNode,
  note: NoteNode,
  date: DateNode,
  json: JSONNode,
  array: ArrayNode,
  api: APINode,
  regex: RegexNode,
  fetch: FetchNode,
  loop: LoopNode,
  conditional: ConditionalNode,
  storage: StorageNode,
  console: ConsoleNode,
  tryCatch: TryCatchNode,
  fileRead: FileReadNode,
  fileWrite: FileWriteNode,
  // JavaScript özel
  promise: PromiseNode,
  event: EventNode,
  dom: DOMNode,
  // Python özel
  lambda: LambdaNode,
  listComp: ListCompNode,
  decorator: DecoratorNode,
  generator: GeneratorNode,
  // Java özel
  class: ClassNode,
  interface: InterfaceNode,
  stream: StreamNode,
  thread: ThreadNode,
};

export { 
  InputNode, FunctionNode, LogicNode, OutputNode, MathNode, TextNode, DelayNode, MergeNode, 
  RandomNode, NoteNode, DateNode, JSONNode, ArrayNode, APINode, RegexNode, FetchNode, 
  LoopNode, ConditionalNode, StorageNode, ConsoleNode, TryCatchNode, FileReadNode, FileWriteNode,
  // JavaScript özel
  PromiseNode, EventNode, DOMNode,
  // Python özel  
  LambdaNode, ListCompNode, DecoratorNode, GeneratorNode,
  // Java özel
  ClassNode, InterfaceNode, StreamNode, ThreadNode
};
