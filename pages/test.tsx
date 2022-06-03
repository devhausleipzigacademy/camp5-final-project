import { useFilePicker } from "use-file-picker";
import React from "react";
import { NextPage } from "next";

const Test: NextPage = () => {
  const [openFileSelector, { filesContent, loading, errors }] = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: true,
    limitFilesConfig: { max: 1 },
    // minFileSize: 0.1, // in megabytes
    maxFileSize: 50,
    imageSizeRestrictions: {
      maxHeight: 900, // in pixels
      maxWidth: 1600,
      minHeight: 600,
      minWidth: 768,
    },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errors.length) {
    return <div>Error...</div>;
  }

  return (
    <div className="bg-primary min-h-screen w-full pt-16">
      <p>CONTENT</p>
      <p>CONTENT</p>
      <p>CONTENT</p>
      <p>CONTENT</p>
      <p>CONTENT</p>
      <button onClick={() => openFileSelector()}>Select files </button>
      <br />
      {filesContent.map((file, index) => (
        <div key={index}>
          <h2>{file.name}</h2>
          <img alt={file.name} src={file.content}></img>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Test;
