from flask import Flask, render_template, request, jsonify
import os
import PyPDF2
from flask_caching import Cache
import pyttsx3

app = Flask(__name__)

AUDIO_DIRECTORY = "static/audio"

@app.route('/', methods=['GET'])
def index_page():
    return render_template('index.html')

@app.route('/bookDetails')
def book_details():
    book_name = request.args.get('name')
    book_url = request.args.get('url')
    pdf_location = request.args.get('pdf_location')

    return render_template('bookDetails.html', book_name=book_name, book_url=book_url, pdf_location=pdf_location)

def generate_offline_audio(text,audio_path):
    if not os.path.exists(audio_path):
        engine = pyttsx3.init()
        engine.save_to_file(text,audio_path)
        engine.runAndWait()



@app.route('/generateAudio', methods=['POST'])
def generate_audio():
    try:
        pdf_location = request.form['pdf_location']

        text = pdf_to_text(pdf_location)

        bookname = pdf_location.split("/")[1].split(".")[0]
        audio_filename = f"{bookname}.mp3"
        audio_path = AUDIO_DIRECTORY+"/"+audio_filename

        generate_offline_audio(text, audio_path)

        if os.path.exists(audio_path):
            return jsonify(success=True, audioPath=f"/{audio_path}")
        else:
            return jsonify(success=False)

    except Exception as e:
        response_data = {
            'success': False,
            'error_message': str(e)
        }
        return jsonify(response_data), 500

def pdf_to_text(pdf_path):
    text = ""
    with open(pdf_path, "rb") as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    return text


if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)