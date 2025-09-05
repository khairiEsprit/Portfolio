"use client";

import { useState, useMemo, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Grid, List } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters";
import ProjectSort from "@/components/ProjectSort";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ProjectType } from "@/app/(sections)/projects/constant";
import {
  FilterState,
  SortBy,
  filterProjects,
  sortProjects,
  hasActiveFilters,
  getActiveFilterCount,
} from "@/lib/projectUtils";

interface FilterableProjectGalleryProps {
  projects: ProjectType[];
  className?: string;
}

const FilterableProjectGallery = memo(function FilterableProjectGallery({
  projects,
  className,
}: FilterableProjectGalleryProps) {
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    technology: [],
    industry: [],
    status: [],
  });
  const [sortBy, setSortBy] = useState<SortBy>("date-desc");
  const [showFilters, setShowFilters] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Memoized filtered and sorted projects
  const filteredAndSortedProjects = useMemo(() => {
    const filtered = filterProjects(projects, filters);
    return sortProjects(filtered, sortBy);
  }, [projects, filters, sortBy]);

  const handleFilterChange = useCallback((newFilters: FilterState) => {
    setFilters(newFilters);
  }, []);

  const handleSortChange = useCallback((newSortBy: SortBy) => {
    setSortBy(newSortBy);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const gridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        staggerChildren: 0.1,
      },
    },
  };

  const projectVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-8", className)}
    >
      {/* Header Controls */}
      <motion.div variants={headerVariants} className="space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Results Summary */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">
                {filteredAndSortedProjects.length} Project
                {filteredAndSortedProjects.length !== 1 ? "s" : ""}
              </h3>
              {hasActiveFilters(filters) && (
                <Badge variant="secondary">
                  {getActiveFilterCount(filters)} filter
                  {getActiveFilterCount(filters) !== 1 ? "s" : ""} active
                </Badge>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-border rounded-md p-1">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="h-8 w-8 p-0"
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="h-8 w-8 p-0"
              >
                <List className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter Toggle */}
            <Button
              variant={showFilters ? "default" : "outline"}
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              {showFilters ? "Hide" : "Show"} Filters
            </Button>

            {/* Sort Control */}
            <ProjectSort sortBy={sortBy} onSortChange={handleSortChange} />
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-lg p-6">
              <ProjectFilters
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Projects Grid */}
      <motion.div variants={gridVariants}>
        <AnimatePresence mode="wait">
          {filteredAndSortedProjects.length > 0 ? (
            <motion.div
              key="projects-grid"
              variants={gridVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={cn(
                "grid gap-8",
                viewMode === "grid"
                  ? "grid-cols-1 lg:grid-cols-2 xl:gap-10"
                  : "grid-cols-1 gap-6"
              )}
            >
              {filteredAndSortedProjects.map((project, index) => (
                <motion.div
                  key={project.title}
                  variants={projectVariants}
                  layout
                  className="h-full"
                >
                  <ProjectCard
                    project={project}
                    index={index}
                    className={cn(
                      "h-full",
                      viewMode === "list" && "max-w-2xl mx-auto"
                    )}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="no-results"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="text-center py-16"
            >
              <div className="space-y-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold">No projects found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your filters or search criteria to find more
                  projects.
                </p>
                {hasActiveFilters(filters) && (
                  <Button
                    variant="outline"
                    onClick={() =>
                      setFilters({
                        category: [],
                        technology: [],
                        industry: [],
                        status: [],
                      })
                    }
                    className="mt-4"
                  >
                    Clear All Filters
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
});

export default FilterableProjectGallery;
