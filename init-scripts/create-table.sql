use films;
CREATE TABLE genre(
 id int not null auto_increment,
 name varchar(100) not null,
 primary key (id)
);

CREATE TABLE films(
 id int not null auto_increment,
 title varchar(100) not null,
 director varchar(100) not null,
 genre_id int not null,
 rating decimal not null,
 release_date date not null,
 primary key (id),
 foreign key (genre_id) references genre(id)
);
