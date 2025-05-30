"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import NextImage from "@/components/NextImage";

const Education = () => {
  return (
    <div className="flex flex-col items-center my-20">
      <div className="max-w-3xl mx-auto">
        <ol className="relative border-l-2 border-gray-200 dark:border-gray-700">
          {Data.map((data) => (
            <li className="mb-10 ml-6 " key={data.name}>
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
                  <p className="text-base flex flex-wrap gap-1 mt-2 font-medium text-gray-600 dark:text-gray-400">
                    {data.department}
                    <span className="text-base font-mono text-gray-600 dark:text-gray-400">
                      ({data.course})
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default Education;

const Data = [
  {
    name: "ESPRIT",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Esprit_Logo.svg/1200px-Esprit_Logo.svg.png",
    timeSpan: "2024 - Present",
    department: "Computer and Information Engineering",
    course: "Engineering Cycle",
  },
  {
    name: "Mahdia University",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQqKsKU2ULBxYuacIlAzozkyzskDfJBUrKeYnoUk7OrA&s",
    timeSpan: "2021 - 2024",
    department: "Computer Science",
    course: "Software Engineering",
  },
  {
    name: "College of Sayada",
    logo: "https://scontent.ftun16-1.fna.fbcdn.net/v/t39.30808-6/225520655_106317708413898_5368436802275021666_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_ohc=Q4aGtSUnEiQQ7kNvgEkz0Wc&_nc_ht=scontent.ftun16-1.fna&oh=00_AYAbu8TD91CRZcBJQybohLK1zyV0xkf8sPtv0H8NXfpzAQ&oe=6653EF1C",
    timeSpan: "2019 - 2021",
    department: "Baccalaureat",
    course: "Technique",
  },
];
