import { Fragment } from "react";
import { PuffLoader } from "react-spinners";

const Loader = ({ loading }: { loading: boolean }) => {
  return (
    <Fragment>
      {loading && (
        <div className="bg-[#000]  fixed w-[100vw] h-[100vh] top-0 left-0 z-50 overflow-y-hidden opacity-[0.8]">
          <div className="flex min-h-screen w-full items-center justify-center bg-[#000]">
            <PuffLoader
              loading={loading}
              color="#4649DE"
              size={120}
              speedMultiplier={1}
            />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Loader;
