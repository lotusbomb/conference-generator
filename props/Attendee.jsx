import React, { useState } from 'react'
import { IoCloudDownloadOutline } from "react-icons/io5";
import Axios from 'axios';
import Cloud from "/images/cloud-download.svg"
import Envelope from "/images/envelope.svg"

const Attendee = ({formData, setFormData, page, setPage }) => {

  const FormTitles = ["Ticket Selection", "Attendee Details", "Ready"]
  const [errors, setErrors] = useState({});

  const [imageSelected, setImageSelected] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const uploadImage = () => {
    if(!imageSelected) return;

    const fileData = new FormData()
    fileData.append("file", imageSelected)
    fileData.append("upload_preset", "precious11")

    Axios.post("https://api.cloudinary.com/v1_1/dxobapn0s/image/upload", fileData)
    .then((response) => {
      const imageUrl = response.data.secure_url
      setFormData((prev) => ({...prev, avatar: imageUrl}))
      console.log("Image uploaded: ", imageUrl)
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (file) {
      setImageSelected(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }
  
  return (
    <section>
      <div className="rounded-3xl max-w-2xl w-full mt-5 p-6 border-[#0E464F] border-2 mx-auto overflow-hidden z-10">
        <div className="border-[#07373F] border-2 mt-1 rounded-2xl p-4">
          <p className="text-white">Upload Profile Photo</p>
          <div className="flex items-center justify-center w-full mt-4">
            <label 
              className="text-white border-none bg-[#0E464F] text-sm md:text-base rounded-2xl m-3 h-[200px] w-[200px] flex flex-col items-center justify-center cursor-pointer"
              htmlFor='fileInput'
            >
              {imagePreview ? (
                <img src={imagePreview} alt="chosen" className='w-full h-full object-cover rounded-2xl'/>
              ) : (
                formData.avatar ? (
                  <img src={formData.avatar} alt="avatar" className='w-full h-full object-cover rounded-2xl'/>
                ) : (
                  <>
                    <img src={Cloud} alt="Profile" className="w-8 h-8" />
                    <p className="text-center text-sm p-2">Drag & drop or click to upload</p>
                  </>
                )
              )}
            </label>
            
            <input type="file" id="fileInput" accept="image/*" className='hidden'
              onChange={handleImageChange}
            />
          </div>
          {errors.avatar && <p className="text-red-500">{errors.avatar}</p>}
        </div>

        <div className="border-2 border-[#07373F] mt-8"></div>

        <form className="flex flex-col mt-4 text-white">
          <label htmlFor="name" className="mt-4 text-sm">
            Enter your name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            className="border-2 border-[#07373F] rounded-lg mt-3 h-12 p-2 focus:border-[#197686] outline-none"
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
          {errors.name && <p className="text-red-500">{errors.name}</p>}

          <label htmlFor="email" className="mt-4 text-sm">
            Enter your email *
          </label>
          <div className='flex items-center border-2 border-[#07373F] rounded-lg mt-3 h-12 p-2 focus-within:border-[#197686]'>
          <img src={Envelope} alt= "envelope" className='mr-2 w-5'/>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            placeholder='hello@avioflagos.io'
            className="bml-2 flex-1 bg-transparent text-white outline-none"
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
          </div>
          {errors.email && <p className="text-red-500">{errors.email}</p>}

          <label htmlFor="about" className="mt-4 text-sm">
            Special request?
          </label>
          <textarea
            id="about"
            name="about"
            value={formData.about}
            placeholder="Textarea"
            className="border-2 border-[#07373F] rounded-lg mt-3 p-2 resize-none min-h-[100px] focus:border-[#197686] outline-none"
            onChange={(e) => setFormData({...formData, about: e.target.value})}
          />
          {errors.about && <p className="text-red-500">{errors.about}</p>}
        </form>

        <div className="mt-9 items-center text-center md:flex gap-5 grid">
          <button className="border-[#197686] border-2 w-full font-display text-sm md:text-[17px] capitalize p-2 rounded-lg text-white hover:bg-[#197686] hover:cursor-pointer"
              onClick={() => {
                setPage((currentPage) => currentPage - 1)
              }}
            >
              Back
            </button>

            <button
              className="border-[#197686] border-2 font-display w-full text-sm md:text-[17px] capitalize text-white rounded-lg p-2 hover:bg-[#197686] hover:cursor-pointer"
              disabled={page === FormTitles.length-1}
              onClick={ async () => {
                let newErrors = {}
                if(!formData.email) {
                  newErrors.email = "Email is required"
                }
                if(!formData.name) {
                  newErrors.name = "Select a name"
                }
                if(!formData.about) {
                  newErrors.about = "Write something joor!"
                }
                if(!imageSelected) {
                  newErrors.avatar =  "Image upload failed. Try again."
                }

                setErrors(newErrors)

                if(Object.keys(newErrors).length === 0) {
                  if(imageSelected) {
                    await uploadImage()
                  }
                  console.log("Form Data Submitted: ", formData)
                  setPage((currentPage) => currentPage + 1)
                }
              }
                }
            >
              Get My Free Ticket
            </button>
        </div> 
      </div>
    </section>
  )
}

export default Attendee