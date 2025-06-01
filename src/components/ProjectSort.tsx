"use client";

import { motion } from "framer-motion";
import { ArrowUpDown } from "lucide-react";
import { Dropdown } from "@/components/ui/dropdown";
import { cn } from "@/lib/utils";
import { SortBy, SORT_OPTIONS } from "@/lib/projectUtils";

interface ProjectSortProps {
  sortBy: SortBy;
  onSortChange: (sortBy: SortBy) => void;
  className?: string;
}

export default function ProjectSort({
  sortBy,
  onSortChange,
  className,
}: ProjectSortProps) {
  const containerVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={cn("flex items-center gap-3", className)}
    >
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <ArrowUpDown className="w-4 h-4" />
        <span className="font-medium">Sort by:</span>
      </div>
      
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
        className="min-w-[140px]"
      >
        <Dropdown
          options={SORT_OPTIONS}
          value={sortBy}
          onValueChange={(value) => onSortChange(value as SortBy)}
          placeholder="Select sort option"
          className="w-full"
        />
      </motion.div>
    </motion.div>
  );
}
