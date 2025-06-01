"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  FilterState,
  FILTER_OPTIONS,
  hasActiveFilters,
  getActiveFilterCount,
} from "@/lib/projectUtils";

interface ProjectFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  className?: string;
}

export default function ProjectFilters({
  filters,
  onFilterChange,
  className,
}: ProjectFiltersProps) {
  const activeFilterCount = getActiveFilterCount(filters);

  const toggleFilter = (filterType: keyof FilterState, value: string) => {
    const currentFilters = filters[filterType];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((item) => item !== value)
      : [...currentFilters, value];

    onFilterChange({
      ...filters,
      [filterType]: newFilters,
    });
  };

  const removeFilter = (filterType: keyof FilterState, value: string) => {
    onFilterChange({
      ...filters,
      [filterType]: filters[filterType].filter((item) => item !== value),
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      category: [],
      technology: [],
      industry: [],
      status: [],
    });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("space-y-6", className)}
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {activeFilterCount}
            </Badge>
          )}
        </div>

        <AnimatePresence>
          {hasActiveFilters(filters) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Active Filters */}
      <AnimatePresence>
        {hasActiveFilters(filters) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-3"
          >
            <h4 className="text-sm font-medium text-muted-foreground">
              Active Filters:
            </h4>
            <div className="flex flex-wrap gap-2">
              {Object.entries(filters).map(([filterType, values]) =>
                values.map((value: string) => (
                  <motion.div
                    key={`${filterType}-${value}`}
                    variants={badgeVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                  >
                    <Badge
                      variant="default"
                      className="flex items-center gap-1 pr-1 cursor-pointer hover:bg-primary/80"
                      onClick={() =>
                        removeFilter(filterType as keyof FilterState, value)
                      }
                    >
                      <span className="text-xs">{value}</span>
                      <X className="w-3 h-3 hover:bg-primary-foreground/20 rounded-full p-0.5" />
                    </Badge>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Category Filter */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-sm font-medium">Category</h4>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.categories.map((category) => (
              <motion.div
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    filters.category.includes(category) ? "default" : "outline"
                  }
                  className="cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => toggleFilter("category", category)}
                >
                  {category}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technology Filter */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-sm font-medium">Technology</h4>
          <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
            {FILTER_OPTIONS.technologies.map((tech) => (
              <motion.div
                key={tech}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    filters.technology.includes(tech) ? "default" : "outline"
                  }
                  className="cursor-pointer transition-all duration-200 hover:shadow-md text-xs"
                  onClick={() => toggleFilter("technology", tech)}
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Industry Filter */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-sm font-medium">Industry</h4>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.industries.map((industry) => (
              <motion.div
                key={industry}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    filters.industry.includes(industry) ? "default" : "outline"
                  }
                  className="cursor-pointer transition-all duration-200 hover:shadow-md"
                  onClick={() => toggleFilter("industry", industry)}
                >
                  {industry}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Status Filter */}
        <motion.div variants={itemVariants} className="space-y-3">
          <h4 className="text-sm font-medium">Status</h4>
          <div className="flex flex-wrap gap-2">
            {FILTER_OPTIONS.statuses.map((status) => (
              <motion.div
                key={status}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Badge
                  variant={
                    filters.status.includes(status) ? "default" : "outline"
                  }
                  className="cursor-pointer transition-all duration-200 hover:shadow-md capitalize"
                  onClick={() => toggleFilter("status", status)}
                >
                  {status.replace("-", " ")}
                </Badge>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
