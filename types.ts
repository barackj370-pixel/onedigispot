
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface RoadmapResponse {
  projectName: string;
  summary: string;
  phases: {
    name: string;
    tasks: string[];
    duration: string;
  }[];
  techStack: string[];
}
