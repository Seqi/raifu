ALTER TABLE event_users
DROP CONSTRAINT event_users_loadout_id_fkey;

ALTER TABLE event_users
ADD CONSTRAINT event_users_loadout_id_fkey 
FOREIGN KEY (loadout_id) REFERENCES loadouts(id)
ON DELETE SET NULL
ON UPDATE CASCADE 
DEFERRABLE INITIALLY IMMEDIATE;