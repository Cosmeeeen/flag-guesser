import * as React from 'react';

import { ChangingFlag } from '@/components/changing-flag';

import { PlaySettings } from './play-settings';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center max-w-md mx-auto mt-32 gap-4 px-4">
      <h1 className="text-3xl font-medium">Flag Guesser</h1>
      <ChangingFlag className='text-9xl' />
      <p className="text-center">Guess what country the flag belongs to and get an interesting fact about the country!</p>
      <PlaySettings />
    </div>
  );
}
