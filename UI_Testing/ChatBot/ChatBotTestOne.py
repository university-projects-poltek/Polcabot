import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service

# Path ke chromedriver
driver_path = r'C:\AutomationTesting\UI_Testing\Selenium\chromedriver-win32\chromedriver.exe'

# Setup Chrome
service = Service(driver_path)
driver = webdriver.Chrome(service=service)

# Buka chatbot
driver.get('http://localhost:5173/chatroom')
time.sleep(3)

# Fungsi kirim pertanyaan dan tunggu jawaban tanpa batas waktu
def send_and_wait_forever(question_text):
    print(f"❓ Sending question: {question_text}")

    # Hitung jumlah respons sebelum kirim
    old_count = len(driver.find_elements(By.CLASS_NAME, 'chat-response'))

    # Kirim pertanyaan
    chat_input = driver.find_element(By.ID, 'chat-input')
    chat_input.send_keys(question_text)
    chat_input.send_keys(Keys.ENTER)

    # Tunggu sampai jumlah respons bertambah
    while True:
        new_count = len(driver.find_elements(By.CLASS_NAME, 'chat-response'))
        if new_count > old_count:
            print("✔️ Response received!")
            break
        time.sleep(1)  # cek setiap 1 detik

# Kirim pertanyaan dan tunggu terus-menerus
send_and_wait_forever("jurusan apa saja yang ada di politeknik negri batam dan sebutkan prodinya")
send_and_wait_forever("Siapa rektor Polibatam?")
send_and_wait_forever("bagaimana cara mengambil ijazah")
send_and_wait_forever("Apa visi misi politeknik negri batam?")

# Tutup browser
time.sleep(3)
driver.quit()
