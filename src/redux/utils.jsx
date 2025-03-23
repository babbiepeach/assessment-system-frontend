export const LOCAL_STORAGE_TOKEN = 'sclearn-store';

// system user roles
export const ROLE_STUDENT = 'student';
export const ROLE_LECTURER = 'teacher';

export const roleList = [
    {
        id: 'teacher',
        value: 'Lecturer',
    },
    {
        id: 'student',
        value: 'Student',
    }
];

export const assignmentTypes = [
    {
        id: 'MCQ',
        value: 'Multiple Choice Question',
    },
    { 
        id: 'SHORT_ANSWER',
        value: 'Short Answer',
    },
    {
        id: 'ESSAY',
        value: 'Essay',
    },
    {
        id: 'CODE',
        value: 'Code',
    },
    {
        id: 'GENERAL',
        value: 'General',
    },
];

export const getInitials = (name) => {
    if (!name) return "EA";

    const nameParts = name.split(" ").filter(part => part.trim() !== ""); // Remove empty strings
    const firstNameInitial = nameParts[0] ? nameParts[0][0] : "E";
    const lastNameInitial = nameParts.length > 1 ? nameParts[nameParts.length - 1][0] : "A"; // Get last valid word

    return `${firstNameInitial}${lastNameInitial}`.toLocaleUpperCase();
};