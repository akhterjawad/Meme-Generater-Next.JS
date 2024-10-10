import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

const page = async () => {
  let memeData = await fetch('https://api.imgflip.com/get_memes');
  let response = await memeData.json();
  console.log(response.data.memes);

  interface Data {
    url: string;
    id: string;
    name: string;
    box_count: number;
  }

  return (
    <React.Fragment>
      <div className="container bg-blue-200 mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {response.data.memes.map((item: Data, index: number) => (
            <div key={item.id} className="flex h-auto flex-col items-center bg-white shadow-md rounded-lg p-4">
              <Image
                src={item.url}
                alt={item.name}
                width={200} // Adjust width based on box_count for variety
                height={200} // Adjust height based on box_count for variety
                className="object-cover rounded-md"
              />
              <Button variant="outlined" className="mt-auto">
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
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default page;
