// Mirrors the PartOfSpeechType value set declared in the data contract
// (src/prisma/schema.prisma), so client code can use it without the server.
export const PartOfSpeechType = {
  NOUN: "NOUN",
  VERB: "VERB",
  ADJECTIVE: "ADJECTIVE",
  ADVERB: "ADVERB",
  PRONOUN: "PRONOUN",
  PREPOSITION: "PREPOSITION",
  CONJUNCTION: "CONJUNCTION",
  DETERMINER: "DETERMINER",
  INTERJECTION: "INTERJECTION",
  AUXILIARY_VERB: "AUXILIARY_VERB",
} as const;

export type PartOfSpeechType =
  (typeof PartOfSpeechType)[keyof typeof PartOfSpeechType];
