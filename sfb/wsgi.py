# coding: utf-8
import sys
import os
import flask
from flask import  redirect,request,render_template_string,render_template
from werkzeug.utils import secure_filename
import importlib
import random

#Flask_Startup
sys.path.append(os.path.dirname(os.path.abspath(__file__)))
os.chdir(os.path.join("./",os.path.dirname(__file__)))
app = flask.Flask(__name__)
wsgi_util=importlib.import_module("wsgi_util")
#prevent uploading too large file
app.config['MAX_CONTENT_LENGTH'] = 100000000

@app.route("/")
def indexpage_show():
    wsgi_util.access_counter+=1
    return wsgi_util.render_template_2("index.html",
    STATUS_TABLE=wsgi_util.status_table,
    access_counter=str(wsgi_util.access_counter)
    )

@app.route("/<name>.html")
def html_show(name):
    try :return wsgi_util.render_template_2('./'+name+'.html')
    except Exception as e:
        return wsgi_util.render_template_2("error.html",
        form_error_code="500",form_error_text=str(e)),500

@app.route("/<name>.py",methods=['GET', 'POST'])
def py_show(name):
    try :
        if  request.method=="GET":
            return wsgi_util.render_template_2('Redirect_Get_2_Post.html')
        return importlib.import_module(name).show(request)
    except Exception as e:
        return wsgi_util.render_template_2("error.html",
        form_error_code="500",form_error_text=str(e)),500

application=app

if __name__ == "__main__":
    app.run()
