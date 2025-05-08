// "use client";

// import React from "react";
// import { cn } from "@/lib/utils";
// import Image from "next/image";
// import { useAuth } from "@/utils/constant";

// type ButtonOption = {
//   id: string;
//   label: string;
//   icon: string;
//   activeIcon?: string;
// };

// interface ToggleButtonsProps {
//   selected: string;
//   setSelected: (id: string) => void;
//   className?: string;
// }

// const options: ButtonOption[] = [
//   {
//     id: "story",
//     label: "Story",
//     icon: "/web2Img.png",
//   },
//   {
//     id: "research",
//     label: "Research",
//     icon: "/research.png",
//   },
//   {
//     id: "starred",
//     label: "Interact",
//     icon: "/aiIcon.png",
//     activeIcon: "/gree-ai-icon.png", // Adding the green icon for active state
//   },
// ];

// export default function ToggleButtons({
//   selected,
//   setSelected,
//   className,
// }: ToggleButtonsProps) {
//   const { isChatOpen, setIsChatOpen } = useAuth();

//   const handleChange = (id: string) => {
//     setSelected(id);
//     setIsChatOpen(id === "starred");
//   };

//   return (
//     <div
//       className={cn(
//         "flex items-center justify-between bg-[#181818] w-[240px] border border-[#232323] py-1.5 px-2 rounded-full z-[1000] pointer-events-auto",
//         className
//       )}
//     >
//       {options.map((option) => {
//         const isActive = selected === option.id;
//         const isStarred = option.id === "starred";

//         return (
//           <button
//             key={option.id}
//             onClick={() => handleChange(option?.id)}
//             className={cn(
//               "flex items-center justify-center rounded-full transition-all duration-300 ease-in-out",
//               isActive && isStarred
//                 ? "text-[#04FEAE] px-4 py-[9px] min-w-[90px] md:min-w-[94px]"
//                 : isActive
//                 ? "bg-white text-black px-4 py-[9px] min-w-[90px] md:min-w-[94px]"
//                 : "bg-transparent text-gray-400 px-2 py-[9px] min-w-[39px] hover:bg-white/10"
//             )}
//           >
//             <span className="flex items-center justify-center">
//               <Image
//                 src={
//                   isActive && option.activeIcon
//                     ? option.activeIcon
//                     : option.icon
//                 }
//                 alt={`${option.label} Icon`}
//                 width={20}
//                 height={20}
//                 className="cursor-pointer"
//               />
//               {isActive && (
//                 <span
//                   className={cn(
//                     "ml-2 font-semibold text-sm whitespace-nowrap stroke-current",
//                     isStarred ? "text-white" : "text-[#1F1F1F]"
//                   )}
//                 >
//                   {option.label}
//                 </span>
//               )}
//             </span>
//           </button>
//         );
//       })}
//     </div>
//   );
// }

"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useAuth } from "@/utils/constant";

type ButtonOption = {
  id: string;
  label: string;
  icon: string;
};

interface ToggleButtonsProps {
  selected: string;
  setSelected: (id: string) => void;
  className?: string;
}

const options: ButtonOption[] = [
  {
    id: "story",
    label: "Story",
    icon: "/web2Img.png",
  },
  {
    id: "research",
    label: "Research",
    icon: "/research.png",
  },
  {
    id: "starred",
    label: "Interact",
    icon: "/aiIcon.png", // default icon (used if not active)
  },
];

export default function ToggleButtons({
  selected,
  setSelected,
  className,
}: ToggleButtonsProps) {
  const { isChatOpen, setIsChatOpen } = useAuth();

  const handleChange = (id: string) => {
    setSelected(id);
    setIsChatOpen(id === "starred");
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-[#181818] w-[240px] border border-[#232323] py-1.5 px-2 rounded-full z-[1000] pointer-events-auto",
        className
      )}
    >
      {options.map((option) => {
        const isActive = selected === option.id;

        return (
          <button
            key={option.id}
            onClick={() => handleChange(option.id)}
            className={cn(
              "flex items-center justify-center rounded-full transition-all duration-300 ease-in-out",
              option.id === "starred" && isActive
                ? "text-[#04FEAE] px-4 py-[9px] min-w-[90px] md:min-w-[94px]"
                : isActive
                ? "bg-white text-black px-4 py-[9px] min-w-[90px] md:min-w-[94px]"
                : "bg-transparent text-gray-400 px-2 py-[9px] min-w-[39px] hover:bg-white/10"
            )}
          >
            <span className="flex items-center justify-center">
              <Image
                src={
                  option.id === "starred" && isActive
                    ? "/gree-ai-icon.png"
                    : option.icon
                }
                alt={`${option.label} Icon`}
                width={20}
                height={20}
                className="cursor-pointer"
              />
              {isActive && (
                <span
                  className={cn(
                    "ml-2 font-semibold text-sm whitespace-nowrap stroke-current",
                    option.id === "starred"
                      ? "text-green-500"
                      : "text-[#1F1F1F]"
                  )}
                >
                  {option.label}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
