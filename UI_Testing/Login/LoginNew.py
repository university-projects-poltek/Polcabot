from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time

# Path ke chromedriver
driver_path = r'C:\AutomationTesting\UI_Testing\Selenium\chromedriver-win32\chromedriver.exe'
driver = webdriver.Chrome(service=Service(driver_path))

# Buka halaman login
driver.get('http://localhost:5173/')
time.sleep(2)

# Klik tombol login
driver.find_element(By.ID, 'login-button').click()
time.sleep(2)
# Daftar test case login
login_test_cases = [
    {"username": "SaiiFake",        "password": "Saii23"},
    {"username": "Saii",            "password": "SalahPassword"},
    {"username": "",                "password": "SaiiGanteng"},
    {"username": "SaiiGanteng",     "password": ""},
    {"username": "",                "password": ""},
    {"username": "saii@gmail.com",  "password": "Saii23"},
    {"username": "Saii",            "password": "123"},
    {"username": "Saii",            "password": "Saii23"},  # valid
]
# Fungsi untuk clear input field (React controlled input)
def clear_input(field_id):
    field = driver.find_element(By.ID, field_id)
    field.send_keys(Keys.CONTROL, 'a')
    field.send_keys(Keys.BACKSPACE)
# Fungsi login
def login(data):
    # Clear input
    clear_input('username')
    clear_input('password')
    # Isi input
    driver.find_element(By.ID, 'username').send_keys(data['username'])
    driver.find_element(By.ID, 'password').send_keys(data['password'])
    # Klik tombol login
    driver.find_element(By.ID, 'submit-login').click()
    time.sleep(2)
# Jalankan semua test case
for case in login_test_cases:
    login(case)
    time.sleep(2)

time.sleep(3)
driver.quit()
