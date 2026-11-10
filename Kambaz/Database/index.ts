import courses from "./courses.json";
import modules from "./modules.json";
import assignments from "./assignments.json";
import users from "./users.json";
import enrollments from "./enrollments.json";

// One shared in-memory "database". Every DAO receives this same object, so
// DAOs must write back through db.xxx (not a local copy) for the others to see changes.
export default { courses, modules, assignments, users, enrollments };
