
export interface LearningItem {
  id: string;
  type: 'reading' | 'video' | 'assignment' | 'quiz' | 'coding';
  title: string;
  duration?: string;
  description?: string;
}

export interface ContentItem {
  id: string;
  type: 'module' | 'project';
  title: string;
  description: string;
  items?: LearningItem[];
  isExpanded?: boolean;
  showAddContent?: boolean;
  duration?: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
}

export interface NewModuleData {
  type: 'module' | 'project';
  title: string;
  description: string;
  months: number;
  weeks: number;
  days: number;
}
