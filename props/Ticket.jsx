import React, { useState } from 'react'

const Ticket = ({ formData, setFormData, page, setPage }) => {

  //to track the titles
  const FormTitles = ["Ticket Selection", "Attendee Details", "Ready"]

  //to lest errors persist
  const [errors, setErrors] = useState({});

  const ticketOptions = [
    { id: "free", price: "Free", type: "Regular access", available: "20/52" },
    { id: "vip", price: "$50", type: "VIP access", available: "20/52" },
    { id: "regular", price: "$150", type: "VVIP access", available: "20/52" },
  ]

  return (
    <section className='rounded-3xl max-w-2xl w-full my-3 p-5 border-[#0E464F] border-1 mx-auto overflow-hidden z-10 '>
      <div className="border-[#07373F] border-2 mt-1 rounded-2xl">
          <p className="font-game text-[48px] md:text-[62px] text-center text-white">
            Techember Fest &#34;25
          </p>
          <div className="text-center items-center text-white md:leading-[1.9]">
            <p className="font-body text-sm">
              Join us for an unforgettable experience at &nbsp;
              <span className="hidden md:inline">
                <br />
              </span>
              [Event Name]! Secure your spot now.
            </p>
            <p className="mb-5 mt-5 text-sm">
              📍 [Event Location] &nbsp;&nbsp; ||&nbsp;&nbsp;&nbsp; March 15,
              2025 | 7:00PM
            </p>
          </div>
        </div>

        <div className="border-2 border-[#07373F] mt-8"></div>

        <div className="mt-8">
          <p className="text-white">Select Ticket Type:</p>
          <div className="grid md:flex gap-4 items-center p-4 mt-3 w-full">
            {ticketOptions.map((ticket) => (
              <div
                key={ticket.id}
                
                className={`border-2 rounded-xl w-full px-4 py-3 text-white cursor-pointer ${
                  formData.id === ticket.id
                    ? " bg-[#197686] border-[#197686]"
                    : "border-[#197686]"
                }`}
                onClick={() => setFormData({
                  ...formData,
                  id: ticket.id,
                  price: ticket.price,
                  type: ticket.type,
                  available: ticket.available,
                  }) 
                  }
              >
                <h1 className="font-medium text-2xl">{ticket.price}</h1>
                <p className="uppercase text-sm mt-2">{ticket.type}</p>
                <p className="text-[13px]">{ticket.available}</p>
              </div>
            ))}
          </div>
          {errors.ticket && <p className="text-red-500">{errors.ticket}</p>}
        </div>

        <p className="mt-9 text-white">Number of Tickets</p>
        <label>
          <select
            name="numbers"
            className="w-full text-white px-4 py-2 bg-[#052F35] border border-[#07373F] rounded-lg mt-1 focus:border-[#197686] outline-none"
            value={formData.ticketQuantity}
            onChange={(e) => setFormData({ ...formData, ticketQuantity: Number(e.target.value) })}
          >
            {Array.from({ length: 10 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </label>
        {errors.quantity && <p className="text-red-500">{errors.quantity}</p>}

        <div className="mt-9 items-center text-center md:flex gap-5 grid">
          <button className="border-[#197686] border-2 w-full font-display text-sm md:text-[17px] capitalize p-2 rounded-lg text-white hover:bg-[#197686] hover:cursor-pointer"
              disabled={page === 0}
              onClick={() => {
                setPage((currentPage) => currentPage - 1)
              }}
            >
              Cancel
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
              Next
            </button>
        </div> 

    </section>
  )
}

export default Ticket