import { useState } from 'react';

export function useDesigner() {
  const [width, setWidth] = useState(1100);
  const [height, setHeight] = useState(700);

  return { width, height, setWidth, setHeight };
}
