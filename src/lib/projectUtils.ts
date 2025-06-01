import { ProjectType } from "@/app/(sections)/projects/constant";

// Filter and Sort Types
export interface FilterState {
  category: string[];
  technology: string[];
  industry: string[];
  status: string[];
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortBy =
  | "date-desc"
  | "date-asc"
  | "name-asc"
  | "name-desc"
  | "category"
  | "status";

// Available filter options
export const FILTER_OPTIONS = {
  categories: [
    "Full Stack",
    "AI/ML",
    "Frontend",
    "Blockchain",
    "Backend",
    "Mobile",
  ],
  technologies: [
    "React",
    "Next.js",
    "Vue.js",
    "TypeScript",
    "JavaScript",
    "Python",
    "Node.js",
    "Express",
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Prisma",
    "Symfony",
    "Flask",
    "Solidity",
    "IoT",
    "HTML",
    "CSS",
    "Pinia",
    "Rasa Platform",
    "Prompt Engineering",
    "SQLite",
  ],
  industries: [
    "Environmental",
    "Education",
    "Travel",
    "Productivity",
    "Healthcare",
    "E-commerce",
    "Fintech",
  ],
  statuses: ["completed", "in-progress", "planned"],
};

// Sort options
export const SORT_OPTIONS: SortOption[] = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "name-asc", label: "Name A-Z" },
  { value: "name-desc", label: "Name Z-A" },
  { value: "category", label: "Category" },
  { value: "status", label: "Status" },
];

// Filter functions
export const filterProjects = (
  projects: ProjectType[],
  filters: FilterState
): ProjectType[] => {
  return projects.filter((project) => {
    // Category filter
    if (filters.category.length > 0 && project.category) {
      if (!filters.category.includes(project.category)) return false;
    }

    // Technology filter
    if (filters.technology.length > 0) {
      const hasMatchingTech = filters.technology.some((tech) =>
        project.techstack.some((projectTech) =>
          projectTech.toLowerCase().includes(tech.toLowerCase())
        )
      );
      if (!hasMatchingTech) return false;
    }

    // Industry filter
    if (filters.industry.length > 0 && project.industry) {
      if (!filters.industry.includes(project.industry)) return false;
    }

    // Status filter
    if (filters.status.length > 0 && project.status) {
      if (!filters.status.includes(project.status)) return false;
    }

    return true;
  });
};

// Sort functions
export const sortProjects = (
  projects: ProjectType[],
  sortBy: SortBy
): ProjectType[] => {
  const sortedProjects = [...projects];

  switch (sortBy) {
    case "date-desc":
      return sortedProjects.sort((a, b) => {
        const dateA = new Date(a.completionDate || "1970-01-01");
        const dateB = new Date(b.completionDate || "1970-01-01");
        return dateB.getTime() - dateA.getTime();
      });

    case "date-asc":
      return sortedProjects.sort((a, b) => {
        const dateA = new Date(a.completionDate || "1970-01-01");
        const dateB = new Date(b.completionDate || "1970-01-01");
        return dateA.getTime() - dateB.getTime();
      });

    case "name-asc":
      return sortedProjects.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return sortedProjects.sort((a, b) => b.title.localeCompare(a.title));

    case "category":
      return sortedProjects.sort((a, b) => {
        const categoryA = a.category || "zzz";
        const categoryB = b.category || "zzz";
        return categoryA.localeCompare(categoryB);
      });

    case "status":
      return sortedProjects.sort((a, b) => {
        const statusOrder = { "in-progress": 0, completed: 1, planned: 2 };
        const statusA = statusOrder[a.status as keyof typeof statusOrder] ?? 3;
        const statusB = statusOrder[b.status as keyof typeof statusOrder] ?? 3;
        return statusA - statusB;
      });

    default:
      return sortedProjects;
  }
};

// Get unique values from projects for dynamic filter options
export const getUniqueValues = (projects: ProjectType[]) => {
  const categories = Array.from(
    new Set(projects.map((p) => p.category).filter(Boolean) as string[])
  );
  const technologies = Array.from(
    new Set(projects.flatMap((p) => p.techstack))
  );
  const industries = Array.from(
    new Set(projects.map((p) => p.industry).filter(Boolean) as string[])
  );
  const statuses = Array.from(
    new Set(projects.map((p) => p.status).filter(Boolean) as string[])
  );

  return { categories, technologies, industries, statuses };
};

// Check if any filters are active
export const hasActiveFilters = (filters: FilterState): boolean => {
  return Object.values(filters).some((filterArray) => filterArray.length > 0);
};

// Get count of active filters
export const getActiveFilterCount = (filters: FilterState): number => {
  return Object.values(filters).reduce(
    (count, filterArray) => count + filterArray.length,
    0
  );
};

// Reset all filters
export const resetFilters = (): FilterState => ({
  category: [],
  technology: [],
  industry: [],
  status: [],
});
