import { Suspense } from "react";
import Profile from "./Profile";

const page = () => {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
};

export default page;
