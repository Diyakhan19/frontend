import { Suspense } from "react";
import Chat from "./Chat";

const page = () => {
  return (
    <Suspense>
      <Chat />
    </Suspense>
  );
};

export default page;
