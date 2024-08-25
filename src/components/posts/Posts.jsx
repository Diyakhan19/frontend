import Card from "./Card";

const Posts = (data) => {
  if (!data) return;

  const posts = data.posts;
  return (
    <div className="grid grid-cols-12 gap-2">
      {posts.map((post) => (
        <div className="grid col-span-12 md:col-span-4 lg:col-span-3">
          <Card post={post} />
        </div>
      ))}

      {posts.length == 0 && (
        <div className="col-span-12">
          <div className="flex items-center justify-center h-[300px]">
            No posts found
          </div>
        </div>
      )}
    </div>
  );
};

export default Posts;
