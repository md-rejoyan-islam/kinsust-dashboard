import { useState } from "react";

const usePhotoPreview = () => {
  const [photoSrc, setPhotoSrc] = useState(null);

  // handle photo change
  const handlePhotoChange = (e) => {
    const imageFile = e.target.files[0];
    const url = URL.createObjectURL(imageFile);
    if (!(imageFile.type.split("/")[0] === "image")) return;
    document.getElementById("photoUpload")?.classList?.add("hidden");
    setPhotoSrc(url);
  };

  // reset photo preview
  const resetPhotoPreview = () => {
    document.getElementById("photoUpload")?.classList?.remove("hidden");
    setPhotoSrc(null);
  };

  return { photoSrc, handlePhotoChange, resetPhotoPreview };
};

export default usePhotoPreview;
