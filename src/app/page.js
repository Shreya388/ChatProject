"use client"
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function Home() {
  const [response, setResponse] = useState("");
  const [search, setSearch] = useState("");
  useEffect(() => {
    async function fetchData() {
      const API = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(API);
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      try {
        const result = await model.generateContent(search);
        const text = await result.response.text("");
        setResponse(text);
      } catch (error) {
        console.error("I got an error while fetching the AI data", error);
      }
    }
    fetchData();
  }, [search]);

  //for the form to work
  function handleSubmit(event) {
    event.preventDefault();
    const search = event.target.search.value;
    console.log('Search:', search);
    setSearch(`you searched for: ${search}`);
  }

  return (
    <div className="bg-stone-900 h-screen mx-auto fixed w-full">
      <div className="text-center">
        <div className="py-32 px-32">
          <p className="text-white text-200 gap-y-20">{response}</p>
        </div>
        <div className="py-20 relative">
          <h1 className="text-white text-4xl py-10">How can I help you ?</h1>
          <form onSubmit={handleSubmit}>
            <input className="py-2 px-8 h-20 bg-stone-800 text-white w-2/5 my-4" type="text" name="search" placeholder="Ask Me Something" />
            <button type="submit" className="py-2 h-20 bg-stone-700 text-white  px-6">Search</button>
          </form>
        </div>
      </div>
    </div>
  );
}
