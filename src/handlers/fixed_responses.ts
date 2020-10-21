import { responses } from "../data";
import { sampleOne } from "../utils";

export function randomResponse(key: keyof typeof responses): string[] {
  return responses[key].map(line => line.map(it => sampleOne(it)).join(""))
}
