"use client";
import NextImage from "@/components/NextImage";
import { Button } from "@/components/ui/button";

const Experience = () => {
  return (
    <div className="flex flex-col items-center my-20">
      <div className="max-w-3xl mx-auto">
        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
          {Data.map((data) => (
            <li className="mb-10 ml-6" key={data.name}>
              <div className="flex items-center">
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 ring-2 ring-white dark:ring-gray-800 shadow-md">
                  <NextImage
                    src={data.logo}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt={data.name}
                  />
                </span>
                <div className="ml-4 animate_in">
                  <h3 className="flex flex-col lg:flex-row text-lg font-semibold">
                    {data.name}
                    <Button
                      size="sm"
                      variant="secondary"
                      className="max-w-fit max-md:my-1 md:ml-3 px-3 py-1 rounded-full"
                    >
                      {data.timeSpan}
                    </Button>
                  </h3>
                  <p className="text-base font-medium text-gray-600 dark:text-gray-400">
                    {data.role}
                  </p>
                  <ul className="list-disc font-sans text-sm mt-2 ml-5">
                    <li className="my-1 text-gray-700 dark:text-gray-300">
                      {data?.about1}
                    </li>
                    <li className="my-1 text-gray-700 dark:text-gray-300">
                      {data?.about2}
                    </li>
                    <li className="my-1 text-gray-700 dark:text-gray-300">
                      {data?.about3}
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Experience;

const Data = [
  {
    name: "Hortensia Agency",
    logo: "https://hortensia-agency.com/wp-content/uploads/2024/10/Logo-Hortensia-Dark-Horizontal.png",
    timeSpan: "06/2023 - 08/2023",
    role: "FullStack Developer (Internship)",
    about1: "Designed and developed an educational platform",
    about2: "Implemented advanced content management",
    about3: "Applied modern development best practices",
  },
  {
    name: "WS Consulting.",
    logo: "https://media.licdn.com/dms/image/C560BAQE2ePsj1ANUvw/company-logo_200_200/0/1630604444607?e=1724284800&v=beta&t=WUwg8mwCSr_ZK6j4Cf9CvWilXigeWJxb7B0SQMIaF2E",
    timeSpan: "Feb 2024 - Current",
    role: "Software Developer Intern",
    about1: "Creaction of an intuitive user interface with vue Js.",
    about2: "Creation of a conversationnel chatbot using Rasa Platform",
    about3:
      "Creation of a scalable and maintainable architecture in the backend using typescript",
  },
];
