import { IResponseData } from "../data";
import { IOutgoingEvent } from "../../event";

export type Formatter = (data?: IResponseData) => IOutgoingEvent;