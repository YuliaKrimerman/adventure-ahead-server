CREATE TABLE pack_data (
	id int4 NOT NULL GENERATED BY DEFAULT AS IDENTITY,
	list text NOT NULL,
	user_id int4 NULL,
	checked bool NOT NULL,
	CONSTRAINT pack_data_pkey PRIMARY KEY (id),
	CONSTRAINT pack_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES users_data(id) ON DELETE SET NULL

);