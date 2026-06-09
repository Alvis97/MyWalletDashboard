import { resolveUrl } from '@/utils/resolveUrl';
import React, { useState } from 'react'

function ImageWithSkeleton({ src }: { src: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div>
      { !loaded && (
        <div className='animate-pulse bg-neutral-300 h-[200px] w-[220px] rounded-xs'></div>
      )}
      <img 
      src={resolveUrl(src)}
      className={`h-[200px] w-[220px] rounded-xs object-cover ${loaded ? 'block' : 'hidden'}`}
      alt="NFT image"
      onLoad={() => setLoaded(true)}
      onError={(e) => {
        e.currentTarget.src = '/placeholder.png'
        e.currentTarget.onerror = null
        setLoaded(true)
      }}
    />  
    </div>
  )
}

export default ImageWithSkeleton