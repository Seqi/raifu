CREATE TABLE IF NOT EXISTS "weapons" (
    "id"   SERIAL , 
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
    "id"   SERIAL , 
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
    "id"   SERIAL , 
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
    "id"   SERIAL , 
    "name" VARCHAR(64) NOT NULL, 
    "displayId" VARCHAR(14) NOT NULL, 
    "uid" VARCHAR(32) NOT NULL, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadout_weapons" (
    "id"   SERIAL , 
    "loadout_id" INTEGER NOT NULL REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "weapon_id" INTEGER NOT NULL REFERENCES "weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_id", "weapon_id"), 
    PRIMARY KEY ("id"));

CREATE TABLE IF NOT EXISTS "loadout_weapon_attachments" (
    "loadout_weapon_id" INTEGER NOT NULL  REFERENCES "loadout_weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "loadout_id" INTEGER NOT NULL  REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "weapon_id" INTEGER NOT NULL  REFERENCES "weapons" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "attachment_id" INTEGER NOT NULL  REFERENCES "attachments" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_weapon_id", "attachment_id"), 
    PRIMARY KEY ("loadout_weapon_id","loadout_id","weapon_id","attachment_id"));

CREATE TABLE IF NOT EXISTS "loadout_gear" (
    "id"   SERIAL , 
    "loadout_id" INTEGER NOT NULL REFERENCES "loadouts" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "gear_id" INTEGER NOT NULL REFERENCES "gear" ("id") ON DELETE CASCADE ON UPDATE CASCADE, 
    "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL, 
    UNIQUE ("loadout_id", "gear_id"), 
    PRIMARY KEY ("id"));