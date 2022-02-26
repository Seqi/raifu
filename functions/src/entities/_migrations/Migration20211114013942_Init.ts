import { Migration } from '@mikro-orm/migrations'

export class Migration20211114013942_Init extends Migration {
	async up(): Promise<void> {
		this.addSql(
			'create table if not exists "weapons" (' +
				'"id" varchar(14) not null, ' +
				'"platform" varchar(64) not null, ' +
				'"model" varchar(64) null, ' +
				'"brand" varchar(64) null, ' +
				'"nickname" varchar(64) null, ' +
				'"type" varchar(16) not null, ' +
				'"uid" varchar(32) not null, ' +
				'"createdAt" timestamptz not null, ' +
				'"updatedAt" timestamptz not null,' +
				'constraint "weapons_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "attachments" (' +
				'"id" varchar(14) not null, ' +
				'"platform" varchar(64) not null, ' +
				'"model" varchar(64) null, ' +
				'"brand" varchar(64) null, ' +
				'"nickname" varchar(64) null, ' +
				'"type" varchar(16) not null, ' +
				'"uid" varchar(32) not null, ' +
				'"createdAt" timestamptz not null, ' +
				'"updatedAt" timestamptz not null,' +
				'constraint "attachments_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "gear" (' +
				'"id" varchar(14) not null, ' +
				'"platform" varchar(64) not null, ' +
				'"model" varchar(64) null, ' +
				'"brand" varchar(64) null, ' +
				'"nickname" varchar(64) null, ' +
				'"type" varchar(16) not null, ' +
				'"uid" varchar(32) not null, ' +
				'"createdAt" timestamptz not null, ' +
				'"updatedAt" timestamptz not null,' +
				'constraint "gear_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "clothing" (' +
				'"id" varchar(14) not null, ' +
				'"platform" varchar(64) not null, ' +
				'"model" varchar(64) null, ' +
				'"brand" varchar(64) null, ' +
				'"nickname" varchar(64) null, ' +
				'"type" varchar(16) not null, ' +
				'"uid" varchar(32) not null, ' +
				'"createdAt" timestamptz not null, ' +
				'"updatedAt" timestamptz not null,' +
				'constraint "clothing_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "loadouts" (' +
				'"id" varchar(14) not null, ' +
				'"name" varchar(64) not null, ' +
				'"shared" bool null, ' +
				'"uid" varchar(32) not null, ' +
				'"createdAt" timestamptz(6) not null, ' +
				'"updatedAt" timestamptz(6) not null,' +
				'constraint "loadouts_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "loadout_weapons" (' +
				'"id" varchar(14) not null, ' +
				'"loadout_id" varchar(14) not null, ' +
				'"weapon_id" varchar(14) not null, ' +
				'"createdAt" timestamptz(0) not null, ' +
				'"updatedAt" timestamptz(0) not null,' +
				'constraint "loadout_weapons_pkey" primary key ("id"),' +
				'constraint "loadout_weapons_loadout_id_fk" foreign key ("loadout_id") references "loadouts" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapons_weapon_id_fk" foreign key ("weapon_id") references "weapons" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapons_loadout_id_weapon_id_key" unique ("loadout_id", "weapon_id")' +
				');',
		)

		this.addSql(
			'create table if not exists "loadout_weapon_attachments" (' +
				'"loadout_weapon_id" varchar(14) not null, ' +
				'"loadout_id" varchar(14) not null, ' +
				'"weapon_id" varchar(14) not null, ' +
				'"attachment_id" varchar(14) not null, ' +
				'"createdAt" timestamptz(0) not null, ' +
				'"updatedAt" timestamptz(0) not null,' +
				'constraint "loadout_weapon_attachments_pkey" primary key ("loadout_weapon_id", "loadout_id", "weapon_id", "attachment_id"),' +
				'constraint "loadout_weapon_attachments_loadout_weapon_id_fk" foreign key ("loadout_weapon_id") references "loadout_weapons" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapon_attachments_loadout_id_fk" foreign key ("loadout_id") references "loadouts" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapon_attachments_weapon_id_fk" foreign key ("weapon_id") references "weapons" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapon_attachments_attachment_id_fk" foreign key ("attachment_id") references "attachments" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_weapon_attachments_loadout_weapon_id_attachment_id_key" unique ("loadout_weapon_id", "attachment_id")' +
				');',
		)

		this.addSql(
			'create table if not exists "loadout_gear" (' +
				'"id" varchar(14) not null, ' +
				'"loadout_id" varchar(14) not null, ' +
				'"gear_id" varchar(14) not null, ' +
				'"createdAt" timestamptz(0) not null, ' +
				'"updatedAt" timestamptz(0) not null,' +
				'constraint "loadout_gear_pkey" primary key ("id"),' +
				'constraint "loadout_gear_loadout_id_fk" foreign key ("loadout_id") references "loadouts" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_gear_gear_id_fk" foreign key ("gear_id") references "gear" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_gear_loadout_id_gear_id_key" unique ("loadout_id", "gear_id")' +
				');',
		)

		this.addSql(
			'create table if not exists "loadout_clothing" (' +
				'"id" varchar(14) not null, ' +
				'"loadout_id" varchar(14) not null, ' +
				'"clothing_id" varchar(14) not null, ' +
				'"createdAt" timestamptz(0) not null, ' +
				'"updatedAt" timestamptz(0) not null,' +
				'constraint "loadout_clothing_pkey" primary key ("id"),' +
				'constraint "loadout_clothing_loadout_id_fk" foreign key ("loadout_id") references "loadouts" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_clothing_clothing_id_fk" foreign key ("clothing_id") references "clothing" ("id") on update cascade on delete cascade,' +
				'constraint "loadout_clothing_loadout_id_clothing_id_key" unique ("loadout_id", "clothing_id")' +
				');',
		)

		this.addSql(
			'create table if not exists "events" (' +
				'"id" varchar(14) not null, ' +
				'"name" varchar(256) not null, ' +
				'"location" varchar(256) not null, ' +
				'"date" timestamptz(6) null, ' +
				'"organiser_uid" varchar(32) not null, ' +
				'"public" bool not null, ' +
				'"createdAt" timestamptz(0) not null, ' +
				'"updatedAt" timestamptz(0) not null,' +
				'constraint "events_pkey" primary key ("id")' +
				');',
		)

		this.addSql(
			'create table if not exists "event_users" (' +
				'"id" varchar(14) not null, ' +
				'"uid" varchar(32) not null, ' +
				'"event_id" varchar(14) null,' +
				'"loadout_id" varchar(14) null,' +
				'"createdAt" timestamptz(6) not null,' +
				'"updatedAt" timestamptz(6) not null, ' +
				'"deletedAt" date null,' +
				'constraint "event_users_pkey" primary key ("id"),' +
				'constraint "event_users_uid_event_id_key" unique ("uid", "event_id"),' +
				'constraint "event_users_event_id_fk" foreign key ("event_id") references "events" ("id") on update cascade on delete cascade,' +
				'constraint "event_users_loadout_id_fk" foreign key ("loadout_id") references "loadouts" ("id") on update cascade on delete set null' +
				');',
		)
	}
}
