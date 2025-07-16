import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from datetime import datetime

# Path ke chromedriver
driver_path = r'C:\AutomationTesting\UI_Testing\Selenium\chromedriver-win32\chromedriver.exe'

# Setup Chrome
service = Service(driver_path)
driver = webdriver.Chrome(service=service)

# Buka chatbot
driver.get('http://localhost:5173/chatroom')
time.sleep(3)

# Buat nama file log otomatis dengan timestamp
timestamp_for_filename = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
log_file_path = f'chat_log_{timestamp_for_filename}.txt'

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
    old_responses = driver.find_elements(By.CLASS_NAME, 'chat-response')
    old_count = len(old_responses)

    # Kirim pertanyaan
    chat_input = driver.find_element(By.ID, 'chat-input')
    chat_input.send_keys(question_text)
    chat_input.send_keys(Keys.ENTER)
    # # Klik tombol "Kirim"
    # send_button = driver.find_element(By.XPATH, '//button[text()="Kirim"]')
    # send_button.click()

    # Tunggu respons muncul
    while True:
        new_responses = driver.find_elements(By.CLASS_NAME, 'chat-response')
        if len(new_responses) > old_count:
            break
        time.sleep(1)

    # Tunggu sampai teks muncul
    latest_bot_response = ""
    max_wait = 20
    waited = 0
    while waited < max_wait:
        new_responses = driver.find_elements(By.CLASS_NAME, 'chat-response')
        for i in range(old_count, len(new_responses)):
            text = new_responses[i].text.strip()
            if text:
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
    "jurusan apa saja yang ada di politeknik negri batam dan sebutkan prodinya",
    "Siapa rektor Polibatam?",
    "bagaimana cara mengambil ijazah",
    "Apa visi misi politeknik negri batam?"
]

# Jalankan
for q in questions:
    send_and_wait_forever(q)

# Tunggu sebelum tutup
time.sleep(3)
driver.quit()
