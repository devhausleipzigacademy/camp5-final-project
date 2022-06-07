import { PlusCircleIcon } from "@heroicons/react/solid";
import { FileContent, FileError } from "use-file-picker/dist/interfaces";

{
  /* Upload Multiple Files */
}

interface Props {
  errors: FileError[];
  filesContent: FileContent[];
  openFileSelector: () => void;
}

const UploadImage = ({ errors, filesContent, openFileSelector }: Props) => {
  return (
    <div className="w-full">
      {errors.length ? (
        errors.map((error, index) => (
          <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row flex-grow justify-between items-center sm:text-sm">
            <div key={index} className="flex bg-error text-error-text">
              <p>{error.name}</p>
              <p>INVALID PIC</p>
              <br />
            </div>
            <button onClick={() => openFileSelector()}>
              <PlusCircleIcon className="text-primary h-8" />
            </button>
          </div>
        ))
      ) : filesContent.length ? (
        <div>
          {filesContent.map((file, index) => (
            <div key={index}>
              <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row justify-between items-center sm:text-sm">
                <p className="font-normal">{file.name}</p>
                <button onClick={() => openFileSelector()}>
                  <PlusCircleIcon className="text-primary h-8" />
                </button>
              </div>
              <img alt={file.name} src={file.content}></img>
              <br />
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full rounded-md bg-primary bg-opacity-20 text-primary text-opacity-40 px-3 py-2 flex flex-row justify-between items-center sm:text-sm">
          <p className="font-normal">Photo </p>
          <button onClick={() => openFileSelector()}>
            <PlusCircleIcon className="text-primary h-8" />
          </button>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
