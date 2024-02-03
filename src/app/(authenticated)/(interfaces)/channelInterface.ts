import { type } from "os";
import { User } from "./userInterface";
export interface Channel {
  id: number;
  createdAt: Date;
  title: string;
  description: string | null;
  members: User[];
  admins: User[];
  access: string;
  type: string;
  ownerLogin: string;
  bannedUsers: string[];
}
