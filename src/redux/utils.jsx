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

    const [firstName, lastName] = name.split(" ").map(part => part.trim());

    const firstNameInitial = firstName ? firstName[0] : "E";
    const lastNameInitial = lastName ? lastName[0] : "A";

    return `${firstNameInitial}${lastNameInitial}`;
};