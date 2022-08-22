import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry { 'desc' : string, 'phone' : Phone }
export type Name = string;
export type Phone = string;
export interface _SERVICE {
  'deleteContact' : ActorMethod<[Name], [] | [Entry]>,
  'entries' : ActorMethod<[], Array<[Name, Entry]>>,
  'getSize' : ActorMethod<[], bigint>,
  'insert' : ActorMethod<[Name, Entry], string>,
  'lookup' : ActorMethod<[Name], [] | [Entry]>,
  'updateContact' : ActorMethod<[Name, Entry], [] | [Entry]>,
}
