// Code converter utilities

// Syntax themes for Prism
export const syntaxThemes = {
  nightOwl: 'Night Owl',
  dracula: 'Dracula',
  github: 'GitHub',
  vsDark: 'VS Code Dark',
  okaidia: 'Okaidia',
  tomorrow: 'Tomorrow',
};

// Code templates
export const codeTemplates = {
  javascript: {
    'API Fetch': `// API'den veri çekme
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log('Veri alındı:', data);
    return data;
  } catch (error) {
    console.error('Hata:', error);
  }
}

fetchData('https://api.example.com/data');`,

    'Array Methods': `// Dizi işlemleri
const numbers = [1, 2, 3, 4, 5];

// Map - Her elemanı dönüştür
const doubled = numbers.map(n => n * 2);
console.log('İki katı:', doubled);

// Filter - Filtrele
const even = numbers.filter(n => n % 2 === 0);
console.log('Çift sayılar:', even);

// Reduce - Toplam
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log('Toplam:', sum);`,

    'Async/Await': `// Async/Await kullanımı
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function processSteps() {
  console.log('Başlıyor...');
  
  await delay(1000);
  console.log('Adım 1 tamamlandı');
  
  await delay(1000);
  console.log('Adım 2 tamamlandı');
  
  return 'Tüm adımlar tamamlandı!';
}

processSteps().then(console.log);`,

    'DOM Manipulation': `// DOM manipülasyonu
const container = document.getElementById('container');

// Element oluştur
const button = document.createElement('button');
button.textContent = 'Tıkla!';
button.className = 'btn btn-primary';

// Event listener ekle
button.addEventListener('click', () => {
  alert('Butona tıklandı!');
});

container.appendChild(button);`,

    'LocalStorage': `// LocalStorage işlemleri
const userData = {
  name: 'Kullanıcı',
  theme: 'dark',
  lastVisit: new Date().toISOString()
};

// Kaydet
localStorage.setItem('user', JSON.stringify(userData));

// Oku
const saved = JSON.parse(localStorage.getItem('user'));
console.log('Kayıtlı veri:', saved);

// Sil
// localStorage.removeItem('user');`,
  },
  
  python: {
    'API Request': `# API'den veri çekme
import requests
import json

def fetch_data(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        print(f"Veri alındı: {data}")
        return data
    except requests.RequestException as e:
        print(f"Hata: {e}")
        return None

fetch_data("https://api.example.com/data")`,

    'List Comprehension': `# Liste işlemleri
numbers = [1, 2, 3, 4, 5]

# List comprehension - Her elemanı dönüştür
doubled = [n * 2 for n in numbers]
print(f"İki katı: {doubled}")

# Filter
even = [n for n in numbers if n % 2 == 0]
print(f"Çift sayılar: {even}")

# Sum - Toplam
total = sum(numbers)
print(f"Toplam: {total}")`,

    'Async/Await': `# Async/Await kullanımı
import asyncio

async def delay(seconds):
    await asyncio.sleep(seconds)

async def process_steps():
    print("Başlıyor...")
    
    await delay(1)
    print("Adım 1 tamamlandı")
    
    await delay(1)
    print("Adım 2 tamamlandı")
    
    return "Tüm adımlar tamamlandı!"

result = asyncio.run(process_steps())
print(result)`,

    'File Operations': `# Dosya işlemleri
import json

# Dosyaya yaz
data = {"name": "Kullanıcı", "age": 25}
with open("data.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# Dosyadan oku
with open("data.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
    print(f"Yüklenen veri: {loaded}")`,

    'Class Definition': `# Sınıf tanımı
class User:
    def __init__(self, name, email):
        self.name = name
        self.email = email
        self._created_at = datetime.now()
    
    @property
    def info(self):
        return f"{self.name} ({self.email})"
    
    def greet(self):
        return f"Merhaba, ben {self.name}!"

# Kullanım
user = User("Ahmet", "ahmet@example.com")
print(user.greet())`,
  },
  
  java: {
    'HTTP Request': `// HTTP isteği yapma
import java.net.http.*;
import java.net.URI;

public class ApiClient {
    public static void fetchData(String url) {
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create(url))
            .GET()
            .build();
        
        try {
            HttpResponse<String> response = client.send(
                request, 
                HttpResponse.BodyHandlers.ofString()
            );
            System.out.println("Veri: " + response.body());
        } catch (Exception e) {
            System.err.println("Hata: " + e.getMessage());
        }
    }
}`,

    'Stream API': `// Stream API kullanımı
import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
        
        // Map - Her elemanı dönüştür
        List<Integer> doubled = numbers.stream()
            .map(n -> n * 2)
            .collect(Collectors.toList());
        System.out.println("İki katı: " + doubled);
        
        // Filter - Filtrele
        List<Integer> even = numbers.stream()
            .filter(n -> n % 2 == 0)
            .collect(Collectors.toList());
        System.out.println("Çift sayılar: " + even);
        
        // Reduce - Toplam
        int sum = numbers.stream()
            .reduce(0, Integer::sum);
        System.out.println("Toplam: " + sum);
    }
}`,

    'File Operations': `// Dosya işlemleri
import java.io.*;
import java.nio.file.*;

public class FileExample {
    public static void main(String[] args) {
        String filename = "data.txt";
        
        // Dosyaya yaz
        try {
            Files.writeString(Path.of(filename), "Merhaba Dünya!");
            System.out.println("Dosya yazıldı.");
        } catch (IOException e) {
            e.printStackTrace();
        }
        
        // Dosyadan oku
        try {
            String content = Files.readString(Path.of(filename));
            System.out.println("İçerik: " + content);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}`,

    'Class Definition': `// Sınıf tanımı
public class User {
    private String name;
    private String email;
    private LocalDateTime createdAt;
    
    public User(String name, String email) {
        this.name = name;
        this.email = email;
        this.createdAt = LocalDateTime.now();
    }
    
    public String getInfo() {
        return name + " (" + email + ")";
    }
    
    public String greet() {
        return "Merhaba, ben " + name + "!";
    }
    
    public static void main(String[] args) {
        User user = new User("Ahmet", "ahmet@example.com");
        System.out.println(user.greet());
    }
}`,

    'Thread Example': `// Thread kullanımı
import java.util.concurrent.*;

public class ThreadExample {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);
        
        for (int i = 1; i <= 5; i++) {
            final int taskId = i;
            executor.submit(() -> {
                System.out.println("Task " + taskId + " başladı");
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                }
                System.out.println("Task " + taskId + " bitti");
            });
        }
        
        executor.shutdown();
    }
}`,
  },
};

// Simple code conversion patterns
export function convertCode(code, fromLang, toLang) {
  if (!code.trim()) return '';
  if (fromLang === toLang) return code;
  
  let result = code;
  
  // JavaScript to Python
  if (fromLang === 'javascript' && toLang === 'python') {
    result = jsToPython(code);
  }
  // JavaScript to Java
  else if (fromLang === 'javascript' && toLang === 'java') {
    result = jsToJava(code);
  }
  // Python to JavaScript
  else if (fromLang === 'python' && toLang === 'javascript') {
    result = pythonToJs(code);
  }
  // Python to Java
  else if (fromLang === 'python' && toLang === 'java') {
    result = pythonToJava(code);
  }
  // Java to JavaScript
  else if (fromLang === 'java' && toLang === 'javascript') {
    result = javaToJs(code);
  }
  // Java to Python
  else if (fromLang === 'java' && toLang === 'python') {
    result = javaToPython(code);
  }
  
  return result;
}

function jsToPython(code) {
  let result = code;
  
  // Comments
  result = result.replace(/\/\/(.*)/g, '#$1');
  result = result.replace(/\/\*[\s\S]*?\*\//g, (match) => {
    return match.replace(/\/\*/g, '"""').replace(/\*\//g, '"""');
  });
  
  // const/let/var to nothing (Python doesn't need them)
  result = result.replace(/\b(const|let|var)\s+/g, '');
  
  // Arrow functions
  result = result.replace(/(\w+)\s*=>\s*{/g, 'lambda $1:');
  result = result.replace(/(\w+)\s*=>\s*([^{;]+)/g, 'lambda $1: $2');
  result = result.replace(/\(([^)]*)\)\s*=>\s*{/g, 'def anonymous($1):');
  result = result.replace(/\(([^)]*)\)\s*=>\s*([^{;]+)/g, 'lambda $1: $2');
  
  // Function declarations
  result = result.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'def $1($2):');
  result = result.replace(/async\s+function\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'async def $1($2):');
  
  // console.log to print
  result = result.replace(/console\.log\s*\(/g, 'print(');
  result = result.replace(/console\.error\s*\(/g, 'print(');
  result = result.replace(/console\.warn\s*\(/g, 'print(');
  
  // Boolean
  result = result.replace(/\btrue\b/g, 'True');
  result = result.replace(/\bfalse\b/g, 'False');
  result = result.replace(/\bnull\b/g, 'None');
  result = result.replace(/\bundefined\b/g, 'None');
  
  // String methods
  result = result.replace(/\.length/g, ').__len__()');
  result = result.replace(/\.toUpperCase\(\)/g, '.upper()');
  result = result.replace(/\.toLowerCase\(\)/g, '.lower()');
  result = result.replace(/\.trim\(\)/g, '.strip()');
  result = result.replace(/\.split\(([^)]+)\)/g, '.split($1)');
  result = result.replace(/\.join\(([^)]+)\)/g, '.join($1)');
  result = result.replace(/\.includes\(([^)]+)\)/g, ' in $1');
  result = result.replace(/\.indexOf\(([^)]+)\)/g, '.find($1)');
  result = result.replace(/\.replace\(([^,]+),\s*([^)]+)\)/g, '.replace($1, $2)');
  
  // Array methods
  result = result.replace(/\.push\(/g, '.append(');
  result = result.replace(/\.pop\(\)/g, '.pop()');
  result = result.replace(/\.shift\(\)/g, '.pop(0)');
  result = result.replace(/\.forEach\(\s*(\w+)\s*=>/g, 'for $1 in');
  
  // if/else (basic)
  result = result.replace(/\}\s*else\s*if\s*\(/g, 'elif (');
  result = result.replace(/\}\s*else\s*{/g, 'else:');
  
  // Remove braces and semicolons
  result = result.replace(/;$/gm, '');
  result = result.replace(/\{$/gm, ':');
  result = result.replace(/^\s*\}$/gm, '');
  
  // Template literals
  result = result.replace(/`([^`]*)\$\{([^}]+)\}([^`]*)`/g, 'f"$1{$2}$3"');
  
  return result;
}

function jsToJava(code) {
  let result = code;
  
  // Comments stay the same
  
  // const/let/var to type inference (var in Java 10+)
  result = result.replace(/\bconst\s+(\w+)\s*=/g, 'final var $1 =');
  result = result.replace(/\blet\s+(\w+)\s*=/g, 'var $1 =');
  result = result.replace(/\bvar\s+(\w+)\s*=/g, 'var $1 =');
  
  // console.log to System.out.println
  result = result.replace(/console\.log\s*\(/g, 'System.out.println(');
  result = result.replace(/console\.error\s*\(/g, 'System.err.println(');
  result = result.replace(/console\.warn\s*\(/g, 'System.out.println("[WARN] " + ');
  
  // Boolean
  result = result.replace(/\bnull\b/g, 'null');
  result = result.replace(/\bundefined\b/g, 'null');
  
  // Function to method
  result = result.replace(/function\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'public static void $1($2) {');
  result = result.replace(/async\s+function/g, 'public static CompletableFuture<Void>');
  
  // Arrow functions to lambda
  result = result.replace(/\(([^)]*)\)\s*=>\s*{/g, '($1) -> {');
  result = result.replace(/\(([^)]*)\)\s*=>\s*([^{;]+)/g, '($1) -> $2');
  result = result.replace(/(\w+)\s*=>\s*([^{;]+)/g, '$1 -> $2');
  
  // Template literals to concatenation
  result = result.replace(/`([^`]*)\$\{([^}]+)\}([^`]*)`/g, '"$1" + $2 + "$3"');
  
  // String methods
  result = result.replace(/\.length/g, '.length()');
  result = result.replace(/\.toUpperCase\(\)/g, '.toUpperCase()');
  result = result.replace(/\.toLowerCase\(\)/g, '.toLowerCase()');
  result = result.replace(/\.trim\(\)/g, '.trim()');
  result = result.replace(/\.split\(([^)]+)\)/g, '.split($1)');
  result = result.replace(/\.includes\(([^)]+)\)/g, '.contains($1)');
  result = result.replace(/\.indexOf\(([^)]+)\)/g, '.indexOf($1)');
  
  // Array methods
  result = result.replace(/\.push\(/g, '.add(');
  result = result.replace(/\.pop\(\)/g, '.remove(size() - 1)');
  result = result.replace(/\.forEach\(/g, '.forEach(');
  result = result.replace(/\.map\(/g, '.stream().map(');
  result = result.replace(/\.filter\(/g, '.stream().filter(');
  
  return result;
}

function pythonToJs(code) {
  let result = code;
  
  // Comments
  result = result.replace(/#(.*)/g, '//$1');
  result = result.replace(/"""[\s\S]*?"""/g, (match) => {
    return match.replace(/"""/g, '/*').replace(/"""/g, '*/');
  });
  
  // def to function
  result = result.replace(/def\s+(\w+)\s*\(([^)]*)\)\s*:/g, 'function $1($2) {');
  result = result.replace(/async\s+def\s+(\w+)\s*\(([^)]*)\)\s*:/g, 'async function $1($2) {');
  
  // print to console.log
  result = result.replace(/print\s*\(/g, 'console.log(');
  
  // Boolean
  result = result.replace(/\bTrue\b/g, 'true');
  result = result.replace(/\bFalse\b/g, 'false');
  result = result.replace(/\bNone\b/g, 'null');
  
  // elif to else if
  result = result.replace(/\belif\s+/g, '} else if (');
  result = result.replace(/\belse\s*:/g, '} else {');
  result = result.replace(/\bif\s+([^:]+):/g, 'if ($1) {');
  
  // for loop
  result = result.replace(/for\s+(\w+)\s+in\s+range\(([^)]+)\):/g, 'for (let $1 = 0; $1 < $2; $1++) {');
  result = result.replace(/for\s+(\w+)\s+in\s+(\w+):/g, 'for (const $1 of $2) {');
  
  // while loop
  result = result.replace(/while\s+([^:]+):/g, 'while ($1) {');
  
  // String methods
  result = result.replace(/\.upper\(\)/g, '.toUpperCase()');
  result = result.replace(/\.lower\(\)/g, '.toLowerCase()');
  result = result.replace(/\.strip\(\)/g, '.trim()');
  result = result.replace(/\.append\(/g, '.push(');
  
  // f-strings to template literals
  result = result.replace(/f"([^"]*)\{([^}]+)\}([^"]*)"/g, '`$1${$2}$3`');
  result = result.replace(/f'([^']*)\{([^}]+)\}([^']*)'/g, '`$1${$2}$3`');
  
  // lambda to arrow
  result = result.replace(/lambda\s+([^:]+):\s*(.+)/g, '($1) => $2');
  
  // Add closing braces (rough estimate based on indentation)
  // This is a simplified approach
  const lines = result.split('\n');
  result = lines.join('\n');
  
  return result;
}

function pythonToJava(code) {
  // First convert to JS, then to Java
  let result = pythonToJs(code);
  result = jsToJava(result);
  
  // Additional Python to Java specific conversions
  result = result.replace(/len\((\w+)\)/g, '$1.size()');
  result = result.replace(/str\((\w+)\)/g, 'String.valueOf($1)');
  result = result.replace(/int\((\w+)\)/g, 'Integer.parseInt($1)');
  result = result.replace(/float\((\w+)\)/g, 'Double.parseDouble($1)');
  
  return result;
}

function javaToJs(code) {
  let result = code;
  
  // Remove type declarations
  result = result.replace(/\bpublic\s+static\s+void\s+main\s*\([^)]*\)\s*{/g, 'function main() {');
  result = result.replace(/\bpublic\s+static\s+\w+\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'function $1($2) {');
  result = result.replace(/\bpublic\s+\w+\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'function $1($2) {');
  result = result.replace(/\bprivate\s+\w+\s+(\w+)\s*\(([^)]*)\)\s*{/g, 'function $1($2) {');
  
  // Variable declarations
  result = result.replace(/\bfinal\s+var\s+/g, 'const ');
  result = result.replace(/\bvar\s+/g, 'let ');
  result = result.replace(/\b(int|String|double|float|boolean|long|char)\s+(\w+)\s*=/g, 'let $2 =');
  result = result.replace(/\b(int|String|double|float|boolean|long|char)\s+(\w+);/g, 'let $2;');
  
  // System.out.println to console.log
  result = result.replace(/System\.out\.println\s*\(/g, 'console.log(');
  result = result.replace(/System\.err\.println\s*\(/g, 'console.error(');
  
  // String concatenation might use + which is same in JS
  
  // Stream API to JS methods
  result = result.replace(/\.stream\(\)\.map\(/g, '.map(');
  result = result.replace(/\.stream\(\)\.filter\(/g, '.filter(');
  result = result.replace(/\.collect\(Collectors\.toList\(\)\)/g, '');
  
  // ArrayList to array
  result = result.replace(/\.add\(/g, '.push(');
  result = result.replace(/\.size\(\)/g, '.length');
  result = result.replace(/\.contains\(/g, '.includes(');
  
  // Lambda syntax is similar
  
  // Remove class wrapper
  result = result.replace(/\bpublic\s+class\s+\w+\s*{/g, '');
  
  return result;
}

function javaToPython(code) {
  // First convert to JS, then to Python
  let result = javaToJs(code);
  result = jsToPython(result);
  
  // Additional Java to Python specific
  result = result.replace(/String\.valueOf\((\w+)\)/g, 'str($1)');
  result = result.replace(/Integer\.parseInt\((\w+)\)/g, 'int($1)');
  result = result.replace(/Double\.parseDouble\((\w+)\)/g, 'float($1)');
  
  return result;
}

// Get code statistics
export function getCodeStats(code) {
  if (!code) return { lines: 0, chars: 0, words: 0, functions: 0 };
  
  const lines = code.split('\n').length;
  const chars = code.length;
  const words = code.split(/\s+/).filter(w => w.length > 0).length;
  
  // Count functions (rough estimate)
  const functionPatterns = [
    /function\s+\w+/g,
    /def\s+\w+/g,
    /public\s+(static\s+)?\w+\s+\w+\s*\(/g,
    /const\s+\w+\s*=\s*\([^)]*\)\s*=>/g,
  ];
  
  let functions = 0;
  functionPatterns.forEach(pattern => {
    const matches = code.match(pattern);
    if (matches) functions += matches.length;
  });
  
  return { lines, chars, words, functions };
}

// History management
const HISTORY_KEY = 'flowscript_conversion_history';
const MAX_HISTORY = 10;

export function getConversionHistory() {
  try {
    const history = localStorage.getItem(HISTORY_KEY);
    return history ? JSON.parse(history) : [];
  } catch {
    return [];
  }
}

export function addToHistory(fromLang, toLang, inputCode, outputCode) {
  try {
    const history = getConversionHistory();
    const entry = {
      id: Date.now(),
      fromLang,
      toLang,
      inputCode: inputCode.substring(0, 200) + (inputCode.length > 200 ? '...' : ''),
      outputCode: outputCode.substring(0, 200) + (outputCode.length > 200 ? '...' : ''),
      timestamp: new Date().toISOString(),
    };
    
    const newHistory = [entry, ...history].slice(0, MAX_HISTORY);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
    return newHistory;
  } catch {
    return [];
  }
}

export function clearHistory() {
  localStorage.removeItem(HISTORY_KEY);
}
