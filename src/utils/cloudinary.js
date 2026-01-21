import { Cloudinary } from "cloudinary-core";

const cld = new Cloudinary({
  cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
  secure: true,
});

export default cld;
