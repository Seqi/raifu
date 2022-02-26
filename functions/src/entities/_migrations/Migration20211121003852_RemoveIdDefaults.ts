import { Migration } from '@mikro-orm/migrations'

export class Migration20211121003852_RemoveIdDefaults extends Migration {
	async up(): Promise<void> {
		this.addSql('alter table "events" alter column "id" drop default;')
		this.addSql('alter table "event_users" alter column "id" drop default;')
	}
}
