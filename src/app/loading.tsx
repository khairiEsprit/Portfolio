import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section Skeleton */}
      <main className="relative py-20 min-h-[80vh] md:min-h-[85vh] flex items-center justify-center">
        <div className="container mx-auto px-6 flex items-center flex-col-reverse lg:flex-row gap-12 lg:gap-16">
          {/* Content Section Skeleton */}
          <section className="flex flex-col gap-6 text-left lg:w-1/2 2xl:w-1/3">
            {/* Greeting */}
            <Skeleton className="h-8 w-32" />
            
            {/* Name */}
            <Skeleton className="h-12 md:h-16 w-full max-w-md" />
            
            {/* Role */}
            <Skeleton className="h-8 md:h-10 w-3/4" />
            
            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-full" />
              <Skeleton className="h-6 w-3/4" />
            </div>
            
            {/* Social Links */}
            <div className="flex gap-4">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-row justify-center md:justify-start gap-4 md:gap-6 mt-6">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
          </section>

          {/* Profile Image Skeleton */}
          <aside className="relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <Skeleton className="w-full h-full rounded-full" />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
