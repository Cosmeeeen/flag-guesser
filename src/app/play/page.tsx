import * as React from 'react';
import { Suspense } from 'react';

import { PlayComponent } from './play-component';

export default function Play() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayComponent />
    </Suspense>
  );
}
