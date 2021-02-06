import { useState } from "react";
import { useDropzone } from "react-dropzone";
import fetcher, { postFormData } from "../lib/fetcher";
import { useUser } from "../lib/user";
import { useRouter } from "next/router";
import Loader from "../components/Loader";
import classNames from "classnames";

export default function Upload() {
  const user = useUser();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length) {
        setLoading(true);
        try {
          const file = acceptedFiles[0];

          const existingImages = await fetcher(
            `/images?sub_id=${user}&original_filename=${file.name}`
          );

          if (existingImages.length) {
            setError(
              "You've already uploaded that image. Please choose another."
            );
            setLoading(false);
          } else {
            await postFormData("/images/upload", {
              file,
              sub_id: user,
            });
            router.push("/");
          }
        } catch (err) {
          setError(err.info.message);
          setLoading(false);
        }
      } else {
        setError("Please select a single JPG or PNG image of a cat.");
      }
    },
  });

  if (loading) return <Loader />;

  const classes = classNames({
    border: true,
    "border-dashed": true,
    "border-gray-400": !isDragActive,
    "border-green-800": isDragActive,
    "border-red-800": !isDragActive && error,
    "bg-green-300": isDragActive,
    "bg-red-300": !isDragActive && error,
    "py-8": true,
    "px-4": true,
    "text-xl": true,
    "text-gray-500": !isDragActive,
    "text-green-800": isDragActive,
    "text-red-800": !isDragActive && error,
    "text-center": true,
    "outline-none": true,
    "focus:outline-none": true,
    "cursor-pointer": true,
  });

  return (
    <div className="w-screen p-4">
      <div className={classes} {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop file here...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <p>Drag a file here, or click to select a file</p>
        )}
      </div>
    </div>
  );
}
