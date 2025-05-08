import SpaceCardGrid from "./spaceCard";
import LatestProject from "./latestProject";
import SpotLight from "./spotLight";
import BlogsCard from "./blogCard";
import Mindshare from "./mindShare";
import Footer from "@/components/footer";

export default function WebHome() {
  return (
    <>
      <div className="px-6 mt-[70px] md:mt-1 max-w-[1920px] mx-auto">
        <p className="text-22px md:text-[32px] font-bold w-full md:w-[45%] text-white  ">
          Check out these curated recommendation right now that you might be
          interested.
        </p>

        <SpaceCardGrid />
        {/* latest project */}
        <LatestProject />
        {/* spotlight */}

        <SpotLight />
        <BlogsCard />
        <Mindshare />
      </div>
    </>
  );
}
