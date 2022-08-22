import { Actor, HttpAgent } from "@dfinity/agent";

// Imports and re-exports candid interface
import { idlFactory } from './phonebook_backend.did.js';
export { idlFactory } from './phonebook_backend.did.js';
// CANISTER_ID is replaced by webpack based on node environment
export const canisterId = process.env.PHONEBOOK_BACKEND_CANISTER_ID;

/**
 * 
 * @param {string | import("@dfinity/principal").Principal} canisterId Canister ID of Agent
 * @param {{agentOptions?: import("@dfinity/agent").HttpAgentOptions; actorOptions?: import("@dfinity/agent").ActorConfig}} [options]
 * @return {import("@dfinity/agent").ActorSubclass<import("./phonebook_backend.did.js")._SERVICE>}
 */
export const createActor = (canisterId, options) => {
  const agent = new HttpAgent(options ? { ...options.agentOptions } : {});
  
  // Fetch root key for certificate validation during development
  if (process.env.NODE_ENV !== "production") {
    agent.fetchRootKey().catch(err => {
      console.warn("Unable to fetch root key. Check to ensure that your local replica is running");
      console.error(err);
    });
  }

  // Creates an actor with using the candid interface and the HttpAgent
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
    ...(options ? options.actorOptions : {}),
  });
};
  
/**
 * A ready-to-use agent for the phonebook_backend canister
 * @type {import("@dfinity/agent").ActorSubclass<import("./phonebook_backend.did.js")._SERVICE>}
 */
export const phonebook_backend = createActor(canisterId);
