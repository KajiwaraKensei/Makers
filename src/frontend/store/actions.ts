type Unwrap<T> = T extends { [K in keyof T]: infer U } ? U : never;
type ReturnTypes<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any
    ? ReturnType<T[K]>
    : never;
};
export type CreatorsToActions<T> = Unwrap<ReturnTypes<T>>;

// ______________________________________________________
//

export type Actions =
  | CreatorsToActions<typeof import("./template/actions")>
  | CreatorsToActions<typeof import("./questions/actions")>
  | CreatorsToActions<typeof import("./loading/actions")>
  | CreatorsToActions<typeof import("./account/actions")>
  | CreatorsToActions<typeof import("./search/actions")>
  | CreatorsToActions<typeof import("./window/actions")>;
