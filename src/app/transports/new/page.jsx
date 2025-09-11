import { Suspense } from "react";
import NewTrasport from "./NewTransport";

const page = () => {
  return (
    <Suspense>
      <NewTrasport />
    </Suspense>
  );
};

export default page;
