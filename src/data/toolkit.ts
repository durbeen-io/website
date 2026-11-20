// The Toolkit: tools the founder uses, one honest line each. No affiliate links.
// Add a tool here and it appears on /toolkit/ (and can be linked from articles and projects as /toolkit/#id).
// Lines state what the tool is and where Durbeen uses it. They never claim an experience that has not happened.
export interface ToolkitItem {
  id: string; // the page anchor: /toolkit/#id
  name: string;
  note: string;
}
export interface ToolkitGroup {
  title: string;
  intro: string;
  items: ToolkitItem[];
}

export const toolkit: ToolkitGroup[] = [
  {
    title: 'Use daily',
    intro: 'The tools I open every day.',
    items: [
      { id: 'chatgpt', name: 'ChatGPT', note: "OpenAI's chat assistant. Used every day, alongside Claude and Gemini." },
      { id: 'claude', name: 'Claude', note: "Anthropic's assistant. Claude Code helps build this website on the Pro plan; I review and approve every change." },
      { id: 'gemini', name: 'Gemini', note: "Google's AI assistant. Used every day, alongside ChatGPT and Claude." },
      { id: 'notebooklm', name: 'NotebookLM', note: "Google's tool for asking questions about documents you give it. Used every day." },
      { id: 'hazel', name: 'Hazel', note: 'A Mac app that runs rules on folders and files. It is the automation half of TokenSave.' },
      { id: 'markitdown', name: 'MarkItDown', note: "Microsoft's open-source tool that converts documents to Markdown. It is the converter inside TokenSave." },
      { id: 'github', name: 'GitHub', note: 'Holds the Durbeen code and runs the automatic checks on every change to this site.' },
      { id: 'git', name: 'Git', note: 'Version control for every project. Every change to this site is a commit.' },
      { id: 'cloudflare', name: 'Cloudflare', note: 'Hosts this website and the durbeen.io domain.' },
      { id: 'macos', name: 'macOS', note: 'The system I work on, and the platform TokenSave is built for.' },
    ],
  },
  {
    title: 'Learning',
    intro: 'Skills I am still building. I will write about them as I go.',
    items: [
      { id: 'typescript', name: 'TypeScript', note: "Learning it. It already runs this site's content rules and helpers." },
      { id: 'bash', name: 'Bash', note: 'Learning the command line, the language behind most automation on a Mac.' },
      { id: 'astro', name: 'Astro', note: 'Learning it. This website is built with it.' },
    ],
  },
];
