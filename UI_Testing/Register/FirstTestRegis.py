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


# # start testing
# login_button = driver.find_element(By.ID, 'login-button')
# login_button.click()
# time.sleep(3)

#############################################################################################################
# Register #

# Klik tombol Register
register_button = driver.find_element(By.ID, 'register-button') # ganti ID sesuai HTML
register_button.click()
time.sleep(3)
# Cari input full name, email, username, password, dan confirm password
fullname_field_register = driver.find_element(By.ID, 'register-fullname')
email_field_register = driver.find_element(By.ID, 'register-email')
username_field_register = driver.find_element(By.ID, 'register-username')
password_field_register = driver.find_element(By.ID, 'register-password') 
confirm_password_field_register = driver.find_element(By.ID, 'register-confirm-password')
# Isi input dengan confirmpassword yang salah
fullname_field_register.send_keys('Saidi Nur Pratama') 
email_field_register.send_keys('Saii@example.com')
username_field_register.send_keys('Saii')
password_field_register.send_keys('Saii23')
confirm_password_field_register.send_keys('Saii')
# Klik tombol Register
time.sleep(1)
register_button = driver.find_element(By.ID, 'submit-register')
register_button.click()
time.sleep(2)
# Alert
alert = Alert(driver)
alert.accept()
# Isi input dengan confirmpassword yang benar
confirm_password_field_register.clear()
confirm_password_field_register.send_keys('Saii23')
# Klik tombol Register
time.sleep(1)
register_button = driver.find_element(By.ID, 'submit-register')
register_button.click()
time.sleep(2)
# Alert
alert = Alert(driver)
alert.accept()