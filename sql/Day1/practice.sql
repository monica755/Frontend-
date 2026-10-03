create database  govt;
use  govt;
create table info(
userid int primary key auto_increment,
username varchar(20)

);
drop table info;
alter table table info add useremail var(30) unique;
