import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <div className="mx-auto w-fit">
      <VideoPlayer source="https://www.youtube.com/watch?v=ekr2nIex040" />
    </div>
  );
}
