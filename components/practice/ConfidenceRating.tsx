"use client";

export default function ConfidenceRating({rating, setRating}: {rating: number, setRating: (value: number) => void}) {

  const handleRating = (value: number) => {
    setRating(value);
  };

  return (
    <div className="text-center">
      <div className="flex flex-row gap-4 justify-center items-center mt-4">
        <p>Less confident</p>
        <button
          className={`border border-solid border-gray-200 p-4 ${
            rating === 1 ? "bg-blue-400 text-white font-bold" : ""
          }`}
          onClick={() => handleRating(1)}
        >
          1
        </button>
        <button
          className={`border border-solid border-gray-200 p-4 ${
            rating === 2 ? "bg-blue-400 text-white font-bold" : ""
          }`}
          onClick={() => handleRating(2)}
        >
          2
        </button>
        <button
          className={`border border-solid border-gray-200 p-4 ${
            rating === 3 ? "bg-blue-400 text-white font-bold" : ""
          }`}
          onClick={() => handleRating(3)}
        >
          3
        </button>
        <button
          className={`border border-solid border-gray-200 p-4 ${
            rating === 4 ? "bg-blue-400 text-white font-bold" : ""
          }`}
          onClick={() => handleRating(4)}
        >
          4
        </button>
        <button
          className={`border border-solid border-gray-200 p-4 ${
            rating === 5 ? "bg-blue-400 text-white font-bold" : ""
          }`}
          onClick={() => handleRating(5)}
        >
          5
        </button>
        <p>More confident</p>
      </div>
    </div>
  );
}
