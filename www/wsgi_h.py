### DONT LOAD "wsgi_util.py" DIRECTLY as multiple loading causes multiple declarations of variables  ###

import sys
import os
import json
from google.cloud import firestore
from google.cloud import storage as firestorage

# AP_setting_management
access_counter = 0
resouce_active = "×:FALSE"
GCP_key = "FirebaseAdmin_Key.json"
try:
    db = firestore.Client.from_service_account_json(GCP_key)
    GCS = firestorage.Client.from_service_account_json(GCP_key)
    resouce_active = "〇:OK"
except:
    0
