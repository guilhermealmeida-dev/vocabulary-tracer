#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/e181572cde957062a078bcfed9ad4dfa790ac507ce0152be336e04683a283bb6/contract';
import endContract from '../../snapshots/e181572cde957062a078bcfed9ad4dfa790ac507ce0152be336e04683a283bb6/contract.json' with { type: 'json' };
import {
  Migration,
  MigrationCLI,
  col,
  fn,
  lit,
  primaryKey,
  sql,
} from '@prisma/orm-postgres/migration';

export default class M extends Migration<never, End> {
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.createSchema({ schema: 'public' }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'PartOfSpeechType',
        members: [
          'NOUN',
          'VERB',
          'ADJECTIVE',
          'ADVERB',
          'PRONOUN',
          'PREPOSITION',
          'CONJUNCTION',
          'DETERMINER',
          'INTERJECTION',
          'AUXILIARY_VERB',
        ],
      }),
      this.createNativeEnumType({
        schema: 'public',
        typeName: 'WordLearningStatus',
        members: ['NEW', 'RECOGNIZED', 'KNOWN', 'ACTIVE'],
      }),
      this.createTable({
        schema: 'public',
        table: 'IrregularVerbForm',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pastParticiple', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pastParticipleTranslations', 'text[]', {
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('pastSimple', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('pastSimpleTranslations', 'text[]', {
            codecRef: { codecId: 'pg/text@1', many: true },
          }),
          col('wordCategoryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'User',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('email', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('passwordHash', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'UserWord',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('status', '"WordLearningStatus"', {
            notNull: true,
            default: lit('NEW'),
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'WordLearningStatus' } },
          }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('userId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('wordId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'Word',
        columns: [
          col('createdAt', 'timestamp(3)', {
            notNull: true,
            default: fn(sql`now()`),
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('name', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('updatedAt', 'timestamp(3)', {
            notNull: true,
            codecRef: { codecId: 'pg/timestamp-date@1', typeParams: { precision: 3 } },
          }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'WordCategory',
        columns: [
          col('category', '"PartOfSpeechType"', {
            notNull: true,
            codecRef: { codecId: 'pg/enum@1', typeParams: { typeName: 'PartOfSpeechType' } },
          }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('wordId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'WordMeaning',
        columns: [
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('meaning', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('wordCategoryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createTable({
        schema: 'public',
        table: 'WordVariation',
        columns: [
          col('form', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('id', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('translations', 'text[]', { codecRef: { codecId: 'pg/text@1', many: true } }),
          col('type', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
          col('wordCategoryId', 'text', { notNull: true, codecRef: { codecId: 'pg/text@1' } }),
        ],
        constraints: [primaryKey(['id'])],
      }),
      this.createIndex({
        schema: 'public',
        table: 'IrregularVerbForm',
        index: 'IrregularVerbForm_wordCategoryId_key',
        columns: ['wordCategoryId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'User',
        index: 'User_email_key',
        columns: ['email'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserWord',
        index: 'UserWord_userId_idx',
        columns: ['userId'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'UserWord',
        index: 'UserWord_userId_wordId_key',
        columns: ['userId', 'wordId'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'Word',
        index: 'Word_name_idx',
        columns: ['name'],
      }),
      this.createIndex({
        schema: 'public',
        table: 'Word',
        index: 'Word_name_key',
        columns: ['name'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'WordCategory',
        index: 'WordCategory_wordId_category_key',
        columns: ['wordId', 'category'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'WordMeaning',
        index: 'WordMeaning_wordCategoryId_meaning_key',
        columns: ['wordCategoryId', 'meaning'],
        extras: { unique: true },
      }),
      this.createIndex({
        schema: 'public',
        table: 'WordVariation',
        index: 'WordVariation_wordCategoryId_form_key',
        columns: ['wordCategoryId', 'form'],
        extras: { unique: true },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'IrregularVerbForm',
        foreignKey: {
          name: 'IrregularVerbForm_wordCategoryId_fkey',
          columns: ['wordCategoryId'],
          references: { schema: 'public', table: 'WordCategory', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserWord',
        foreignKey: {
          name: 'UserWord_userId_fkey',
          columns: ['userId'],
          references: { schema: 'public', table: 'User', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'UserWord',
        foreignKey: {
          name: 'UserWord_wordId_fkey',
          columns: ['wordId'],
          references: { schema: 'public', table: 'Word', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'WordCategory',
        foreignKey: {
          name: 'WordCategory_wordId_fkey',
          columns: ['wordId'],
          references: { schema: 'public', table: 'Word', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'WordMeaning',
        foreignKey: {
          name: 'WordMeaning_wordCategoryId_fkey',
          columns: ['wordCategoryId'],
          references: { schema: 'public', table: 'WordCategory', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
      this.addForeignKey({
        schema: 'public',
        table: 'WordVariation',
        foreignKey: {
          name: 'WordVariation_wordCategoryId_fkey',
          columns: ['wordCategoryId'],
          references: { schema: 'public', table: 'WordCategory', columns: ['id'] },
          onDelete: 'cascade',
          onUpdate: 'cascade',
        },
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
