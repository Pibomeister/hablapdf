import React from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Plus, MessageSquare, TrashIcon, Loader2 } from 'lucide-react';

import { Button } from '../ui/button';
import { trpc } from '@/app/_trpc/client';
import { FileString } from './file-list';

interface FileCardProps {
  file: FileString;
}

const FileCard: React.FC<FileCardProps> = ({ file }) => {
  const utils = trpc.useUtils();
  const { mutate: deleteFile, isPending } = trpc.deleteFile.useMutation({
    onSuccess: () => {
      utils.getUserFiles.invalidate();
    },
  });
  return (
    <li
      key={file.id}
      className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow transition hover:shadow-lg"
    >
      <Link href={`/dashboard/${file.id}`} className="flex flex-col gap-2">
        <div className="pt-6 px-6 flex w-full items-center justify-between space-x-6">
          <div className="w-10 h-10 flex-shrink-0 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" />
          <div className="flex-1 truncate">
            <div className="flex items-center space-x-3">
              <h3 className="truncate text-lg font-medium text-zinc-900">
                {file.name}
              </h3>
            </div>
          </div>
        </div>
      </Link>
      <div className="px-6 mt-4 grid grid-cols-3 place-items-center py-2 gap-6 text-xs text-zinc-500">
        <div className="flex items-center gap-2">
          <Plus className="w-4 h-4" />
          {format(new Date(file.createdAt), 'MMM yyyy')}
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4" />
          mocked
        </div>
        <Button
          size="sm"
          variant="destructive"
          className="w-full"
          disabled={isPending}
          onClick={() => deleteFile({ id: file.id })}
        >
          {isPending ? (
            <Loader2 className="w-4- h-4 animate-spin"></Loader2>
          ) : (
            <TrashIcon className="w-4 h-4" />
          )}
        </Button>
      </div>
    </li>
  );
};

export default FileCard;
