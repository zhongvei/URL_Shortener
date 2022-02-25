/* ./pages/index.js               */
import Head from 'next/head';
import { useState } from 'react';
import { toast } from 'react-toastify';
import apiService from '../services/api';

export default function Home() {

  const baseUrl = "http://localhost:8000"

  const [url,SetUrl] = useState("")
  const [info,SetInfo] = useState({})
  const [loading,SetLoading] = useState(true)

  const shorten = (url) => {
    var data = {
      'url': url
    }
    apiService
      .shortenUrl(url)
      .then((response)=>{
        toast.success("Url Shorten Succesfully")
        console.log(response)
        SetInfo(response.data)
        SetLoading(false)
      })
      .catch((response)=>{
        toast.error("FAILED")
      })
  }

  return (
    <div>
      <Head>
        <title>Url Shortener</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='flex justify-center items-center h-[90vh]'>
        <div className="pt-2 relative mx-auto text-gray-600 justify-center ">
          <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm "
             name="shorten" placeholder="Url to Shorten" type="text" onChange={(e)=>SetUrl(e.target.value)} />
        <button onClick={()=>shorten(url)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
          Shorten ME
        </button>
        {
          loading ? 
          <div></div> 
          :
          <div className="max-w-md rounded overflow-hidden shadow-lg">
            <div className="w-auto px-6 py-4">
              <div className="font-bold text-xl mb-2">Shorten Url Details</div>
              <p className="text-gray-700 text-base">
                Original Url: &nbsp;	&nbsp; &nbsp; &nbsp; 
                <a className='underline decoration-sky-600 hover:decoration-blue-400' target="_blank" rel="noopener noreferrer" href={info.data['original_url']}>
                {info.data['original_url']}
                </a>
              </p>
              <p className="text-gray-700 text-base">
                Shortened Url:	&nbsp;	&nbsp;
                <a className='underline decoration-sky-600 hover:decoration-blue-400' target="_blank" rel="noopener noreferrer" href={info.data['shortened_url']}>
                  {info.data['shortened_url']}
                </a>
              </p>
            </div>
          </div>
        }
      </div>
        </div>
      </main>
    </div>
  );
}