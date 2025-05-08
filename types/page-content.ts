// In your types/page-content.ts file
interface TextElement {
  id: string;
  type: "text";
  content: string;
  variant?: string;
  className?: string;
  gridSpan?: string;
}

interface ImageElement {
  id: string;
  type: "image";
  src: string;
  alt: string;
  className?: string;
  gridSpan?: string;
  // Add this new property
  text?: {
    content: string;
    iconUrl: {
      telegram: string;
      twitter: string;
      website: string;
    }
  };
}

export type PageElement = TextElement | ImageElement;

export interface PageSection {
  id: string;
  name: string;
  className?: string;
  elements: PageElement[];
}

export interface PageContent {
  title: string;
  description: string;
  sections: PageSection[];
}