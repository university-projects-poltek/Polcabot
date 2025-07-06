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

#############################################################################################################
# start testing

# klik tombol login
login_button = driver.find_element(By.ID, 'login-button')
login_button.click()
time.sleep(3)

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

#####################################################################################
# Login #

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

#####################################################################################
# Chatbot

time.sleep(2)
# Isi input chatbot dengan pesan 1
chat_input = driver.find_element(By.ID, 'chat-input')
question = "Bagaimana cara daftar ulang?"
chat_input.send_keys(question)
chat_input.send_keys(Keys.ENTER)
time.sleep(5)
# Isi Input chatbot dengan pesan 2
chat_input = driver.find_element(By.ID, 'chat-input')
question2 = "Siapa rektor Polibatam?"
chat_input.send_keys(question2)
chat_input.send_keys(Keys.ENTER)
time.sleep(5)
# Isi Input chatbot dengan pesan 3
chat_input = driver.find_element(By.ID, 'chat-input')
question3 = "Malam ini ada pertandingan bola apa saja?"
chat_input.send_keys(question3)
chat_input.send_keys(Keys.ENTER)
time.sleep(5)



# Tutup browser
time.sleep(5)
driver.quit()
