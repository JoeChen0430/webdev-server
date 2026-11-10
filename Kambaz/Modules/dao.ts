import { v4 as uuidv4 } from "uuid";

export default function ModulesDao(db) {
  function findModulesForCourse(courseId) {
    const { modules } = db;
    return modules.filter((module) => module.course === courseId);
  }
  function createModule(module) {
    const newModule = { lessons: [], ...module, _id: uuidv4() };
    db.modules = [...db.modules, newModule];
    return newModule;
  }
  function deleteModule(moduleId) {
    const { modules } = db;
    db.modules = modules.filter((module) => module._id !== moduleId);
  }
  function updateModule(moduleId, moduleUpdates) {
    const { modules } = db;
    const module = modules.find((module) => module._id === moduleId);
    if (!module) return undefined;
    Object.assign(module, moduleUpdates, { _id: moduleId });
    return module;
  }
  return { findModulesForCourse, createModule, deleteModule, updateModule };
}
