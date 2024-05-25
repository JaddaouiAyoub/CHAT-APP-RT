export const uploadToCloud = async (pics) => {
    try {
      if (!pics) {
        console.error("Error: No image provided for upload");
        return null;
      }
  
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbjzqxomk");
  
      const res = await fetch("https://api.cloudinary.com/v1_1/dbjzqxomk/image/upload", {
        method: "POST",
        body: data,
      });
      console.log(res);
      if (!res.ok) {
        const error = await res.json();
        console.error("Error uploading image:", error.error.message);
        return null;
      }
  
      const fileData = await res.json();
      console.log("Image saved successfully",fileData);
      return fileData?.secure_url?.toString();
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  