import WhatsHappeningList from './WhatsHappeningList'

function WhatsHappening() {
  return (
    <div className='outline outline-gray-200/50 rounded-xl p-3'>
      <div className='my-2'>
      <h1 className='font-bold text-2xl '>What's happening</h1>
      <p className='text-xs text-gray-400'>Trending</p>
      </div>
      <WhatsHappeningList />
    </div>
  )
}

export default WhatsHappening;