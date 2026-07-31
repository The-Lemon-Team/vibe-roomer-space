
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Vibe
 * 
 */
export type Vibe = $Result.DefaultSelection<Prisma.$VibePayload>
/**
 * Model VibeUpdate
 * 
 */
export type VibeUpdate = $Result.DefaultSelection<Prisma.$VibeUpdatePayload>
/**
 * Model Hashtag
 * 
 */
export type Hashtag = $Result.DefaultSelection<Prisma.$HashtagPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model RoomStreamItem
 * 
 */
export type RoomStreamItem = $Result.DefaultSelection<Prisma.$RoomStreamItemPayload>
/**
 * Model RoomNews
 * 
 */
export type RoomNews = $Result.DefaultSelection<Prisma.$RoomNewsPayload>
/**
 * Model RoomNote
 * 
 */
export type RoomNote = $Result.DefaultSelection<Prisma.$RoomNotePayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  USER: 'USER',
  ADMIN: 'ADMIN'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vibe`: Exposes CRUD operations for the **Vibe** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Vibes
    * const vibes = await prisma.vibe.findMany()
    * ```
    */
  get vibe(): Prisma.VibeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.vibeUpdate`: Exposes CRUD operations for the **VibeUpdate** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more VibeUpdates
    * const vibeUpdates = await prisma.vibeUpdate.findMany()
    * ```
    */
  get vibeUpdate(): Prisma.VibeUpdateDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.hashtag`: Exposes CRUD operations for the **Hashtag** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Hashtags
    * const hashtags = await prisma.hashtag.findMany()
    * ```
    */
  get hashtag(): Prisma.HashtagDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomStreamItem`: Exposes CRUD operations for the **RoomStreamItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomStreamItems
    * const roomStreamItems = await prisma.roomStreamItem.findMany()
    * ```
    */
  get roomStreamItem(): Prisma.RoomStreamItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomNews`: Exposes CRUD operations for the **RoomNews** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomNews
    * const roomNews = await prisma.roomNews.findMany()
    * ```
    */
  get roomNews(): Prisma.RoomNewsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.roomNote`: Exposes CRUD operations for the **RoomNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RoomNotes
    * const roomNotes = await prisma.roomNote.findMany()
    * ```
    */
  get roomNote(): Prisma.RoomNoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Vibe: 'Vibe',
    VibeUpdate: 'VibeUpdate',
    Hashtag: 'Hashtag',
    Room: 'Room',
    RoomStreamItem: 'RoomStreamItem',
    RoomNews: 'RoomNews',
    RoomNote: 'RoomNote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "vibe" | "vibeUpdate" | "hashtag" | "room" | "roomStreamItem" | "roomNews" | "roomNote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Vibe: {
        payload: Prisma.$VibePayload<ExtArgs>
        fields: Prisma.VibeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VibeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VibeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          findFirst: {
            args: Prisma.VibeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VibeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          findMany: {
            args: Prisma.VibeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>[]
          }
          create: {
            args: Prisma.VibeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          createMany: {
            args: Prisma.VibeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VibeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>[]
          }
          delete: {
            args: Prisma.VibeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          update: {
            args: Prisma.VibeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          deleteMany: {
            args: Prisma.VibeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VibeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VibeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>[]
          }
          upsert: {
            args: Prisma.VibeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibePayload>
          }
          aggregate: {
            args: Prisma.VibeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVibe>
          }
          groupBy: {
            args: Prisma.VibeGroupByArgs<ExtArgs>
            result: $Utils.Optional<VibeGroupByOutputType>[]
          }
          count: {
            args: Prisma.VibeCountArgs<ExtArgs>
            result: $Utils.Optional<VibeCountAggregateOutputType> | number
          }
        }
      }
      VibeUpdate: {
        payload: Prisma.$VibeUpdatePayload<ExtArgs>
        fields: Prisma.VibeUpdateFieldRefs
        operations: {
          findUnique: {
            args: Prisma.VibeUpdateFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.VibeUpdateFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          findFirst: {
            args: Prisma.VibeUpdateFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.VibeUpdateFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          findMany: {
            args: Prisma.VibeUpdateFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>[]
          }
          create: {
            args: Prisma.VibeUpdateCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          createMany: {
            args: Prisma.VibeUpdateCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.VibeUpdateCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>[]
          }
          delete: {
            args: Prisma.VibeUpdateDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          update: {
            args: Prisma.VibeUpdateUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          deleteMany: {
            args: Prisma.VibeUpdateDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.VibeUpdateUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.VibeUpdateUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>[]
          }
          upsert: {
            args: Prisma.VibeUpdateUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$VibeUpdatePayload>
          }
          aggregate: {
            args: Prisma.VibeUpdateAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVibeUpdate>
          }
          groupBy: {
            args: Prisma.VibeUpdateGroupByArgs<ExtArgs>
            result: $Utils.Optional<VibeUpdateGroupByOutputType>[]
          }
          count: {
            args: Prisma.VibeUpdateCountArgs<ExtArgs>
            result: $Utils.Optional<VibeUpdateCountAggregateOutputType> | number
          }
        }
      }
      Hashtag: {
        payload: Prisma.$HashtagPayload<ExtArgs>
        fields: Prisma.HashtagFieldRefs
        operations: {
          findUnique: {
            args: Prisma.HashtagFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.HashtagFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          findFirst: {
            args: Prisma.HashtagFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.HashtagFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          findMany: {
            args: Prisma.HashtagFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>[]
          }
          create: {
            args: Prisma.HashtagCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          createMany: {
            args: Prisma.HashtagCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.HashtagCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>[]
          }
          delete: {
            args: Prisma.HashtagDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          update: {
            args: Prisma.HashtagUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          deleteMany: {
            args: Prisma.HashtagDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.HashtagUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.HashtagUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>[]
          }
          upsert: {
            args: Prisma.HashtagUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$HashtagPayload>
          }
          aggregate: {
            args: Prisma.HashtagAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateHashtag>
          }
          groupBy: {
            args: Prisma.HashtagGroupByArgs<ExtArgs>
            result: $Utils.Optional<HashtagGroupByOutputType>[]
          }
          count: {
            args: Prisma.HashtagCountArgs<ExtArgs>
            result: $Utils.Optional<HashtagCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      RoomStreamItem: {
        payload: Prisma.$RoomStreamItemPayload<ExtArgs>
        fields: Prisma.RoomStreamItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomStreamItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomStreamItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          findFirst: {
            args: Prisma.RoomStreamItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomStreamItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          findMany: {
            args: Prisma.RoomStreamItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>[]
          }
          create: {
            args: Prisma.RoomStreamItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          createMany: {
            args: Prisma.RoomStreamItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomStreamItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>[]
          }
          delete: {
            args: Prisma.RoomStreamItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          update: {
            args: Prisma.RoomStreamItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          deleteMany: {
            args: Prisma.RoomStreamItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomStreamItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomStreamItemUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>[]
          }
          upsert: {
            args: Prisma.RoomStreamItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomStreamItemPayload>
          }
          aggregate: {
            args: Prisma.RoomStreamItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomStreamItem>
          }
          groupBy: {
            args: Prisma.RoomStreamItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomStreamItemCountArgs<ExtArgs>
            result: $Utils.Optional<RoomStreamItemCountAggregateOutputType> | number
          }
        }
      }
      RoomNews: {
        payload: Prisma.$RoomNewsPayload<ExtArgs>
        fields: Prisma.RoomNewsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomNewsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomNewsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          findFirst: {
            args: Prisma.RoomNewsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomNewsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          findMany: {
            args: Prisma.RoomNewsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>[]
          }
          create: {
            args: Prisma.RoomNewsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          createMany: {
            args: Prisma.RoomNewsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomNewsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>[]
          }
          delete: {
            args: Prisma.RoomNewsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          update: {
            args: Prisma.RoomNewsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          deleteMany: {
            args: Prisma.RoomNewsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomNewsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomNewsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>[]
          }
          upsert: {
            args: Prisma.RoomNewsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNewsPayload>
          }
          aggregate: {
            args: Prisma.RoomNewsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomNews>
          }
          groupBy: {
            args: Prisma.RoomNewsGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomNewsGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomNewsCountArgs<ExtArgs>
            result: $Utils.Optional<RoomNewsCountAggregateOutputType> | number
          }
        }
      }
      RoomNote: {
        payload: Prisma.$RoomNotePayload<ExtArgs>
        fields: Prisma.RoomNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          findFirst: {
            args: Prisma.RoomNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          findMany: {
            args: Prisma.RoomNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>[]
          }
          create: {
            args: Prisma.RoomNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          createMany: {
            args: Prisma.RoomNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RoomNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>[]
          }
          delete: {
            args: Prisma.RoomNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          update: {
            args: Prisma.RoomNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          deleteMany: {
            args: Prisma.RoomNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RoomNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RoomNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>[]
          }
          upsert: {
            args: Prisma.RoomNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RoomNotePayload>
          }
          aggregate: {
            args: Prisma.RoomNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRoomNote>
          }
          groupBy: {
            args: Prisma.RoomNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<RoomNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomNoteCountArgs<ExtArgs>
            result: $Utils.Optional<RoomNoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    vibe?: VibeOmit
    vibeUpdate?: VibeUpdateOmit
    hashtag?: HashtagOmit
    room?: RoomOmit
    roomStreamItem?: RoomStreamItemOmit
    roomNews?: RoomNewsOmit
    roomNote?: RoomNoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    vibes: number
    rooms: number
    roomStreamItems: number
    roomNews: number
    roomNotes: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vibes?: boolean | UserCountOutputTypeCountVibesArgs
    rooms?: boolean | UserCountOutputTypeCountRoomsArgs
    roomStreamItems?: boolean | UserCountOutputTypeCountRoomStreamItemsArgs
    roomNews?: boolean | UserCountOutputTypeCountRoomNewsArgs
    roomNotes?: boolean | UserCountOutputTypeCountRoomNotesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountVibesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VibeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomStreamItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamItemWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNewsWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRoomNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNoteWhereInput
  }


  /**
   * Count Type VibeCountOutputType
   */

  export type VibeCountOutputType = {
    updates: number
  }

  export type VibeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    updates?: boolean | VibeCountOutputTypeCountUpdatesArgs
  }

  // Custom InputTypes
  /**
   * VibeCountOutputType without action
   */
  export type VibeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeCountOutputType
     */
    select?: VibeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * VibeCountOutputType without action
   */
  export type VibeCountOutputTypeCountUpdatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VibeUpdateWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    streamItems: number
    news: number
    notes: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    streamItems?: boolean | RoomCountOutputTypeCountStreamItemsArgs
    news?: boolean | RoomCountOutputTypeCountNewsArgs
    notes?: boolean | RoomCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountStreamItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamItemWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNewsWhereInput
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNoteWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    username: string | null
    password: string | null
    role: $Enums.Role | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    username: number
    password: number
    role: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    username?: true
    password?: true
    role?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    username: string
    password: string
    role: $Enums.Role
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    vibes?: boolean | User$vibesArgs<ExtArgs>
    rooms?: boolean | User$roomsArgs<ExtArgs>
    roomStreamItems?: boolean | User$roomStreamItemsArgs<ExtArgs>
    roomNews?: boolean | User$roomNewsArgs<ExtArgs>
    roomNotes?: boolean | User$roomNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    username?: boolean
    password?: boolean
    role?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "username" | "password" | "role" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vibes?: boolean | User$vibesArgs<ExtArgs>
    rooms?: boolean | User$roomsArgs<ExtArgs>
    roomStreamItems?: boolean | User$roomStreamItemsArgs<ExtArgs>
    roomNews?: boolean | User$roomNewsArgs<ExtArgs>
    roomNotes?: boolean | User$roomNotesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      vibes: Prisma.$VibePayload<ExtArgs>[]
      rooms: Prisma.$RoomPayload<ExtArgs>[]
      roomStreamItems: Prisma.$RoomStreamItemPayload<ExtArgs>[]
      roomNews: Prisma.$RoomNewsPayload<ExtArgs>[]
      roomNotes: Prisma.$RoomNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      username: string
      password: string
      role: $Enums.Role
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vibes<T extends User$vibesArgs<ExtArgs> = {}>(args?: Subset<T, User$vibesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    rooms<T extends User$roomsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomStreamItems<T extends User$roomStreamItemsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomStreamItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomNews<T extends User$roomNewsArgs<ExtArgs> = {}>(args?: Subset<T, User$roomNewsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    roomNotes<T extends User$roomNotesArgs<ExtArgs> = {}>(args?: Subset<T, User$roomNotesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.vibes
   */
  export type User$vibesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    where?: VibeWhereInput
    orderBy?: VibeOrderByWithRelationInput | VibeOrderByWithRelationInput[]
    cursor?: VibeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VibeScalarFieldEnum | VibeScalarFieldEnum[]
  }

  /**
   * User.rooms
   */
  export type User$roomsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    cursor?: RoomWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * User.roomStreamItems
   */
  export type User$roomStreamItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    where?: RoomStreamItemWhereInput
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    cursor?: RoomStreamItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamItemScalarFieldEnum | RoomStreamItemScalarFieldEnum[]
  }

  /**
   * User.roomNews
   */
  export type User$roomNewsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    where?: RoomNewsWhereInput
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    cursor?: RoomNewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomNewsScalarFieldEnum | RoomNewsScalarFieldEnum[]
  }

  /**
   * User.roomNotes
   */
  export type User$roomNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    where?: RoomNoteWhereInput
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    cursor?: RoomNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomNoteScalarFieldEnum | RoomNoteScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Vibe
   */

  export type AggregateVibe = {
    _count: VibeCountAggregateOutputType | null
    _min: VibeMinAggregateOutputType | null
    _max: VibeMaxAggregateOutputType | null
  }

  export type VibeMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    inMainFeed: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VibeMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    inMainFeed: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VibeCountAggregateOutputType = {
    id: number
    title: number
    content: number
    keywords: number
    images: number
    videoUrls: number
    musicUrls: number
    roomConfig: number
    inMainFeed: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VibeMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    inMainFeed?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VibeMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    inMainFeed?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VibeCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    keywords?: true
    images?: true
    videoUrls?: true
    musicUrls?: true
    roomConfig?: true
    inMainFeed?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VibeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vibe to aggregate.
     */
    where?: VibeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vibes to fetch.
     */
    orderBy?: VibeOrderByWithRelationInput | VibeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VibeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vibes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vibes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Vibes
    **/
    _count?: true | VibeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VibeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VibeMaxAggregateInputType
  }

  export type GetVibeAggregateType<T extends VibeAggregateArgs> = {
        [P in keyof T & keyof AggregateVibe]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVibe[P]>
      : GetScalarType<T[P], AggregateVibe[P]>
  }




  export type VibeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VibeWhereInput
    orderBy?: VibeOrderByWithAggregationInput | VibeOrderByWithAggregationInput[]
    by: VibeScalarFieldEnum[] | VibeScalarFieldEnum
    having?: VibeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VibeCountAggregateInputType | true
    _min?: VibeMinAggregateInputType
    _max?: VibeMaxAggregateInputType
  }

  export type VibeGroupByOutputType = {
    id: string
    title: string
    content: string
    keywords: string[]
    images: string[]
    videoUrls: string[]
    musicUrls: string[]
    roomConfig: JsonValue | null
    inMainFeed: boolean
    authorId: string
    createdAt: Date
    updatedAt: Date
    _count: VibeCountAggregateOutputType | null
    _min: VibeMinAggregateOutputType | null
    _max: VibeMaxAggregateOutputType | null
  }

  type GetVibeGroupByPayload<T extends VibeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VibeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VibeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VibeGroupByOutputType[P]>
            : GetScalarType<T[P], VibeGroupByOutputType[P]>
        }
      >
    >


  export type VibeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    keywords?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    roomConfig?: boolean
    inMainFeed?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    updates?: boolean | Vibe$updatesArgs<ExtArgs>
    _count?: boolean | VibeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibe"]>

  export type VibeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    keywords?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    roomConfig?: boolean
    inMainFeed?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibe"]>

  export type VibeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    keywords?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    roomConfig?: boolean
    inMainFeed?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibe"]>

  export type VibeSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    keywords?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    roomConfig?: boolean
    inMainFeed?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type VibeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "keywords" | "images" | "videoUrls" | "musicUrls" | "roomConfig" | "inMainFeed" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["vibe"]>
  export type VibeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    updates?: boolean | Vibe$updatesArgs<ExtArgs>
    _count?: boolean | VibeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type VibeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type VibeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $VibePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Vibe"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      updates: Prisma.$VibeUpdatePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      keywords: string[]
      images: string[]
      videoUrls: string[]
      musicUrls: string[]
      roomConfig: Prisma.JsonValue | null
      inMainFeed: boolean
      authorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["vibe"]>
    composites: {}
  }

  type VibeGetPayload<S extends boolean | null | undefined | VibeDefaultArgs> = $Result.GetResult<Prisma.$VibePayload, S>

  type VibeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VibeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VibeCountAggregateInputType | true
    }

  export interface VibeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Vibe'], meta: { name: 'Vibe' } }
    /**
     * Find zero or one Vibe that matches the filter.
     * @param {VibeFindUniqueArgs} args - Arguments to find a Vibe
     * @example
     * // Get one Vibe
     * const vibe = await prisma.vibe.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VibeFindUniqueArgs>(args: SelectSubset<T, VibeFindUniqueArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Vibe that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VibeFindUniqueOrThrowArgs} args - Arguments to find a Vibe
     * @example
     * // Get one Vibe
     * const vibe = await prisma.vibe.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VibeFindUniqueOrThrowArgs>(args: SelectSubset<T, VibeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vibe that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeFindFirstArgs} args - Arguments to find a Vibe
     * @example
     * // Get one Vibe
     * const vibe = await prisma.vibe.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VibeFindFirstArgs>(args?: SelectSubset<T, VibeFindFirstArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Vibe that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeFindFirstOrThrowArgs} args - Arguments to find a Vibe
     * @example
     * // Get one Vibe
     * const vibe = await prisma.vibe.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VibeFindFirstOrThrowArgs>(args?: SelectSubset<T, VibeFindFirstOrThrowArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Vibes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Vibes
     * const vibes = await prisma.vibe.findMany()
     * 
     * // Get first 10 Vibes
     * const vibes = await prisma.vibe.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vibeWithIdOnly = await prisma.vibe.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VibeFindManyArgs>(args?: SelectSubset<T, VibeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Vibe.
     * @param {VibeCreateArgs} args - Arguments to create a Vibe.
     * @example
     * // Create one Vibe
     * const Vibe = await prisma.vibe.create({
     *   data: {
     *     // ... data to create a Vibe
     *   }
     * })
     * 
     */
    create<T extends VibeCreateArgs>(args: SelectSubset<T, VibeCreateArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Vibes.
     * @param {VibeCreateManyArgs} args - Arguments to create many Vibes.
     * @example
     * // Create many Vibes
     * const vibe = await prisma.vibe.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VibeCreateManyArgs>(args?: SelectSubset<T, VibeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Vibes and returns the data saved in the database.
     * @param {VibeCreateManyAndReturnArgs} args - Arguments to create many Vibes.
     * @example
     * // Create many Vibes
     * const vibe = await prisma.vibe.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Vibes and only return the `id`
     * const vibeWithIdOnly = await prisma.vibe.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VibeCreateManyAndReturnArgs>(args?: SelectSubset<T, VibeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Vibe.
     * @param {VibeDeleteArgs} args - Arguments to delete one Vibe.
     * @example
     * // Delete one Vibe
     * const Vibe = await prisma.vibe.delete({
     *   where: {
     *     // ... filter to delete one Vibe
     *   }
     * })
     * 
     */
    delete<T extends VibeDeleteArgs>(args: SelectSubset<T, VibeDeleteArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Vibe.
     * @param {VibeUpdateArgs} args - Arguments to update one Vibe.
     * @example
     * // Update one Vibe
     * const vibe = await prisma.vibe.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VibeUpdateArgs>(args: SelectSubset<T, VibeUpdateArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Vibes.
     * @param {VibeDeleteManyArgs} args - Arguments to filter Vibes to delete.
     * @example
     * // Delete a few Vibes
     * const { count } = await prisma.vibe.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VibeDeleteManyArgs>(args?: SelectSubset<T, VibeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vibes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Vibes
     * const vibe = await prisma.vibe.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VibeUpdateManyArgs>(args: SelectSubset<T, VibeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Vibes and returns the data updated in the database.
     * @param {VibeUpdateManyAndReturnArgs} args - Arguments to update many Vibes.
     * @example
     * // Update many Vibes
     * const vibe = await prisma.vibe.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Vibes and only return the `id`
     * const vibeWithIdOnly = await prisma.vibe.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VibeUpdateManyAndReturnArgs>(args: SelectSubset<T, VibeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Vibe.
     * @param {VibeUpsertArgs} args - Arguments to update or create a Vibe.
     * @example
     * // Update or create a Vibe
     * const vibe = await prisma.vibe.upsert({
     *   create: {
     *     // ... data to create a Vibe
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Vibe we want to update
     *   }
     * })
     */
    upsert<T extends VibeUpsertArgs>(args: SelectSubset<T, VibeUpsertArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Vibes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeCountArgs} args - Arguments to filter Vibes to count.
     * @example
     * // Count the number of Vibes
     * const count = await prisma.vibe.count({
     *   where: {
     *     // ... the filter for the Vibes we want to count
     *   }
     * })
    **/
    count<T extends VibeCountArgs>(
      args?: Subset<T, VibeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VibeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Vibe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VibeAggregateArgs>(args: Subset<T, VibeAggregateArgs>): Prisma.PrismaPromise<GetVibeAggregateType<T>>

    /**
     * Group by Vibe.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VibeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VibeGroupByArgs['orderBy'] }
        : { orderBy?: VibeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VibeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVibeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Vibe model
   */
  readonly fields: VibeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Vibe.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VibeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    updates<T extends Vibe$updatesArgs<ExtArgs> = {}>(args?: Subset<T, Vibe$updatesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Vibe model
   */
  interface VibeFieldRefs {
    readonly id: FieldRef<"Vibe", 'String'>
    readonly title: FieldRef<"Vibe", 'String'>
    readonly content: FieldRef<"Vibe", 'String'>
    readonly keywords: FieldRef<"Vibe", 'String[]'>
    readonly images: FieldRef<"Vibe", 'String[]'>
    readonly videoUrls: FieldRef<"Vibe", 'String[]'>
    readonly musicUrls: FieldRef<"Vibe", 'String[]'>
    readonly roomConfig: FieldRef<"Vibe", 'Json'>
    readonly inMainFeed: FieldRef<"Vibe", 'Boolean'>
    readonly authorId: FieldRef<"Vibe", 'String'>
    readonly createdAt: FieldRef<"Vibe", 'DateTime'>
    readonly updatedAt: FieldRef<"Vibe", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Vibe findUnique
   */
  export type VibeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter, which Vibe to fetch.
     */
    where: VibeWhereUniqueInput
  }

  /**
   * Vibe findUniqueOrThrow
   */
  export type VibeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter, which Vibe to fetch.
     */
    where: VibeWhereUniqueInput
  }

  /**
   * Vibe findFirst
   */
  export type VibeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter, which Vibe to fetch.
     */
    where?: VibeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vibes to fetch.
     */
    orderBy?: VibeOrderByWithRelationInput | VibeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vibes.
     */
    cursor?: VibeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vibes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vibes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vibes.
     */
    distinct?: VibeScalarFieldEnum | VibeScalarFieldEnum[]
  }

  /**
   * Vibe findFirstOrThrow
   */
  export type VibeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter, which Vibe to fetch.
     */
    where?: VibeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vibes to fetch.
     */
    orderBy?: VibeOrderByWithRelationInput | VibeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Vibes.
     */
    cursor?: VibeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vibes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vibes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Vibes.
     */
    distinct?: VibeScalarFieldEnum | VibeScalarFieldEnum[]
  }

  /**
   * Vibe findMany
   */
  export type VibeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter, which Vibes to fetch.
     */
    where?: VibeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Vibes to fetch.
     */
    orderBy?: VibeOrderByWithRelationInput | VibeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Vibes.
     */
    cursor?: VibeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Vibes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Vibes.
     */
    skip?: number
    distinct?: VibeScalarFieldEnum | VibeScalarFieldEnum[]
  }

  /**
   * Vibe create
   */
  export type VibeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * The data needed to create a Vibe.
     */
    data: XOR<VibeCreateInput, VibeUncheckedCreateInput>
  }

  /**
   * Vibe createMany
   */
  export type VibeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Vibes.
     */
    data: VibeCreateManyInput | VibeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Vibe createManyAndReturn
   */
  export type VibeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * The data used to create many Vibes.
     */
    data: VibeCreateManyInput | VibeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vibe update
   */
  export type VibeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * The data needed to update a Vibe.
     */
    data: XOR<VibeUpdateInput, VibeUncheckedUpdateInput>
    /**
     * Choose, which Vibe to update.
     */
    where: VibeWhereUniqueInput
  }

  /**
   * Vibe updateMany
   */
  export type VibeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Vibes.
     */
    data: XOR<VibeUpdateManyMutationInput, VibeUncheckedUpdateManyInput>
    /**
     * Filter which Vibes to update
     */
    where?: VibeWhereInput
    /**
     * Limit how many Vibes to update.
     */
    limit?: number
  }

  /**
   * Vibe updateManyAndReturn
   */
  export type VibeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * The data used to update Vibes.
     */
    data: XOR<VibeUpdateManyMutationInput, VibeUncheckedUpdateManyInput>
    /**
     * Filter which Vibes to update
     */
    where?: VibeWhereInput
    /**
     * Limit how many Vibes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Vibe upsert
   */
  export type VibeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * The filter to search for the Vibe to update in case it exists.
     */
    where: VibeWhereUniqueInput
    /**
     * In case the Vibe found by the `where` argument doesn't exist, create a new Vibe with this data.
     */
    create: XOR<VibeCreateInput, VibeUncheckedCreateInput>
    /**
     * In case the Vibe was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VibeUpdateInput, VibeUncheckedUpdateInput>
  }

  /**
   * Vibe delete
   */
  export type VibeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
    /**
     * Filter which Vibe to delete.
     */
    where: VibeWhereUniqueInput
  }

  /**
   * Vibe deleteMany
   */
  export type VibeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Vibes to delete
     */
    where?: VibeWhereInput
    /**
     * Limit how many Vibes to delete.
     */
    limit?: number
  }

  /**
   * Vibe.updates
   */
  export type Vibe$updatesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    where?: VibeUpdateWhereInput
    orderBy?: VibeUpdateOrderByWithRelationInput | VibeUpdateOrderByWithRelationInput[]
    cursor?: VibeUpdateWhereUniqueInput
    take?: number
    skip?: number
    distinct?: VibeUpdateScalarFieldEnum | VibeUpdateScalarFieldEnum[]
  }

  /**
   * Vibe without action
   */
  export type VibeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Vibe
     */
    select?: VibeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Vibe
     */
    omit?: VibeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeInclude<ExtArgs> | null
  }


  /**
   * Model VibeUpdate
   */

  export type AggregateVibeUpdate = {
    _count: VibeUpdateCountAggregateOutputType | null
    _min: VibeUpdateMinAggregateOutputType | null
    _max: VibeUpdateMaxAggregateOutputType | null
  }

  export type VibeUpdateMinAggregateOutputType = {
    id: string | null
    content: string | null
    vibeId: string | null
    createdAt: Date | null
  }

  export type VibeUpdateMaxAggregateOutputType = {
    id: string | null
    content: string | null
    vibeId: string | null
    createdAt: Date | null
  }

  export type VibeUpdateCountAggregateOutputType = {
    id: number
    content: number
    mediaUrls: number
    vibeId: number
    createdAt: number
    _all: number
  }


  export type VibeUpdateMinAggregateInputType = {
    id?: true
    content?: true
    vibeId?: true
    createdAt?: true
  }

  export type VibeUpdateMaxAggregateInputType = {
    id?: true
    content?: true
    vibeId?: true
    createdAt?: true
  }

  export type VibeUpdateCountAggregateInputType = {
    id?: true
    content?: true
    mediaUrls?: true
    vibeId?: true
    createdAt?: true
    _all?: true
  }

  export type VibeUpdateAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VibeUpdate to aggregate.
     */
    where?: VibeUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VibeUpdates to fetch.
     */
    orderBy?: VibeUpdateOrderByWithRelationInput | VibeUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: VibeUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VibeUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VibeUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned VibeUpdates
    **/
    _count?: true | VibeUpdateCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VibeUpdateMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VibeUpdateMaxAggregateInputType
  }

  export type GetVibeUpdateAggregateType<T extends VibeUpdateAggregateArgs> = {
        [P in keyof T & keyof AggregateVibeUpdate]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVibeUpdate[P]>
      : GetScalarType<T[P], AggregateVibeUpdate[P]>
  }




  export type VibeUpdateGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: VibeUpdateWhereInput
    orderBy?: VibeUpdateOrderByWithAggregationInput | VibeUpdateOrderByWithAggregationInput[]
    by: VibeUpdateScalarFieldEnum[] | VibeUpdateScalarFieldEnum
    having?: VibeUpdateScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VibeUpdateCountAggregateInputType | true
    _min?: VibeUpdateMinAggregateInputType
    _max?: VibeUpdateMaxAggregateInputType
  }

  export type VibeUpdateGroupByOutputType = {
    id: string
    content: string
    mediaUrls: string[]
    vibeId: string
    createdAt: Date
    _count: VibeUpdateCountAggregateOutputType | null
    _min: VibeUpdateMinAggregateOutputType | null
    _max: VibeUpdateMaxAggregateOutputType | null
  }

  type GetVibeUpdateGroupByPayload<T extends VibeUpdateGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VibeUpdateGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VibeUpdateGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VibeUpdateGroupByOutputType[P]>
            : GetScalarType<T[P], VibeUpdateGroupByOutputType[P]>
        }
      >
    >


  export type VibeUpdateSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrls?: boolean
    vibeId?: boolean
    createdAt?: boolean
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibeUpdate"]>

  export type VibeUpdateSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrls?: boolean
    vibeId?: boolean
    createdAt?: boolean
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibeUpdate"]>

  export type VibeUpdateSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    content?: boolean
    mediaUrls?: boolean
    vibeId?: boolean
    createdAt?: boolean
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["vibeUpdate"]>

  export type VibeUpdateSelectScalar = {
    id?: boolean
    content?: boolean
    mediaUrls?: boolean
    vibeId?: boolean
    createdAt?: boolean
  }

  export type VibeUpdateOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "content" | "mediaUrls" | "vibeId" | "createdAt", ExtArgs["result"]["vibeUpdate"]>
  export type VibeUpdateInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }
  export type VibeUpdateIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }
  export type VibeUpdateIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    vibe?: boolean | VibeDefaultArgs<ExtArgs>
  }

  export type $VibeUpdatePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "VibeUpdate"
    objects: {
      vibe: Prisma.$VibePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      content: string
      mediaUrls: string[]
      vibeId: string
      createdAt: Date
    }, ExtArgs["result"]["vibeUpdate"]>
    composites: {}
  }

  type VibeUpdateGetPayload<S extends boolean | null | undefined | VibeUpdateDefaultArgs> = $Result.GetResult<Prisma.$VibeUpdatePayload, S>

  type VibeUpdateCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<VibeUpdateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VibeUpdateCountAggregateInputType | true
    }

  export interface VibeUpdateDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['VibeUpdate'], meta: { name: 'VibeUpdate' } }
    /**
     * Find zero or one VibeUpdate that matches the filter.
     * @param {VibeUpdateFindUniqueArgs} args - Arguments to find a VibeUpdate
     * @example
     * // Get one VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends VibeUpdateFindUniqueArgs>(args: SelectSubset<T, VibeUpdateFindUniqueArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one VibeUpdate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {VibeUpdateFindUniqueOrThrowArgs} args - Arguments to find a VibeUpdate
     * @example
     * // Get one VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends VibeUpdateFindUniqueOrThrowArgs>(args: SelectSubset<T, VibeUpdateFindUniqueOrThrowArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VibeUpdate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateFindFirstArgs} args - Arguments to find a VibeUpdate
     * @example
     * // Get one VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends VibeUpdateFindFirstArgs>(args?: SelectSubset<T, VibeUpdateFindFirstArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first VibeUpdate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateFindFirstOrThrowArgs} args - Arguments to find a VibeUpdate
     * @example
     * // Get one VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends VibeUpdateFindFirstOrThrowArgs>(args?: SelectSubset<T, VibeUpdateFindFirstOrThrowArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more VibeUpdates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all VibeUpdates
     * const vibeUpdates = await prisma.vibeUpdate.findMany()
     * 
     * // Get first 10 VibeUpdates
     * const vibeUpdates = await prisma.vibeUpdate.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const vibeUpdateWithIdOnly = await prisma.vibeUpdate.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends VibeUpdateFindManyArgs>(args?: SelectSubset<T, VibeUpdateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a VibeUpdate.
     * @param {VibeUpdateCreateArgs} args - Arguments to create a VibeUpdate.
     * @example
     * // Create one VibeUpdate
     * const VibeUpdate = await prisma.vibeUpdate.create({
     *   data: {
     *     // ... data to create a VibeUpdate
     *   }
     * })
     * 
     */
    create<T extends VibeUpdateCreateArgs>(args: SelectSubset<T, VibeUpdateCreateArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many VibeUpdates.
     * @param {VibeUpdateCreateManyArgs} args - Arguments to create many VibeUpdates.
     * @example
     * // Create many VibeUpdates
     * const vibeUpdate = await prisma.vibeUpdate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends VibeUpdateCreateManyArgs>(args?: SelectSubset<T, VibeUpdateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many VibeUpdates and returns the data saved in the database.
     * @param {VibeUpdateCreateManyAndReturnArgs} args - Arguments to create many VibeUpdates.
     * @example
     * // Create many VibeUpdates
     * const vibeUpdate = await prisma.vibeUpdate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many VibeUpdates and only return the `id`
     * const vibeUpdateWithIdOnly = await prisma.vibeUpdate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends VibeUpdateCreateManyAndReturnArgs>(args?: SelectSubset<T, VibeUpdateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a VibeUpdate.
     * @param {VibeUpdateDeleteArgs} args - Arguments to delete one VibeUpdate.
     * @example
     * // Delete one VibeUpdate
     * const VibeUpdate = await prisma.vibeUpdate.delete({
     *   where: {
     *     // ... filter to delete one VibeUpdate
     *   }
     * })
     * 
     */
    delete<T extends VibeUpdateDeleteArgs>(args: SelectSubset<T, VibeUpdateDeleteArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one VibeUpdate.
     * @param {VibeUpdateUpdateArgs} args - Arguments to update one VibeUpdate.
     * @example
     * // Update one VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends VibeUpdateUpdateArgs>(args: SelectSubset<T, VibeUpdateUpdateArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more VibeUpdates.
     * @param {VibeUpdateDeleteManyArgs} args - Arguments to filter VibeUpdates to delete.
     * @example
     * // Delete a few VibeUpdates
     * const { count } = await prisma.vibeUpdate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends VibeUpdateDeleteManyArgs>(args?: SelectSubset<T, VibeUpdateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VibeUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many VibeUpdates
     * const vibeUpdate = await prisma.vibeUpdate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends VibeUpdateUpdateManyArgs>(args: SelectSubset<T, VibeUpdateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more VibeUpdates and returns the data updated in the database.
     * @param {VibeUpdateUpdateManyAndReturnArgs} args - Arguments to update many VibeUpdates.
     * @example
     * // Update many VibeUpdates
     * const vibeUpdate = await prisma.vibeUpdate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more VibeUpdates and only return the `id`
     * const vibeUpdateWithIdOnly = await prisma.vibeUpdate.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends VibeUpdateUpdateManyAndReturnArgs>(args: SelectSubset<T, VibeUpdateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one VibeUpdate.
     * @param {VibeUpdateUpsertArgs} args - Arguments to update or create a VibeUpdate.
     * @example
     * // Update or create a VibeUpdate
     * const vibeUpdate = await prisma.vibeUpdate.upsert({
     *   create: {
     *     // ... data to create a VibeUpdate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the VibeUpdate we want to update
     *   }
     * })
     */
    upsert<T extends VibeUpdateUpsertArgs>(args: SelectSubset<T, VibeUpdateUpsertArgs<ExtArgs>>): Prisma__VibeUpdateClient<$Result.GetResult<Prisma.$VibeUpdatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of VibeUpdates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateCountArgs} args - Arguments to filter VibeUpdates to count.
     * @example
     * // Count the number of VibeUpdates
     * const count = await prisma.vibeUpdate.count({
     *   where: {
     *     // ... the filter for the VibeUpdates we want to count
     *   }
     * })
    **/
    count<T extends VibeUpdateCountArgs>(
      args?: Subset<T, VibeUpdateCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VibeUpdateCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a VibeUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VibeUpdateAggregateArgs>(args: Subset<T, VibeUpdateAggregateArgs>): Prisma.PrismaPromise<GetVibeUpdateAggregateType<T>>

    /**
     * Group by VibeUpdate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VibeUpdateGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends VibeUpdateGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: VibeUpdateGroupByArgs['orderBy'] }
        : { orderBy?: VibeUpdateGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, VibeUpdateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVibeUpdateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the VibeUpdate model
   */
  readonly fields: VibeUpdateFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for VibeUpdate.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__VibeUpdateClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    vibe<T extends VibeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, VibeDefaultArgs<ExtArgs>>): Prisma__VibeClient<$Result.GetResult<Prisma.$VibePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the VibeUpdate model
   */
  interface VibeUpdateFieldRefs {
    readonly id: FieldRef<"VibeUpdate", 'String'>
    readonly content: FieldRef<"VibeUpdate", 'String'>
    readonly mediaUrls: FieldRef<"VibeUpdate", 'String[]'>
    readonly vibeId: FieldRef<"VibeUpdate", 'String'>
    readonly createdAt: FieldRef<"VibeUpdate", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * VibeUpdate findUnique
   */
  export type VibeUpdateFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter, which VibeUpdate to fetch.
     */
    where: VibeUpdateWhereUniqueInput
  }

  /**
   * VibeUpdate findUniqueOrThrow
   */
  export type VibeUpdateFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter, which VibeUpdate to fetch.
     */
    where: VibeUpdateWhereUniqueInput
  }

  /**
   * VibeUpdate findFirst
   */
  export type VibeUpdateFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter, which VibeUpdate to fetch.
     */
    where?: VibeUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VibeUpdates to fetch.
     */
    orderBy?: VibeUpdateOrderByWithRelationInput | VibeUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VibeUpdates.
     */
    cursor?: VibeUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VibeUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VibeUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VibeUpdates.
     */
    distinct?: VibeUpdateScalarFieldEnum | VibeUpdateScalarFieldEnum[]
  }

  /**
   * VibeUpdate findFirstOrThrow
   */
  export type VibeUpdateFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter, which VibeUpdate to fetch.
     */
    where?: VibeUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VibeUpdates to fetch.
     */
    orderBy?: VibeUpdateOrderByWithRelationInput | VibeUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for VibeUpdates.
     */
    cursor?: VibeUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VibeUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VibeUpdates.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of VibeUpdates.
     */
    distinct?: VibeUpdateScalarFieldEnum | VibeUpdateScalarFieldEnum[]
  }

  /**
   * VibeUpdate findMany
   */
  export type VibeUpdateFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter, which VibeUpdates to fetch.
     */
    where?: VibeUpdateWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of VibeUpdates to fetch.
     */
    orderBy?: VibeUpdateOrderByWithRelationInput | VibeUpdateOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing VibeUpdates.
     */
    cursor?: VibeUpdateWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` VibeUpdates from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` VibeUpdates.
     */
    skip?: number
    distinct?: VibeUpdateScalarFieldEnum | VibeUpdateScalarFieldEnum[]
  }

  /**
   * VibeUpdate create
   */
  export type VibeUpdateCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * The data needed to create a VibeUpdate.
     */
    data: XOR<VibeUpdateCreateInput, VibeUpdateUncheckedCreateInput>
  }

  /**
   * VibeUpdate createMany
   */
  export type VibeUpdateCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many VibeUpdates.
     */
    data: VibeUpdateCreateManyInput | VibeUpdateCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * VibeUpdate createManyAndReturn
   */
  export type VibeUpdateCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * The data used to create many VibeUpdates.
     */
    data: VibeUpdateCreateManyInput | VibeUpdateCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * VibeUpdate update
   */
  export type VibeUpdateUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * The data needed to update a VibeUpdate.
     */
    data: XOR<VibeUpdateUpdateInput, VibeUpdateUncheckedUpdateInput>
    /**
     * Choose, which VibeUpdate to update.
     */
    where: VibeUpdateWhereUniqueInput
  }

  /**
   * VibeUpdate updateMany
   */
  export type VibeUpdateUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update VibeUpdates.
     */
    data: XOR<VibeUpdateUpdateManyMutationInput, VibeUpdateUncheckedUpdateManyInput>
    /**
     * Filter which VibeUpdates to update
     */
    where?: VibeUpdateWhereInput
    /**
     * Limit how many VibeUpdates to update.
     */
    limit?: number
  }

  /**
   * VibeUpdate updateManyAndReturn
   */
  export type VibeUpdateUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * The data used to update VibeUpdates.
     */
    data: XOR<VibeUpdateUpdateManyMutationInput, VibeUpdateUncheckedUpdateManyInput>
    /**
     * Filter which VibeUpdates to update
     */
    where?: VibeUpdateWhereInput
    /**
     * Limit how many VibeUpdates to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * VibeUpdate upsert
   */
  export type VibeUpdateUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * The filter to search for the VibeUpdate to update in case it exists.
     */
    where: VibeUpdateWhereUniqueInput
    /**
     * In case the VibeUpdate found by the `where` argument doesn't exist, create a new VibeUpdate with this data.
     */
    create: XOR<VibeUpdateCreateInput, VibeUpdateUncheckedCreateInput>
    /**
     * In case the VibeUpdate was found with the provided `where` argument, update it with this data.
     */
    update: XOR<VibeUpdateUpdateInput, VibeUpdateUncheckedUpdateInput>
  }

  /**
   * VibeUpdate delete
   */
  export type VibeUpdateDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
    /**
     * Filter which VibeUpdate to delete.
     */
    where: VibeUpdateWhereUniqueInput
  }

  /**
   * VibeUpdate deleteMany
   */
  export type VibeUpdateDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which VibeUpdates to delete
     */
    where?: VibeUpdateWhereInput
    /**
     * Limit how many VibeUpdates to delete.
     */
    limit?: number
  }

  /**
   * VibeUpdate without action
   */
  export type VibeUpdateDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the VibeUpdate
     */
    select?: VibeUpdateSelect<ExtArgs> | null
    /**
     * Omit specific fields from the VibeUpdate
     */
    omit?: VibeUpdateOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: VibeUpdateInclude<ExtArgs> | null
  }


  /**
   * Model Hashtag
   */

  export type AggregateHashtag = {
    _count: HashtagCountAggregateOutputType | null
    _avg: HashtagAvgAggregateOutputType | null
    _sum: HashtagSumAggregateOutputType | null
    _min: HashtagMinAggregateOutputType | null
    _max: HashtagMaxAggregateOutputType | null
  }

  export type HashtagAvgAggregateOutputType = {
    useCount: number | null
  }

  export type HashtagSumAggregateOutputType = {
    useCount: number | null
  }

  export type HashtagMinAggregateOutputType = {
    id: string | null
    name: string | null
    useCount: number | null
    lastUsedAt: Date | null
    createdAt: Date | null
  }

  export type HashtagMaxAggregateOutputType = {
    id: string | null
    name: string | null
    useCount: number | null
    lastUsedAt: Date | null
    createdAt: Date | null
  }

  export type HashtagCountAggregateOutputType = {
    id: number
    name: number
    useCount: number
    lastUsedAt: number
    createdAt: number
    _all: number
  }


  export type HashtagAvgAggregateInputType = {
    useCount?: true
  }

  export type HashtagSumAggregateInputType = {
    useCount?: true
  }

  export type HashtagMinAggregateInputType = {
    id?: true
    name?: true
    useCount?: true
    lastUsedAt?: true
    createdAt?: true
  }

  export type HashtagMaxAggregateInputType = {
    id?: true
    name?: true
    useCount?: true
    lastUsedAt?: true
    createdAt?: true
  }

  export type HashtagCountAggregateInputType = {
    id?: true
    name?: true
    useCount?: true
    lastUsedAt?: true
    createdAt?: true
    _all?: true
  }

  export type HashtagAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hashtag to aggregate.
     */
    where?: HashtagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hashtags to fetch.
     */
    orderBy?: HashtagOrderByWithRelationInput | HashtagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: HashtagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hashtags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hashtags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Hashtags
    **/
    _count?: true | HashtagCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: HashtagAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: HashtagSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: HashtagMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: HashtagMaxAggregateInputType
  }

  export type GetHashtagAggregateType<T extends HashtagAggregateArgs> = {
        [P in keyof T & keyof AggregateHashtag]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateHashtag[P]>
      : GetScalarType<T[P], AggregateHashtag[P]>
  }




  export type HashtagGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: HashtagWhereInput
    orderBy?: HashtagOrderByWithAggregationInput | HashtagOrderByWithAggregationInput[]
    by: HashtagScalarFieldEnum[] | HashtagScalarFieldEnum
    having?: HashtagScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: HashtagCountAggregateInputType | true
    _avg?: HashtagAvgAggregateInputType
    _sum?: HashtagSumAggregateInputType
    _min?: HashtagMinAggregateInputType
    _max?: HashtagMaxAggregateInputType
  }

  export type HashtagGroupByOutputType = {
    id: string
    name: string
    useCount: number
    lastUsedAt: Date
    createdAt: Date
    _count: HashtagCountAggregateOutputType | null
    _avg: HashtagAvgAggregateOutputType | null
    _sum: HashtagSumAggregateOutputType | null
    _min: HashtagMinAggregateOutputType | null
    _max: HashtagMaxAggregateOutputType | null
  }

  type GetHashtagGroupByPayload<T extends HashtagGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<HashtagGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof HashtagGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], HashtagGroupByOutputType[P]>
            : GetScalarType<T[P], HashtagGroupByOutputType[P]>
        }
      >
    >


  export type HashtagSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    useCount?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hashtag"]>

  export type HashtagSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    useCount?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hashtag"]>

  export type HashtagSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    useCount?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["hashtag"]>

  export type HashtagSelectScalar = {
    id?: boolean
    name?: boolean
    useCount?: boolean
    lastUsedAt?: boolean
    createdAt?: boolean
  }

  export type HashtagOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "useCount" | "lastUsedAt" | "createdAt", ExtArgs["result"]["hashtag"]>

  export type $HashtagPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Hashtag"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      useCount: number
      lastUsedAt: Date
      createdAt: Date
    }, ExtArgs["result"]["hashtag"]>
    composites: {}
  }

  type HashtagGetPayload<S extends boolean | null | undefined | HashtagDefaultArgs> = $Result.GetResult<Prisma.$HashtagPayload, S>

  type HashtagCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<HashtagFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: HashtagCountAggregateInputType | true
    }

  export interface HashtagDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Hashtag'], meta: { name: 'Hashtag' } }
    /**
     * Find zero or one Hashtag that matches the filter.
     * @param {HashtagFindUniqueArgs} args - Arguments to find a Hashtag
     * @example
     * // Get one Hashtag
     * const hashtag = await prisma.hashtag.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends HashtagFindUniqueArgs>(args: SelectSubset<T, HashtagFindUniqueArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Hashtag that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {HashtagFindUniqueOrThrowArgs} args - Arguments to find a Hashtag
     * @example
     * // Get one Hashtag
     * const hashtag = await prisma.hashtag.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends HashtagFindUniqueOrThrowArgs>(args: SelectSubset<T, HashtagFindUniqueOrThrowArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hashtag that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagFindFirstArgs} args - Arguments to find a Hashtag
     * @example
     * // Get one Hashtag
     * const hashtag = await prisma.hashtag.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends HashtagFindFirstArgs>(args?: SelectSubset<T, HashtagFindFirstArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Hashtag that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagFindFirstOrThrowArgs} args - Arguments to find a Hashtag
     * @example
     * // Get one Hashtag
     * const hashtag = await prisma.hashtag.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends HashtagFindFirstOrThrowArgs>(args?: SelectSubset<T, HashtagFindFirstOrThrowArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Hashtags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Hashtags
     * const hashtags = await prisma.hashtag.findMany()
     * 
     * // Get first 10 Hashtags
     * const hashtags = await prisma.hashtag.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const hashtagWithIdOnly = await prisma.hashtag.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends HashtagFindManyArgs>(args?: SelectSubset<T, HashtagFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Hashtag.
     * @param {HashtagCreateArgs} args - Arguments to create a Hashtag.
     * @example
     * // Create one Hashtag
     * const Hashtag = await prisma.hashtag.create({
     *   data: {
     *     // ... data to create a Hashtag
     *   }
     * })
     * 
     */
    create<T extends HashtagCreateArgs>(args: SelectSubset<T, HashtagCreateArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Hashtags.
     * @param {HashtagCreateManyArgs} args - Arguments to create many Hashtags.
     * @example
     * // Create many Hashtags
     * const hashtag = await prisma.hashtag.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends HashtagCreateManyArgs>(args?: SelectSubset<T, HashtagCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Hashtags and returns the data saved in the database.
     * @param {HashtagCreateManyAndReturnArgs} args - Arguments to create many Hashtags.
     * @example
     * // Create many Hashtags
     * const hashtag = await prisma.hashtag.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Hashtags and only return the `id`
     * const hashtagWithIdOnly = await prisma.hashtag.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends HashtagCreateManyAndReturnArgs>(args?: SelectSubset<T, HashtagCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Hashtag.
     * @param {HashtagDeleteArgs} args - Arguments to delete one Hashtag.
     * @example
     * // Delete one Hashtag
     * const Hashtag = await prisma.hashtag.delete({
     *   where: {
     *     // ... filter to delete one Hashtag
     *   }
     * })
     * 
     */
    delete<T extends HashtagDeleteArgs>(args: SelectSubset<T, HashtagDeleteArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Hashtag.
     * @param {HashtagUpdateArgs} args - Arguments to update one Hashtag.
     * @example
     * // Update one Hashtag
     * const hashtag = await prisma.hashtag.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends HashtagUpdateArgs>(args: SelectSubset<T, HashtagUpdateArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Hashtags.
     * @param {HashtagDeleteManyArgs} args - Arguments to filter Hashtags to delete.
     * @example
     * // Delete a few Hashtags
     * const { count } = await prisma.hashtag.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends HashtagDeleteManyArgs>(args?: SelectSubset<T, HashtagDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hashtags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Hashtags
     * const hashtag = await prisma.hashtag.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends HashtagUpdateManyArgs>(args: SelectSubset<T, HashtagUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Hashtags and returns the data updated in the database.
     * @param {HashtagUpdateManyAndReturnArgs} args - Arguments to update many Hashtags.
     * @example
     * // Update many Hashtags
     * const hashtag = await prisma.hashtag.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Hashtags and only return the `id`
     * const hashtagWithIdOnly = await prisma.hashtag.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends HashtagUpdateManyAndReturnArgs>(args: SelectSubset<T, HashtagUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Hashtag.
     * @param {HashtagUpsertArgs} args - Arguments to update or create a Hashtag.
     * @example
     * // Update or create a Hashtag
     * const hashtag = await prisma.hashtag.upsert({
     *   create: {
     *     // ... data to create a Hashtag
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Hashtag we want to update
     *   }
     * })
     */
    upsert<T extends HashtagUpsertArgs>(args: SelectSubset<T, HashtagUpsertArgs<ExtArgs>>): Prisma__HashtagClient<$Result.GetResult<Prisma.$HashtagPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Hashtags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagCountArgs} args - Arguments to filter Hashtags to count.
     * @example
     * // Count the number of Hashtags
     * const count = await prisma.hashtag.count({
     *   where: {
     *     // ... the filter for the Hashtags we want to count
     *   }
     * })
    **/
    count<T extends HashtagCountArgs>(
      args?: Subset<T, HashtagCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], HashtagCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Hashtag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends HashtagAggregateArgs>(args: Subset<T, HashtagAggregateArgs>): Prisma.PrismaPromise<GetHashtagAggregateType<T>>

    /**
     * Group by Hashtag.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {HashtagGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends HashtagGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: HashtagGroupByArgs['orderBy'] }
        : { orderBy?: HashtagGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, HashtagGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetHashtagGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Hashtag model
   */
  readonly fields: HashtagFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Hashtag.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__HashtagClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Hashtag model
   */
  interface HashtagFieldRefs {
    readonly id: FieldRef<"Hashtag", 'String'>
    readonly name: FieldRef<"Hashtag", 'String'>
    readonly useCount: FieldRef<"Hashtag", 'Int'>
    readonly lastUsedAt: FieldRef<"Hashtag", 'DateTime'>
    readonly createdAt: FieldRef<"Hashtag", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Hashtag findUnique
   */
  export type HashtagFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter, which Hashtag to fetch.
     */
    where: HashtagWhereUniqueInput
  }

  /**
   * Hashtag findUniqueOrThrow
   */
  export type HashtagFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter, which Hashtag to fetch.
     */
    where: HashtagWhereUniqueInput
  }

  /**
   * Hashtag findFirst
   */
  export type HashtagFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter, which Hashtag to fetch.
     */
    where?: HashtagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hashtags to fetch.
     */
    orderBy?: HashtagOrderByWithRelationInput | HashtagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hashtags.
     */
    cursor?: HashtagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hashtags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hashtags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hashtags.
     */
    distinct?: HashtagScalarFieldEnum | HashtagScalarFieldEnum[]
  }

  /**
   * Hashtag findFirstOrThrow
   */
  export type HashtagFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter, which Hashtag to fetch.
     */
    where?: HashtagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hashtags to fetch.
     */
    orderBy?: HashtagOrderByWithRelationInput | HashtagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Hashtags.
     */
    cursor?: HashtagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hashtags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hashtags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Hashtags.
     */
    distinct?: HashtagScalarFieldEnum | HashtagScalarFieldEnum[]
  }

  /**
   * Hashtag findMany
   */
  export type HashtagFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter, which Hashtags to fetch.
     */
    where?: HashtagWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Hashtags to fetch.
     */
    orderBy?: HashtagOrderByWithRelationInput | HashtagOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Hashtags.
     */
    cursor?: HashtagWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Hashtags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Hashtags.
     */
    skip?: number
    distinct?: HashtagScalarFieldEnum | HashtagScalarFieldEnum[]
  }

  /**
   * Hashtag create
   */
  export type HashtagCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * The data needed to create a Hashtag.
     */
    data: XOR<HashtagCreateInput, HashtagUncheckedCreateInput>
  }

  /**
   * Hashtag createMany
   */
  export type HashtagCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Hashtags.
     */
    data: HashtagCreateManyInput | HashtagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hashtag createManyAndReturn
   */
  export type HashtagCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * The data used to create many Hashtags.
     */
    data: HashtagCreateManyInput | HashtagCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Hashtag update
   */
  export type HashtagUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * The data needed to update a Hashtag.
     */
    data: XOR<HashtagUpdateInput, HashtagUncheckedUpdateInput>
    /**
     * Choose, which Hashtag to update.
     */
    where: HashtagWhereUniqueInput
  }

  /**
   * Hashtag updateMany
   */
  export type HashtagUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Hashtags.
     */
    data: XOR<HashtagUpdateManyMutationInput, HashtagUncheckedUpdateManyInput>
    /**
     * Filter which Hashtags to update
     */
    where?: HashtagWhereInput
    /**
     * Limit how many Hashtags to update.
     */
    limit?: number
  }

  /**
   * Hashtag updateManyAndReturn
   */
  export type HashtagUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * The data used to update Hashtags.
     */
    data: XOR<HashtagUpdateManyMutationInput, HashtagUncheckedUpdateManyInput>
    /**
     * Filter which Hashtags to update
     */
    where?: HashtagWhereInput
    /**
     * Limit how many Hashtags to update.
     */
    limit?: number
  }

  /**
   * Hashtag upsert
   */
  export type HashtagUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * The filter to search for the Hashtag to update in case it exists.
     */
    where: HashtagWhereUniqueInput
    /**
     * In case the Hashtag found by the `where` argument doesn't exist, create a new Hashtag with this data.
     */
    create: XOR<HashtagCreateInput, HashtagUncheckedCreateInput>
    /**
     * In case the Hashtag was found with the provided `where` argument, update it with this data.
     */
    update: XOR<HashtagUpdateInput, HashtagUncheckedUpdateInput>
  }

  /**
   * Hashtag delete
   */
  export type HashtagDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
    /**
     * Filter which Hashtag to delete.
     */
    where: HashtagWhereUniqueInput
  }

  /**
   * Hashtag deleteMany
   */
  export type HashtagDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Hashtags to delete
     */
    where?: HashtagWhereInput
    /**
     * Limit how many Hashtags to delete.
     */
    limit?: number
  }

  /**
   * Hashtag without action
   */
  export type HashtagDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Hashtag
     */
    select?: HashtagSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Hashtag
     */
    omit?: HashtagOmit<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    poster: string | null
    originVibeId: string | null
    isPublic: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    poster: string | null
    originVibeId: string | null
    isPublic: boolean | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    title: number
    description: number
    poster: number
    originVibeId: number
    isPublic: number
    tags: number
    images: number
    videoUrls: number
    musicUrls: number
    youtubeUrls: number
    roomConfig: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    originVibeId?: true
    isPublic?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    originVibeId?: true
    isPublic?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    poster?: true
    originVibeId?: true
    isPublic?: true
    tags?: true
    images?: true
    videoUrls?: true
    musicUrls?: true
    youtubeUrls?: true
    roomConfig?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    title: string
    description: string | null
    poster: string | null
    originVibeId: string | null
    isPublic: boolean
    tags: string[]
    images: string[]
    videoUrls: string[]
    musicUrls: string[]
    youtubeUrls: string[]
    roomConfig: JsonValue | null
    authorId: string
    createdAt: Date
    updatedAt: Date
    _count: RoomCountAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    originVibeId?: boolean
    isPublic?: boolean
    tags?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    youtubeUrls?: boolean
    roomConfig?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    streamItems?: boolean | Room$streamItemsArgs<ExtArgs>
    news?: boolean | Room$newsArgs<ExtArgs>
    notes?: boolean | Room$notesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    originVibeId?: boolean
    isPublic?: boolean
    tags?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    youtubeUrls?: boolean
    roomConfig?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    originVibeId?: boolean
    isPublic?: boolean
    tags?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    youtubeUrls?: boolean
    roomConfig?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    poster?: boolean
    originVibeId?: boolean
    isPublic?: boolean
    tags?: boolean
    images?: boolean
    videoUrls?: boolean
    musicUrls?: boolean
    youtubeUrls?: boolean
    roomConfig?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "poster" | "originVibeId" | "isPublic" | "tags" | "images" | "videoUrls" | "musicUrls" | "youtubeUrls" | "roomConfig" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["room"]>
  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    streamItems?: boolean | Room$streamItemsArgs<ExtArgs>
    news?: boolean | Room$newsArgs<ExtArgs>
    notes?: boolean | Room$notesArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RoomIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      streamItems: Prisma.$RoomStreamItemPayload<ExtArgs>[]
      news: Prisma.$RoomNewsPayload<ExtArgs>[]
      notes: Prisma.$RoomNotePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      poster: string | null
      originVibeId: string | null
      isPublic: boolean
      tags: string[]
      images: string[]
      videoUrls: string[]
      musicUrls: string[]
      youtubeUrls: string[]
      roomConfig: Prisma.JsonValue | null
      authorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["room"]>
    composites: {}
  }

  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomFindUniqueArgs>(args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Room that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomFindFirstArgs>(args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomFindManyArgs>(args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
     */
    create<T extends RoomCreateArgs>(args: SelectSubset<T, RoomCreateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Rooms.
     * @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomCreateManyArgs>(args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Rooms and returns the data saved in the database.
     * @param {RoomCreateManyAndReturnArgs} args - Arguments to create many Rooms.
     * @example
     * // Create many Rooms
     * const room = await prisma.room.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
     */
    delete<T extends RoomDeleteArgs>(args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomUpdateArgs>(args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomDeleteManyArgs>(args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomUpdateManyArgs>(args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms and returns the data updated in the database.
     * @param {RoomUpdateManyAndReturnArgs} args - Arguments to update many Rooms.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Rooms and only return the `id`
     * const roomWithIdOnly = await prisma.room.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
     */
    upsert<T extends RoomUpsertArgs>(args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    streamItems<T extends Room$streamItemsArgs<ExtArgs> = {}>(args?: Subset<T, Room$streamItemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    news<T extends Room$newsArgs<ExtArgs> = {}>(args?: Subset<T, Room$newsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends Room$notesArgs<ExtArgs> = {}>(args?: Subset<T, Room$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Room model
   */
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly title: FieldRef<"Room", 'String'>
    readonly description: FieldRef<"Room", 'String'>
    readonly poster: FieldRef<"Room", 'String'>
    readonly originVibeId: FieldRef<"Room", 'String'>
    readonly isPublic: FieldRef<"Room", 'Boolean'>
    readonly tags: FieldRef<"Room", 'String[]'>
    readonly images: FieldRef<"Room", 'String[]'>
    readonly videoUrls: FieldRef<"Room", 'String[]'>
    readonly musicUrls: FieldRef<"Room", 'String[]'>
    readonly youtubeUrls: FieldRef<"Room", 'String[]'>
    readonly roomConfig: FieldRef<"Room", 'Json'>
    readonly authorId: FieldRef<"Room", 'String'>
    readonly createdAt: FieldRef<"Room", 'DateTime'>
    readonly updatedAt: FieldRef<"Room", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room createManyAndReturn
   */
  export type RoomCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
  }

  /**
   * Room updateManyAndReturn
   */
  export type RoomUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
    /**
     * Limit how many Rooms to delete.
     */
    limit?: number
  }

  /**
   * Room.streamItems
   */
  export type Room$streamItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    where?: RoomStreamItemWhereInput
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    cursor?: RoomStreamItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomStreamItemScalarFieldEnum | RoomStreamItemScalarFieldEnum[]
  }

  /**
   * Room.news
   */
  export type Room$newsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    where?: RoomNewsWhereInput
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    cursor?: RoomNewsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomNewsScalarFieldEnum | RoomNewsScalarFieldEnum[]
  }

  /**
   * Room.notes
   */
  export type Room$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    where?: RoomNoteWhereInput
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    cursor?: RoomNoteWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RoomNoteScalarFieldEnum | RoomNoteScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Room
     */
    omit?: RoomOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model RoomStreamItem
   */

  export type AggregateRoomStreamItem = {
    _count: RoomStreamItemCountAggregateOutputType | null
    _min: RoomStreamItemMinAggregateOutputType | null
    _max: RoomStreamItemMaxAggregateOutputType | null
  }

  export type RoomStreamItemMinAggregateOutputType = {
    id: string | null
    type: string | null
    content: string | null
    url: string | null
    title: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
  }

  export type RoomStreamItemMaxAggregateOutputType = {
    id: string | null
    type: string | null
    content: string | null
    url: string | null
    title: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
  }

  export type RoomStreamItemCountAggregateOutputType = {
    id: number
    type: number
    content: number
    mediaUrls: number
    url: number
    title: number
    roomId: number
    authorId: number
    createdAt: number
    _all: number
  }


  export type RoomStreamItemMinAggregateInputType = {
    id?: true
    type?: true
    content?: true
    url?: true
    title?: true
    roomId?: true
    authorId?: true
    createdAt?: true
  }

  export type RoomStreamItemMaxAggregateInputType = {
    id?: true
    type?: true
    content?: true
    url?: true
    title?: true
    roomId?: true
    authorId?: true
    createdAt?: true
  }

  export type RoomStreamItemCountAggregateInputType = {
    id?: true
    type?: true
    content?: true
    mediaUrls?: true
    url?: true
    title?: true
    roomId?: true
    authorId?: true
    createdAt?: true
    _all?: true
  }

  export type RoomStreamItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStreamItem to aggregate.
     */
    where?: RoomStreamItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamItems to fetch.
     */
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomStreamItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomStreamItems
    **/
    _count?: true | RoomStreamItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomStreamItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomStreamItemMaxAggregateInputType
  }

  export type GetRoomStreamItemAggregateType<T extends RoomStreamItemAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomStreamItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomStreamItem[P]>
      : GetScalarType<T[P], AggregateRoomStreamItem[P]>
  }




  export type RoomStreamItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomStreamItemWhereInput
    orderBy?: RoomStreamItemOrderByWithAggregationInput | RoomStreamItemOrderByWithAggregationInput[]
    by: RoomStreamItemScalarFieldEnum[] | RoomStreamItemScalarFieldEnum
    having?: RoomStreamItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomStreamItemCountAggregateInputType | true
    _min?: RoomStreamItemMinAggregateInputType
    _max?: RoomStreamItemMaxAggregateInputType
  }

  export type RoomStreamItemGroupByOutputType = {
    id: string
    type: string
    content: string | null
    mediaUrls: string[]
    url: string | null
    title: string | null
    roomId: string
    authorId: string
    createdAt: Date
    _count: RoomStreamItemCountAggregateOutputType | null
    _min: RoomStreamItemMinAggregateOutputType | null
    _max: RoomStreamItemMaxAggregateOutputType | null
  }

  type GetRoomStreamItemGroupByPayload<T extends RoomStreamItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomStreamItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomStreamItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomStreamItemGroupByOutputType[P]>
            : GetScalarType<T[P], RoomStreamItemGroupByOutputType[P]>
        }
      >
    >


  export type RoomStreamItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    mediaUrls?: boolean
    url?: boolean
    title?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamItem"]>

  export type RoomStreamItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    mediaUrls?: boolean
    url?: boolean
    title?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamItem"]>

  export type RoomStreamItemSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    content?: boolean
    mediaUrls?: boolean
    url?: boolean
    title?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomStreamItem"]>

  export type RoomStreamItemSelectScalar = {
    id?: boolean
    type?: boolean
    content?: boolean
    mediaUrls?: boolean
    url?: boolean
    title?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
  }

  export type RoomStreamItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "content" | "mediaUrls" | "url" | "title" | "roomId" | "authorId" | "createdAt", ExtArgs["result"]["roomStreamItem"]>
  export type RoomStreamItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomStreamItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomStreamItemIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomStreamItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomStreamItem"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      content: string | null
      mediaUrls: string[]
      url: string | null
      title: string | null
      roomId: string
      authorId: string
      createdAt: Date
    }, ExtArgs["result"]["roomStreamItem"]>
    composites: {}
  }

  type RoomStreamItemGetPayload<S extends boolean | null | undefined | RoomStreamItemDefaultArgs> = $Result.GetResult<Prisma.$RoomStreamItemPayload, S>

  type RoomStreamItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomStreamItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomStreamItemCountAggregateInputType | true
    }

  export interface RoomStreamItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomStreamItem'], meta: { name: 'RoomStreamItem' } }
    /**
     * Find zero or one RoomStreamItem that matches the filter.
     * @param {RoomStreamItemFindUniqueArgs} args - Arguments to find a RoomStreamItem
     * @example
     * // Get one RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomStreamItemFindUniqueArgs>(args: SelectSubset<T, RoomStreamItemFindUniqueArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomStreamItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomStreamItemFindUniqueOrThrowArgs} args - Arguments to find a RoomStreamItem
     * @example
     * // Get one RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomStreamItemFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomStreamItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStreamItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemFindFirstArgs} args - Arguments to find a RoomStreamItem
     * @example
     * // Get one RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomStreamItemFindFirstArgs>(args?: SelectSubset<T, RoomStreamItemFindFirstArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomStreamItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemFindFirstOrThrowArgs} args - Arguments to find a RoomStreamItem
     * @example
     * // Get one RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomStreamItemFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomStreamItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomStreamItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomStreamItems
     * const roomStreamItems = await prisma.roomStreamItem.findMany()
     * 
     * // Get first 10 RoomStreamItems
     * const roomStreamItems = await prisma.roomStreamItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomStreamItemWithIdOnly = await prisma.roomStreamItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomStreamItemFindManyArgs>(args?: SelectSubset<T, RoomStreamItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomStreamItem.
     * @param {RoomStreamItemCreateArgs} args - Arguments to create a RoomStreamItem.
     * @example
     * // Create one RoomStreamItem
     * const RoomStreamItem = await prisma.roomStreamItem.create({
     *   data: {
     *     // ... data to create a RoomStreamItem
     *   }
     * })
     * 
     */
    create<T extends RoomStreamItemCreateArgs>(args: SelectSubset<T, RoomStreamItemCreateArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomStreamItems.
     * @param {RoomStreamItemCreateManyArgs} args - Arguments to create many RoomStreamItems.
     * @example
     * // Create many RoomStreamItems
     * const roomStreamItem = await prisma.roomStreamItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomStreamItemCreateManyArgs>(args?: SelectSubset<T, RoomStreamItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomStreamItems and returns the data saved in the database.
     * @param {RoomStreamItemCreateManyAndReturnArgs} args - Arguments to create many RoomStreamItems.
     * @example
     * // Create many RoomStreamItems
     * const roomStreamItem = await prisma.roomStreamItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomStreamItems and only return the `id`
     * const roomStreamItemWithIdOnly = await prisma.roomStreamItem.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomStreamItemCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomStreamItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomStreamItem.
     * @param {RoomStreamItemDeleteArgs} args - Arguments to delete one RoomStreamItem.
     * @example
     * // Delete one RoomStreamItem
     * const RoomStreamItem = await prisma.roomStreamItem.delete({
     *   where: {
     *     // ... filter to delete one RoomStreamItem
     *   }
     * })
     * 
     */
    delete<T extends RoomStreamItemDeleteArgs>(args: SelectSubset<T, RoomStreamItemDeleteArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomStreamItem.
     * @param {RoomStreamItemUpdateArgs} args - Arguments to update one RoomStreamItem.
     * @example
     * // Update one RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomStreamItemUpdateArgs>(args: SelectSubset<T, RoomStreamItemUpdateArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomStreamItems.
     * @param {RoomStreamItemDeleteManyArgs} args - Arguments to filter RoomStreamItems to delete.
     * @example
     * // Delete a few RoomStreamItems
     * const { count } = await prisma.roomStreamItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomStreamItemDeleteManyArgs>(args?: SelectSubset<T, RoomStreamItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreamItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomStreamItems
     * const roomStreamItem = await prisma.roomStreamItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomStreamItemUpdateManyArgs>(args: SelectSubset<T, RoomStreamItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomStreamItems and returns the data updated in the database.
     * @param {RoomStreamItemUpdateManyAndReturnArgs} args - Arguments to update many RoomStreamItems.
     * @example
     * // Update many RoomStreamItems
     * const roomStreamItem = await prisma.roomStreamItem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomStreamItems and only return the `id`
     * const roomStreamItemWithIdOnly = await prisma.roomStreamItem.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomStreamItemUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomStreamItemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomStreamItem.
     * @param {RoomStreamItemUpsertArgs} args - Arguments to update or create a RoomStreamItem.
     * @example
     * // Update or create a RoomStreamItem
     * const roomStreamItem = await prisma.roomStreamItem.upsert({
     *   create: {
     *     // ... data to create a RoomStreamItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomStreamItem we want to update
     *   }
     * })
     */
    upsert<T extends RoomStreamItemUpsertArgs>(args: SelectSubset<T, RoomStreamItemUpsertArgs<ExtArgs>>): Prisma__RoomStreamItemClient<$Result.GetResult<Prisma.$RoomStreamItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomStreamItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemCountArgs} args - Arguments to filter RoomStreamItems to count.
     * @example
     * // Count the number of RoomStreamItems
     * const count = await prisma.roomStreamItem.count({
     *   where: {
     *     // ... the filter for the RoomStreamItems we want to count
     *   }
     * })
    **/
    count<T extends RoomStreamItemCountArgs>(
      args?: Subset<T, RoomStreamItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomStreamItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomStreamItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomStreamItemAggregateArgs>(args: Subset<T, RoomStreamItemAggregateArgs>): Prisma.PrismaPromise<GetRoomStreamItemAggregateType<T>>

    /**
     * Group by RoomStreamItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomStreamItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomStreamItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomStreamItemGroupByArgs['orderBy'] }
        : { orderBy?: RoomStreamItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomStreamItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomStreamItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomStreamItem model
   */
  readonly fields: RoomStreamItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomStreamItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomStreamItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomStreamItem model
   */
  interface RoomStreamItemFieldRefs {
    readonly id: FieldRef<"RoomStreamItem", 'String'>
    readonly type: FieldRef<"RoomStreamItem", 'String'>
    readonly content: FieldRef<"RoomStreamItem", 'String'>
    readonly mediaUrls: FieldRef<"RoomStreamItem", 'String[]'>
    readonly url: FieldRef<"RoomStreamItem", 'String'>
    readonly title: FieldRef<"RoomStreamItem", 'String'>
    readonly roomId: FieldRef<"RoomStreamItem", 'String'>
    readonly authorId: FieldRef<"RoomStreamItem", 'String'>
    readonly createdAt: FieldRef<"RoomStreamItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomStreamItem findUnique
   */
  export type RoomStreamItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamItem to fetch.
     */
    where: RoomStreamItemWhereUniqueInput
  }

  /**
   * RoomStreamItem findUniqueOrThrow
   */
  export type RoomStreamItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamItem to fetch.
     */
    where: RoomStreamItemWhereUniqueInput
  }

  /**
   * RoomStreamItem findFirst
   */
  export type RoomStreamItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamItem to fetch.
     */
    where?: RoomStreamItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamItems to fetch.
     */
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreamItems.
     */
    cursor?: RoomStreamItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreamItems.
     */
    distinct?: RoomStreamItemScalarFieldEnum | RoomStreamItemScalarFieldEnum[]
  }

  /**
   * RoomStreamItem findFirstOrThrow
   */
  export type RoomStreamItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamItem to fetch.
     */
    where?: RoomStreamItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamItems to fetch.
     */
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomStreamItems.
     */
    cursor?: RoomStreamItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomStreamItems.
     */
    distinct?: RoomStreamItemScalarFieldEnum | RoomStreamItemScalarFieldEnum[]
  }

  /**
   * RoomStreamItem findMany
   */
  export type RoomStreamItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter, which RoomStreamItems to fetch.
     */
    where?: RoomStreamItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomStreamItems to fetch.
     */
    orderBy?: RoomStreamItemOrderByWithRelationInput | RoomStreamItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomStreamItems.
     */
    cursor?: RoomStreamItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomStreamItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomStreamItems.
     */
    skip?: number
    distinct?: RoomStreamItemScalarFieldEnum | RoomStreamItemScalarFieldEnum[]
  }

  /**
   * RoomStreamItem create
   */
  export type RoomStreamItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomStreamItem.
     */
    data: XOR<RoomStreamItemCreateInput, RoomStreamItemUncheckedCreateInput>
  }

  /**
   * RoomStreamItem createMany
   */
  export type RoomStreamItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomStreamItems.
     */
    data: RoomStreamItemCreateManyInput | RoomStreamItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomStreamItem createManyAndReturn
   */
  export type RoomStreamItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * The data used to create many RoomStreamItems.
     */
    data: RoomStreamItemCreateManyInput | RoomStreamItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStreamItem update
   */
  export type RoomStreamItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomStreamItem.
     */
    data: XOR<RoomStreamItemUpdateInput, RoomStreamItemUncheckedUpdateInput>
    /**
     * Choose, which RoomStreamItem to update.
     */
    where: RoomStreamItemWhereUniqueInput
  }

  /**
   * RoomStreamItem updateMany
   */
  export type RoomStreamItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomStreamItems.
     */
    data: XOR<RoomStreamItemUpdateManyMutationInput, RoomStreamItemUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreamItems to update
     */
    where?: RoomStreamItemWhereInput
    /**
     * Limit how many RoomStreamItems to update.
     */
    limit?: number
  }

  /**
   * RoomStreamItem updateManyAndReturn
   */
  export type RoomStreamItemUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * The data used to update RoomStreamItems.
     */
    data: XOR<RoomStreamItemUpdateManyMutationInput, RoomStreamItemUncheckedUpdateManyInput>
    /**
     * Filter which RoomStreamItems to update
     */
    where?: RoomStreamItemWhereInput
    /**
     * Limit how many RoomStreamItems to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomStreamItem upsert
   */
  export type RoomStreamItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomStreamItem to update in case it exists.
     */
    where: RoomStreamItemWhereUniqueInput
    /**
     * In case the RoomStreamItem found by the `where` argument doesn't exist, create a new RoomStreamItem with this data.
     */
    create: XOR<RoomStreamItemCreateInput, RoomStreamItemUncheckedCreateInput>
    /**
     * In case the RoomStreamItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomStreamItemUpdateInput, RoomStreamItemUncheckedUpdateInput>
  }

  /**
   * RoomStreamItem delete
   */
  export type RoomStreamItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
    /**
     * Filter which RoomStreamItem to delete.
     */
    where: RoomStreamItemWhereUniqueInput
  }

  /**
   * RoomStreamItem deleteMany
   */
  export type RoomStreamItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomStreamItems to delete
     */
    where?: RoomStreamItemWhereInput
    /**
     * Limit how many RoomStreamItems to delete.
     */
    limit?: number
  }

  /**
   * RoomStreamItem without action
   */
  export type RoomStreamItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomStreamItem
     */
    select?: RoomStreamItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomStreamItem
     */
    omit?: RoomStreamItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomStreamItemInclude<ExtArgs> | null
  }


  /**
   * Model RoomNews
   */

  export type AggregateRoomNews = {
    _count: RoomNewsCountAggregateOutputType | null
    _min: RoomNewsMinAggregateOutputType | null
    _max: RoomNewsMaxAggregateOutputType | null
  }

  export type RoomNewsMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
  }

  export type RoomNewsMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
  }

  export type RoomNewsCountAggregateOutputType = {
    id: number
    title: number
    content: number
    roomId: number
    authorId: number
    createdAt: number
    _all: number
  }


  export type RoomNewsMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
  }

  export type RoomNewsMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
  }

  export type RoomNewsCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
    _all?: true
  }

  export type RoomNewsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomNews to aggregate.
     */
    where?: RoomNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNews to fetch.
     */
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomNews
    **/
    _count?: true | RoomNewsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomNewsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomNewsMaxAggregateInputType
  }

  export type GetRoomNewsAggregateType<T extends RoomNewsAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomNews]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomNews[P]>
      : GetScalarType<T[P], AggregateRoomNews[P]>
  }




  export type RoomNewsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNewsWhereInput
    orderBy?: RoomNewsOrderByWithAggregationInput | RoomNewsOrderByWithAggregationInput[]
    by: RoomNewsScalarFieldEnum[] | RoomNewsScalarFieldEnum
    having?: RoomNewsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomNewsCountAggregateInputType | true
    _min?: RoomNewsMinAggregateInputType
    _max?: RoomNewsMaxAggregateInputType
  }

  export type RoomNewsGroupByOutputType = {
    id: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt: Date
    _count: RoomNewsCountAggregateOutputType | null
    _min: RoomNewsMinAggregateOutputType | null
    _max: RoomNewsMaxAggregateOutputType | null
  }

  type GetRoomNewsGroupByPayload<T extends RoomNewsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomNewsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomNewsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomNewsGroupByOutputType[P]>
            : GetScalarType<T[P], RoomNewsGroupByOutputType[P]>
        }
      >
    >


  export type RoomNewsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNews"]>

  export type RoomNewsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNews"]>

  export type RoomNewsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNews"]>

  export type RoomNewsSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
  }

  export type RoomNewsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "roomId" | "authorId" | "createdAt", ExtArgs["result"]["roomNews"]>
  export type RoomNewsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomNewsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomNewsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomNewsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomNews"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      roomId: string
      authorId: string
      createdAt: Date
    }, ExtArgs["result"]["roomNews"]>
    composites: {}
  }

  type RoomNewsGetPayload<S extends boolean | null | undefined | RoomNewsDefaultArgs> = $Result.GetResult<Prisma.$RoomNewsPayload, S>

  type RoomNewsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomNewsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomNewsCountAggregateInputType | true
    }

  export interface RoomNewsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomNews'], meta: { name: 'RoomNews' } }
    /**
     * Find zero or one RoomNews that matches the filter.
     * @param {RoomNewsFindUniqueArgs} args - Arguments to find a RoomNews
     * @example
     * // Get one RoomNews
     * const roomNews = await prisma.roomNews.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomNewsFindUniqueArgs>(args: SelectSubset<T, RoomNewsFindUniqueArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomNews that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomNewsFindUniqueOrThrowArgs} args - Arguments to find a RoomNews
     * @example
     * // Get one RoomNews
     * const roomNews = await prisma.roomNews.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomNewsFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomNewsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsFindFirstArgs} args - Arguments to find a RoomNews
     * @example
     * // Get one RoomNews
     * const roomNews = await prisma.roomNews.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomNewsFindFirstArgs>(args?: SelectSubset<T, RoomNewsFindFirstArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomNews that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsFindFirstOrThrowArgs} args - Arguments to find a RoomNews
     * @example
     * // Get one RoomNews
     * const roomNews = await prisma.roomNews.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomNewsFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomNewsFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomNews that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomNews
     * const roomNews = await prisma.roomNews.findMany()
     * 
     * // Get first 10 RoomNews
     * const roomNews = await prisma.roomNews.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomNewsWithIdOnly = await prisma.roomNews.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomNewsFindManyArgs>(args?: SelectSubset<T, RoomNewsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomNews.
     * @param {RoomNewsCreateArgs} args - Arguments to create a RoomNews.
     * @example
     * // Create one RoomNews
     * const RoomNews = await prisma.roomNews.create({
     *   data: {
     *     // ... data to create a RoomNews
     *   }
     * })
     * 
     */
    create<T extends RoomNewsCreateArgs>(args: SelectSubset<T, RoomNewsCreateArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomNews.
     * @param {RoomNewsCreateManyArgs} args - Arguments to create many RoomNews.
     * @example
     * // Create many RoomNews
     * const roomNews = await prisma.roomNews.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomNewsCreateManyArgs>(args?: SelectSubset<T, RoomNewsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomNews and returns the data saved in the database.
     * @param {RoomNewsCreateManyAndReturnArgs} args - Arguments to create many RoomNews.
     * @example
     * // Create many RoomNews
     * const roomNews = await prisma.roomNews.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomNews and only return the `id`
     * const roomNewsWithIdOnly = await prisma.roomNews.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomNewsCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomNewsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomNews.
     * @param {RoomNewsDeleteArgs} args - Arguments to delete one RoomNews.
     * @example
     * // Delete one RoomNews
     * const RoomNews = await prisma.roomNews.delete({
     *   where: {
     *     // ... filter to delete one RoomNews
     *   }
     * })
     * 
     */
    delete<T extends RoomNewsDeleteArgs>(args: SelectSubset<T, RoomNewsDeleteArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomNews.
     * @param {RoomNewsUpdateArgs} args - Arguments to update one RoomNews.
     * @example
     * // Update one RoomNews
     * const roomNews = await prisma.roomNews.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomNewsUpdateArgs>(args: SelectSubset<T, RoomNewsUpdateArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomNews.
     * @param {RoomNewsDeleteManyArgs} args - Arguments to filter RoomNews to delete.
     * @example
     * // Delete a few RoomNews
     * const { count } = await prisma.roomNews.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomNewsDeleteManyArgs>(args?: SelectSubset<T, RoomNewsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomNews
     * const roomNews = await prisma.roomNews.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomNewsUpdateManyArgs>(args: SelectSubset<T, RoomNewsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomNews and returns the data updated in the database.
     * @param {RoomNewsUpdateManyAndReturnArgs} args - Arguments to update many RoomNews.
     * @example
     * // Update many RoomNews
     * const roomNews = await prisma.roomNews.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomNews and only return the `id`
     * const roomNewsWithIdOnly = await prisma.roomNews.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomNewsUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomNewsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomNews.
     * @param {RoomNewsUpsertArgs} args - Arguments to update or create a RoomNews.
     * @example
     * // Update or create a RoomNews
     * const roomNews = await prisma.roomNews.upsert({
     *   create: {
     *     // ... data to create a RoomNews
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomNews we want to update
     *   }
     * })
     */
    upsert<T extends RoomNewsUpsertArgs>(args: SelectSubset<T, RoomNewsUpsertArgs<ExtArgs>>): Prisma__RoomNewsClient<$Result.GetResult<Prisma.$RoomNewsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsCountArgs} args - Arguments to filter RoomNews to count.
     * @example
     * // Count the number of RoomNews
     * const count = await prisma.roomNews.count({
     *   where: {
     *     // ... the filter for the RoomNews we want to count
     *   }
     * })
    **/
    count<T extends RoomNewsCountArgs>(
      args?: Subset<T, RoomNewsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomNewsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomNewsAggregateArgs>(args: Subset<T, RoomNewsAggregateArgs>): Prisma.PrismaPromise<GetRoomNewsAggregateType<T>>

    /**
     * Group by RoomNews.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNewsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomNewsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomNewsGroupByArgs['orderBy'] }
        : { orderBy?: RoomNewsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomNewsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomNewsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomNews model
   */
  readonly fields: RoomNewsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomNews.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomNewsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomNews model
   */
  interface RoomNewsFieldRefs {
    readonly id: FieldRef<"RoomNews", 'String'>
    readonly title: FieldRef<"RoomNews", 'String'>
    readonly content: FieldRef<"RoomNews", 'String'>
    readonly roomId: FieldRef<"RoomNews", 'String'>
    readonly authorId: FieldRef<"RoomNews", 'String'>
    readonly createdAt: FieldRef<"RoomNews", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomNews findUnique
   */
  export type RoomNewsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter, which RoomNews to fetch.
     */
    where: RoomNewsWhereUniqueInput
  }

  /**
   * RoomNews findUniqueOrThrow
   */
  export type RoomNewsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter, which RoomNews to fetch.
     */
    where: RoomNewsWhereUniqueInput
  }

  /**
   * RoomNews findFirst
   */
  export type RoomNewsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter, which RoomNews to fetch.
     */
    where?: RoomNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNews to fetch.
     */
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomNews.
     */
    cursor?: RoomNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomNews.
     */
    distinct?: RoomNewsScalarFieldEnum | RoomNewsScalarFieldEnum[]
  }

  /**
   * RoomNews findFirstOrThrow
   */
  export type RoomNewsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter, which RoomNews to fetch.
     */
    where?: RoomNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNews to fetch.
     */
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomNews.
     */
    cursor?: RoomNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNews.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomNews.
     */
    distinct?: RoomNewsScalarFieldEnum | RoomNewsScalarFieldEnum[]
  }

  /**
   * RoomNews findMany
   */
  export type RoomNewsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter, which RoomNews to fetch.
     */
    where?: RoomNewsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNews to fetch.
     */
    orderBy?: RoomNewsOrderByWithRelationInput | RoomNewsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomNews.
     */
    cursor?: RoomNewsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNews from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNews.
     */
    skip?: number
    distinct?: RoomNewsScalarFieldEnum | RoomNewsScalarFieldEnum[]
  }

  /**
   * RoomNews create
   */
  export type RoomNewsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomNews.
     */
    data: XOR<RoomNewsCreateInput, RoomNewsUncheckedCreateInput>
  }

  /**
   * RoomNews createMany
   */
  export type RoomNewsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomNews.
     */
    data: RoomNewsCreateManyInput | RoomNewsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomNews createManyAndReturn
   */
  export type RoomNewsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * The data used to create many RoomNews.
     */
    data: RoomNewsCreateManyInput | RoomNewsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomNews update
   */
  export type RoomNewsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomNews.
     */
    data: XOR<RoomNewsUpdateInput, RoomNewsUncheckedUpdateInput>
    /**
     * Choose, which RoomNews to update.
     */
    where: RoomNewsWhereUniqueInput
  }

  /**
   * RoomNews updateMany
   */
  export type RoomNewsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomNews.
     */
    data: XOR<RoomNewsUpdateManyMutationInput, RoomNewsUncheckedUpdateManyInput>
    /**
     * Filter which RoomNews to update
     */
    where?: RoomNewsWhereInput
    /**
     * Limit how many RoomNews to update.
     */
    limit?: number
  }

  /**
   * RoomNews updateManyAndReturn
   */
  export type RoomNewsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * The data used to update RoomNews.
     */
    data: XOR<RoomNewsUpdateManyMutationInput, RoomNewsUncheckedUpdateManyInput>
    /**
     * Filter which RoomNews to update
     */
    where?: RoomNewsWhereInput
    /**
     * Limit how many RoomNews to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomNews upsert
   */
  export type RoomNewsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomNews to update in case it exists.
     */
    where: RoomNewsWhereUniqueInput
    /**
     * In case the RoomNews found by the `where` argument doesn't exist, create a new RoomNews with this data.
     */
    create: XOR<RoomNewsCreateInput, RoomNewsUncheckedCreateInput>
    /**
     * In case the RoomNews was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomNewsUpdateInput, RoomNewsUncheckedUpdateInput>
  }

  /**
   * RoomNews delete
   */
  export type RoomNewsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
    /**
     * Filter which RoomNews to delete.
     */
    where: RoomNewsWhereUniqueInput
  }

  /**
   * RoomNews deleteMany
   */
  export type RoomNewsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomNews to delete
     */
    where?: RoomNewsWhereInput
    /**
     * Limit how many RoomNews to delete.
     */
    limit?: number
  }

  /**
   * RoomNews without action
   */
  export type RoomNewsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNews
     */
    select?: RoomNewsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNews
     */
    omit?: RoomNewsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNewsInclude<ExtArgs> | null
  }


  /**
   * Model RoomNote
   */

  export type AggregateRoomNote = {
    _count: RoomNoteCountAggregateOutputType | null
    _min: RoomNoteMinAggregateOutputType | null
    _max: RoomNoteMaxAggregateOutputType | null
  }

  export type RoomNoteMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomNoteMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    roomId: string | null
    authorId: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type RoomNoteCountAggregateOutputType = {
    id: number
    title: number
    content: number
    roomId: number
    authorId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type RoomNoteMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomNoteMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type RoomNoteCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    roomId?: true
    authorId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type RoomNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomNote to aggregate.
     */
    where?: RoomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNotes to fetch.
     */
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RoomNotes
    **/
    _count?: true | RoomNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomNoteMaxAggregateInputType
  }

  export type GetRoomNoteAggregateType<T extends RoomNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateRoomNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoomNote[P]>
      : GetScalarType<T[P], AggregateRoomNote[P]>
  }




  export type RoomNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomNoteWhereInput
    orderBy?: RoomNoteOrderByWithAggregationInput | RoomNoteOrderByWithAggregationInput[]
    by: RoomNoteScalarFieldEnum[] | RoomNoteScalarFieldEnum
    having?: RoomNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomNoteCountAggregateInputType | true
    _min?: RoomNoteMinAggregateInputType
    _max?: RoomNoteMaxAggregateInputType
  }

  export type RoomNoteGroupByOutputType = {
    id: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt: Date
    updatedAt: Date
    _count: RoomNoteCountAggregateOutputType | null
    _min: RoomNoteMinAggregateOutputType | null
    _max: RoomNoteMaxAggregateOutputType | null
  }

  type GetRoomNoteGroupByPayload<T extends RoomNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomNoteGroupByOutputType[P]>
            : GetScalarType<T[P], RoomNoteGroupByOutputType[P]>
        }
      >
    >


  export type RoomNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNote"]>

  export type RoomNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNote"]>

  export type RoomNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["roomNote"]>

  export type RoomNoteSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    roomId?: boolean
    authorId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type RoomNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "roomId" | "authorId" | "createdAt" | "updatedAt", ExtArgs["result"]["roomNote"]>
  export type RoomNoteInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomNoteIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RoomNoteIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RoomNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RoomNote"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      roomId: string
      authorId: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["roomNote"]>
    composites: {}
  }

  type RoomNoteGetPayload<S extends boolean | null | undefined | RoomNoteDefaultArgs> = $Result.GetResult<Prisma.$RoomNotePayload, S>

  type RoomNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RoomNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RoomNoteCountAggregateInputType | true
    }

  export interface RoomNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RoomNote'], meta: { name: 'RoomNote' } }
    /**
     * Find zero or one RoomNote that matches the filter.
     * @param {RoomNoteFindUniqueArgs} args - Arguments to find a RoomNote
     * @example
     * // Get one RoomNote
     * const roomNote = await prisma.roomNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RoomNoteFindUniqueArgs>(args: SelectSubset<T, RoomNoteFindUniqueArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RoomNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RoomNoteFindUniqueOrThrowArgs} args - Arguments to find a RoomNote
     * @example
     * // Get one RoomNote
     * const roomNote = await prisma.roomNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RoomNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, RoomNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteFindFirstArgs} args - Arguments to find a RoomNote
     * @example
     * // Get one RoomNote
     * const roomNote = await prisma.roomNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RoomNoteFindFirstArgs>(args?: SelectSubset<T, RoomNoteFindFirstArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RoomNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteFindFirstOrThrowArgs} args - Arguments to find a RoomNote
     * @example
     * // Get one RoomNote
     * const roomNote = await prisma.roomNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RoomNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, RoomNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RoomNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RoomNotes
     * const roomNotes = await prisma.roomNote.findMany()
     * 
     * // Get first 10 RoomNotes
     * const roomNotes = await prisma.roomNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomNoteWithIdOnly = await prisma.roomNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RoomNoteFindManyArgs>(args?: SelectSubset<T, RoomNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RoomNote.
     * @param {RoomNoteCreateArgs} args - Arguments to create a RoomNote.
     * @example
     * // Create one RoomNote
     * const RoomNote = await prisma.roomNote.create({
     *   data: {
     *     // ... data to create a RoomNote
     *   }
     * })
     * 
     */
    create<T extends RoomNoteCreateArgs>(args: SelectSubset<T, RoomNoteCreateArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RoomNotes.
     * @param {RoomNoteCreateManyArgs} args - Arguments to create many RoomNotes.
     * @example
     * // Create many RoomNotes
     * const roomNote = await prisma.roomNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RoomNoteCreateManyArgs>(args?: SelectSubset<T, RoomNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RoomNotes and returns the data saved in the database.
     * @param {RoomNoteCreateManyAndReturnArgs} args - Arguments to create many RoomNotes.
     * @example
     * // Create many RoomNotes
     * const roomNote = await prisma.roomNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RoomNotes and only return the `id`
     * const roomNoteWithIdOnly = await prisma.roomNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RoomNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, RoomNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RoomNote.
     * @param {RoomNoteDeleteArgs} args - Arguments to delete one RoomNote.
     * @example
     * // Delete one RoomNote
     * const RoomNote = await prisma.roomNote.delete({
     *   where: {
     *     // ... filter to delete one RoomNote
     *   }
     * })
     * 
     */
    delete<T extends RoomNoteDeleteArgs>(args: SelectSubset<T, RoomNoteDeleteArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RoomNote.
     * @param {RoomNoteUpdateArgs} args - Arguments to update one RoomNote.
     * @example
     * // Update one RoomNote
     * const roomNote = await prisma.roomNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RoomNoteUpdateArgs>(args: SelectSubset<T, RoomNoteUpdateArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RoomNotes.
     * @param {RoomNoteDeleteManyArgs} args - Arguments to filter RoomNotes to delete.
     * @example
     * // Delete a few RoomNotes
     * const { count } = await prisma.roomNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RoomNoteDeleteManyArgs>(args?: SelectSubset<T, RoomNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RoomNotes
     * const roomNote = await prisma.roomNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RoomNoteUpdateManyArgs>(args: SelectSubset<T, RoomNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RoomNotes and returns the data updated in the database.
     * @param {RoomNoteUpdateManyAndReturnArgs} args - Arguments to update many RoomNotes.
     * @example
     * // Update many RoomNotes
     * const roomNote = await prisma.roomNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RoomNotes and only return the `id`
     * const roomNoteWithIdOnly = await prisma.roomNote.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RoomNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, RoomNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RoomNote.
     * @param {RoomNoteUpsertArgs} args - Arguments to update or create a RoomNote.
     * @example
     * // Update or create a RoomNote
     * const roomNote = await prisma.roomNote.upsert({
     *   create: {
     *     // ... data to create a RoomNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RoomNote we want to update
     *   }
     * })
     */
    upsert<T extends RoomNoteUpsertArgs>(args: SelectSubset<T, RoomNoteUpsertArgs<ExtArgs>>): Prisma__RoomNoteClient<$Result.GetResult<Prisma.$RoomNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RoomNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteCountArgs} args - Arguments to filter RoomNotes to count.
     * @example
     * // Count the number of RoomNotes
     * const count = await prisma.roomNote.count({
     *   where: {
     *     // ... the filter for the RoomNotes we want to count
     *   }
     * })
    **/
    count<T extends RoomNoteCountArgs>(
      args?: Subset<T, RoomNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RoomNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomNoteAggregateArgs>(args: Subset<T, RoomNoteAggregateArgs>): Prisma.PrismaPromise<GetRoomNoteAggregateType<T>>

    /**
     * Group by RoomNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomNoteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomNoteGroupByArgs['orderBy'] }
        : { orderBy?: RoomNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RoomNote model
   */
  readonly fields: RoomNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RoomNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RoomNote model
   */
  interface RoomNoteFieldRefs {
    readonly id: FieldRef<"RoomNote", 'String'>
    readonly title: FieldRef<"RoomNote", 'String'>
    readonly content: FieldRef<"RoomNote", 'String'>
    readonly roomId: FieldRef<"RoomNote", 'String'>
    readonly authorId: FieldRef<"RoomNote", 'String'>
    readonly createdAt: FieldRef<"RoomNote", 'DateTime'>
    readonly updatedAt: FieldRef<"RoomNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RoomNote findUnique
   */
  export type RoomNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomNote to fetch.
     */
    where: RoomNoteWhereUniqueInput
  }

  /**
   * RoomNote findUniqueOrThrow
   */
  export type RoomNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomNote to fetch.
     */
    where: RoomNoteWhereUniqueInput
  }

  /**
   * RoomNote findFirst
   */
  export type RoomNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomNote to fetch.
     */
    where?: RoomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNotes to fetch.
     */
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomNotes.
     */
    cursor?: RoomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomNotes.
     */
    distinct?: RoomNoteScalarFieldEnum | RoomNoteScalarFieldEnum[]
  }

  /**
   * RoomNote findFirstOrThrow
   */
  export type RoomNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomNote to fetch.
     */
    where?: RoomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNotes to fetch.
     */
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RoomNotes.
     */
    cursor?: RoomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RoomNotes.
     */
    distinct?: RoomNoteScalarFieldEnum | RoomNoteScalarFieldEnum[]
  }

  /**
   * RoomNote findMany
   */
  export type RoomNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter, which RoomNotes to fetch.
     */
    where?: RoomNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RoomNotes to fetch.
     */
    orderBy?: RoomNoteOrderByWithRelationInput | RoomNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RoomNotes.
     */
    cursor?: RoomNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RoomNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RoomNotes.
     */
    skip?: number
    distinct?: RoomNoteScalarFieldEnum | RoomNoteScalarFieldEnum[]
  }

  /**
   * RoomNote create
   */
  export type RoomNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * The data needed to create a RoomNote.
     */
    data: XOR<RoomNoteCreateInput, RoomNoteUncheckedCreateInput>
  }

  /**
   * RoomNote createMany
   */
  export type RoomNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RoomNotes.
     */
    data: RoomNoteCreateManyInput | RoomNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RoomNote createManyAndReturn
   */
  export type RoomNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * The data used to create many RoomNotes.
     */
    data: RoomNoteCreateManyInput | RoomNoteCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomNote update
   */
  export type RoomNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * The data needed to update a RoomNote.
     */
    data: XOR<RoomNoteUpdateInput, RoomNoteUncheckedUpdateInput>
    /**
     * Choose, which RoomNote to update.
     */
    where: RoomNoteWhereUniqueInput
  }

  /**
   * RoomNote updateMany
   */
  export type RoomNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RoomNotes.
     */
    data: XOR<RoomNoteUpdateManyMutationInput, RoomNoteUncheckedUpdateManyInput>
    /**
     * Filter which RoomNotes to update
     */
    where?: RoomNoteWhereInput
    /**
     * Limit how many RoomNotes to update.
     */
    limit?: number
  }

  /**
   * RoomNote updateManyAndReturn
   */
  export type RoomNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * The data used to update RoomNotes.
     */
    data: XOR<RoomNoteUpdateManyMutationInput, RoomNoteUncheckedUpdateManyInput>
    /**
     * Filter which RoomNotes to update
     */
    where?: RoomNoteWhereInput
    /**
     * Limit how many RoomNotes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RoomNote upsert
   */
  export type RoomNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * The filter to search for the RoomNote to update in case it exists.
     */
    where: RoomNoteWhereUniqueInput
    /**
     * In case the RoomNote found by the `where` argument doesn't exist, create a new RoomNote with this data.
     */
    create: XOR<RoomNoteCreateInput, RoomNoteUncheckedCreateInput>
    /**
     * In case the RoomNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomNoteUpdateInput, RoomNoteUncheckedUpdateInput>
  }

  /**
   * RoomNote delete
   */
  export type RoomNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
    /**
     * Filter which RoomNote to delete.
     */
    where: RoomNoteWhereUniqueInput
  }

  /**
   * RoomNote deleteMany
   */
  export type RoomNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RoomNotes to delete
     */
    where?: RoomNoteWhereInput
    /**
     * Limit how many RoomNotes to delete.
     */
    limit?: number
  }

  /**
   * RoomNote without action
   */
  export type RoomNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomNote
     */
    select?: RoomNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RoomNote
     */
    omit?: RoomNoteOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomNoteInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    username: 'username',
    password: 'password',
    role: 'role',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VibeScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    keywords: 'keywords',
    images: 'images',
    videoUrls: 'videoUrls',
    musicUrls: 'musicUrls',
    roomConfig: 'roomConfig',
    inMainFeed: 'inMainFeed',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VibeScalarFieldEnum = (typeof VibeScalarFieldEnum)[keyof typeof VibeScalarFieldEnum]


  export const VibeUpdateScalarFieldEnum: {
    id: 'id',
    content: 'content',
    mediaUrls: 'mediaUrls',
    vibeId: 'vibeId',
    createdAt: 'createdAt'
  };

  export type VibeUpdateScalarFieldEnum = (typeof VibeUpdateScalarFieldEnum)[keyof typeof VibeUpdateScalarFieldEnum]


  export const HashtagScalarFieldEnum: {
    id: 'id',
    name: 'name',
    useCount: 'useCount',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt'
  };

  export type HashtagScalarFieldEnum = (typeof HashtagScalarFieldEnum)[keyof typeof HashtagScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    poster: 'poster',
    originVibeId: 'originVibeId',
    isPublic: 'isPublic',
    tags: 'tags',
    images: 'images',
    videoUrls: 'videoUrls',
    musicUrls: 'musicUrls',
    youtubeUrls: 'youtubeUrls',
    roomConfig: 'roomConfig',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const RoomStreamItemScalarFieldEnum: {
    id: 'id',
    type: 'type',
    content: 'content',
    mediaUrls: 'mediaUrls',
    url: 'url',
    title: 'title',
    roomId: 'roomId',
    authorId: 'authorId',
    createdAt: 'createdAt'
  };

  export type RoomStreamItemScalarFieldEnum = (typeof RoomStreamItemScalarFieldEnum)[keyof typeof RoomStreamItemScalarFieldEnum]


  export const RoomNewsScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    roomId: 'roomId',
    authorId: 'authorId',
    createdAt: 'createdAt'
  };

  export type RoomNewsScalarFieldEnum = (typeof RoomNewsScalarFieldEnum)[keyof typeof RoomNewsScalarFieldEnum]


  export const RoomNoteScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    roomId: 'roomId',
    authorId: 'authorId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type RoomNoteScalarFieldEnum = (typeof RoomNoteScalarFieldEnum)[keyof typeof RoomNoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vibes?: VibeListRelationFilter
    rooms?: RoomListRelationFilter
    roomStreamItems?: RoomStreamItemListRelationFilter
    roomNews?: RoomNewsListRelationFilter
    roomNotes?: RoomNoteListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    vibes?: VibeOrderByRelationAggregateInput
    rooms?: RoomOrderByRelationAggregateInput
    roomStreamItems?: RoomStreamItemOrderByRelationAggregateInput
    roomNews?: RoomNewsOrderByRelationAggregateInput
    roomNotes?: RoomNoteOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    username?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    vibes?: VibeListRelationFilter
    rooms?: RoomListRelationFilter
    roomStreamItems?: RoomStreamItemListRelationFilter
    roomNews?: RoomNewsListRelationFilter
    roomNotes?: RoomNoteListRelationFilter
  }, "id" | "email" | "username">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type VibeWhereInput = {
    AND?: VibeWhereInput | VibeWhereInput[]
    OR?: VibeWhereInput[]
    NOT?: VibeWhereInput | VibeWhereInput[]
    id?: StringFilter<"Vibe"> | string
    title?: StringFilter<"Vibe"> | string
    content?: StringFilter<"Vibe"> | string
    keywords?: StringNullableListFilter<"Vibe">
    images?: StringNullableListFilter<"Vibe">
    videoUrls?: StringNullableListFilter<"Vibe">
    musicUrls?: StringNullableListFilter<"Vibe">
    roomConfig?: JsonNullableFilter<"Vibe">
    inMainFeed?: BoolFilter<"Vibe"> | boolean
    authorId?: StringFilter<"Vibe"> | string
    createdAt?: DateTimeFilter<"Vibe"> | Date | string
    updatedAt?: DateTimeFilter<"Vibe"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updates?: VibeUpdateListRelationFilter
  }

  export type VibeOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    roomConfig?: SortOrderInput | SortOrder
    inMainFeed?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    updates?: VibeUpdateOrderByRelationAggregateInput
  }

  export type VibeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VibeWhereInput | VibeWhereInput[]
    OR?: VibeWhereInput[]
    NOT?: VibeWhereInput | VibeWhereInput[]
    title?: StringFilter<"Vibe"> | string
    content?: StringFilter<"Vibe"> | string
    keywords?: StringNullableListFilter<"Vibe">
    images?: StringNullableListFilter<"Vibe">
    videoUrls?: StringNullableListFilter<"Vibe">
    musicUrls?: StringNullableListFilter<"Vibe">
    roomConfig?: JsonNullableFilter<"Vibe">
    inMainFeed?: BoolFilter<"Vibe"> | boolean
    authorId?: StringFilter<"Vibe"> | string
    createdAt?: DateTimeFilter<"Vibe"> | Date | string
    updatedAt?: DateTimeFilter<"Vibe"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    updates?: VibeUpdateListRelationFilter
  }, "id">

  export type VibeOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    roomConfig?: SortOrderInput | SortOrder
    inMainFeed?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: VibeCountOrderByAggregateInput
    _max?: VibeMaxOrderByAggregateInput
    _min?: VibeMinOrderByAggregateInput
  }

  export type VibeScalarWhereWithAggregatesInput = {
    AND?: VibeScalarWhereWithAggregatesInput | VibeScalarWhereWithAggregatesInput[]
    OR?: VibeScalarWhereWithAggregatesInput[]
    NOT?: VibeScalarWhereWithAggregatesInput | VibeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Vibe"> | string
    title?: StringWithAggregatesFilter<"Vibe"> | string
    content?: StringWithAggregatesFilter<"Vibe"> | string
    keywords?: StringNullableListFilter<"Vibe">
    images?: StringNullableListFilter<"Vibe">
    videoUrls?: StringNullableListFilter<"Vibe">
    musicUrls?: StringNullableListFilter<"Vibe">
    roomConfig?: JsonNullableWithAggregatesFilter<"Vibe">
    inMainFeed?: BoolWithAggregatesFilter<"Vibe"> | boolean
    authorId?: StringWithAggregatesFilter<"Vibe"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Vibe"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Vibe"> | Date | string
  }

  export type VibeUpdateWhereInput = {
    AND?: VibeUpdateWhereInput | VibeUpdateWhereInput[]
    OR?: VibeUpdateWhereInput[]
    NOT?: VibeUpdateWhereInput | VibeUpdateWhereInput[]
    id?: StringFilter<"VibeUpdate"> | string
    content?: StringFilter<"VibeUpdate"> | string
    mediaUrls?: StringNullableListFilter<"VibeUpdate">
    vibeId?: StringFilter<"VibeUpdate"> | string
    createdAt?: DateTimeFilter<"VibeUpdate"> | Date | string
    vibe?: XOR<VibeScalarRelationFilter, VibeWhereInput>
  }

  export type VibeUpdateOrderByWithRelationInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    vibeId?: SortOrder
    createdAt?: SortOrder
    vibe?: VibeOrderByWithRelationInput
  }

  export type VibeUpdateWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: VibeUpdateWhereInput | VibeUpdateWhereInput[]
    OR?: VibeUpdateWhereInput[]
    NOT?: VibeUpdateWhereInput | VibeUpdateWhereInput[]
    content?: StringFilter<"VibeUpdate"> | string
    mediaUrls?: StringNullableListFilter<"VibeUpdate">
    vibeId?: StringFilter<"VibeUpdate"> | string
    createdAt?: DateTimeFilter<"VibeUpdate"> | Date | string
    vibe?: XOR<VibeScalarRelationFilter, VibeWhereInput>
  }, "id">

  export type VibeUpdateOrderByWithAggregationInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    vibeId?: SortOrder
    createdAt?: SortOrder
    _count?: VibeUpdateCountOrderByAggregateInput
    _max?: VibeUpdateMaxOrderByAggregateInput
    _min?: VibeUpdateMinOrderByAggregateInput
  }

  export type VibeUpdateScalarWhereWithAggregatesInput = {
    AND?: VibeUpdateScalarWhereWithAggregatesInput | VibeUpdateScalarWhereWithAggregatesInput[]
    OR?: VibeUpdateScalarWhereWithAggregatesInput[]
    NOT?: VibeUpdateScalarWhereWithAggregatesInput | VibeUpdateScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"VibeUpdate"> | string
    content?: StringWithAggregatesFilter<"VibeUpdate"> | string
    mediaUrls?: StringNullableListFilter<"VibeUpdate">
    vibeId?: StringWithAggregatesFilter<"VibeUpdate"> | string
    createdAt?: DateTimeWithAggregatesFilter<"VibeUpdate"> | Date | string
  }

  export type HashtagWhereInput = {
    AND?: HashtagWhereInput | HashtagWhereInput[]
    OR?: HashtagWhereInput[]
    NOT?: HashtagWhereInput | HashtagWhereInput[]
    id?: StringFilter<"Hashtag"> | string
    name?: StringFilter<"Hashtag"> | string
    useCount?: IntFilter<"Hashtag"> | number
    lastUsedAt?: DateTimeFilter<"Hashtag"> | Date | string
    createdAt?: DateTimeFilter<"Hashtag"> | Date | string
  }

  export type HashtagOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    useCount?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type HashtagWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    name?: string
    AND?: HashtagWhereInput | HashtagWhereInput[]
    OR?: HashtagWhereInput[]
    NOT?: HashtagWhereInput | HashtagWhereInput[]
    useCount?: IntFilter<"Hashtag"> | number
    lastUsedAt?: DateTimeFilter<"Hashtag"> | Date | string
    createdAt?: DateTimeFilter<"Hashtag"> | Date | string
  }, "id" | "name">

  export type HashtagOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    useCount?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
    _count?: HashtagCountOrderByAggregateInput
    _avg?: HashtagAvgOrderByAggregateInput
    _max?: HashtagMaxOrderByAggregateInput
    _min?: HashtagMinOrderByAggregateInput
    _sum?: HashtagSumOrderByAggregateInput
  }

  export type HashtagScalarWhereWithAggregatesInput = {
    AND?: HashtagScalarWhereWithAggregatesInput | HashtagScalarWhereWithAggregatesInput[]
    OR?: HashtagScalarWhereWithAggregatesInput[]
    NOT?: HashtagScalarWhereWithAggregatesInput | HashtagScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Hashtag"> | string
    name?: StringWithAggregatesFilter<"Hashtag"> | string
    useCount?: IntWithAggregatesFilter<"Hashtag"> | number
    lastUsedAt?: DateTimeWithAggregatesFilter<"Hashtag"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"Hashtag"> | Date | string
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: StringFilter<"Room"> | string
    title?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    poster?: StringNullableFilter<"Room"> | string | null
    originVibeId?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    tags?: StringNullableListFilter<"Room">
    images?: StringNullableListFilter<"Room">
    videoUrls?: StringNullableListFilter<"Room">
    musicUrls?: StringNullableListFilter<"Room">
    youtubeUrls?: StringNullableListFilter<"Room">
    roomConfig?: JsonNullableFilter<"Room">
    authorId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    streamItems?: RoomStreamItemListRelationFilter
    news?: RoomNewsListRelationFilter
    notes?: RoomNoteListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    originVibeId?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    youtubeUrls?: SortOrder
    roomConfig?: SortOrderInput | SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    streamItems?: RoomStreamItemOrderByRelationAggregateInput
    news?: RoomNewsOrderByRelationAggregateInput
    notes?: RoomNoteOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    title?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    poster?: StringNullableFilter<"Room"> | string | null
    originVibeId?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    tags?: StringNullableListFilter<"Room">
    images?: StringNullableListFilter<"Room">
    videoUrls?: StringNullableListFilter<"Room">
    musicUrls?: StringNullableListFilter<"Room">
    youtubeUrls?: StringNullableListFilter<"Room">
    roomConfig?: JsonNullableFilter<"Room">
    authorId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    streamItems?: RoomStreamItemListRelationFilter
    news?: RoomNewsListRelationFilter
    notes?: RoomNoteListRelationFilter
  }, "id">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    poster?: SortOrderInput | SortOrder
    originVibeId?: SortOrderInput | SortOrder
    isPublic?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    youtubeUrls?: SortOrder
    roomConfig?: SortOrderInput | SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Room"> | string
    title?: StringWithAggregatesFilter<"Room"> | string
    description?: StringNullableWithAggregatesFilter<"Room"> | string | null
    poster?: StringNullableWithAggregatesFilter<"Room"> | string | null
    originVibeId?: StringNullableWithAggregatesFilter<"Room"> | string | null
    isPublic?: BoolWithAggregatesFilter<"Room"> | boolean
    tags?: StringNullableListFilter<"Room">
    images?: StringNullableListFilter<"Room">
    videoUrls?: StringNullableListFilter<"Room">
    musicUrls?: StringNullableListFilter<"Room">
    youtubeUrls?: StringNullableListFilter<"Room">
    roomConfig?: JsonNullableWithAggregatesFilter<"Room">
    authorId?: StringWithAggregatesFilter<"Room"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Room"> | Date | string
  }

  export type RoomStreamItemWhereInput = {
    AND?: RoomStreamItemWhereInput | RoomStreamItemWhereInput[]
    OR?: RoomStreamItemWhereInput[]
    NOT?: RoomStreamItemWhereInput | RoomStreamItemWhereInput[]
    id?: StringFilter<"RoomStreamItem"> | string
    type?: StringFilter<"RoomStreamItem"> | string
    content?: StringNullableFilter<"RoomStreamItem"> | string | null
    mediaUrls?: StringNullableListFilter<"RoomStreamItem">
    url?: StringNullableFilter<"RoomStreamItem"> | string | null
    title?: StringNullableFilter<"RoomStreamItem"> | string | null
    roomId?: StringFilter<"RoomStreamItem"> | string
    authorId?: StringFilter<"RoomStreamItem"> | string
    createdAt?: DateTimeFilter<"RoomStreamItem"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomStreamItemOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrderInput | SortOrder
    mediaUrls?: SortOrder
    url?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type RoomStreamItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomStreamItemWhereInput | RoomStreamItemWhereInput[]
    OR?: RoomStreamItemWhereInput[]
    NOT?: RoomStreamItemWhereInput | RoomStreamItemWhereInput[]
    type?: StringFilter<"RoomStreamItem"> | string
    content?: StringNullableFilter<"RoomStreamItem"> | string | null
    mediaUrls?: StringNullableListFilter<"RoomStreamItem">
    url?: StringNullableFilter<"RoomStreamItem"> | string | null
    title?: StringNullableFilter<"RoomStreamItem"> | string | null
    roomId?: StringFilter<"RoomStreamItem"> | string
    authorId?: StringFilter<"RoomStreamItem"> | string
    createdAt?: DateTimeFilter<"RoomStreamItem"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RoomStreamItemOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrderInput | SortOrder
    mediaUrls?: SortOrder
    url?: SortOrderInput | SortOrder
    title?: SortOrderInput | SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    _count?: RoomStreamItemCountOrderByAggregateInput
    _max?: RoomStreamItemMaxOrderByAggregateInput
    _min?: RoomStreamItemMinOrderByAggregateInput
  }

  export type RoomStreamItemScalarWhereWithAggregatesInput = {
    AND?: RoomStreamItemScalarWhereWithAggregatesInput | RoomStreamItemScalarWhereWithAggregatesInput[]
    OR?: RoomStreamItemScalarWhereWithAggregatesInput[]
    NOT?: RoomStreamItemScalarWhereWithAggregatesInput | RoomStreamItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomStreamItem"> | string
    type?: StringWithAggregatesFilter<"RoomStreamItem"> | string
    content?: StringNullableWithAggregatesFilter<"RoomStreamItem"> | string | null
    mediaUrls?: StringNullableListFilter<"RoomStreamItem">
    url?: StringNullableWithAggregatesFilter<"RoomStreamItem"> | string | null
    title?: StringNullableWithAggregatesFilter<"RoomStreamItem"> | string | null
    roomId?: StringWithAggregatesFilter<"RoomStreamItem"> | string
    authorId?: StringWithAggregatesFilter<"RoomStreamItem"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoomStreamItem"> | Date | string
  }

  export type RoomNewsWhereInput = {
    AND?: RoomNewsWhereInput | RoomNewsWhereInput[]
    OR?: RoomNewsWhereInput[]
    NOT?: RoomNewsWhereInput | RoomNewsWhereInput[]
    id?: StringFilter<"RoomNews"> | string
    title?: StringFilter<"RoomNews"> | string
    content?: StringFilter<"RoomNews"> | string
    roomId?: StringFilter<"RoomNews"> | string
    authorId?: StringFilter<"RoomNews"> | string
    createdAt?: DateTimeFilter<"RoomNews"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomNewsOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type RoomNewsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomNewsWhereInput | RoomNewsWhereInput[]
    OR?: RoomNewsWhereInput[]
    NOT?: RoomNewsWhereInput | RoomNewsWhereInput[]
    title?: StringFilter<"RoomNews"> | string
    content?: StringFilter<"RoomNews"> | string
    roomId?: StringFilter<"RoomNews"> | string
    authorId?: StringFilter<"RoomNews"> | string
    createdAt?: DateTimeFilter<"RoomNews"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RoomNewsOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    _count?: RoomNewsCountOrderByAggregateInput
    _max?: RoomNewsMaxOrderByAggregateInput
    _min?: RoomNewsMinOrderByAggregateInput
  }

  export type RoomNewsScalarWhereWithAggregatesInput = {
    AND?: RoomNewsScalarWhereWithAggregatesInput | RoomNewsScalarWhereWithAggregatesInput[]
    OR?: RoomNewsScalarWhereWithAggregatesInput[]
    NOT?: RoomNewsScalarWhereWithAggregatesInput | RoomNewsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomNews"> | string
    title?: StringWithAggregatesFilter<"RoomNews"> | string
    content?: StringWithAggregatesFilter<"RoomNews"> | string
    roomId?: StringWithAggregatesFilter<"RoomNews"> | string
    authorId?: StringWithAggregatesFilter<"RoomNews"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoomNews"> | Date | string
  }

  export type RoomNoteWhereInput = {
    AND?: RoomNoteWhereInput | RoomNoteWhereInput[]
    OR?: RoomNoteWhereInput[]
    NOT?: RoomNoteWhereInput | RoomNoteWhereInput[]
    id?: StringFilter<"RoomNote"> | string
    title?: StringFilter<"RoomNote"> | string
    content?: StringFilter<"RoomNote"> | string
    roomId?: StringFilter<"RoomNote"> | string
    authorId?: StringFilter<"RoomNote"> | string
    createdAt?: DateTimeFilter<"RoomNote"> | Date | string
    updatedAt?: DateTimeFilter<"RoomNote"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RoomNoteOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    room?: RoomOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
  }

  export type RoomNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: RoomNoteWhereInput | RoomNoteWhereInput[]
    OR?: RoomNoteWhereInput[]
    NOT?: RoomNoteWhereInput | RoomNoteWhereInput[]
    title?: StringFilter<"RoomNote"> | string
    content?: StringFilter<"RoomNote"> | string
    roomId?: StringFilter<"RoomNote"> | string
    authorId?: StringFilter<"RoomNote"> | string
    createdAt?: DateTimeFilter<"RoomNote"> | Date | string
    updatedAt?: DateTimeFilter<"RoomNote"> | Date | string
    room?: XOR<RoomScalarRelationFilter, RoomWhereInput>
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type RoomNoteOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: RoomNoteCountOrderByAggregateInput
    _max?: RoomNoteMaxOrderByAggregateInput
    _min?: RoomNoteMinOrderByAggregateInput
  }

  export type RoomNoteScalarWhereWithAggregatesInput = {
    AND?: RoomNoteScalarWhereWithAggregatesInput | RoomNoteScalarWhereWithAggregatesInput[]
    OR?: RoomNoteScalarWhereWithAggregatesInput[]
    NOT?: RoomNoteScalarWhereWithAggregatesInput | RoomNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RoomNote"> | string
    title?: StringWithAggregatesFilter<"RoomNote"> | string
    content?: StringWithAggregatesFilter<"RoomNote"> | string
    roomId?: StringWithAggregatesFilter<"RoomNote"> | string
    authorId?: StringWithAggregatesFilter<"RoomNote"> | string
    createdAt?: DateTimeWithAggregatesFilter<"RoomNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"RoomNote"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeCreateNestedManyWithoutAuthorInput
    rooms?: RoomCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeUncheckedCreateNestedManyWithoutAuthorInput
    rooms?: RoomUncheckedCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsUncheckedCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUncheckedUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeCreateInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutVibesInput
    updates?: VibeUpdateCreateNestedManyWithoutVibeInput
  }

  export type VibeUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    updates?: VibeUpdateUncheckedCreateNestedManyWithoutVibeInput
  }

  export type VibeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutVibesNestedInput
    updates?: VibeUpdateUpdateManyWithoutVibeNestedInput
  }

  export type VibeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updates?: VibeUpdateUncheckedUpdateManyWithoutVibeNestedInput
  }

  export type VibeCreateManyInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VibeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateCreateInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    createdAt?: Date | string
    vibe: VibeCreateNestedOneWithoutUpdatesInput
  }

  export type VibeUpdateUncheckedCreateInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    vibeId: string
    createdAt?: Date | string
  }

  export type VibeUpdateUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibe?: VibeUpdateOneRequiredWithoutUpdatesNestedInput
  }

  export type VibeUpdateUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    vibeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateCreateManyInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    vibeId: string
    createdAt?: Date | string
  }

  export type VibeUpdateUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    vibeId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HashtagCreateInput = {
    id?: string
    name: string
    useCount?: number
    lastUsedAt?: Date | string
    createdAt?: Date | string
  }

  export type HashtagUncheckedCreateInput = {
    id?: string
    name: string
    useCount?: number
    lastUsedAt?: Date | string
    createdAt?: Date | string
  }

  export type HashtagUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    useCount?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HashtagUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    useCount?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HashtagCreateManyInput = {
    id?: string
    name: string
    useCount?: number
    lastUsedAt?: Date | string
    createdAt?: Date | string
  }

  export type HashtagUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    useCount?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type HashtagUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    useCount?: IntFieldUpdateOperationsInput | number
    lastUsedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomCreateInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRoomsInput
    streamItems?: RoomStreamItemCreateNestedManyWithoutRoomInput
    news?: RoomNewsCreateNestedManyWithoutRoomInput
    notes?: RoomNoteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    streamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutRoomInput
    news?: RoomNewsUncheckedCreateNestedManyWithoutRoomInput
    notes?: RoomNoteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomsNestedInput
    streamItems?: RoomStreamItemUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streamItems?: RoomStreamItemUncheckedUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUncheckedUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemCreateInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    createdAt?: Date | string
    room: RoomCreateNestedOneWithoutStreamItemsInput
    author: UserCreateNestedOneWithoutRoomStreamItemsInput
  }

  export type RoomStreamItemUncheckedCreateInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    roomId: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomStreamItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutStreamItemsNestedInput
    author?: UserUpdateOneRequiredWithoutRoomStreamItemsNestedInput
  }

  export type RoomStreamItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemCreateManyInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    roomId: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomStreamItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    room: RoomCreateNestedOneWithoutNewsInput
    author: UserCreateNestedOneWithoutRoomNewsInput
  }

  export type RoomNewsUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomNewsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutNewsNestedInput
    author?: UserUpdateOneRequiredWithoutRoomNewsNestedInput
  }

  export type RoomNewsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsCreateManyInput = {
    id?: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomNewsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteCreateInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutNotesInput
    author: UserCreateNestedOneWithoutRoomNotesInput
  }

  export type RoomNoteUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutNotesNestedInput
    author?: UserUpdateOneRequiredWithoutRoomNotesNestedInput
  }

  export type RoomNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteCreateManyInput = {
    id?: string
    title: string
    content: string
    roomId: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type VibeListRelationFilter = {
    every?: VibeWhereInput
    some?: VibeWhereInput
    none?: VibeWhereInput
  }

  export type RoomListRelationFilter = {
    every?: RoomWhereInput
    some?: RoomWhereInput
    none?: RoomWhereInput
  }

  export type RoomStreamItemListRelationFilter = {
    every?: RoomStreamItemWhereInput
    some?: RoomStreamItemWhereInput
    none?: RoomStreamItemWhereInput
  }

  export type RoomNewsListRelationFilter = {
    every?: RoomNewsWhereInput
    some?: RoomNewsWhereInput
    none?: RoomNewsWhereInput
  }

  export type RoomNoteListRelationFilter = {
    every?: RoomNoteWhereInput
    some?: RoomNoteWhereInput
    none?: RoomNoteWhereInput
  }

  export type VibeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomStreamItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomNewsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RoomNoteOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    username?: SortOrder
    password?: SortOrder
    role?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type VibeUpdateListRelationFilter = {
    every?: VibeUpdateWhereInput
    some?: VibeUpdateWhereInput
    none?: VibeUpdateWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type VibeUpdateOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type VibeCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    keywords?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    roomConfig?: SortOrder
    inMainFeed?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VibeMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    inMainFeed?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VibeMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    inMainFeed?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type VibeScalarRelationFilter = {
    is?: VibeWhereInput
    isNot?: VibeWhereInput
  }

  export type VibeUpdateCountOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    vibeId?: SortOrder
    createdAt?: SortOrder
  }

  export type VibeUpdateMaxOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    vibeId?: SortOrder
    createdAt?: SortOrder
  }

  export type VibeUpdateMinOrderByAggregateInput = {
    id?: SortOrder
    content?: SortOrder
    vibeId?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type HashtagCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    useCount?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type HashtagAvgOrderByAggregateInput = {
    useCount?: SortOrder
  }

  export type HashtagMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    useCount?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type HashtagMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    useCount?: SortOrder
    lastUsedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type HashtagSumOrderByAggregateInput = {
    useCount?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    originVibeId?: SortOrder
    isPublic?: SortOrder
    tags?: SortOrder
    images?: SortOrder
    videoUrls?: SortOrder
    musicUrls?: SortOrder
    youtubeUrls?: SortOrder
    roomConfig?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    originVibeId?: SortOrder
    isPublic?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    poster?: SortOrder
    originVibeId?: SortOrder
    isPublic?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type RoomScalarRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type RoomStreamItemCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    mediaUrls?: SortOrder
    url?: SortOrder
    title?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomStreamItemMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    url?: SortOrder
    title?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomStreamItemMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    content?: SortOrder
    url?: SortOrder
    title?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomNewsCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomNewsMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomNewsMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
  }

  export type RoomNoteCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type RoomNoteMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    roomId?: SortOrder
    authorId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type VibeCreateNestedManyWithoutAuthorInput = {
    create?: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput> | VibeCreateWithoutAuthorInput[] | VibeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: VibeCreateOrConnectWithoutAuthorInput | VibeCreateOrConnectWithoutAuthorInput[]
    createMany?: VibeCreateManyAuthorInputEnvelope
    connect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
  }

  export type RoomCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput> | RoomCreateWithoutAuthorInput[] | RoomUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutAuthorInput | RoomCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomCreateManyAuthorInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomStreamItemCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput> | RoomStreamItemCreateWithoutAuthorInput[] | RoomStreamItemUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutAuthorInput | RoomStreamItemCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomStreamItemCreateManyAuthorInputEnvelope
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
  }

  export type RoomNewsCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput> | RoomNewsCreateWithoutAuthorInput[] | RoomNewsUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutAuthorInput | RoomNewsCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomNewsCreateManyAuthorInputEnvelope
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
  }

  export type RoomNoteCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput> | RoomNoteCreateWithoutAuthorInput[] | RoomNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutAuthorInput | RoomNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomNoteCreateManyAuthorInputEnvelope
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
  }

  export type VibeUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput> | VibeCreateWithoutAuthorInput[] | VibeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: VibeCreateOrConnectWithoutAuthorInput | VibeCreateOrConnectWithoutAuthorInput[]
    createMany?: VibeCreateManyAuthorInputEnvelope
    connect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
  }

  export type RoomUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput> | RoomCreateWithoutAuthorInput[] | RoomUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutAuthorInput | RoomCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomCreateManyAuthorInputEnvelope
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
  }

  export type RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput> | RoomStreamItemCreateWithoutAuthorInput[] | RoomStreamItemUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutAuthorInput | RoomStreamItemCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomStreamItemCreateManyAuthorInputEnvelope
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
  }

  export type RoomNewsUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput> | RoomNewsCreateWithoutAuthorInput[] | RoomNewsUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutAuthorInput | RoomNewsCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomNewsCreateManyAuthorInputEnvelope
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
  }

  export type RoomNoteUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput> | RoomNoteCreateWithoutAuthorInput[] | RoomNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutAuthorInput | RoomNoteCreateOrConnectWithoutAuthorInput[]
    createMany?: RoomNoteCreateManyAuthorInputEnvelope
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type VibeUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput> | VibeCreateWithoutAuthorInput[] | VibeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: VibeCreateOrConnectWithoutAuthorInput | VibeCreateOrConnectWithoutAuthorInput[]
    upsert?: VibeUpsertWithWhereUniqueWithoutAuthorInput | VibeUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: VibeCreateManyAuthorInputEnvelope
    set?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    disconnect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    delete?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    connect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    update?: VibeUpdateWithWhereUniqueWithoutAuthorInput | VibeUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: VibeUpdateManyWithWhereWithoutAuthorInput | VibeUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: VibeScalarWhereInput | VibeScalarWhereInput[]
  }

  export type RoomUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput> | RoomCreateWithoutAuthorInput[] | RoomUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutAuthorInput | RoomCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutAuthorInput | RoomUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomCreateManyAuthorInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutAuthorInput | RoomUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutAuthorInput | RoomUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomStreamItemUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput> | RoomStreamItemCreateWithoutAuthorInput[] | RoomStreamItemUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutAuthorInput | RoomStreamItemCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomStreamItemUpsertWithWhereUniqueWithoutAuthorInput | RoomStreamItemUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomStreamItemCreateManyAuthorInputEnvelope
    set?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    disconnect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    delete?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    update?: RoomStreamItemUpdateWithWhereUniqueWithoutAuthorInput | RoomStreamItemUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomStreamItemUpdateManyWithWhereWithoutAuthorInput | RoomStreamItemUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
  }

  export type RoomNewsUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput> | RoomNewsCreateWithoutAuthorInput[] | RoomNewsUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutAuthorInput | RoomNewsCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomNewsUpsertWithWhereUniqueWithoutAuthorInput | RoomNewsUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomNewsCreateManyAuthorInputEnvelope
    set?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    disconnect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    delete?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    update?: RoomNewsUpdateWithWhereUniqueWithoutAuthorInput | RoomNewsUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomNewsUpdateManyWithWhereWithoutAuthorInput | RoomNewsUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
  }

  export type RoomNoteUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput> | RoomNoteCreateWithoutAuthorInput[] | RoomNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutAuthorInput | RoomNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomNoteUpsertWithWhereUniqueWithoutAuthorInput | RoomNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomNoteCreateManyAuthorInputEnvelope
    set?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    disconnect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    delete?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    update?: RoomNoteUpdateWithWhereUniqueWithoutAuthorInput | RoomNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomNoteUpdateManyWithWhereWithoutAuthorInput | RoomNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
  }

  export type VibeUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput> | VibeCreateWithoutAuthorInput[] | VibeUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: VibeCreateOrConnectWithoutAuthorInput | VibeCreateOrConnectWithoutAuthorInput[]
    upsert?: VibeUpsertWithWhereUniqueWithoutAuthorInput | VibeUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: VibeCreateManyAuthorInputEnvelope
    set?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    disconnect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    delete?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    connect?: VibeWhereUniqueInput | VibeWhereUniqueInput[]
    update?: VibeUpdateWithWhereUniqueWithoutAuthorInput | VibeUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: VibeUpdateManyWithWhereWithoutAuthorInput | VibeUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: VibeScalarWhereInput | VibeScalarWhereInput[]
  }

  export type RoomUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput> | RoomCreateWithoutAuthorInput[] | RoomUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomCreateOrConnectWithoutAuthorInput | RoomCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomUpsertWithWhereUniqueWithoutAuthorInput | RoomUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomCreateManyAuthorInputEnvelope
    set?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    disconnect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    delete?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    connect?: RoomWhereUniqueInput | RoomWhereUniqueInput[]
    update?: RoomUpdateWithWhereUniqueWithoutAuthorInput | RoomUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomUpdateManyWithWhereWithoutAuthorInput | RoomUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomScalarWhereInput | RoomScalarWhereInput[]
  }

  export type RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput> | RoomStreamItemCreateWithoutAuthorInput[] | RoomStreamItemUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutAuthorInput | RoomStreamItemCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomStreamItemUpsertWithWhereUniqueWithoutAuthorInput | RoomStreamItemUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomStreamItemCreateManyAuthorInputEnvelope
    set?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    disconnect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    delete?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    update?: RoomStreamItemUpdateWithWhereUniqueWithoutAuthorInput | RoomStreamItemUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomStreamItemUpdateManyWithWhereWithoutAuthorInput | RoomStreamItemUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
  }

  export type RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput> | RoomNewsCreateWithoutAuthorInput[] | RoomNewsUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutAuthorInput | RoomNewsCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomNewsUpsertWithWhereUniqueWithoutAuthorInput | RoomNewsUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomNewsCreateManyAuthorInputEnvelope
    set?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    disconnect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    delete?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    update?: RoomNewsUpdateWithWhereUniqueWithoutAuthorInput | RoomNewsUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomNewsUpdateManyWithWhereWithoutAuthorInput | RoomNewsUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
  }

  export type RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput> | RoomNoteCreateWithoutAuthorInput[] | RoomNoteUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutAuthorInput | RoomNoteCreateOrConnectWithoutAuthorInput[]
    upsert?: RoomNoteUpsertWithWhereUniqueWithoutAuthorInput | RoomNoteUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: RoomNoteCreateManyAuthorInputEnvelope
    set?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    disconnect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    delete?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    update?: RoomNoteUpdateWithWhereUniqueWithoutAuthorInput | RoomNoteUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: RoomNoteUpdateManyWithWhereWithoutAuthorInput | RoomNoteUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
  }

  export type VibeCreatekeywordsInput = {
    set: string[]
  }

  export type VibeCreateimagesInput = {
    set: string[]
  }

  export type VibeCreatevideoUrlsInput = {
    set: string[]
  }

  export type VibeCreatemusicUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutVibesInput = {
    create?: XOR<UserCreateWithoutVibesInput, UserUncheckedCreateWithoutVibesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVibesInput
    connect?: UserWhereUniqueInput
  }

  export type VibeUpdateCreateNestedManyWithoutVibeInput = {
    create?: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput> | VibeUpdateCreateWithoutVibeInput[] | VibeUpdateUncheckedCreateWithoutVibeInput[]
    connectOrCreate?: VibeUpdateCreateOrConnectWithoutVibeInput | VibeUpdateCreateOrConnectWithoutVibeInput[]
    createMany?: VibeUpdateCreateManyVibeInputEnvelope
    connect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
  }

  export type VibeUpdateUncheckedCreateNestedManyWithoutVibeInput = {
    create?: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput> | VibeUpdateCreateWithoutVibeInput[] | VibeUpdateUncheckedCreateWithoutVibeInput[]
    connectOrCreate?: VibeUpdateCreateOrConnectWithoutVibeInput | VibeUpdateCreateOrConnectWithoutVibeInput[]
    createMany?: VibeUpdateCreateManyVibeInputEnvelope
    connect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
  }

  export type VibeUpdatekeywordsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VibeUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VibeUpdatevideoUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VibeUpdatemusicUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutVibesNestedInput = {
    create?: XOR<UserCreateWithoutVibesInput, UserUncheckedCreateWithoutVibesInput>
    connectOrCreate?: UserCreateOrConnectWithoutVibesInput
    upsert?: UserUpsertWithoutVibesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutVibesInput, UserUpdateWithoutVibesInput>, UserUncheckedUpdateWithoutVibesInput>
  }

  export type VibeUpdateUpdateManyWithoutVibeNestedInput = {
    create?: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput> | VibeUpdateCreateWithoutVibeInput[] | VibeUpdateUncheckedCreateWithoutVibeInput[]
    connectOrCreate?: VibeUpdateCreateOrConnectWithoutVibeInput | VibeUpdateCreateOrConnectWithoutVibeInput[]
    upsert?: VibeUpdateUpsertWithWhereUniqueWithoutVibeInput | VibeUpdateUpsertWithWhereUniqueWithoutVibeInput[]
    createMany?: VibeUpdateCreateManyVibeInputEnvelope
    set?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    disconnect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    delete?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    connect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    update?: VibeUpdateUpdateWithWhereUniqueWithoutVibeInput | VibeUpdateUpdateWithWhereUniqueWithoutVibeInput[]
    updateMany?: VibeUpdateUpdateManyWithWhereWithoutVibeInput | VibeUpdateUpdateManyWithWhereWithoutVibeInput[]
    deleteMany?: VibeUpdateScalarWhereInput | VibeUpdateScalarWhereInput[]
  }

  export type VibeUpdateUncheckedUpdateManyWithoutVibeNestedInput = {
    create?: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput> | VibeUpdateCreateWithoutVibeInput[] | VibeUpdateUncheckedCreateWithoutVibeInput[]
    connectOrCreate?: VibeUpdateCreateOrConnectWithoutVibeInput | VibeUpdateCreateOrConnectWithoutVibeInput[]
    upsert?: VibeUpdateUpsertWithWhereUniqueWithoutVibeInput | VibeUpdateUpsertWithWhereUniqueWithoutVibeInput[]
    createMany?: VibeUpdateCreateManyVibeInputEnvelope
    set?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    disconnect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    delete?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    connect?: VibeUpdateWhereUniqueInput | VibeUpdateWhereUniqueInput[]
    update?: VibeUpdateUpdateWithWhereUniqueWithoutVibeInput | VibeUpdateUpdateWithWhereUniqueWithoutVibeInput[]
    updateMany?: VibeUpdateUpdateManyWithWhereWithoutVibeInput | VibeUpdateUpdateManyWithWhereWithoutVibeInput[]
    deleteMany?: VibeUpdateScalarWhereInput | VibeUpdateScalarWhereInput[]
  }

  export type VibeUpdateCreatemediaUrlsInput = {
    set: string[]
  }

  export type VibeCreateNestedOneWithoutUpdatesInput = {
    create?: XOR<VibeCreateWithoutUpdatesInput, VibeUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: VibeCreateOrConnectWithoutUpdatesInput
    connect?: VibeWhereUniqueInput
  }

  export type VibeUpdateUpdatemediaUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type VibeUpdateOneRequiredWithoutUpdatesNestedInput = {
    create?: XOR<VibeCreateWithoutUpdatesInput, VibeUncheckedCreateWithoutUpdatesInput>
    connectOrCreate?: VibeCreateOrConnectWithoutUpdatesInput
    upsert?: VibeUpsertWithoutUpdatesInput
    connect?: VibeWhereUniqueInput
    update?: XOR<XOR<VibeUpdateToOneWithWhereWithoutUpdatesInput, VibeUpdateWithoutUpdatesInput>, VibeUncheckedUpdateWithoutUpdatesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type RoomCreatetagsInput = {
    set: string[]
  }

  export type RoomCreateimagesInput = {
    set: string[]
  }

  export type RoomCreatevideoUrlsInput = {
    set: string[]
  }

  export type RoomCreatemusicUrlsInput = {
    set: string[]
  }

  export type RoomCreateyoutubeUrlsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutRoomsInput = {
    create?: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomStreamItemCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput> | RoomStreamItemCreateWithoutRoomInput[] | RoomStreamItemUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutRoomInput | RoomStreamItemCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStreamItemCreateManyRoomInputEnvelope
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
  }

  export type RoomNewsCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput> | RoomNewsCreateWithoutRoomInput[] | RoomNewsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutRoomInput | RoomNewsCreateOrConnectWithoutRoomInput[]
    createMany?: RoomNewsCreateManyRoomInputEnvelope
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
  }

  export type RoomNoteCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput> | RoomNoteCreateWithoutRoomInput[] | RoomNoteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutRoomInput | RoomNoteCreateOrConnectWithoutRoomInput[]
    createMany?: RoomNoteCreateManyRoomInputEnvelope
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
  }

  export type RoomStreamItemUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput> | RoomStreamItemCreateWithoutRoomInput[] | RoomStreamItemUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutRoomInput | RoomStreamItemCreateOrConnectWithoutRoomInput[]
    createMany?: RoomStreamItemCreateManyRoomInputEnvelope
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
  }

  export type RoomNewsUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput> | RoomNewsCreateWithoutRoomInput[] | RoomNewsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutRoomInput | RoomNewsCreateOrConnectWithoutRoomInput[]
    createMany?: RoomNewsCreateManyRoomInputEnvelope
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
  }

  export type RoomNoteUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput> | RoomNoteCreateWithoutRoomInput[] | RoomNoteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutRoomInput | RoomNoteCreateOrConnectWithoutRoomInput[]
    createMany?: RoomNoteCreateManyRoomInputEnvelope
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type RoomUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdateimagesInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdatevideoUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdatemusicUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdateyoutubeUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutRoomsNestedInput = {
    create?: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomsInput
    upsert?: UserUpsertWithoutRoomsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomsInput, UserUpdateWithoutRoomsInput>, UserUncheckedUpdateWithoutRoomsInput>
  }

  export type RoomStreamItemUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput> | RoomStreamItemCreateWithoutRoomInput[] | RoomStreamItemUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutRoomInput | RoomStreamItemCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStreamItemUpsertWithWhereUniqueWithoutRoomInput | RoomStreamItemUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStreamItemCreateManyRoomInputEnvelope
    set?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    disconnect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    delete?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    update?: RoomStreamItemUpdateWithWhereUniqueWithoutRoomInput | RoomStreamItemUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStreamItemUpdateManyWithWhereWithoutRoomInput | RoomStreamItemUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
  }

  export type RoomNewsUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput> | RoomNewsCreateWithoutRoomInput[] | RoomNewsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutRoomInput | RoomNewsCreateOrConnectWithoutRoomInput[]
    upsert?: RoomNewsUpsertWithWhereUniqueWithoutRoomInput | RoomNewsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomNewsCreateManyRoomInputEnvelope
    set?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    disconnect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    delete?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    update?: RoomNewsUpdateWithWhereUniqueWithoutRoomInput | RoomNewsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomNewsUpdateManyWithWhereWithoutRoomInput | RoomNewsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
  }

  export type RoomNoteUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput> | RoomNoteCreateWithoutRoomInput[] | RoomNoteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutRoomInput | RoomNoteCreateOrConnectWithoutRoomInput[]
    upsert?: RoomNoteUpsertWithWhereUniqueWithoutRoomInput | RoomNoteUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomNoteCreateManyRoomInputEnvelope
    set?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    disconnect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    delete?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    update?: RoomNoteUpdateWithWhereUniqueWithoutRoomInput | RoomNoteUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomNoteUpdateManyWithWhereWithoutRoomInput | RoomNoteUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
  }

  export type RoomStreamItemUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput> | RoomStreamItemCreateWithoutRoomInput[] | RoomStreamItemUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomStreamItemCreateOrConnectWithoutRoomInput | RoomStreamItemCreateOrConnectWithoutRoomInput[]
    upsert?: RoomStreamItemUpsertWithWhereUniqueWithoutRoomInput | RoomStreamItemUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomStreamItemCreateManyRoomInputEnvelope
    set?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    disconnect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    delete?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    connect?: RoomStreamItemWhereUniqueInput | RoomStreamItemWhereUniqueInput[]
    update?: RoomStreamItemUpdateWithWhereUniqueWithoutRoomInput | RoomStreamItemUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomStreamItemUpdateManyWithWhereWithoutRoomInput | RoomStreamItemUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
  }

  export type RoomNewsUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput> | RoomNewsCreateWithoutRoomInput[] | RoomNewsUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNewsCreateOrConnectWithoutRoomInput | RoomNewsCreateOrConnectWithoutRoomInput[]
    upsert?: RoomNewsUpsertWithWhereUniqueWithoutRoomInput | RoomNewsUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomNewsCreateManyRoomInputEnvelope
    set?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    disconnect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    delete?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    connect?: RoomNewsWhereUniqueInput | RoomNewsWhereUniqueInput[]
    update?: RoomNewsUpdateWithWhereUniqueWithoutRoomInput | RoomNewsUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomNewsUpdateManyWithWhereWithoutRoomInput | RoomNewsUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
  }

  export type RoomNoteUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput> | RoomNoteCreateWithoutRoomInput[] | RoomNoteUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: RoomNoteCreateOrConnectWithoutRoomInput | RoomNoteCreateOrConnectWithoutRoomInput[]
    upsert?: RoomNoteUpsertWithWhereUniqueWithoutRoomInput | RoomNoteUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: RoomNoteCreateManyRoomInputEnvelope
    set?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    disconnect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    delete?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    connect?: RoomNoteWhereUniqueInput | RoomNoteWhereUniqueInput[]
    update?: RoomNoteUpdateWithWhereUniqueWithoutRoomInput | RoomNoteUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: RoomNoteUpdateManyWithWhereWithoutRoomInput | RoomNoteUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
  }

  export type RoomStreamItemCreatemediaUrlsInput = {
    set: string[]
  }

  export type RoomCreateNestedOneWithoutStreamItemsInput = {
    create?: XOR<RoomCreateWithoutStreamItemsInput, RoomUncheckedCreateWithoutStreamItemsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStreamItemsInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomStreamItemsInput = {
    create?: XOR<UserCreateWithoutRoomStreamItemsInput, UserUncheckedCreateWithoutRoomStreamItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomStreamItemsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomStreamItemUpdatemediaUrlsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type RoomUpdateOneRequiredWithoutStreamItemsNestedInput = {
    create?: XOR<RoomCreateWithoutStreamItemsInput, RoomUncheckedCreateWithoutStreamItemsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutStreamItemsInput
    upsert?: RoomUpsertWithoutStreamItemsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutStreamItemsInput, RoomUpdateWithoutStreamItemsInput>, RoomUncheckedUpdateWithoutStreamItemsInput>
  }

  export type UserUpdateOneRequiredWithoutRoomStreamItemsNestedInput = {
    create?: XOR<UserCreateWithoutRoomStreamItemsInput, UserUncheckedCreateWithoutRoomStreamItemsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomStreamItemsInput
    upsert?: UserUpsertWithoutRoomStreamItemsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomStreamItemsInput, UserUpdateWithoutRoomStreamItemsInput>, UserUncheckedUpdateWithoutRoomStreamItemsInput>
  }

  export type RoomCreateNestedOneWithoutNewsInput = {
    create?: XOR<RoomCreateWithoutNewsInput, RoomUncheckedCreateWithoutNewsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutNewsInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomNewsInput = {
    create?: XOR<UserCreateWithoutRoomNewsInput, UserUncheckedCreateWithoutRoomNewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomNewsInput
    connect?: UserWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutNewsNestedInput = {
    create?: XOR<RoomCreateWithoutNewsInput, RoomUncheckedCreateWithoutNewsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutNewsInput
    upsert?: RoomUpsertWithoutNewsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutNewsInput, RoomUpdateWithoutNewsInput>, RoomUncheckedUpdateWithoutNewsInput>
  }

  export type UserUpdateOneRequiredWithoutRoomNewsNestedInput = {
    create?: XOR<UserCreateWithoutRoomNewsInput, UserUncheckedCreateWithoutRoomNewsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomNewsInput
    upsert?: UserUpsertWithoutRoomNewsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomNewsInput, UserUpdateWithoutRoomNewsInput>, UserUncheckedUpdateWithoutRoomNewsInput>
  }

  export type RoomCreateNestedOneWithoutNotesInput = {
    create?: XOR<RoomCreateWithoutNotesInput, RoomUncheckedCreateWithoutNotesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutNotesInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutRoomNotesInput = {
    create?: XOR<UserCreateWithoutRoomNotesInput, UserUncheckedCreateWithoutRoomNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomNotesInput
    connect?: UserWhereUniqueInput
  }

  export type RoomUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<RoomCreateWithoutNotesInput, RoomUncheckedCreateWithoutNotesInput>
    connectOrCreate?: RoomCreateOrConnectWithoutNotesInput
    upsert?: RoomUpsertWithoutNotesInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutNotesInput, RoomUpdateWithoutNotesInput>, RoomUncheckedUpdateWithoutNotesInput>
  }

  export type UserUpdateOneRequiredWithoutRoomNotesNestedInput = {
    create?: XOR<UserCreateWithoutRoomNotesInput, UserUncheckedCreateWithoutRoomNotesInput>
    connectOrCreate?: UserCreateOrConnectWithoutRoomNotesInput
    upsert?: UserUpsertWithoutRoomNotesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRoomNotesInput, UserUpdateWithoutRoomNotesInput>, UserUncheckedUpdateWithoutRoomNotesInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type VibeCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updates?: VibeUpdateCreateNestedManyWithoutVibeInput
  }

  export type VibeUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    updates?: VibeUpdateUncheckedCreateNestedManyWithoutVibeInput
  }

  export type VibeCreateOrConnectWithoutAuthorInput = {
    where: VibeWhereUniqueInput
    create: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput>
  }

  export type VibeCreateManyAuthorInputEnvelope = {
    data: VibeCreateManyAuthorInput | VibeCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RoomCreateWithoutAuthorInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    streamItems?: RoomStreamItemCreateNestedManyWithoutRoomInput
    news?: RoomNewsCreateNestedManyWithoutRoomInput
    notes?: RoomNoteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    streamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutRoomInput
    news?: RoomNewsUncheckedCreateNestedManyWithoutRoomInput
    notes?: RoomNoteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutAuthorInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput>
  }

  export type RoomCreateManyAuthorInputEnvelope = {
    data: RoomCreateManyAuthorInput | RoomCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RoomStreamItemCreateWithoutAuthorInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    createdAt?: Date | string
    room: RoomCreateNestedOneWithoutStreamItemsInput
  }

  export type RoomStreamItemUncheckedCreateWithoutAuthorInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    roomId: string
    createdAt?: Date | string
  }

  export type RoomStreamItemCreateOrConnectWithoutAuthorInput = {
    where: RoomStreamItemWhereUniqueInput
    create: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput>
  }

  export type RoomStreamItemCreateManyAuthorInputEnvelope = {
    data: RoomStreamItemCreateManyAuthorInput | RoomStreamItemCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RoomNewsCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    room: RoomCreateNestedOneWithoutNewsInput
  }

  export type RoomNewsUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    roomId: string
    createdAt?: Date | string
  }

  export type RoomNewsCreateOrConnectWithoutAuthorInput = {
    where: RoomNewsWhereUniqueInput
    create: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput>
  }

  export type RoomNewsCreateManyAuthorInputEnvelope = {
    data: RoomNewsCreateManyAuthorInput | RoomNewsCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type RoomNoteCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    room: RoomCreateNestedOneWithoutNotesInput
  }

  export type RoomNoteUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    content: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomNoteCreateOrConnectWithoutAuthorInput = {
    where: RoomNoteWhereUniqueInput
    create: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput>
  }

  export type RoomNoteCreateManyAuthorInputEnvelope = {
    data: RoomNoteCreateManyAuthorInput | RoomNoteCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type VibeUpsertWithWhereUniqueWithoutAuthorInput = {
    where: VibeWhereUniqueInput
    update: XOR<VibeUpdateWithoutAuthorInput, VibeUncheckedUpdateWithoutAuthorInput>
    create: XOR<VibeCreateWithoutAuthorInput, VibeUncheckedCreateWithoutAuthorInput>
  }

  export type VibeUpdateWithWhereUniqueWithoutAuthorInput = {
    where: VibeWhereUniqueInput
    data: XOR<VibeUpdateWithoutAuthorInput, VibeUncheckedUpdateWithoutAuthorInput>
  }

  export type VibeUpdateManyWithWhereWithoutAuthorInput = {
    where: VibeScalarWhereInput
    data: XOR<VibeUpdateManyMutationInput, VibeUncheckedUpdateManyWithoutAuthorInput>
  }

  export type VibeScalarWhereInput = {
    AND?: VibeScalarWhereInput | VibeScalarWhereInput[]
    OR?: VibeScalarWhereInput[]
    NOT?: VibeScalarWhereInput | VibeScalarWhereInput[]
    id?: StringFilter<"Vibe"> | string
    title?: StringFilter<"Vibe"> | string
    content?: StringFilter<"Vibe"> | string
    keywords?: StringNullableListFilter<"Vibe">
    images?: StringNullableListFilter<"Vibe">
    videoUrls?: StringNullableListFilter<"Vibe">
    musicUrls?: StringNullableListFilter<"Vibe">
    roomConfig?: JsonNullableFilter<"Vibe">
    inMainFeed?: BoolFilter<"Vibe"> | boolean
    authorId?: StringFilter<"Vibe"> | string
    createdAt?: DateTimeFilter<"Vibe"> | Date | string
    updatedAt?: DateTimeFilter<"Vibe"> | Date | string
  }

  export type RoomUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RoomWhereUniqueInput
    update: XOR<RoomUpdateWithoutAuthorInput, RoomUncheckedUpdateWithoutAuthorInput>
    create: XOR<RoomCreateWithoutAuthorInput, RoomUncheckedCreateWithoutAuthorInput>
  }

  export type RoomUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RoomWhereUniqueInput
    data: XOR<RoomUpdateWithoutAuthorInput, RoomUncheckedUpdateWithoutAuthorInput>
  }

  export type RoomUpdateManyWithWhereWithoutAuthorInput = {
    where: RoomScalarWhereInput
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RoomScalarWhereInput = {
    AND?: RoomScalarWhereInput | RoomScalarWhereInput[]
    OR?: RoomScalarWhereInput[]
    NOT?: RoomScalarWhereInput | RoomScalarWhereInput[]
    id?: StringFilter<"Room"> | string
    title?: StringFilter<"Room"> | string
    description?: StringNullableFilter<"Room"> | string | null
    poster?: StringNullableFilter<"Room"> | string | null
    originVibeId?: StringNullableFilter<"Room"> | string | null
    isPublic?: BoolFilter<"Room"> | boolean
    tags?: StringNullableListFilter<"Room">
    images?: StringNullableListFilter<"Room">
    videoUrls?: StringNullableListFilter<"Room">
    musicUrls?: StringNullableListFilter<"Room">
    youtubeUrls?: StringNullableListFilter<"Room">
    roomConfig?: JsonNullableFilter<"Room">
    authorId?: StringFilter<"Room"> | string
    createdAt?: DateTimeFilter<"Room"> | Date | string
    updatedAt?: DateTimeFilter<"Room"> | Date | string
  }

  export type RoomStreamItemUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RoomStreamItemWhereUniqueInput
    update: XOR<RoomStreamItemUpdateWithoutAuthorInput, RoomStreamItemUncheckedUpdateWithoutAuthorInput>
    create: XOR<RoomStreamItemCreateWithoutAuthorInput, RoomStreamItemUncheckedCreateWithoutAuthorInput>
  }

  export type RoomStreamItemUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RoomStreamItemWhereUniqueInput
    data: XOR<RoomStreamItemUpdateWithoutAuthorInput, RoomStreamItemUncheckedUpdateWithoutAuthorInput>
  }

  export type RoomStreamItemUpdateManyWithWhereWithoutAuthorInput = {
    where: RoomStreamItemScalarWhereInput
    data: XOR<RoomStreamItemUpdateManyMutationInput, RoomStreamItemUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RoomStreamItemScalarWhereInput = {
    AND?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
    OR?: RoomStreamItemScalarWhereInput[]
    NOT?: RoomStreamItemScalarWhereInput | RoomStreamItemScalarWhereInput[]
    id?: StringFilter<"RoomStreamItem"> | string
    type?: StringFilter<"RoomStreamItem"> | string
    content?: StringNullableFilter<"RoomStreamItem"> | string | null
    mediaUrls?: StringNullableListFilter<"RoomStreamItem">
    url?: StringNullableFilter<"RoomStreamItem"> | string | null
    title?: StringNullableFilter<"RoomStreamItem"> | string | null
    roomId?: StringFilter<"RoomStreamItem"> | string
    authorId?: StringFilter<"RoomStreamItem"> | string
    createdAt?: DateTimeFilter<"RoomStreamItem"> | Date | string
  }

  export type RoomNewsUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RoomNewsWhereUniqueInput
    update: XOR<RoomNewsUpdateWithoutAuthorInput, RoomNewsUncheckedUpdateWithoutAuthorInput>
    create: XOR<RoomNewsCreateWithoutAuthorInput, RoomNewsUncheckedCreateWithoutAuthorInput>
  }

  export type RoomNewsUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RoomNewsWhereUniqueInput
    data: XOR<RoomNewsUpdateWithoutAuthorInput, RoomNewsUncheckedUpdateWithoutAuthorInput>
  }

  export type RoomNewsUpdateManyWithWhereWithoutAuthorInput = {
    where: RoomNewsScalarWhereInput
    data: XOR<RoomNewsUpdateManyMutationInput, RoomNewsUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RoomNewsScalarWhereInput = {
    AND?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
    OR?: RoomNewsScalarWhereInput[]
    NOT?: RoomNewsScalarWhereInput | RoomNewsScalarWhereInput[]
    id?: StringFilter<"RoomNews"> | string
    title?: StringFilter<"RoomNews"> | string
    content?: StringFilter<"RoomNews"> | string
    roomId?: StringFilter<"RoomNews"> | string
    authorId?: StringFilter<"RoomNews"> | string
    createdAt?: DateTimeFilter<"RoomNews"> | Date | string
  }

  export type RoomNoteUpsertWithWhereUniqueWithoutAuthorInput = {
    where: RoomNoteWhereUniqueInput
    update: XOR<RoomNoteUpdateWithoutAuthorInput, RoomNoteUncheckedUpdateWithoutAuthorInput>
    create: XOR<RoomNoteCreateWithoutAuthorInput, RoomNoteUncheckedCreateWithoutAuthorInput>
  }

  export type RoomNoteUpdateWithWhereUniqueWithoutAuthorInput = {
    where: RoomNoteWhereUniqueInput
    data: XOR<RoomNoteUpdateWithoutAuthorInput, RoomNoteUncheckedUpdateWithoutAuthorInput>
  }

  export type RoomNoteUpdateManyWithWhereWithoutAuthorInput = {
    where: RoomNoteScalarWhereInput
    data: XOR<RoomNoteUpdateManyMutationInput, RoomNoteUncheckedUpdateManyWithoutAuthorInput>
  }

  export type RoomNoteScalarWhereInput = {
    AND?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
    OR?: RoomNoteScalarWhereInput[]
    NOT?: RoomNoteScalarWhereInput | RoomNoteScalarWhereInput[]
    id?: StringFilter<"RoomNote"> | string
    title?: StringFilter<"RoomNote"> | string
    content?: StringFilter<"RoomNote"> | string
    roomId?: StringFilter<"RoomNote"> | string
    authorId?: StringFilter<"RoomNote"> | string
    createdAt?: DateTimeFilter<"RoomNote"> | Date | string
    updatedAt?: DateTimeFilter<"RoomNote"> | Date | string
  }

  export type UserCreateWithoutVibesInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutVibesInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    rooms?: RoomUncheckedCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsUncheckedCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutVibesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutVibesInput, UserUncheckedCreateWithoutVibesInput>
  }

  export type VibeUpdateCreateWithoutVibeInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    createdAt?: Date | string
  }

  export type VibeUpdateUncheckedCreateWithoutVibeInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    createdAt?: Date | string
  }

  export type VibeUpdateCreateOrConnectWithoutVibeInput = {
    where: VibeUpdateWhereUniqueInput
    create: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput>
  }

  export type VibeUpdateCreateManyVibeInputEnvelope = {
    data: VibeUpdateCreateManyVibeInput | VibeUpdateCreateManyVibeInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutVibesInput = {
    update: XOR<UserUpdateWithoutVibesInput, UserUncheckedUpdateWithoutVibesInput>
    create: XOR<UserCreateWithoutVibesInput, UserUncheckedCreateWithoutVibesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutVibesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutVibesInput, UserUncheckedUpdateWithoutVibesInput>
  }

  export type UserUpdateWithoutVibesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutVibesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rooms?: RoomUncheckedUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type VibeUpdateUpsertWithWhereUniqueWithoutVibeInput = {
    where: VibeUpdateWhereUniqueInput
    update: XOR<VibeUpdateUpdateWithoutVibeInput, VibeUpdateUncheckedUpdateWithoutVibeInput>
    create: XOR<VibeUpdateCreateWithoutVibeInput, VibeUpdateUncheckedCreateWithoutVibeInput>
  }

  export type VibeUpdateUpdateWithWhereUniqueWithoutVibeInput = {
    where: VibeUpdateWhereUniqueInput
    data: XOR<VibeUpdateUpdateWithoutVibeInput, VibeUpdateUncheckedUpdateWithoutVibeInput>
  }

  export type VibeUpdateUpdateManyWithWhereWithoutVibeInput = {
    where: VibeUpdateScalarWhereInput
    data: XOR<VibeUpdateUpdateManyMutationInput, VibeUpdateUncheckedUpdateManyWithoutVibeInput>
  }

  export type VibeUpdateScalarWhereInput = {
    AND?: VibeUpdateScalarWhereInput | VibeUpdateScalarWhereInput[]
    OR?: VibeUpdateScalarWhereInput[]
    NOT?: VibeUpdateScalarWhereInput | VibeUpdateScalarWhereInput[]
    id?: StringFilter<"VibeUpdate"> | string
    content?: StringFilter<"VibeUpdate"> | string
    mediaUrls?: StringNullableListFilter<"VibeUpdate">
    vibeId?: StringFilter<"VibeUpdate"> | string
    createdAt?: DateTimeFilter<"VibeUpdate"> | Date | string
  }

  export type VibeCreateWithoutUpdatesInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutVibesInput
  }

  export type VibeUncheckedCreateWithoutUpdatesInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VibeCreateOrConnectWithoutUpdatesInput = {
    where: VibeWhereUniqueInput
    create: XOR<VibeCreateWithoutUpdatesInput, VibeUncheckedCreateWithoutUpdatesInput>
  }

  export type VibeUpsertWithoutUpdatesInput = {
    update: XOR<VibeUpdateWithoutUpdatesInput, VibeUncheckedUpdateWithoutUpdatesInput>
    create: XOR<VibeCreateWithoutUpdatesInput, VibeUncheckedCreateWithoutUpdatesInput>
    where?: VibeWhereInput
  }

  export type VibeUpdateToOneWithWhereWithoutUpdatesInput = {
    where?: VibeWhereInput
    data: XOR<VibeUpdateWithoutUpdatesInput, VibeUncheckedUpdateWithoutUpdatesInput>
  }

  export type VibeUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutVibesNestedInput
  }

  export type VibeUncheckedUpdateWithoutUpdatesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRoomsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRoomsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeUncheckedCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsUncheckedCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRoomsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
  }

  export type RoomStreamItemCreateWithoutRoomInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutRoomStreamItemsInput
  }

  export type RoomStreamItemUncheckedCreateWithoutRoomInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    authorId: string
    createdAt?: Date | string
  }

  export type RoomStreamItemCreateOrConnectWithoutRoomInput = {
    where: RoomStreamItemWhereUniqueInput
    create: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput>
  }

  export type RoomStreamItemCreateManyRoomInputEnvelope = {
    data: RoomStreamItemCreateManyRoomInput | RoomStreamItemCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomNewsCreateWithoutRoomInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    author: UserCreateNestedOneWithoutRoomNewsInput
  }

  export type RoomNewsUncheckedCreateWithoutRoomInput = {
    id?: string
    title: string
    content: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomNewsCreateOrConnectWithoutRoomInput = {
    where: RoomNewsWhereUniqueInput
    create: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput>
  }

  export type RoomNewsCreateManyRoomInputEnvelope = {
    data: RoomNewsCreateManyRoomInput | RoomNewsCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type RoomNoteCreateWithoutRoomInput = {
    id?: string
    title: string
    content: string
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRoomNotesInput
  }

  export type RoomNoteUncheckedCreateWithoutRoomInput = {
    id?: string
    title: string
    content: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomNoteCreateOrConnectWithoutRoomInput = {
    where: RoomNoteWhereUniqueInput
    create: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput>
  }

  export type RoomNoteCreateManyRoomInputEnvelope = {
    data: RoomNoteCreateManyRoomInput | RoomNoteCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutRoomsInput = {
    update: XOR<UserUpdateWithoutRoomsInput, UserUncheckedUpdateWithoutRoomsInput>
    create: XOR<UserCreateWithoutRoomsInput, UserUncheckedCreateWithoutRoomsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomsInput, UserUncheckedUpdateWithoutRoomsInput>
  }

  export type UserUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUncheckedUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type RoomStreamItemUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomStreamItemWhereUniqueInput
    update: XOR<RoomStreamItemUpdateWithoutRoomInput, RoomStreamItemUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomStreamItemCreateWithoutRoomInput, RoomStreamItemUncheckedCreateWithoutRoomInput>
  }

  export type RoomStreamItemUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomStreamItemWhereUniqueInput
    data: XOR<RoomStreamItemUpdateWithoutRoomInput, RoomStreamItemUncheckedUpdateWithoutRoomInput>
  }

  export type RoomStreamItemUpdateManyWithWhereWithoutRoomInput = {
    where: RoomStreamItemScalarWhereInput
    data: XOR<RoomStreamItemUpdateManyMutationInput, RoomStreamItemUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomNewsUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomNewsWhereUniqueInput
    update: XOR<RoomNewsUpdateWithoutRoomInput, RoomNewsUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomNewsCreateWithoutRoomInput, RoomNewsUncheckedCreateWithoutRoomInput>
  }

  export type RoomNewsUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomNewsWhereUniqueInput
    data: XOR<RoomNewsUpdateWithoutRoomInput, RoomNewsUncheckedUpdateWithoutRoomInput>
  }

  export type RoomNewsUpdateManyWithWhereWithoutRoomInput = {
    where: RoomNewsScalarWhereInput
    data: XOR<RoomNewsUpdateManyMutationInput, RoomNewsUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomNoteUpsertWithWhereUniqueWithoutRoomInput = {
    where: RoomNoteWhereUniqueInput
    update: XOR<RoomNoteUpdateWithoutRoomInput, RoomNoteUncheckedUpdateWithoutRoomInput>
    create: XOR<RoomNoteCreateWithoutRoomInput, RoomNoteUncheckedCreateWithoutRoomInput>
  }

  export type RoomNoteUpdateWithWhereUniqueWithoutRoomInput = {
    where: RoomNoteWhereUniqueInput
    data: XOR<RoomNoteUpdateWithoutRoomInput, RoomNoteUncheckedUpdateWithoutRoomInput>
  }

  export type RoomNoteUpdateManyWithWhereWithoutRoomInput = {
    where: RoomNoteScalarWhereInput
    data: XOR<RoomNoteUpdateManyMutationInput, RoomNoteUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutStreamItemsInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRoomsInput
    news?: RoomNewsCreateNestedManyWithoutRoomInput
    notes?: RoomNoteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutStreamItemsInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    news?: RoomNewsUncheckedCreateNestedManyWithoutRoomInput
    notes?: RoomNoteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutStreamItemsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutStreamItemsInput, RoomUncheckedCreateWithoutStreamItemsInput>
  }

  export type UserCreateWithoutRoomStreamItemsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeCreateNestedManyWithoutAuthorInput
    rooms?: RoomCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRoomStreamItemsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeUncheckedCreateNestedManyWithoutAuthorInput
    rooms?: RoomUncheckedCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsUncheckedCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRoomStreamItemsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomStreamItemsInput, UserUncheckedCreateWithoutRoomStreamItemsInput>
  }

  export type RoomUpsertWithoutStreamItemsInput = {
    update: XOR<RoomUpdateWithoutStreamItemsInput, RoomUncheckedUpdateWithoutStreamItemsInput>
    create: XOR<RoomCreateWithoutStreamItemsInput, RoomUncheckedCreateWithoutStreamItemsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutStreamItemsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutStreamItemsInput, RoomUncheckedUpdateWithoutStreamItemsInput>
  }

  export type RoomUpdateWithoutStreamItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomsNestedInput
    news?: RoomNewsUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutStreamItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    news?: RoomNewsUncheckedUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutRoomStreamItemsInput = {
    update: XOR<UserUpdateWithoutRoomStreamItemsInput, UserUncheckedUpdateWithoutRoomStreamItemsInput>
    create: XOR<UserCreateWithoutRoomStreamItemsInput, UserUncheckedCreateWithoutRoomStreamItemsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomStreamItemsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomStreamItemsInput, UserUncheckedUpdateWithoutRoomStreamItemsInput>
  }

  export type UserUpdateWithoutRoomStreamItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomStreamItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUncheckedUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type RoomCreateWithoutNewsInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRoomsInput
    streamItems?: RoomStreamItemCreateNestedManyWithoutRoomInput
    notes?: RoomNoteCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutNewsInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    streamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutRoomInput
    notes?: RoomNoteUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutNewsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutNewsInput, RoomUncheckedCreateWithoutNewsInput>
  }

  export type UserCreateWithoutRoomNewsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeCreateNestedManyWithoutAuthorInput
    rooms?: RoomCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRoomNewsInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeUncheckedCreateNestedManyWithoutAuthorInput
    rooms?: RoomUncheckedCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput
    roomNotes?: RoomNoteUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRoomNewsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomNewsInput, UserUncheckedCreateWithoutRoomNewsInput>
  }

  export type RoomUpsertWithoutNewsInput = {
    update: XOR<RoomUpdateWithoutNewsInput, RoomUncheckedUpdateWithoutNewsInput>
    create: XOR<RoomCreateWithoutNewsInput, RoomUncheckedCreateWithoutNewsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutNewsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutNewsInput, RoomUncheckedUpdateWithoutNewsInput>
  }

  export type RoomUpdateWithoutNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomsNestedInput
    streamItems?: RoomStreamItemUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streamItems?: RoomStreamItemUncheckedUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutRoomNewsInput = {
    update: XOR<UserUpdateWithoutRoomNewsInput, UserUncheckedUpdateWithoutRoomNewsInput>
    create: XOR<UserCreateWithoutRoomNewsInput, UserUncheckedCreateWithoutRoomNewsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomNewsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomNewsInput, UserUncheckedUpdateWithoutRoomNewsInput>
  }

  export type UserUpdateWithoutRoomNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomNewsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUncheckedUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput
    roomNotes?: RoomNoteUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type RoomCreateWithoutNotesInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutRoomsInput
    streamItems?: RoomStreamItemCreateNestedManyWithoutRoomInput
    news?: RoomNewsCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateWithoutNotesInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
    streamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutRoomInput
    news?: RoomNewsUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomCreateOrConnectWithoutNotesInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutNotesInput, RoomUncheckedCreateWithoutNotesInput>
  }

  export type UserCreateWithoutRoomNotesInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeCreateNestedManyWithoutAuthorInput
    rooms?: RoomCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutRoomNotesInput = {
    id?: string
    email: string
    username: string
    password: string
    role?: $Enums.Role
    createdAt?: Date | string
    updatedAt?: Date | string
    vibes?: VibeUncheckedCreateNestedManyWithoutAuthorInput
    rooms?: RoomUncheckedCreateNestedManyWithoutAuthorInput
    roomStreamItems?: RoomStreamItemUncheckedCreateNestedManyWithoutAuthorInput
    roomNews?: RoomNewsUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutRoomNotesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRoomNotesInput, UserUncheckedCreateWithoutRoomNotesInput>
  }

  export type RoomUpsertWithoutNotesInput = {
    update: XOR<RoomUpdateWithoutNotesInput, RoomUncheckedUpdateWithoutNotesInput>
    create: XOR<RoomCreateWithoutNotesInput, RoomUncheckedCreateWithoutNotesInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutNotesInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutNotesInput, RoomUncheckedUpdateWithoutNotesInput>
  }

  export type RoomUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomsNestedInput
    streamItems?: RoomStreamItemUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streamItems?: RoomStreamItemUncheckedUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type UserUpsertWithoutRoomNotesInput = {
    update: XOR<UserUpdateWithoutRoomNotesInput, UserUncheckedUpdateWithoutRoomNotesInput>
    create: XOR<UserCreateWithoutRoomNotesInput, UserUncheckedCreateWithoutRoomNotesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRoomNotesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRoomNotesInput, UserUncheckedUpdateWithoutRoomNotesInput>
  }

  export type UserUpdateWithoutRoomNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutRoomNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    vibes?: VibeUncheckedUpdateManyWithoutAuthorNestedInput
    rooms?: RoomUncheckedUpdateManyWithoutAuthorNestedInput
    roomStreamItems?: RoomStreamItemUncheckedUpdateManyWithoutAuthorNestedInput
    roomNews?: RoomNewsUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type VibeCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    keywords?: VibeCreatekeywordsInput | string[]
    images?: VibeCreateimagesInput | string[]
    videoUrls?: VibeCreatevideoUrlsInput | string[]
    musicUrls?: VibeCreatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomCreateManyAuthorInput = {
    id?: string
    title: string
    description?: string | null
    poster?: string | null
    originVibeId?: string | null
    isPublic?: boolean
    tags?: RoomCreatetagsInput | string[]
    images?: RoomCreateimagesInput | string[]
    videoUrls?: RoomCreatevideoUrlsInput | string[]
    musicUrls?: RoomCreatemusicUrlsInput | string[]
    youtubeUrls?: RoomCreateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomStreamItemCreateManyAuthorInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    roomId: string
    createdAt?: Date | string
  }

  export type RoomNewsCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    roomId: string
    createdAt?: Date | string
  }

  export type RoomNoteCreateManyAuthorInput = {
    id?: string
    title: string
    content: string
    roomId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type VibeUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updates?: VibeUpdateUpdateManyWithoutVibeNestedInput
  }

  export type VibeUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updates?: VibeUpdateUncheckedUpdateManyWithoutVibeNestedInput
  }

  export type VibeUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    keywords?: VibeUpdatekeywordsInput | string[]
    images?: VibeUpdateimagesInput | string[]
    videoUrls?: VibeUpdatevideoUrlsInput | string[]
    musicUrls?: VibeUpdatemusicUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    inMainFeed?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streamItems?: RoomStreamItemUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    streamItems?: RoomStreamItemUncheckedUpdateManyWithoutRoomNestedInput
    news?: RoomNewsUncheckedUpdateManyWithoutRoomNestedInput
    notes?: RoomNoteUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    poster?: NullableStringFieldUpdateOperationsInput | string | null
    originVibeId?: NullableStringFieldUpdateOperationsInput | string | null
    isPublic?: BoolFieldUpdateOperationsInput | boolean
    tags?: RoomUpdatetagsInput | string[]
    images?: RoomUpdateimagesInput | string[]
    videoUrls?: RoomUpdatevideoUrlsInput | string[]
    musicUrls?: RoomUpdatemusicUrlsInput | string[]
    youtubeUrls?: RoomUpdateyoutubeUrlsInput | string[]
    roomConfig?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutStreamItemsNestedInput
  }

  export type RoomStreamItemUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutNewsNestedInput
  }

  export type RoomNewsUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    room?: RoomUpdateOneRequiredWithoutNotesNestedInput
  }

  export type RoomNoteUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    roomId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateCreateManyVibeInput = {
    id?: string
    content: string
    mediaUrls?: VibeUpdateCreatemediaUrlsInput | string[]
    createdAt?: Date | string
  }

  export type VibeUpdateUpdateWithoutVibeInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateUncheckedUpdateWithoutVibeInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type VibeUpdateUncheckedUpdateManyWithoutVibeInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    mediaUrls?: VibeUpdateUpdatemediaUrlsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemCreateManyRoomInput = {
    id?: string
    type: string
    content?: string | null
    mediaUrls?: RoomStreamItemCreatemediaUrlsInput | string[]
    url?: string | null
    title?: string | null
    authorId: string
    createdAt?: Date | string
  }

  export type RoomNewsCreateManyRoomInput = {
    id?: string
    title: string
    content: string
    authorId: string
    createdAt?: Date | string
  }

  export type RoomNoteCreateManyRoomInput = {
    id?: string
    title: string
    content: string
    authorId: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type RoomStreamItemUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomStreamItemsNestedInput
  }

  export type RoomStreamItemUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomStreamItemUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    mediaUrls?: RoomStreamItemUpdatemediaUrlsInput | string[]
    url?: NullableStringFieldUpdateOperationsInput | string | null
    title?: NullableStringFieldUpdateOperationsInput | string | null
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomNewsNestedInput
  }

  export type RoomNewsUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNewsUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutRoomNotesNestedInput
  }

  export type RoomNoteUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RoomNoteUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}