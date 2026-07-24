import "../config/env"
import { Redis } from "@upstash/redis";
 

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const NULL_SENTINEL = "__null__";