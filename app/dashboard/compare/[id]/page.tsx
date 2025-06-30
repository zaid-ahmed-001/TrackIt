import React from 'react'
import Content from './Components/Content'

const page = ({ params }: { params: { id: string } }) => {
  const reportId = params.id;
  return (
    <div className='w-full h-full flex flex-col lg:flex-row'>
      <Content id={reportId} />
    </div>
  )
}

export default page