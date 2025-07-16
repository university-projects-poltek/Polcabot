import os
import time
from datetime import datetime
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.alert import Alert
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service

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
tryChat_button = driver.find_element(By.ID, 'try-chat')
tryChat_button.click()
time.sleep(3)
# Tes akun belum terdaftar
username_field_login = driver.find_element(By.ID, 'username')
password_field_login = driver.find_element(By.ID, 'password')
# isi form login
username_field_login.send_keys('Saii')
password_field_login.send_keys('Saii23')
# Klik tombol Masuk
time.sleep(2)
submit_button_login = driver.find_element(By.ID, 'submit-login')
submit_button_login.click()
time.sleep(3)

#############################################################################################################
# Register #

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
    # {"fullname": "Tes Pass Sp Chr",   "email": "Abcd@gmail.com", "username": "abcd",    "password": "Abcd@123",     "confirm": "Abcd@123"},
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

#####################################################################################
# Login #

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
    time.sleep(3)
    # Klik tombol login
    driver.find_element(By.ID, 'submit-login').click()
    time.sleep(2)
# Jalankan semua test case
for case in login_test_cases:
    login(case)
    time.sleep(2)

#####################################################################################
# Chatbot

# Buat folder log
log_dir = "ChatLogs"
os.makedirs(log_dir, exist_ok=True)
# Buat nama file log otomatis dengan timestamp
timestamp_for_filename = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
log_file_path = os.path.join(log_dir, f'chat_log_{timestamp_for_filename}.txt')
# Inisialisasi file log
with open(log_file_path, 'w', encoding='utf-8') as f:
    f.write("===== ChatBot Interaction Log =====\n\n")
# Fungsi kirim pertanyaan dan log hasilnya
def send_and_wait_forever(question_text):
    print(f"\n❓ Sending question: {question_text}")
    with open(log_file_path, 'a', encoding='utf-8') as f:
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        f.write(f"[{timestamp}] User: {question_text}\n")
    # Hitung jumlah respons sebelum kirim
    old_responses = driver.find_elements(By.CLASS_NAME, 'chat-bot-response')
    old_count = len(old_responses)
    chat_input = driver.find_element(By.ID, 'chat-input')
    # chat_input.clear()
    chat_input.send_keys(question_text)
    chat_input.send_keys(Keys.ENTER)
    # Tunggu respons muncul
    while True:
        new_responses = driver.find_elements(By.CLASS_NAME, 'chat-bot-response')
        if len(new_responses) > old_count:
            break
        time.sleep(1)
    # Tunggu sampai teks muncul
    latest_bot_response = ""
    max_wait = 20
    waited = 0
    while waited < max_wait:
        new_responses = driver.find_elements(By.CLASS_NAME, 'chat-bot-response')
        for i in range(old_count, len(new_responses)):
            text = new_responses[i].text.strip()
            if text and text != question_text:
                latest_bot_response = text
                break
        if latest_bot_response:
            break
        time.sleep(1)
        waited += 1
    if not latest_bot_response:
        latest_bot_response = "<Respons kosong atau gagal dibaca>"
    print(f"✔️ Bot replied: {latest_bot_response[:80]}...")
    # Tulis ke file
    with open(log_file_path, 'a', encoding='utf-8') as f:
        f.write(f"[{timestamp}] Bot : {latest_bot_response}\n\n")
# Pertanyaan-pertanyaan
questions = [
    "jurusan apa saja yang ada di poltek",
    "Siapa rektor Polibatam?",
    "bagaimana cara mengambil ijazah",
    "Apa visi misi politeknik negri batam?"
]
# Jalankan
for q in questions:
    send_and_wait_forever(q)
    
time.sleep(20)

# klik tombol logout
logout_button = driver.find_element(By.ID, 'logout-button')
logout_button.click()
time.sleep(3)

# Tutup browser
time.sleep(3)
driver.quit()
