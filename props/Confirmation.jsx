import React, { useState } from 'react'
import Ticket from "/images/TICKET.svg"

const Confirmation = ({ page, setPage, formData }) => {

  const FormTitles = ["Ticket Selection", "Attendee Details", "Ready"]

  const  [errors, setErrors] = useState({})

  return (
    <section>
      <div className='rounded-3xl max-w-2xl w-full mx-auto overflow-hidden z-10'>
        <h1 className='text-3xl font-bold text-center text-white'>Your Ticket is Booked!</h1>
        <p className='mt-5 text-xl text-center text-white'>You can download or Check your email for a copy</p>

        <div className='flex flex-col items-center justify-between gap-[20px]  m-auto p-[20px] rounded'>
          <img src={Ticket} alt="ticket" className=''/>

          <div className='h-[448px] w-[260px] p-[14px] absolute rounded-2xl flex flex-col gap-[20px] mt-5'>
            <p className="text-[34px] font-game text-center leading-none text-white">
                Techember Fest ”25
              </p>
            <p className="flex flex-col items-center p-1 gap-1 text-[10px] text-white">
              <span>📍 04 Rumens road, Ikoyi, Lagos</span>
              <span>📅 March 15, 2025 | 7:00 PM</span>
            </p>

            <div className='mx-auto rounded-2xl bg-[#0E464F] border-[#0E464F]'>
              {formData.avatar && (
                <img src={formData.avatar || "/images/avatar.jpg"} alt="avatar" className='object-cover h-[150px] w-[150px] rounded-2xl' />
              )}
            </div>

            <div className='border-[#07373F] border-2 rounded-lg'>
              <div className='grid grid-cols-2 p-1'>
                <div className='leading-[2] border-b border-r border-gray-600'>
                  <p className='font-thin text-gray-500 text-[10px]'>Enter your name</p>
                  <p className='font-bold text-[10px] text-white'>{formData?.name}</p>
                </div>

                <div className='leading-[2] border-b border-gray-600'>
                  <p className=' ml-2 font-thin text-gray-500 text-[10px]'>Enter your email *</p>
                  <p className='ml-2 font-bold text-[9px] text-white'>{formData?.email}</p>
                </div>

                <div className='leading-[2] border-r border-b border-gray-600'>
                  <p className='font-thin text-gray-500 text-[10px]'>Ticket Type:</p>
                  <p className='font-bold text-[10px] text-white'>{formData?.type}</p>
                </div>

                <div className='leading-[2] border-b border-gray-600'>
                  <p className='font-thin text-gray-500 text-[10px] ml-2'>Ticket for:</p>
                  <p className='font-bold text-[10px] ml-2 text-white'>{formData?.ticketQuantity}</p>
                </div>
              </div>

              <div className='ml-1'>
                <p className='font-thin text-[10px] text-gray-500'>Special request?</p>
                <p className='text-[9px] text-white py-1'>{formData?.about}</p>
              </div>
            </div>

          </div>

          
          <img src="/images/BarCode.png" alt="barcode" className='absolute mt-[32rem]'/>

        </div>


        <div className="mt-9 items-center text-center md:flex gap-5 grid">
          <button className="border-[#197686] border-2 w-full font-display text-sm md:text-[17px] capitalize p-2 rounded-lg text-white hover:bg-[#197686] hover:cursor-pointer"
              // disabled={page === 0}
              onClick={() => {
                setPage((currentPage) => currentPage - 1)
              }}
            >
              Book Another Ticket
            </button>
            <button
              className="border-[#197686] border-2 font-display w-full text-sm md:text-[17px] capitalize text-white rounded-lg p-2 hover:bg-[#197686] hover:cursor-pointer"
              disabled={page === FormTitles.length-1}
              onClick={() => {
                if (!formData.id) {
                  setErrors({ ticket: "Please select a ticket" })
                  return;
                }
                setPage((currentPage) => currentPage + 1)
              }}
            >
              Download Ticket
            </button>
        </div>
      </div>
    </section>
  )
}

export default Confirmation