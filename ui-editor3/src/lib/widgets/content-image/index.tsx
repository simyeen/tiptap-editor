import React from 'react';

import Component from './component';

interface ContentImageProps {
  node: any;
}

//TODO: node의 타입이 어떤건지 못찾겠음 -> 찾으면 추가하기
export default function ContentImage({node}: ContentImageProps) {
  return <Component node={node} />;
}
