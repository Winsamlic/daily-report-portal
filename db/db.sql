DROP DATABASE IF EXISTS daily_report_magla;
CREATE DATABASE daily_report_magla;
USE daily_report_magla;

CREATE TABLE admins (
    admin_id INT auto_increment primary key,
    name varchar(255),
    password varchar(255) not null,
    email varchar(255) unique not null
);

CREATE TABLE users (
    user_id INT auto_increment primary key,
    name varchar(255) not null,
    email varchar(255) unique not null,
    password varchar(32) not null,
    confirmation_code VARCHAR(6),
    admin_id INT,
    foreign key (admin_id) references admins(admin_id)
);


CREATE TABLE reports (
    report_id INT auto_increment primary key,
    user_id INT,
    foreign key (user_id) references users(user_id),
    game varchar(255),
    sale double,
    betcount double,
    totalwin double,
    stakewin double,
    wincount double,
    GGR double,
    GGR_percentage double,
    DET double,
    Gaming_Tax double,
    NGR_after_DET_Levy double,
    totalwingt100k double,
    stakewingt100k double,
    totalwingt100kcount double,
    WHT double,
    approved boolean default false
);
