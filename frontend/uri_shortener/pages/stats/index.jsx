import { useState,useEffect } from 'react';
import Head from "next/head";
import { toast } from 'react-toastify';
import apiService from '../../services/api';


const Stats = () => {

    const baseUrl = "http://localhost:8000";
    const [loading,setLoading] = useState(true);
    const [urls,setUrls] = useState({});
    const [info,setInfo] = useState({});
    const [response,setResponse] = useState(false);

    const [hashed,setHashed] = useState("")

    useEffect(()=>{
        apiService.getStats()
        .then((response)=>{
            setUrls(response.data)
            setLoading(false)
        })
    },[])

    const searchHashed = (hashed) => {
        apiService.getStat(hashed)
        .then((response)=>{
            console.log(response)
            setInfo(response.data)
            setResponse(true)
            toast.success("Hashed URL found :D")
        }).catch((error)=>{
            setResponse(false)
            toast.error("Hashed URL not found D:")
        })

    }


    return(
        <div>
            <Head>
            <title>Statistics</title>
            <link rel='icon' href='/favicon.ico' />
            </Head>
        <main>
            <div className='flex flex-col items-center h-auto'> 
                <div className="bg-white divide-y divide-gray-400 h-fit pt-5 mb-3">
                    <table className="table-fixed">
                    <thead className='bg-gray-50'>
                        <tr>
                        <th className="text-s font-medium text-gray-500 tracking-wider">Original URL</th>
                        <th className="text-s font-medium text-gray-500 tracking-wider">Shortened URL</th>
                        <th className="text-s font-medium text-gray-500 tracking-wider">Datetime Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading? 
                            <tr></tr> 
                            :
                            urls.map((url,index)=>{
                                return(
                                    <tr key={index}>
                                        <td className='px-3 py-1' >{url.url}</td>
                                        <td className='px-3 py-1' >{url.shortened_url}</td>
                                        <td className='px-3 py-1' >{url.datetime_created}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    </table>
                </div>
                <div>
                    <p>Search URL by hash</p>
                    <div className="pt-2 relative mx-auto text-gray-600 justify-center ">
                        <input className="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm "
                            name="shorten" placeholder="Hashed URL" type="text" onChange={(e)=>setHashed(e.target.value)} />
                        <button onClick={()=>searchHashed(hashed)} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Search
                        </button>
                    </div>
                    <div className="max-w-md rounded overflow-hidden shadow-lg">
                        {
                            response ? 
                            <div className="w-auto px-6 py-4">
                                <p className="text-gray-700 text-base" >Original Url:  &nbsp; &nbsp; &nbsp; 
                                    <a className='underline decoration-sky-600 hover:decoration-blue-400' target="_blank" rel="noopener noreferrer" href={info['url']}>
                                        {info["url"]}
                                    </a>
                                </p>
                                <p className="text-gray-700 text-base" >Shortened Url: &nbsp; &nbsp;   
                                    <a className='underline decoration-sky-600 hover:decoration-blue-400' target="_blank" rel="noopener noreferrer" href={info.shortened_url}>
                                      {info.shortened_url}
                                    </a>        
                                </p>
                                <p className="text-gray-700 text-base" >Number of Clicks:    {info.number_of_clicks}</p>
                                <p className="text-gray-700 text-base" >Datetime Created:    {info.datetime_created}</p>
                                <p className="text-gray-700 text-base" >Datetime Accessed:   {info.datetime_accessed}</p>
                            </div>
                            :
                            <>
                            </>
                        }
                    </div>
                </div>
            </div>
        </main>
        </div>

    )
}

export default Stats;