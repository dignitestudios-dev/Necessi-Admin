import { storage } from "../firebase/firebase";
import { getDownloadURL, ref } from "firebase/storage";

const imageHandler = async (avatar) => {
  console.log("🚀 ~ imageHandler ~ avatar:", avatar);

  const bucketName = import.meta?.env?.VITE_BUCKET_NAME;
  console.log("🚀 ~ imageHandler ~ bucketName:", bucketName);

  const httpsReference = ref(
    storage,
    `https://firebasestorage.googleapis.com/b/${bucketName}/o/${avatar}`
  );
  const url = await getDownloadURL(httpsReference);
  return url;
};

export default imageHandler;
