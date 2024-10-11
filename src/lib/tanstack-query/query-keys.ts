/**
 * Add all new keys to the QueryKeys Object
 */

export const queryKeys = {
  students: (search?: string) => (search ? ["students", search] : ["students"]),
  student: (id: string) => ["student", id],
};
