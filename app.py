from flask import Flask, render_template, request
import pickle
import numpy as np
import os
import re
from urllib.parse import urlparse
from extractor import extract_features_v6 

app = Flask(__name__)

MODEL_PATH = 'model_phishing_rf_v63.pkl'

if os.path.exists(MODEL_PATH):
    with open(MODEL_PATH, 'rb') as f:
        model = pickle.load(f)
else:
    model = None
    print(f"Error: {MODEL_PATH} tidak ditemukan!")

@app.route("/", methods=['GET', 'POST'])
def index2():
    if request.method == "POST":
        url = request.form.get('url', '').strip()
        
        
        if not url:
            return render_template(
                "index2.html", 
                bad_prob=0, 
                good_prob=0, 
                predict="Menunggu Input URL...", 
                tags=[],
                url=""
            )

        if not model:
            return "Model Machine Learning tidak ditemukan di server lokal."

        #ekstraksi fitur dari extractor.py
        features = extract_features_v6(url)
        
        #eksekusi prediksi model Random Forest
        final_input = np.array(features).reshape(1, 22)
        proba = model.predict_proba(final_input)[0]
        
        bad_prob = round(proba[1] * 100, 2)
        good_prob = round(proba[0] * 100, 2)

        #logika Penentuan Pesan Klasifikasi Status Tautan
        if bad_prob > 70:
            predict = "Peringatan: Tautan ini terindikasi Phishing"
        elif bad_prob > 40:
            predict = "Peringatan: Tautan ini Mencurigakan (Hati-hati)"
        else:
            predict = "Situs ini terverifikasi aman"

        #pemrosesan ekstraksi teks logika tags antarmuka
        try:
            url_parsing = url if url.startswith(('http://', 'https://')) else 'https://' + url
            parsed_host = urlparse(url_parsing).netloc
        except:
            parsed_host = ""

        #logika dinamis komponen visual tags ke halaman web
        tags = []
        if "@" in url: tags.append("Mengandung @")
        if "-" in parsed_host: tags.append("Dash di Domain")
        if len(url) > 54: tags.append("URL Terlalu Panjang")
        if url.count('.') > 3: tags.append("Banyak Subdomain/Titik")
        if not url.lower().startswith('https'): tags.append("Bukan HTTPS")

        if re.search(r'\d+\.\d+\.\d+\.\d+', url): 
            tags.append("Menggunakan IP Address")
            
        sec_keywords = ['login', 'verify', 'update', 'account', 'bank', 'secure', 'signin']
        if any(word in parsed_host for word in sec_keywords):
            tags.append("Mengandung Kata Kunci Sensitif")
            
        suspicious_tld = ['.tk', '.ml', '.ga', '.cf', '.gq', '.icu', '.top', '.xyz']
        if any(parsed_host.endswith(tld) or (tld + '/') in url for tld in suspicious_tld):
            tags.append("Domain Tidak Populer/Rentan")
        
        return render_template(
            "index2.html",
            url=url,
            predict=predict,
            good_prob=good_prob,
            bad_prob=bad_prob,
            tags=tags
        )

    return render_template(
        "index2.html", 
        bad_prob=0, 
        good_prob=0, 
        predict="Menunggu Input URL...", 
        tags=[],
        url=""
    )

if __name__=="__main__":
    app.run(debug=True)


    

# if __name__ == '__main__':
#      host='0.0.0.0' 
#      app.run(debug=True, host='0.0.0.0', port=5000)




# from flask import Flask, render_template, request
# import pickle
# import re

# app = Flask(__name__)

# vector = pickle.load(open("vectorizer.pkl", 'rb'))
# model = pickle.load(open("phishing.pkl", 'rb'))

# @app.route("/", methods=['GET', 'POST'])
# def index():
#     if request.method == "POST":
#         url = request.form['url']
#         # print(url)

#         cleaned_url = re.sub(r'^https?://(www\.)?','', url)
#         # print(cleaned_url)

#         predict = model.predict(vector.transform([cleaned_url]))[0]
#         # print(predict)

#         if predict == 'bad':
#             predict ="This is a Phishing website!!"
#         elif predict == 'good':
#             predict = "This is healthy and good website!!"
#         else:
#             predict = "Something went wrong!!"

#         return render_template("index.html", predict=predict)

#     else:
#         return render_template("index.html")


# if __name__=="__main__":
#     app.run(debug=True)