const { Suspense } = require("react");
const { default: Camping } = require("./Camping");

const page = () => {
  return (
    <Suspense>
      <Camping />
    </Suspense>
  );
};

export default page;
