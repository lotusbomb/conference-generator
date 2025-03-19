import React, { useState } from 'react'
import Ticket from '../props/Ticket'
import Attendee from '../props/Attendee'
import Confirmation from '../props/Confirmation'

const Hero = () => {

  //to track which page we are currently in
  const [page, setPage] = useState(0)

  const [formData, setFormData] = useState({
    id: "",
    price: "",
    type: "",
    available: "",
    ticketQuantity: 1,
    name: "",
    email: "",
    about: "",
    avatar: "",
  })

  //to track the titles
  const FormTitles = ["Ticket Selection", "Attendee Details", "Ready"]

  //to track the step change 
  const StepChange = ["Step 1/3", "Step 2/3", "Step 3/3"]


  //to display body of the respective pages
  const PageDisplay = () => {
    if (page === 0){
      return <Ticket formData={formData} setFormData={setFormData} page={page} setPage={setPage} />
    } else if (page === 1) {
      return <Attendee formData={formData} setFormData={setFormData} page={page} setPage={setPage}/>
    } else{
      return <Confirmation formData={formData} setFormData={setFormData} page={page} setPage={setPage}/>
    }
  }
  return (
    <section className=''>
      <div class="max-w-3xl w-full mt-5 rounded-3xl  border-[#197686] border-1 md:mx-auto overflow-hidden z-10">

        <div className='p-8'>
          <div className="md:flex justify-between block">
            <p className='text-white text-2xl font-display'>{FormTitles[page]}</p>
            <p className='text-white'>{StepChange[page]}</p>
          </div>

            <div className="w-full h-2 rounded-full relative overflow-hidden mt-4 bg-[#07373F]">
              <div className='bg-[#197686] w-[33.3%] h-[100%] absolute' style={{width: page === 0 ? "33.3%" : page === 1 ? "66.6%" : "100%"}}></div>
              </div>
            </div>
        
        <div className="form-container">
          <div className="body">
            {PageDisplay()}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero