import { Ghost } from 'lucide-react';
import React from 'react';

const EmptyFiles = () => {
  return (
    <div>
      <p className="mt-16 flex flex-col items-center gap-2">
        <Ghost className="w-8 h-8 text-zinc-800" />
        <h3 className="font-semibold text-xl">Pretty empty around here</h3>
        <p className="prose">Let&apos; upload your first PDF</p>
      </p>
    </div>
  );
};

export default EmptyFiles;
