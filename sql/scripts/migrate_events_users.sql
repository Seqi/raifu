-- Script to migrate a single events table into events and event_users (1:M)


-- Need to replicate shortids in postgres
-- https://stackoverflow.com/questions/3970795/how-do-you-create-a-random-string-thats-suitable-for-a-session-id-in-postgresql
Create or replace function random_string(length integer) returns text as
$$
declare
  chars text[] := '{0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z,a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,_}';
  result text := '';
  i integer := 0;
begin
  if length < 0 then
    raise exception 'Given length cannot be less than 0';
  end if;
  for i in 1..length loop
    result := result || chars[1+random()*(array_length(chars, 1)-1)];
  end loop;
  return result;
end;
$$ language plpgsql;

-- Copy over all events into the event_users table
INSERT INTO event_users SELECT random_string(9), "uid", "id" as "event_id", "loadout_id", "createdAt", "updatedAt" FROM events

-- Drop the loadout_id column on events as it belongs to the user
ALTER TABLE events DROP COLUMN loadout_id

-- Make the event owner the organiser
ALTER TABLE events RENAME COLUMN uid TO organiser_uid
