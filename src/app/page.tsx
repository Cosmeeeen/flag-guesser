import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChangingFlag } from '@/components/changing-flag';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen max-w-md mx-auto">
      <ChangingFlag className='text-9xl' />
      <h1>Hello world</h1>
      <Button>Test Button</Button>
      <Input placeholder="Test Input" />
    </div>
  );
}
