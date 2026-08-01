import "../config/env"
import { Redis } from "@upstash/redis";
 

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export const NULL_SENTINEL = "__null__";

export async function guardarEnCache(key: string, value: any, ttl?: number) {
  if (typeof ttl !== 'undefined') {
    await redis.set(key, value, { ex: ttl } ) 
  }
  else {
    console.log("Guardando en cache sin TTL: " + key);
    await redis.set(key, value);
  }
}

export async function obtenerDeCache(key: string) {
  const value = await redis.get(key); //SI NO LO ENCUENTRA, VALUE ES null
  console.log("Obteniendo de cache: " + key + " => " + value);
  if (value === NULL_SENTINEL) {
    throw new Error("Null Sentinel value found in cache for key: " + key);
  }
  return value;
}