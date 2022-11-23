import requests as re
import mysql.connector
import random

# database information
hostname = 'localhost'
database = 'alumni_db'
username = 'db_user'
password = 'mysqlpassword%2020'

# data information
data_size = 5

# im so sorry
sex = ['Male', 'Female']

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
        print (f"Insert(Name): {resp['first_name'] + ' ' + resp['last_name']}")
        print (f"Insert(Email): {resp['email']}")
        print (f"Insert(Sex): {resp['gender']}")
        print (f"Insert(Avatar): {resp['avatar']}")
        print ()

        query = f"""INSERT INTO alumnus_bio (name, sex, batch, course_id, email, avatar, employment_status, status, facebook_link, twitter_link, linkedin_link, github_link)
            VALUES ('{resp['first_name'] + ' ' + resp['last_name']}', '{resp['gender']}', '2020', '1', '{resp['email']}', '{resp['avatar']}', 'Unemployed', '3', '#', '#', '#', '#');"""

        cursor = connection.cursor()
        cursor.execute(query)

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