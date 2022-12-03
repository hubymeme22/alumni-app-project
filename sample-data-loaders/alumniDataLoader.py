import requests as re
import mysql.connector
import random

# database information
hostname = 'localhost'
database = 'alumni_db'
username = 'db_user'
password = 'mysqlpassword%2020'

# data information
data_size = 2

# im so sorry
sex = ['Male', 'Female']
employment_status_choices = ['unemployed', 'full-time', 'part-time']

print ("[+] Connecting to data generator API")
data = re.get(f"https://random-data-api.com/api/v2/users?response_type=json&size={data_size}")

print ()
print ("==================== Generated data ====================")
print ("Status code:", data.status_code)

try:
    print (f"[*] Connecting to database: '{username}@{hostname}'")
    connection = mysql.connector.connect(
        host=hostname,
        database=database,
        user=username,
        password=password)

    print ("[+] Connected!")
    response = data.json()

    for resp in response:
        resp['gender'] = random.choice(sex)
        resp['age'] = random.randint(18, 100)
        resp['employment'] = random.choice(employment_status_choices)

        print (f"Insert(Name): {resp['first_name'] + ' ' + resp['last_name']}")
        print (f"Insert(Email): {resp['email']}")
        print (f"Insert(Sex): {resp['gender']}")
        print (f"Insert(Age): {resp['age']}")
        print (f"Insert(Employment_status): {resp['employment']}")
        print (f"Insert(Avatar): {resp['avatar']}")
        print ()

        query_addAlumnus = f"""INSERT INTO alumnus_bio (id, first_name, last_name, sex, age, batch, course_id, email, avatar, employment_status, status, facebook_link, twitter_link, linkedin_link, github_link, education)
            VALUES ('{resp['id']}', '{resp['first_name']}', '{resp['last_name']}', '{resp['gender']}', '{resp['age']}', '2020', '1', '{resp['email']}', '{resp['avatar']}', '{resp['employment']}', '3', '#', '#', '#', '#', 'undergrad');"""

        query_addUsers   = f"""INSERT INTO users (username, email, password, type, auto_generated_pass, alumnus_id)
            VALUES ('{resp['username']}', '{resp['email']}', '{resp['password']}', '3', '', {resp['id']});
        """

        cursor = connection.cursor()
        cursor.execute(query_addAlumnus)
        cursor.execute(query_addUsers)

    connection.commit()

except mysql.connector.Error as error:
    print ('Error occured:', error)

except:
    print('Error when connecting to MySQL Database')
    exit()

finally:
    if connection.is_connected():
        connection.close()
        print("MySQL connection is closed")