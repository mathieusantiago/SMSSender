import axios from "axios";
import dynamic from "next/dynamic.js";
const ContentDog = dynamic(() => import("../components/About/About.js"), {
  suspense: true,
});

function Dog({ posts }) {
  return (
    <>
      <ContentDog image={posts} />
    </>
  );
}


export async function getServerSideProps() {
  const res = await axios("https://dog.ceo/api/breeds/image/random").then(
    (res) => res.data
  );
  const posts = await res.message;
  return {
    props: {
      posts,
    },
  };
}



export default Dog;
