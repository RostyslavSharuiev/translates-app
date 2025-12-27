import { translates } from "@/app/translates";

const { en, uk } = translates;

/**
 * type ExtractParam recursively extracts parameter names from a string
 * Example: "Hello {name}, welcome to {place}" -> "name" | "place"
 */
type ExtractParam<T extends string> =
  T extends `${string}{${infer Param}}${infer Rest}`
    ? Param | ExtractParam<Rest>
    : never;

/**
 * Constructs a parameter object from a translation string.
 * If no parameters are found, returns an empty object.
 * Example: "Hello {name}" -> { name: string | number }
 */
type ParamsObject<T extends string> = [ExtractParam<T>] extends [never]
  ? {}
  : Record<ExtractParam<T>, string | number>;

/**
 * Adds a dot-prefixed namespace to a key.
 * Example: DotPrefix<'hello', 'common'> -> 'common.hello'
 */
type DotPrefix<T extends string, P extends string> = `${P}.${T}`;

/**
 * Recursively extracts all translation keys and their parameter types
 * from a nested translation object.
 *
 * If the value is a string, returns an object with `key` and `params`.
 * If the value is an object, recurses into it and prefixes keys.
 */
export type TranslationKeys<T, P extends string = ""> = {
  [K in keyof T]: T[K] extends string
    ? P extends ""
      ? { key: K; params: ParamsObject<T[K]> }
      : { key: DotPrefix<K & string, P>; params: ParamsObject<T[K]> }
    : T[K] extends Record<string, any>
    ? P extends ""
      ? TranslationKeys<T[K], K & string>
      : TranslationKeys<T[K], DotPrefix<K & string, P>>
    : never;
}[keyof T];

/**
 * Union of all translation namespaces from the `messages` object.
 */
const messages = { en: {} as typeof en, uk: {} as typeof uk };

type AllTranslations = (typeof messages)[keyof typeof messages];

/**
 * All translation keys with their associated parameter types.
 */
type KeysWithParams = TranslationKeys<AllTranslations>;

/**
 * Union of all valid translation keys.
 * Example: 'common.hello' | 'errors.required'
 */
export type I18nKeys = KeysWithParams["key"];

/**
 * Extracts the parameter type for a given translation key.
 * Example: I18nParams<'common.hello'> -> { name: string | number }
 */
export type I18nParams<K extends I18nKeys> = Extract<
  KeysWithParams,
  { key: K }
>["params"];

/**
 * Type-safe translation function signature.
 * Accepts a key and optional parameters, returns a localized string.
 */
export type TT = <K extends I18nKeys>(key: K, params?: I18nParams<K>) => string;
