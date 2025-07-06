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

# klik tombol login
login_button = driver.find_element(By.ID, 'login-button')
login_button.click()
time.sleep(3)

# Data test case dari gambar
login_test_cases = [
    {"id": "L001", "username": "Saii", "password": "Saii23"},                   # ✅ valid
    {"id": "L002", "username": "SaiiFake", "password": "Saii23"},               # ❌ username tidak ditemukan
    {"id": "L003", "username": "Saii", "password": "SalahPassword"},            # ❌ password salah
    {"id": "L004", "username": "", "password": "SaiiGanteng"},                  # ❌ username kosong
    {"id": "L005", "username": "SaiiGanteng", "password": ""},                  # ❌ password kosong
    {"id": "L006", "username": "", "password": ""},                             # ❌ semua field kosong
    {"id": "L007", "username": "saii@gmail.com", "password": "Saii23"},         # ❌ username pakai email
    {"id": "L008", "username": "Saii", "password": "123"},                      # ❌ password pendek
]

def fill_login_and_submit(data):
    try:
        # Tunggu sampai field tersedia
        wait.until(EC.presence_of_element_located((By.ID, 'login-username')))
        time.sleep(1)

        # Clear input
        driver.find_element(By.ID, 'login-username').clear()
        driver.find_element(By.ID, 'login-password').clear()

        # Isi input
        driver.find_element(By.ID, 'login-username').send_keys(data['username'])
        driver.find_element(By.ID, 'login-password').send_keys(data['password'])

        # Klik tombol login
        driver.find_element(By.ID, 'submit-login').click()
        time.sleep(2)

        print(f"✔️ Test Case {data['id']} dikirim dengan username: {data['username']} dan password: {data['password']}")
    except Exception as e:
        print(f"❌ Gagal menjalankan test case {data['id']}: {e}")

    # Kembali ke halaman login jika dialihkan (jika ada redirect setelah login)
    try:
        driver.get('http://localhost:5173/login')  # atau klik tombol login jika pakai router
        time.sleep(2)
    except:
        pass

# Jalankan semua test case
for case in login_test_cases:
    fill_login_and_submit(case)
    time.sleep(2)

print("\n✅ Semua test case login selesai dijalankan.")
driver.quit()
