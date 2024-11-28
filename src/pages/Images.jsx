import { IMAGES } from "@/assets/images";

import ImageCard from "@/components/ImageCard";

const Images = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {IMAGES.map((image) => (
          <ImageCard key={image.id} image={image} />
        ))}
      </div>
    </div>
  );
};

export default Images;
