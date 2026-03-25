import React, { useState } from "react";
import axios from "axios";
import ReactMarkDown from "react-markdown";

const App = () => {
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false); // ✅ new state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // start loading

    axios
      .post(`http://localhost:4002/ask`, { question })
      .then((res) => res.data)
      .then((finalRes) => {
        if (finalRes._status) {
          setData(finalRes._data);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // stop loading
  };

  return (
    <>
      <h1 className="text-center font-bold text-3xl my-6">
        Grok Chatbot App
      </h1>

      <div className="max-w-[1320px] mx-auto grid grid-cols-[30%_1fr] gap-8 p-5">
        
        {/* Left */}
        <form
          onSubmit={handleSubmit}
          className="shadow-lg p-4 border border-gray-100 rounded-lg"
        >
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask me anything..."
            className="w-full h-[200px] p-3 border border-gray-300 rounded-md"
          />
          <button className="bg-black text-white py-2 w-full mt-3">
            Create Content
          </button>
        </form>

        {/* Right */}
        <div className="border-l border-gray-300 pl-8 w-full h-[500px] overflow-y-auto">
          <h2 className="font-semibold mb-4 text-gray-500">Result:</h2>

          <div className="prose max-w-none text-left">
            {loading ? (
              <p>Loading...</p>   // ✅ simple text instead of spinner
            ) : (
              <ReactMarkDown>{data}</ReactMarkDown>
            )}
          </div>
        </div>

      </div>
    </>
  );
};

export default App;