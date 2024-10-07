import Image from "next/image";
import React from "react";

const page = async () => {
  let memeData = await fetch('https://api.imgflip.com/get_memes')
  let responce = await memeData.json()
  console.log(responce.data.memes);
  interface data {
    url: string
    id: string
    box_count: number
  }

  return (
    <React.Fragment>
      <div>
        <div className="flex flex-wrap gap-5 items-center justify-center">{responce.data.memes.map((item: data, index: number) => (
          <Image key={index} src={item.url} width={200} height={200} alt='img' />
        ))}</div>
      </div>
    </React.Fragment>
  );
}
export default page

// https://api.imgflip.com/get_memes



// import Link from 'next/link';
// import React from 'react'

// interface Users {
//     name: string;
//     username: string;
//     id: number
// }

// const Product = async () => {
//     const data = await fetch('https://jsonplaceholder.typicode.com/users')
//     const response = await data.json()
//     console.log(response)
//   return (
//     <>
//     <div>Product</div>
//     <div className='flex justify-center gap-5 flex-wrap'>
//     {response.map((item: Users)=>{
//         return <div className='p-5 border border-red-500 rounded'>
//             <h1 key={item.id}>{item.name} {item.username}</h1>
//             <button className='btn btn-primary btn-xs'><Link href={`product/${item.id}`}>single user</Link></button>
//         </div>
//     })}
//     </div>
//     </>
//   )
// }

// export default Product




