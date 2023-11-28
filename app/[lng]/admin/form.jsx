"use client"
import Image from 'next/image'
import { useState, useEffect } from 'react'
// import { ArrowLeft } from 'lucide-react'
import SideImg from '../../../public/assets/admin/side.png'
import SideMobileImg from '../../../public/assets/admin/sideMobile.png'
import handler from '../../api/submit'
import { storage } from '../../api/firebase.config'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

const Form =  ({lng = 'en', ok = false}) => {
  const [form, setForm] = useState({ topic: '', arTopic: '', title: '', arTitle: '', conclusion: '', arConclusion: '', subTitle: '', arSubTitle: '', desc: '', arDesc: '' })
  const [fileUploaded, setFileUploaded] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const submitForm = async (e) => {
    e.preventDefault();
    
    if ( form.topic !== '' && form.arTopic !== '' && form.title !== '' && form.arTitle !== '' && form.conclusion !== '' && 
    form.arConclusion != '' && form.subTitle !== '' && form.arSubTitle !== '' && form.desc !== '' && form.arDesc !== '' && fileUploaded !== null) {
      
      setIsLoading(true)
      try{
        await uploadImgs()
      }catch(e){
        alert('error')
      }
      setIsLoading(false)
      setFileUploaded(null)
      setForm({ topic: '', arTopic: '', title: '', arTitle: '', conclusion: '', arConclusion: '', subTitle: '', arSubTitle: '', desc: '', arDesc: '' })
     
    }else{
      alert('please fill all the fields')
    }
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const uploadImgs =async() =>{
    if(fileUploaded !== null){
      const fileRef = ref(storage, 'images/' + fileUploaded[0].name )
      uploadBytes(fileRef, fileUploaded[0]).then(async data=>{
        await getDownloadURL(data.ref).then(async url=>{
          const today = new Date();
          const yyyy = today.getFullYear();
          let mm = today.getMonth() + 1; // Months start at 0!
          let dd = today.getDate();
          if (dd < 10) dd = '0' + dd; if (mm < 10) mm = '0' + mm;
          const createdDate = dd + '/' + mm + '/' + yyyy;

          const newRow = {
            topic: form.topic, arTopic: form.arTopic, title: form.title, arTitle: form.arTitle, conclusion: form.conclusion, createdDate,
            arConclusion: form.arConclusion, subTitle: form.subTitle, arSubTitle: form.arSubTitle, desc: form.desc, arDesc: form.arDesc,
            photo: url
          };
          await handler(newRow)
          setForm({ topic: '', arTopic: '', title: '', arTitle: '', conclusion: '', arConclusion: '', subTitle: '', arSubTitle: '', desc: '', arDesc: '' })
          setFileUploaded(null)
          setIsLoading(false)
          alert('send successful')
        })
      })
    }else{
      alert('Please upload an image')
    }
  }
  
  

  return <main className='flex items-center justify-center flex-wrap bg-white relative w-full p-8 max-sm:p-4 gap-5' style={ok? {}: {display: 'none'}}>

    <div className="w-1/4 max-lg:hidden max-h-[75svh] overflow-hidden rounded-3xl">
      <Image src={SideImg} alt='farawla logo' className='w-full h-full object-contain -mt-12'/>
    </div>
    <div className="w-full hidden max-lg:block">
      <Image src={SideMobileImg} alt='farawla logo' className='w-full h-full'/>
    </div>
    <form className="w-1/2 h-fit max-lg:w-full max-sm:w-full bg-[#ff00220d] rounded-3xl text-gray-800 min-h-[75svh] flex flex-col items-center justify-center" 
    onSubmit={submitForm}>
      <p className="text-4xl text-center max-w-sm w-full py-4">{lng === "ar"? "اضافة مدونة جديدة": "Add New Blog"}</p>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5 w-full">
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="topic" className="block mb-2 text-sm font-medium">{lng === "ar"? "المجال بالانكليزية":"English Topic"}</label>
          <input type="text" id="topic" name="topic" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="technology" 
          value={form.topic || ''} onChange={e=>handleChange(e)} required />
        </div>
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="arTopic" className="block mb-2 text-sm font-medium">{lng === "ar"? "المجال بالعربية":"Arabic Topic"}</label>
          <input type="text" id="arTopic" name="arTopic" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="تكنولوجيا" 
          value={form.arTopic || ''} onChange={e=>handleChange(e)} required />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5 w-full">
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="title" className="block mb-2 text-sm font-medium">{lng === "ar"? "العنوان بالانكليزية":"English Title"}</label>
          <input type="text" id="title" name="title" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.title || ''} onChange={e=>handleChange(e)} required />
        </div>
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="arTitle" className="block mb-2 text-sm font-medium">{lng === "ar"? "العنوان بالعربية":"Arabic Title"}</label>
          <input type="text" id="arTitle" name="arTitle" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.arTitle || ''} onChange={e=>handleChange(e)} required />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5 w-full">
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="subTitle" className="block mb-2 text-sm font-medium">{lng === "ar"? "العنوان الجانبي بالانكليزية":"English ٍSubTitle"}</label>
          <input type="text" id="subTitle" name="subTitle" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.subTitle || ''} onChange={e=>handleChange(e)} required />
        </div>
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="arSubTitle" className="block mb-2 text-sm font-medium">{lng === "ar"? "العنوان الجانبي بالعربية":"Arabic ٍSubTitle"}</label>
          <input type="text" id="arSubTitle" name="arSubTitle" className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.arSubTitle || ''} onChange={e=>handleChange(e)} required />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5 w-full">
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="desc" className="block mb-2 text-sm font-medium">{lng === "ar"? "الوصف بالانكليزية":"English Desc"}</label>
          <textarea type="text" id="desc" name="desc" className="bg-gray-50 resize-y border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.desc || ''} onChange={e=>handleChange(e)} required />
        </div>
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="arDesc" className="block mb-2 text-sm font-medium">{lng === "ar"? "الوصف بالعربية":"Arabic Desc"}</label>
          <textarea type="text" id="arDesc" name="arDesc" className="bg-gray-50 resize-y border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.arDesc || ''} onChange={e=>handleChange(e)} required />
        </div>
      </div>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5 w-full">
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="conclusion" className="block mb-2 text-sm font-medium">{lng === "ar"? "الإستنتاج بالانكليزية":"English Conclusion"}</label>
          <textarea type="text" id="conclusion" name="conclusion" className="bg-gray-50 resize-y border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.conclusion || ''} onChange={e=>handleChange(e)} required />
        </div>
        <div className='w-[45%] max-lg:w-3/4 max-sm:w-11/12'>
          <label htmlFor="arConclusion" className="block mb-2 text-sm font-medium">{lng === "ar"? "الإستنتاج بالعربية":"Arabic Conclusion"}</label>
          <textarea type="text" id="arConclusion" name="arConclusion" className="bg-gray-50 resize-y border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder="" 
          value={form.arConclusion || ''} onChange={e=>handleChange(e)} required />
        </div>
      </div>
      <div className="relative z-0 mb-6 group w-11/12 max-lg:w-3/4 max-sm:w-11/12">
          <label htmlFor="photos" className="block mb-2 text-sm font-medium">{lng === "ar"? "الصورة":"image"}</label>
          <input type="file" name="photos" id="photos"  className="bg-gray-50 resize-y border border-gray-300 text-sm rounded-lg focus:ring-[#FF0020] focus:border-[#FF0020] block w-full p-2.5" placeholder=" " onChange={e=>setFileUploaded(e.target.files)} required />
      </div>
      <button type="submit" disabled={isLoading} className="text-white bg-[#FF0020] hover:bg-[#ff3700] focus:ring-4 focus:outline-none focus:ring-[#ff002247] font-medium rounded-3xl text-sm w-full sm:w-auto px-5 py-2.5 text-center ">{isLoading? (lng === "ar"? "...جار الإرسال":"sending..."):(lng === "ar"? "ارسال":"Submit")}</button>
    </form>

  </main>
}

export default Form