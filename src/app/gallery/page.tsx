import Gallery from "./gallery";
import { BackgroundCellAnimation } from "./BackgroundRippleEffect";

export default function GalleryPage() {
  return (
    <div>
      <BackgroundCellAnimation />
      <Gallery />
    </div>
  );
}
