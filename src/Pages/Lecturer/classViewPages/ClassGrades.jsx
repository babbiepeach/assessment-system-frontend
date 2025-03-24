import React, { useState } from 'react';

const ClassGrades = () => {
    const [markingGuide, setMarkingGuide] = useState(null);
    const [submissions, setSubmissions] = useState([
        { id: 1, student: 'Alice Johnson', file: 'assignment1.pdf', graded: false, grade: null },
        { id: 2, student: 'Bob Smith', file: 'assignment2.pdf', graded: false, grade: null },
    ]);
    const [graded, setGraded] = useState([]);

    const handleMarkingGuideUpload = (e) => {
        const file = e.target.files[0];
        setMarkingGuide(file);
    };

    const handleAutomatedGrading = () => {
        const gradedAssignments = submissions.map((submission) => ({
            ...submission,
            graded: true,
            grade: Math.floor(Math.random() * 41) + 60 // Simulated grade between 60 and 100
        }));
        setGraded(gradedAssignments);
        setSubmissions([]); // Clear ungraded after grading
    };

    const handleSendToStudents = () => {
        // Simulate sending the graded assessments
        alert("Graded assessments sent to students!");

        // Reset everything for next batch
        setGraded([]);
        setMarkingGuide(null);
        // Optionally re-fetch or reset `submissions` if new ones are available.
    };

    return (
        <div className="p-6 mb-12 space-y-8">
            {/* Upload Marking Guide */}
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Upload Marking Guide</h2>
                <input type="file" onChange={handleMarkingGuideUpload} />
                {markingGuide && (
                    <p className="mt-2 text-sm text-gray-600">Uploaded: {markingGuide.name}</p>
                )}
            </div>

            {/* Ungraded Submissions */}
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Ungraded Submissions</h2>
                {submissions.length > 0 ? (
                    <>
                        <ul className="space-y-2">
                            {submissions.map((submission) => (
                                <li key={submission.id} className="flex justify-between items-center border p-2 rounded-lg">
                                    <span>{submission.student} - {submission.file}</span>
                                    <button className="text-blue-600 underline">View</button>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleAutomatedGrading}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                            disabled={!markingGuide}
                        >
                            {markingGuide ? 'Run AI Grading' : 'Upload Marking Guide First'}
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">No pending submissions.</p>
                )}
            </div>

            {/* Divider */}
            <div className="border-t-2 border-dashed"></div>

            {/* Graded Assessments */}
            <div className="bg-white p-4 rounded-xl shadow-md">
                <h2 className="text-xl font-semibold mb-2">Graded Assessments</h2>
                {graded.length > 0 ? (
                    <>
                        <ul className="space-y-2">
                            {graded.map((submission) => (
                                <li key={submission.id} className="flex justify-between items-center border p-2 rounded-lg bg-green-50">
                                    <span>{submission.student} - {submission.file}</span>
                                    <span className="font-bold text-green-700">Grade: {submission.grade}%</span>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={handleSendToStudents}
                            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            Send to Students
                        </button>
                    </>
                ) : (
                    <p className="text-gray-500">No graded assessments yet.</p>
                )}
            </div>
        </div>
    );
};

export default ClassGrades;
