function photoPreview(imageFile, setPhotoSrc) {
  const url = URL.createObjectURL(imageFile);

  if (!(imageFile.type.split("/")[0] === "image")) return;
  document.getElementById("photoUpload").classList.add("hidden");
  setPhotoSrc(url);
}

export default photoPreview;
