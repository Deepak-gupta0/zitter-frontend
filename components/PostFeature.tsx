import { ImagePlus } from 'lucide-react'

const PostFeature = () => {
  return (
    <div className='flex justify-end items-center gap-5'>
      <div className='relative cursor-pointer' title='choose file'>
        <ImagePlus height={19} className=' text-red-400 cursor-pointer'/>
        <input type="file" className='absolute border w-4 h-4 top-0 left-1 opacity-0 cursor-pointer' />
      </div>
      <div className='bg-gray-500 text-black py-2 px-4 font-bold rounded-3xl '>Post</div>
    </div>
  )
}

export default PostFeature;