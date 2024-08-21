import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import MagneticButton from './MagneticButton'
import NextImage from "next/image";
import romanImage from '/public/studio/static/romanHermens.jpg'

const ComingSoon = () => {
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const contentRef = useRef(null)

  //Image stuff
  const url = romanImage.src;
  const alt = romanImage.alt || ' Roman Hermens';
  // const width = romanImage.metadata.dimensions.width;
  // const height = romanImage.metadata.dimensions.height;

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1.5, ease: 'power4.out' }
    )

     gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 1, ease: 'power4.out' }
    )

    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, delay: 2, ease: 'elastic.out(1, 0.3)' }
    )
  }, [])

  const handleDownload = () => {
    // Replace with your file download link
    const fileUrl = '/path-to-your-file.zip'
    const link = document.createElement('a')
    link.href = fileUrl
    link.setAttribute('download', 'YourFileName.zip') 
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    console.log('done')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white text-center p-4">
      <div className='my-20 rounded-full overflow-hidden h-120 w-120 block'>
      <NextImage
        src={url}
        alt={alt}
        width='1200'
        height='1200'
        />
      </div>
      <h1
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold mb-8"
      >
        Website Coming Soon.
      </h1>
      <div ref={contentRef} className='my-50 font-body text-white max-w-[400px] border-y-2 p-20 border-light-blue'>
        I am currently working on getting my website back up and updated. In the meantime, take a look at my resume.
      </div>
      <div 
        ref={buttonRef} 
        className='w-[400px] flex justify-center my-40 hover:text-red'>
        <MagneticButton
          resetToCenter={true}
          className='w-[400px]'
          >
          <button className='apperance-none' onClick={handleDownload}>Download Resume</button>
        </MagneticButton>
      </div>
    </div>
  )
}

export default ComingSoon
