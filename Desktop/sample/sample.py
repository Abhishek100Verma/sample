import os
import sys
import datetime
import getpass  
import pytest  

def system_info_and_login():

    current_time = datetime.datetime.now()
    print(f"Current Date and Time: {current_time}")


    current_directory = os.getcwd()
    os_info = os.uname() if hasattr(os, 'uname') else "OS Info not available"
    print(f"Current Working Directory: {current_directory}")
    print(f"Operating System Info: {os_info}")

   
    python_version = sys.version
    print(f"Python Version: {python_version}")

    try:
        username = getpass.getuser()
        password = getpass.getpass(f"Enter password for {username}: ")
    except (OSError, EOFError) as e:

        print(f"Error occurred: {e}")
        username = "non-interactive-user"
        password = "password"
        print(f"Simulating login for {username}")
    

    if password == "password":
        print(f"Login successful for user {username}")
    else:
        print("Incorrect password")

@pytest.fixture
def test_system_info_and_login():
    system_info_and_login()

if __name__ == "__main__":
    system_info_and_login()
