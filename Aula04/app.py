from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/formulario', methods=['POST'])
def formulario():
    dados = request.get_json()
    print(dados)

    return jsonify({"ok": True})

if __name__ == '__main__':
    app.run(debug=True)