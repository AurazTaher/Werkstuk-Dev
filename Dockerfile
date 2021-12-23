from mysql:5.7
COPY ./init-scripts /docker-entrypoint-initdb.d/


#Uitleg tabel aanmaken dockerfile bij startup 
#https://betterprogramming.pub/customize-your-mysql-database-in-docker-723ffd59d8fb

