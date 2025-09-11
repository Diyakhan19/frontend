import { Suspense } from "react";
import NewPost from "./NewPost";

const page = () => {
  return (
    <Suspense>
      <NewPost />
    </Suspense>
  );
};
export default page;
