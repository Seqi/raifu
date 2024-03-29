CREATE TABLE IF NOT EXISTS "weapons" (
    "id"   VARCHAR(14) NOT NULL, 
    "platform" VARCHAR(64) NOT NULL, 
    "model" VARCHAR(64), 
    "brand" VARCHAR(64),
    "nickname" VARCHAR(64), 
    "type" VARCHAR(16) NOT NULL, 
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "attachments" (
    "id"   VARCHAR(14) NOT NULL, 
    "platform" VARCHAR(64) NOT NULL,
    "model" VARCHAR(64), 
    "brand" VARCHAR(64), 
    "nickname" VARCHAR(64), 
    "type" VARCHAR(16) NOT NULL, 
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));
    
CREATE TABLE IF NOT EXISTS "gear" (
    "id"   VARCHAR(14) NOT NULL, 
    "platform" VARCHAR(64) NOT NULL,
    "model" VARCHAR(64), 
    "brand" VARCHAR(64), 
    "nickname" VARCHAR(64), 
    "type" VARCHAR(16) NOT NULL, 
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));
    
CREATE TABLE IF NOT EXISTS "clothing" (
    "id"   VARCHAR(14) NOT NULL, 
    "platform" VARCHAR(64) NOT NULL,
    "model" VARCHAR(64), 
    "brand" VARCHAR(64), 
    "nickname" VARCHAR(64), 
    "type" VARCHAR(16) NOT NULL, 
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadouts" (
    "id"   VARCHAR(14) NOT NULL, 
    "name" VARCHAR(64) NOT NULL, 
    "shared" BOOLEAN,
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadout_weapons" (
    "id"   VARCHAR(14) NOT NULL, 
    "loadout_id"  VARCHAR(14) NOT NULL REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "weapon_id"  VARCHAR(14) NOT NULL REFERENCES "weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_id", "weapon_id"), 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadout_weapon_attachments" (
    "loadout_weapon_id" VARCHAR(14) NOT NULL  REFERENCES "loadout_weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "loadout_id"  VARCHAR(14) NOT NULL  REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "weapon_id"  VARCHAR(14) NOT NULL  REFERENCES "weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "attachment_id"  VARCHAR(14) NOT NULL  REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_weapon_id", "attachment_id"), 
    PRIMARY KEY ("loadout_weapon_id","loadout_id","weapon_id","attachment_id"));

CREATE TABLE IF NOT EXISTS "loadout_gear" (
    "id"   VARCHAR(14) NOT NULL, 
    "loadout_id"  VARCHAR(14) NOT NULL REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "gear_id"  VARCHAR(14) NOT NULL REFERENCES "gear" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_id", "gear_id"), 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadout_clothing" (
    "id"   VARCHAR(14) NOT NULL, 
    "loadout_id"  VARCHAR(14) NOT NULL REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "clothing_id"  VARCHAR(14) NOT NULL REFERENCES "clothing" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_id", "clothing_id"), 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "events" (
    "id" VARCHAR(14) NOT NULL DEFAULT '' , 
    "name" VARCHAR(256) NOT NULL, 
    "location" VARCHAR(256) NOT NULL, 
    "date" TIMESTAMP WITH TIME ZONE, 
    "organiser_uid" VARCHAR(32) NOT NULL,
    "public" BOOLEAN DEFAULT false NOT NULL,
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
     PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "event_users" (
    "id" VARCHAR(14) NOT NULL DEFAULT '' ,
    "uid" VARCHAR(32) NOT NULL, 
    "event_id" VARCHAR(14) REFERENCES "events" ("id") ON DELETE CASCADE ON UPDATE CASCADE DEFERRABLE INITIALLY IMMEDIATE, 
    "loadout_id" VARCHAR(14) REFERENCES "loadouts" ("id") ON DELETE SET NULL ON UPDATE CASCADE DEFERRABLE INITIALLY IMMEDIATE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "deletedAt" TIMESTAMP WITH TIME ZONE NOT NULL,
    UNIQUE ("uid", "event_id"),
     PRIMARY KEY ("id"));