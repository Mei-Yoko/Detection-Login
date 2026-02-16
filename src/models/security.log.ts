import mongoose,{Schema} from "mongoose";
import { ISecurityLog, SecurityEventType } from "../types";

const SecurityLogSchema = new Schema <ISecurityLog>()