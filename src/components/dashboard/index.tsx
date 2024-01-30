'use client';

import React from 'react';
import Skeleton from 'react-loading-skeleton';

import { trpc } from '@/app/_trpc/client';
import UploadButton from './upload-button';
import FileList from './file-list';
import EmptyFiles from './empty-files';

const Dashboard = () => {
  const { data: files, isLoading } = trpc.getUserFiles.useQuery();
  return (
    <main className="mx-auto max-w-7xl md:p-10">
      <div className="flex-mt-8 flex flex-col items-start justify-between gap-4 border-b border-gray-200 p-4 lg:p-0 sm:flex-row sm:items-center sm:gap-0">
        <h1 className="mb-3 font-bold text-5xl text-gray-900">My Files</h1>
        <UploadButton />
      </div>
      {files && files.length !== 0 ? (
        <FileList files={files} />
      ) : isLoading ? (
        <Skeleton height={100} className="my-2" count={3} />
      ) : (
        <EmptyFiles />
      )}
    </main>
  );
};

export default Dashboard;
