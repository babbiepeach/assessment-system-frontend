export const LOCAL_STORAGE_TOKEN = 'sclearn-store';

// role
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

export const getInitials = (name) => {
    if (!name) return "EA";

    const [firstName, lastName] = name.split(" ").map(part => part.trim());

    const firstNameInitial = firstName ? firstName[0] : "E";
    const lastNameInitial = lastName ? lastName[0] : "A";

    return `${firstNameInitial}${lastNameInitial}`;
}