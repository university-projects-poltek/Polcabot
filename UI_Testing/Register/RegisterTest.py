from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
import time

# Path ke chromedriver
driver_path = r'C:\AutomationTesting\UI_Testing\Selenium\chromedriver-win32\chromedriver.exe'

# Buat service object baru
service = Service(driver_path)
driver = webdriver.Chrome(service=service)

# Buka halaman login
driver.get('http://localhost:5173/')  # ganti link login asli


time.sleep(3)

# Klik tombol login
tryChat_button = driver.find_element(By.ID, 'try-chat')
tryChat_button.click()
time.sleep(3)
# Klik tombol Register
register_button = driver.find_element(By.ID, 'register-button') # ganti ID sesuai HTML
register_button.click()
time.sleep(3)
# Daftar test case dari gambar
test_cases = [
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "Saii%$",  "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "Saii",    "password": "SaiiJelek",    "confirm": "SaiiGanteng"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "",        "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "Saii",    "password": "",             "confirm": "SaiiGanteng"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "Saii",    "password": "Saii",         "confirm": "Saii"},
    {"fullname": "",                  "email": "Saii@gmail.com", "username": "Saii",    "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi123@%$",       "email": "Saii@gmail.com", "username": "Saii",    "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi Nur Pratama", "email": "",               "username": "Saii",    "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@mail.com",  "username": "Saii",    "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Saidi Nur Pratama", "email": "Saii@gmail.com", "username": "Saii",    "password": "Saii23",       "confirm": "Saii23"},
    {"fullname": "Tes Pass Spc Chr",  "email": "Abcd@gmail.com", "username": "abcd",    "password": "Abcd@123",     "confirm": "Abcd@123"},
]
# Fungsi clear pakai keyboard shortcut
def clear_input(field_id):
    el = driver.find_element(By.ID, field_id)
    el.send_keys(Keys.CONTROL, 'a')
    el.send_keys(Keys.BACKSPACE)
# Fungsi helper untuk register ulang
def fill_and_submit_register(data):
    # Clear all fields
    clear_input('register-fullname')
    clear_input('register-email')
    clear_input('register-username')
    clear_input('register-password')
    clear_input('register-confirm-password')
    # Isi data
    driver.find_element(By.ID, 'register-fullname').send_keys(data['fullname'])
    driver.find_element(By.ID, 'register-email').send_keys(data['email'])
    driver.find_element(By.ID, 'register-username').send_keys(data['username'])
    driver.find_element(By.ID, 'register-password').send_keys(data['password'])
    driver.find_element(By.ID, 'register-confirm-password').send_keys(data['confirm'])
    time.sleep(3)
    # Submit form
    driver.find_element(By.ID, 'submit-register').click()
    time.sleep(2)
    # Klik sembarang tempat untuk memastikan tidak redirect
    try:
        body = driver.find_element(By.TAG_NAME, 'body')
        body.click()
    except:
        pass
# Loop semua test case
for case in test_cases:
    fill_and_submit_register(case)
    time.sleep(2)

# Tutup browser
time.sleep(5)
driver.quit()