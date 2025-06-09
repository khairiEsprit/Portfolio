import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Experience from "./Experience";
import Education from "./Education";

export const metadata = {
  title: "Experience | Mohamed Khairi Bouzid",
  description:
    "Professional experience and education of Mohamed Khairi Bouzid.",
  alternates: {
    canonical: "https://www.mohamedkhairibouzid.engineer/experience",
  },
};

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
