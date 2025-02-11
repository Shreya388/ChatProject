"use client"
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useState } from "react";
import { CiSearch } from "react-icons/ci";
import Sidebar from "./components/sidebar";

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
    <div className="bg-stone-900 h-screen">
      <div className="grid grid-cols-5 gap-96">
        <Sidebar />
        <div className="col-span-3">
          <div className="">
            <div className="w-3/3">
              <p className="text-white text-200 py-10 ">{response}</p>
              <h1 className="text-white text-4xl py-10">{helpText}</h1>
            </div>

            <div className="fixed bottom-0 left-0 right-0 bg-stone-900 z-20">
              <form className="flex justify-center items-center ml-52" onSubmit={handleSubmit}>
                <input
                  className="py-6 px-8 bg-stone-800 text-white w-3/5 my-4 rounded-xl"
                  value={search}
                  onChange={handleInput}
                  type="text"
                  placeholder="Ask Me Something"
                />
                <button
                  type="submit"
                  name="search"
                  className="py-4 bg-stone-700 text-white px-6 flex items-center justify-center rounded-xl ml-2"
                >
                  <CiSearch size="40" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
