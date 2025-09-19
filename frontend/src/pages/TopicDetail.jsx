import React from "react";
import { useParams, Link } from "react-router-dom";

const topicDetails = {
  basics: {
    title: "Basics",
    content: (
      <>
        <p>Understand time complexity, recursion, sorting algorithms like bubble sort, merge sort, etc.</p>
        <pre>{`// Example: Bubble Sort
function bubbleSort(arr) {
  for(let i=0; i<arr.length; i++) {
    for(let j=0; j<arr.length - i - 1; j++) {
      if(arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  }
}`}</pre>
      </>
    ),
  },
  sorting: {
    title: "Sorting",
    content: (
      <>
        <p>Sorting algorithms like quicksort, heapsort, counting sort, and their complexities.</p>
      </>
    ),
  },
  arrays: {
    title: "Arrays",
    content: (
      <>
        <p>Array manipulation techniques, two pointers, sliding window, and common problems.</p>
      </>
    ),
  },
};

const TopicDetail = () => {
  const { topicName } = useParams();
  const topic = topicDetails[topicName];

  if (!topic) {
    return <h2 className="text-center text-2xl mt-20">Topic not found.</h2>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6">{topic.title}</h1>
      <div className="prose max-w-none">{topic.content}</div>

      <div className="mt-10 p-4 border rounded bg-yellow-100 text-yellow-800 text-center text-lg">
        Didn&apos;t get the logic?{" "}
        <Link to="/chatbot" className="text-blue-600 underline hover:text-blue-800">
          Ask the chatbot.
        </Link>
      </div>
    </div>
  );
};

export default TopicDetail;
