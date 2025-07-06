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
# driver.get('http://localhost:5173/chatroom')

time.sleep(3)

#####################################################################################
# Login #

# klik tombol login
login_button = driver.find_element(By.ID, 'login-button')
login_button.click()
time.sleep(3)

username_field_login = driver.find_element(By.ID, 'username')
password_field_login = driver.find_element(By.ID, 'password')
# Isi form login dengan akun yang salah
username_field_login.send_keys('saii')
password_field_login.send_keys('saii123')
# Klik tombol Masuk
time.sleep(2)
submit_button_login = driver.find_element(By.ID, 'submit-login')
submit_button_login.click()
time.sleep(2)
# isi form login dengan akun yang benar
username_field_login.clear()
username_field_login.send_keys('Saii')
password_field_login.clear()
password_field_login.send_keys('Saii23')
# Klik tombol Masuk
time.sleep(2)
submit_button_login = driver.find_element(By.ID, 'submit-login')
submit_button_login.click()

# Tutup browser
time.sleep(5)
driver.quit()