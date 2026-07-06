import re
import math
import numpy as np
from urllib.parse import urlparse

def get_entropy(text):
    if not text: return 0
    probs = [float(text.count(c)) / len(text) 
             for c in dict.fromkeys(list(text))]
    return -sum([p * math.log(p, 2) for p in probs])

def extract_features_v6(url):
    try:
        url = url.lower()
        if not url.startswith(('http', 'https')): 
            url = 'https://' + url
        parsed = urlparse(url)
        host = parsed.netloc
        path = parsed.path
        
        host_parts = host.split('.')
        main_domain = ".".join(host_parts[-2:]) if len(host_parts) >= 2 else host

        f = []
        f.append(1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0) 
        f.append(1 if "@" in url else 0)                                            
        f.append(1 if len(url) > 54 else 0)                                         
        f.append(url.count('.'))                                                    
        f.append(1 if '-' in host else 0)                                           
        f.append(1 if url.rfind('//') > 7 else 0)                                   
        f.append(len(path))            
        f.append(url.count('-') + url.count('_') + url.count('?') + 
                 url.count('=') + url.count('&'))
        sec_keywords = ['login', 'verify', 'update', 'account', 'bank', 
                        'secure', 'clienti', 'sicurezza', 'web', 'signin']
        f.append(1 if any(word in host for word in sec_keywords) else 0)
        f.append(host.count('.') - 1 if host.count('.') > 1 else 0) 
        f.append(1 if any(char.isdigit() for char in host) else 0)
        sub_abuse = 1 if len(host_parts) > 2 and any(word in "".join(host_parts[:-2]) 
                                                     for word in sec_keywords) else 0
        f.append(sub_abuse)
        f.append(url.count('/')) 
        f.append(1 if ".com" in host[:-4] else 0) 
        short_pattern = r'bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs'
        f.append(1 if re.search(short_pattern, url) else 0)
        url_len = len(url) if len(url) > 0 else 1
        f.append((url.count('.') + url.count('-') + url.count('_')) / url_len) 
        digits = sum(c.isdigit() for c in host)
        letters = sum(c.isalpha() for c in host)
        f.append(digits / letters if letters > 0 else 0) 
        suspicious_tld = ['.tk', '.ml', '.ga', '.cf', '.gq', '.icu', '.top', '.xyz', '.io', '.net']
        f.append(1 if any(host.endswith(tld) for tld in suspicious_tld) else 0)
        f.append(get_entropy(main_domain))
        f.append(1 if main_domain.replace('.', '').isalpha() else 0)
        f.append(1 if 'http' in host else 0) 
        f.append(host.count('.'))          
        
        return f
    
    except Exception as e:
        print("Error extractor:", e)
        return [0] * 22  

# import re
# import numpy as np
# from urllib.parse import urlparse

# def extract_features_final(url):
#     try:
#         url = url.lower()
#         if not url.startswith(('http', 'https')): 
#             url = 'https://' + url
        
#         parsed = urlparse(url)
#         host = parsed.netloc
#         path = parsed.path
        
#         f = []
#         # [1-7] Dasar Struktural
#         f.append(1 if re.search(r'\d+\.\d+\.\d+\.\d+', url) else 0) # IP Address
#         f.append(1 if "@" in url else 0)                            # Simbol @
#         f.append(1 if len(url) > 54 else 0)                         # URL Panjang
#         f.append(url.count('.'))                                    # Jumlah Titik
#         f.append(1 if '-' in host else 0)                           # Dash di Host
#         f.append(1 if url.rfind('//') > 7 else 0)                   # Redirect //
#         f.append(len(path))                                         # Panjang Path
        
#         # [8-10] Karakter Khusus & Keyword Umum (Intensi)
#         f.append(url.count('-') + url.count('_') + url.count('?') + url.count('=') + url.count('&'))
#         keywords = ['login', 'verify', 'update', 'account', 'bank', 'secure', 'sucursal', 'billing', 'signin']
#         f.append(1 if any(word in host for word in keywords) else 0)
#         f.append(host.count('.') - 1 if host.count('.') > 1 else 0) # Subdomain Count
        
#         # [11-12] Angka & Subdomain Abuse (Algoritmik)
#         f.append(1 if any(char.isdigit() for char in host) else 0)
        
#         host_parts = host.split('.')
#         subdomain_abuse = 0
#         if len(host_parts) > 2:
#             sub_part = "".join(host_parts[:-2])
#             if any(word in sub_part for word in keywords):
#                 subdomain_abuse = 1
#         f.append(subdomain_abuse)
        
#         # [13-15] Kedalaman & Pemendek URL
#         f.append(url.count('/')) # Depth
#         f.append(1 if ".com" in host[:-4] else 0) # .com bukan di akhir
#         short_pattern = r'bit\.ly|goo\.gl|shorte\.st|go2l\.ink|x\.co|ow\.ly|t\.co|tinyurl|tr\.im|is\.gd|cli\.gs'
#         f.append(1 if re.search(short_pattern, url) else 0)
        
#         # [16-18] Rasio & TLD (Statistik Murni)
#         url_len = len(url) if len(url) > 0 else 1
#         f.append((url.count('.') + url.count('-') + url.count('_')) / url_len)
        
#         digits = sum(c.isdigit() for c in host)
#         letters = sum(c.isalpha() for c in host)
#         f.append(digits / letters if letters > 0 else 0)
        
#         suspicious_tld = ['.tk', '.ml', '.ga', '.cf', '.gq', '.icu', '.top', '.xyz']
#         f.append(1 if any(host.endswith(tld) for tld in suspicious_tld) else 0)
        
#         return f
#     except:
#         return [0]*18