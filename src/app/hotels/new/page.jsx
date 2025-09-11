import NewHotel from "./NewHotel";

const { Suspense } = require("react");

const page = () => {
  return (
    <Suspense>
      <NewHotel />
    </Suspense>
  );
};

export default page;
