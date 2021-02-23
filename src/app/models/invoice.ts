import { Details } from "./details";

export interface Invoice{
  Code: number;
  CliId: number;
  UsrId: number;
  details: Details[];
}
