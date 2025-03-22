// src/store/ClassStore.js
const ClassStore = {
  classes: {},

  addClass(code, className) {
    this.classes[code] = { className, students: [] };
  },

  getClass(code) {
    return this.classes[code];
  },

  joinClass(code, student) {
    if (this.classes[code]) {
      this.classes[code].students.push(student);
      return true;
    }
    return false;
  },

  getAllClasses() {
    return this.classes;
  },
};

export default ClassStore;
