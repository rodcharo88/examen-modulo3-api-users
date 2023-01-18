CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombreCompleto VARCHAR(500) NOT NULL,
    edad SMALLINT
)

CREATE TABLE status (
	nameSystem VARCHAR(200) primary key,
	version VARCHAR(20) not null,
	developer VARCHAR(250) not null,
	email VARCHAR(200)
)

insert into status (nameSystem, version, developer, email) 
values('api-users', '0.0.1', 'Israel Rodrigo Rocha Romero', 'rodcharo@gmail.com');