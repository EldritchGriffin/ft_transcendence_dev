"use client";
import React from "react";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// async function getData() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/users');

//     if (!res.ok) {
//       throw new Error('Failed to fetch data');
//     }

//     return res.json();
//   }

//   export default async function Page({ ninjas }) {
//     // Assuming `getData` returns an array of users (ninjas)
//     const data = await getData();

//     return (
//       <main>
//         <div>
//           <h1>All Ninjas</h1>
//           {data.map(ninja => (
//             <a>
//               <h3>{ninja.name}</h3>
//             </a>
//           ))}
//         </div>
//       </main>
//     );
//   }

export default function Example() {
  const [value, setValue] = useState(0);
  useEffect(() => {
    // axios
    //   .get("http://localhost:3001/users/me", { maxRedirects: 5 })
    //   .then((res) => {
    //     setValue(res.data);
    //   });
    try {
      axios
        .get("http://localhost:3001/users/me", {
          maxRedirects: 5,
        })
        .then((res) => {
          console.log(res);
        });
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>Count: {value}</p>
      <button className="btn bg-blue-600" onClick={() => setValue(value + 1)}>
        Increment
      </button>
      <button className="btn bg-blue-600" onClick={() => setValue(value - 1)}>
        Decrement
      </button>
    </div>
  );
}
