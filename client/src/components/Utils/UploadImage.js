const uploadImage = async (file) => {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "daraz_clone");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/dnwafsenb/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );
  const data = await response.json();
  return data.secure_url;
};

export default uploadImage;
