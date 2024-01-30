import React from 'react';
import FileCard from './file-card';
import { File } from '@prisma/client';

export type FileString = Omit<File, 'createdAt' | 'updatedAt'> & {
  createdAt: string;
  updatedAt: string;
};

export type FileListProps = {
  files: FileString[];
};

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <ul className="mt-8 grid grid-cools-1 gap-6 divide-y divide-zinc-200 md:grid-cols-2 lg:grid-cols-3">
      {files
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((file) => (
          <FileCard key={file.id} file={file} />
        ))}
    </ul>
  );
};

export default FileList;
