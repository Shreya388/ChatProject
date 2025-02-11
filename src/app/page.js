"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";

export default function Home() {
  const [response, setResponse] = useState("");
  const [search, setSearch] = useState("");
  const [helpText, setHelpText] = useState("How can I help you ?");

  const ApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(ApiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const fetchData = async () => {
    try {
      const searchResult = await model.generateContent(search);
      const text = await searchResult.response.text;
      setResponse(text);
    } catch {
      console.error("Error", error);
      setResponse("failed to get response");
    }
  };

  function handleSubmit(event) {
    event.preventDefault();
    fetchData();
    setHelpText(null);
  }

  function handleInput(event) {
    setSearch(event.target.value);
  }
  return (
    <div className="bg-stone-900">
      <div className="bg-stone-900 z-10 h-full mx-auto w-full">
        <div className="text-center">
          <div className="py-32 px-96">
            <p className="text-white text-200 gap-y-20">{response}</p>
            <h1 className="text-white text-4xl py-10">{helpText}</h1>
          </div>
        </div>

      </div>
      <div className="bg-stone-900 z-40 fixed bottom-0 right-0 left-0 text-center">
        <form onSubmit={handleSubmit}>
          <input className="py-2 px-8 h-20 bg-stone-800 text-white w-2/5 my-4" value={search} onChange={handleInput} type="text" placeholder="Ask Me Something" />
          <button type="submit" name="search" className="py-2 h-20 bg-stone-700 text-white px-6">Search</button>
        </form>
      </div>
    </div>
  );
}
