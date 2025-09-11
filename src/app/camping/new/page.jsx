import { Suspense } from "react";
import NewCamping from "./NewCamping";

const page = () => {
  return (
    <Suspense>
      <NewCamping />
    </Suspense>
  );
};

export default page;
