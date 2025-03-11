import React from "react";
import data from "/src/Pages/Data/data.json"; // Import the entire JSON file

const StudentAssignment = () => {
    const assignments = data.assignments; // Extract only assignments

    return (
        <div className="bg-white rounded-xl h-[100%] w-[100%] font-poppins px-9 py-6">
            <div className="w-full flex flex-col gap-4">
                {assignments.map((assignment) => (
                    <div key={assignment.id} className="bg-white p-3 rounded-xl border border-black">
                        <h3 className="text-lg font-semibold text-gray-900">{assignment.title}</h3>
                        <p className="text-sm text-gray-500">{assignment.date}</p>
                        <p className="text-gray-700 pt-1">{assignment.description}</p>
                        <ol className="list-decimal pl-5 pt-1 text-gray-800">
                            {assignment.topics.map((topic, index) => (
                                <li key={index}>{topic}</li>
                            ))}
                        </ol>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudentAssignment;
