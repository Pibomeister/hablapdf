import { Cloud, File, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import Dropzone, { DropzoneState } from 'react-dropzone';
import { Progress } from './progress';
import { useUploadThing } from '../../lib/uploadthing';
import { toast } from './use-toast';
import { trpc } from '../../app/_trpc/client';
import { useRouter } from 'next/navigation';

const UploadDropzone = ({ isSubscribed }: { isSubscribed: boolean }) => {
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const router = useRouter();
  const { startUpload } = useUploadThing(
    isSubscribed ? 'proPlanUploader' : 'freePlanUploader'
  );

  const { mutate: startPolling } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });

  const startSimulatedProgress = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };

  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFiles) => {
        setIsUploading(true);
        const progressInterval = startSimulatedProgress();
        const res = await startUpload(acceptedFiles);
        if (!res) {
          return toast({
            title: 'Upload failed',
            description: 'Something went wrong while uploading your file',
            variant: 'destructive',
          });
        }
        const [fileResponse] = res;

        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: 'Upload failed',
            description: 'Something went wrong while uploading your file',
            variant: 'destructive',
          });
        }
        clearInterval(progressInterval);
        setUploadProgress(100);
        startPolling({ key });
      }}
    >
      {({
        getRootProps,
        getInputProps,
        acceptedFiles,
        isDragActive,
      }: DropzoneState) => {
        return (
          <div
            {...getRootProps()}
            className="border h-64 m-4 border-dashed border-gray-300 rounded-lg hover:bg-slate-950/5 transition cursor-pointer"
          >
            <div className="flex items-center justify-center h-full w-full">
              <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 ${
                  isDragActive ? 'bg-gray-100' : ''
                }`}
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Cloud className="w-6 h-6 text-zinc-500 mb-2" />
                  <p className="mb-2 text-sm text-zinc-700">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="prose text-xs text-zinc-500">
                    PDF (up to {isSubscribed ? '16' : '4'}MB)
                  </p>
                </div>
                {acceptedFiles && acceptedFiles[0] ? (
                  <div className="max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200">
                    <div className="px-3 py-2 h-full grid place-items-center">
                      <File className="w-4 h-4 text-blue-500" />
                    </div>
                    <div className="px-3 py-2 h-full text-sm truncate">
                      {acceptedFiles[0].name}
                    </div>
                  </div>
                ) : null}
                {isUploading ? (
                  <div className="w-full mt-4 max-w-xs mx-auto">
                    <Progress
                      indicatorColor={
                        uploadProgress === 100 ? 'bg-green-500' : ''
                      }
                      value={uploadProgress}
                      className="h-1 w-full bg-zinc-200"
                    />
                    {uploadProgress === 100 ? (
                      <div className="flex gap-1 items-center justify-center text-sm text-zinc-700 text-center pt-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span>Redirecting...</span>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                <input
                  {...getInputProps()}
                  type="file"
                  id="dropzone-file"
                  className="hidden"
                />
              </label>
            </div>
          </div>
        );
      }}
    </Dropzone>
  );
};

export default UploadDropzone;
