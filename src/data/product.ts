export const siteUrl = "https://fileio.jonnylab.app";

// TODO: Replace with the production Google Play URL for com.jonnylab.fileio.
export const playStoreUrl = "https://play.google.com/store/apps/details?id=com.jonnylab.fileio";

export const product = {
  name: "Fileio",
  storeName: "Fileio: File Manager & Scanner",
  packageName: "com.jonnylab.fileio",
  title: "Fileio - File Manager, Document Viewer & PDF Scanner for Android",
  description:
    "Fileio helps you manage files, view documents, scan PDFs, and browse supported Google Drive and Dropbox files on Android.",
};

export type IconName =
  | "folder"
  | "search"
  | "star"
  | "document"
  | "scan"
  | "cloud";

export const features: Array<{
  icon: IconName;
  title: string;
  description: string;
}> = [
  {
    icon: "folder",
    title: "Simple file manager",
    description:
      "Browse folders and keep local files organized with rename, delete, share, sort, favorites, and recent files.",
  },
  {
    icon: "search",
    title: "Fast file search",
    description:
      "Find files on your Android device without digging through every folder.",
  },
  {
    icon: "document",
    title: "Document viewer",
    description:
      "Open PDF, DOCX, XLSX, PPTX, JPG, and PNG files in one focused document viewer for Android.",
  },
  {
    icon: "scan",
    title: "PDF scanner",
    description:
      "Scan paper documents with your phone and save them as PDF files.",
  },
  {
    icon: "star",
    title: "Favorites and recents",
    description:
      "Return to important documents and recently opened files with fewer taps.",
  },
  {
    icon: "cloud",
    title: "Read-only cloud access",
    description:
      "Pro users can browse folders and open supported files from Google Drive and Dropbox. Cloud access is read-only.",
  },
];

export const faqs = [
  {
    question: "What file formats can Fileio open?",
    answer: "Fileio supports PDF, DOCX, XLSX, PPTX, JPG, and PNG files.",
  },
  {
    question: "Can Fileio manage files on my Android device?",
    answer:
      "Yes. You can browse folders, search and sort files, use favorites and recents, and rename, delete, or share files.",
  },
  {
    question: "Does Fileio include a PDF scanner?",
    answer: "Yes. Fileio can scan paper documents and save them as PDF files.",
  },
  {
    question: "Can Fileio access Google Drive and Dropbox?",
    answer:
      "Pro users can connect Google Drive or Dropbox to browse folders and open supported files. This access is read-only.",
  },
  {
    question: "Can Fileio upload or edit cloud files?",
    answer:
      "No. Fileio does not upload, modify, or sync files in Google Drive or Dropbox.",
  },
  {
    question: "Do I need an account to manage local files?",
    answer: "No. Fileio's local file management features do not require a Fileio account.",
  },
];

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  sections: ArticleSection[];
};

export const blogPosts: Article[] = [
  {
    slug: "what-read-only-cloud-access-means",
    title: "What Read-only Cloud Access Means in Fileio",
    description:
      "Understand what Fileio can and cannot do when you connect Google Drive or Dropbox.",
    category: "Product",
    publishedAt: "2026-06-24",
    readTime: "3 min read",
    sections: [
      {
        heading: "A viewer, not cloud storage",
        paragraphs: [
          "Fileio gives Pro users a convenient way to browse Google Drive and Dropbox folders and open supported documents. It does not provide cloud storage of its own.",
          "The connection is designed for viewing. Your existing cloud provider remains the place where those files are stored and managed.",
        ],
      },
      {
        heading: "What read-only means",
        paragraphs: [
          "Fileio can list folders and files you choose to access and open supported formats. It cannot upload, rename, edit, delete, or sync files in your connected cloud account.",
        ],
        bullets: [
          "Browse Google Drive or Dropbox folders",
          "Open PDF, DOCX, XLSX, PPTX, JPG, and PNG files",
          "No cloud uploads or file changes",
        ],
      },
      {
        heading: "Connect only when you need it",
        paragraphs: [
          "Cloud access is optional. Local file management works without connecting Google Drive or Dropbox, and you can choose whether to use the Pro cloud viewing features.",
        ],
      },
    ],
  },
  {
    slug: "choosing-an-android-document-viewer",
    title: "What to Look for in an Android Document Viewer",
    description:
      "A practical checklist for opening common office documents and images on Android.",
    category: "Android tips",
    publishedAt: "2026-06-17",
    readTime: "4 min read",
    sections: [
      {
        heading: "Start with the formats you use",
        paragraphs: [
          "A useful Android document viewer should support the formats you receive most often. For everyday work, that commonly includes PDF, DOCX, XLSX, PPTX, JPG, and PNG.",
        ],
      },
      {
        heading: "Keep finding and viewing together",
        paragraphs: [
          "Switching between a file browser and several viewers adds friction. A file manager with search, sorting, favorites, recents, and an integrated viewer makes it easier to find a document and open it in one flow.",
        ],
      },
      {
        heading: "Understand cloud permissions",
        paragraphs: [
          "If an app connects to a cloud provider, check whether it can change files. Fileio uses read-only cloud access: Pro users can browse and open supported Google Drive and Dropbox files, but Fileio cannot upload or modify them.",
        ],
      },
    ],
  },
  {
    slug: "organize-files-on-android",
    title: "A Simple Way to Organize Files on Android",
    description:
      "Use folders, search, sorting, favorites, and recents to keep Android files manageable.",
    category: "File management",
    publishedAt: "2026-06-10",
    readTime: "4 min read",
    sections: [
      {
        heading: "Use a small folder structure",
        paragraphs: [
          "Create a few folders around clear purposes, such as Work, Personal, Receipts, and Reference. A shallow structure is usually faster to navigate than many nested folders.",
        ],
      },
      {
        heading: "Search and sort before moving files",
        paragraphs: [
          "Search helps locate a known filename, while sorting can surface recent files or group similar items. Use both before adding more folders to solve a temporary navigation problem.",
        ],
      },
      {
        heading: "Reserve favorites for active files",
        paragraphs: [
          "Mark documents you use repeatedly as favorites, and use recent files for short-term work. Review favorites occasionally so the list stays useful.",
        ],
      },
    ],
  },
];

export const guides: Article[] = [
  {
    slug: "how-to-open-docx-files-on-android",
    title: "How to Open DOCX Files on Android",
    description: "Find and open Microsoft Word DOCX documents on your Android phone with Fileio.",
    category: "Document viewer",
    publishedAt: "2026-06-26",
    readTime: "3 min read",
    sections: [
      {
        heading: "Open a local DOCX file",
        paragraphs: [
          "Open Fileio and browse to the folder that contains your DOCX file. You can also use file search if you know part of the filename. Tap the document to open it in the viewer.",
        ],
      },
      {
        heading: "Find it again",
        paragraphs: [
          "After opening the document, use Recent files to return to it. For a document you use regularly, add it to Favorites.",
        ],
      },
      {
        heading: "Open a cloud document",
        paragraphs: [
          "Fileio Pro users can connect Google Drive or Dropbox, browse to a DOCX file, and open it. Cloud access is read-only, so Fileio will not modify or upload the document.",
        ],
      },
    ],
  },
  {
    slug: "how-to-view-xlsx-and-pptx-files-on-android",
    title: "How to View XLSX and PPTX Files on Android",
    description: "Open spreadsheet and presentation files on Android using Fileio's document viewer.",
    category: "Document viewer",
    publishedAt: "2026-06-20",
    readTime: "3 min read",
    sections: [
      {
        heading: "Locate the file",
        paragraphs: [
          "Use Fileio to browse your Android folders, or search by filename. Sorting can also help when you know when the file was downloaded or saved.",
        ],
      },
      {
        heading: "Open XLSX or PPTX",
        paragraphs: [
          "Tap an XLSX spreadsheet or PPTX presentation to open the supported file in Fileio's document viewer. Fileio is intended for viewing these documents, not editing them.",
        ],
      },
      {
        heading: "View from Google Drive or Dropbox",
        paragraphs: [
          "With Fileio Pro, you can browse connected Google Drive and Dropbox folders and open supported XLSX and PPTX files. The connection does not provide upload, edit, or sync access.",
        ],
      },
    ],
  },
  {
    slug: "how-to-scan-documents-to-pdf-on-android",
    title: "How to Scan Documents to PDF on Android",
    description: "Use Fileio's PDF scanner to turn a paper document into a PDF on Android.",
    category: "PDF scanner",
    publishedAt: "2026-06-14",
    readTime: "3 min read",
    sections: [
      {
        heading: "Prepare the page",
        paragraphs: [
          "Place the document on a flat, contrasting surface with even light. Avoid shadows across the page and hold your Android phone steady above it.",
        ],
      },
      {
        heading: "Scan with Fileio",
        paragraphs: [
          "Open the PDF scanner in Fileio and capture the document. Review the result, then save it as a PDF file on your device.",
        ],
      },
      {
        heading: "Organize the saved PDF",
        paragraphs: [
          "Give the PDF a clear filename, then use Fileio's folders, search, sorting, favorites, and recent files to find it later. Fileio does not claim OCR support; the scan is saved as a PDF document.",
        ],
      },
    ],
  },
];

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
