import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const page = async () => {
  // fetch data
  let memeData = await fetch('https://api.imgflip.com/get_memes');
  let response = await memeData.json();
  console.log(response.data.memes);

  // interface for input data types
  interface Data {
    url: string;
    id: string;
    name: string;
    box_count: number;
  }

  return (
    <React.Fragment>
      <div className="container bg-blue-300 mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {response.data.memes.filter((item: Data) => item.box_count === 2).map((item: Data) => (
            <div key={item.id} className="flex h-auto flex-col items-center bg-white shadow-md rounded-lg p-4">
              <Image
                src={item.url}
                alt={item.name}
                width={200} 
                height={200}
                className="object-cover rounded-md"
              />
              <div className="mt-auto">

                <Button variant="outlined" className="mt-3">
                  <Link href={{
                    pathname: "creatememe",
                    query: {
                      url: item.url,
                      id: item.id
                    }
                  }}>
                    Generate Meme
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default page;
