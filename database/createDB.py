import sqlite3
db2 = sqlite3.connect('db.sqlite')
db2.execute('''DROP TABLE IF EXISTS movies''')
db2.execute('''
CREATE TABLE IF NOT EXISTS movies(
movie_id integer PRIMARY KEY AUTOINCREMENT,
name text NOT NULL,
poster text NOT NULL
)
''')
db2.execute('''DROP TABLE IF EXISTS comingsoon''')
db2.execute('''
CREATE TABLE IF NOT EXISTS comingsoon(
comingsoon_id integer PRIMARY KEY AUTOINCREMENT,
name text NOT NULL,
poster text NOT NULL,
description text NOT NULL,
date text NOT NULL
)
''')
db2.execute('''DROP TABLE IF EXISTS booking''')
db2.execute('''
CREATE TABLE IF NOT EXISTS booking(
booking_id INTEGER PRIMARY KEY,
 name text NOT NULL,
 date text NOT NULL,
 time text NOT NULL,
 amount int NOT NULL,
 poster text NOT NULL
 )
''')


cursor = db2.cursor()

cursor.execute('''
    INSERT INTO booking(name, date, time, amount, poster)
    VALUES(
    "Blood-Shot",
    "23-08-2022",
    "12:00",
    "1",
    "https://i.postimg.cc/8kMzZ18c/Blood-Shot.jpg"
    )
''')

cursor.execute('''
    INSERT INTO movies(name, poster)
    VALUES(
    "Blood-Shot",
    "https://i.postimg.cc/8kMzZ18c/Blood-Shot.jpg"
    )
''')

cursor.execute('''
    INSERT INTO movies(name, poster)
    VALUES(
    "Incantation",
    "https://i.postimg.cc/mkgBw10F/Incantation.jpg"
    )
''')

cursor.execute('''
    INSERT INTO movies(name, poster)
    VALUES(
    "Inception",
    "https://i.postimg.cc/NFXqb8dF/Inception.jpg"
    )
''')

cursor.execute('''
    INSERT INTO movies(name, poster)
    VALUES(
    "Prey",
    "https://i.postimg.cc/tJFR7HQB/Prey.jpg"
    )
''')

cursor.execute('''
    INSERT INTO movies(name, poster)
    VALUES(
    "Spider-Man",
    "https://i.postimg.cc/xj3WjdBW/Spider-Man.jpg"
    )
''')

cursor.execute('''
    INSERT INTO comingsoon(name, poster, description, date)
    VALUES(
    "Gods of Egypt",
    "https://i.postimg.cc/gjK7JMJC/Gods-of-Egypt.jpg",
    "Mortal hero Bek teams with the god Horus in an alliance against Set, the merciless god of darkness, who has usurped Egypt's throne, plunging the once peaceful and prosperous empire into chaos and conflict.",
    "1 September 2022"
    )
''')

cursor.execute('''
    INSERT INTO comingsoon(name, poster, description, date)
    VALUES(
    "Red Notice",
    "https://i.postimg.cc/RVVsdLq0/Red-Notice.jpg",
    "An Interpol agent successfully tracks down the world's most wanted art thief, with help from a rival thief. But nothing is as it seems, as a series of double-crosses ensue.",
    "25 September 2022"
    )
''')

cursor.execute('''
    INSERT INTO comingsoon(name, poster, description, date)
    VALUES(
    "Skyscraper",
    "https://i.postimg.cc/K8WHR3G8/skyscraper.jpg",
    "A security expert must infiltrate a burning skyscraper, 225 stories above ground, when his family is trapped inside by criminals.",
    "22 October 2022"
    )
''')

cursor.execute('''
    INSERT INTO comingsoon(name, poster, description, date)
    VALUES(
    "Pandora",
    "https://i.postimg.cc/SxRPSfpP/Pandora.jpg",
    "The explosion of a nuclear power plant caused by an earthquake leads to a disaster which no one other than its workers can stop from spreading further.",
    "25 August 2022"
    )
''')

cursor.execute('''
    INSERT INTO comingsoon(name, poster, description, date)
    VALUES(
    "Oblivion",
    "https://i.postimg.cc/yYV55zps/Oblivion.jpg",
    "A veteran assigned to extract Earth's remaining resources begins to question what he knows about his mission and himself.",
    "25 August 2022"
    )
''')


db2.commit()
db2.close()
