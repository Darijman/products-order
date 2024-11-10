'use client';

import './loader.css';

interface Props {
  showLoader: boolean;
}

export const Loader = ({ showLoader }: Props) => {
  return <>{showLoader && <span className='loader'></span>}</>;
};
