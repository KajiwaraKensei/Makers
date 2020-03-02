import types from "./types";
import { selfMadeTemplate } from ".";
// ______________________________________________________
//

export const userLogin = (userName: string = "") => ({
  type: types.userLogin,
  payload: { userName }
});

// ______________________________________________________
//

export const userLogout = () => ({
  type: types.userLogout
});

// ______________________________________________________
//

export const setSelfMadeTemplates = (
  selfMadeTemplates: selfMadeTemplate[]
) => ({
  type: types.setSelfMadeTemplates,
  payload: { selfMadeTemplates }
});
