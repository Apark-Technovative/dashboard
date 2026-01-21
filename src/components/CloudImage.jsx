import { AdvancedImage } from "@cloudinary/react";
import { Cloudinary } from "@cloudinary/url-gen";

const cld = new Cloudinary({
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  },
});

export default function CloudImage({ publicId, className }) {
  if (!publicId) return null;

  const img = cld.image(publicId);

  return (
    <AdvancedImage
      cldImg={img}
      className={className}
    />
  );
}
