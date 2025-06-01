"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  options,
  value,
  onValueChange,
  placeholder = "Select option",
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const [dropdownPosition, setDropdownPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const selectedOption = options.find((option) => option.value === value);

  // Handle mounting for portal
  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Update dropdown position when opened
  React.useEffect(() => {
    if (isOpen && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom , // No gap - directly below button
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, [isOpen]);

  // Close dropdown when clicking outside or scrolling
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll, true);
    window.addEventListener("resize", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      window.removeEventListener("resize", handleScroll);
    };
  }, [isOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return;

    switch (event.key) {
      case "Enter":
      case " ":
        event.preventDefault();
        setIsOpen(!isOpen);
        break;
      case "Escape":
        setIsOpen(false);
        break;
      case "ArrowDown":
        event.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
        } else {
          const currentIndex = options.findIndex(
            (option) => option.value === value
          );
          const nextIndex =
            currentIndex < options.length - 1 ? currentIndex + 1 : 0;
          onValueChange(options[nextIndex].value);
        }
        break;
      case "ArrowUp":
        event.preventDefault();
        if (isOpen) {
          const currentIndex = options.findIndex(
            (option) => option.value === value
          );
          const prevIndex =
            currentIndex > 0 ? currentIndex - 1 : options.length - 1;
          onValueChange(options[prevIndex].value);
        }
        break;
    }
  };

  const dropdownVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: -10,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: {
        duration: 0.15,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={cn("relative", className)}>
      <motion.button
        ref={triggerRef}
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        className={cn(
          "flex items-center justify-between w-full px-3 py-2 text-sm",
          "bg-background border border-border rounded-md",
          "hover:bg-accent hover:text-accent-foreground",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors duration-200"
        )}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <span
          className={cn("truncate", !selectedOption && "text-muted-foreground")}
        >
          {selectedOption?.label || placeholder}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 ml-2 flex-shrink-0" />
        </motion.div>
      </motion.button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={dropdownRef}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                style={{
                  position: "fixed",
                  top: dropdownPosition.top,
                  left: dropdownPosition.left,
                  width: dropdownPosition.width,
                  zIndex: 50,
                }}
                className={cn(
                  "py-1 bg-popover border border-border rounded-md shadow-lg",
                  "backdrop-blur-sm"
                )}
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  transition={{ staggerChildren: 0.02 }}
                >
                  {options.map((option) => (
                    <motion.button
                      key={option.value}
                      variants={itemVariants}
                      type="button"
                      onClick={() => {
                        onValueChange(option.value);
                        setIsOpen(false);
                      }}
                      className={cn(
                        "flex items-center justify-between w-full px-3 py-2 text-sm text-left",
                        "hover:bg-accent hover:text-accent-foreground",
                        "focus:outline-none focus:bg-accent focus:text-accent-foreground",
                        "transition-colors duration-150",
                        option.value === value &&
                          "bg-accent text-accent-foreground"
                      )}
                    >
                      <span>{option.label}</span>
                      {option.value === value && (
                        <Check className="w-4 h-4 text-primary" />
                      )}
                    </motion.button>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </div>
  );
}
