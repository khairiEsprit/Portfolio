import { Metadata } from "next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Experience from "./Experience";
import Education from "./Education";

export const metadata: Metadata = {
  title: "Experience | Mohamed Khairi Bouzid",
  description:
    "Professional experience and educational background of Mohamed Khairi Bouzid, including work history and academic achievements.",
  keywords: [
    "Professional Experience",
    "Education",
    "ESPRIT",
    "Work History",
    "Academic Background",
    "Career",
  ],
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/experience",
  },
  openGraph: {
    title: "Experience - Mohamed Khairi Bouzid",
    description:
      "Professional experience and educational background of a full-stack developer.",
    url: "https://www.mohamedkhairibouzid.engineer/experience",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

// Force static generation at build time
export const dynamic = "force-static";
export const revalidate = false;

function page() {
  return (
    <div className="flex justify-center mt-20">
      <Tabs defaultValue="experience" className="w-[400px] md:w-[500px]">
        <TabsList className="grid w-full rounded-full grid-cols-2">
          <TabsTrigger className="rounded-full" value="experience">
            Experience
          </TabsTrigger>
          <TabsTrigger className="rounded-full" value="education">
            Education
          </TabsTrigger>
        </TabsList>
        <TabsContent value="experience">
          <Experience />
        </TabsContent>
        <TabsContent value="education">
          <Education />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default page;
