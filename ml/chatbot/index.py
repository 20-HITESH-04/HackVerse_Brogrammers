from flask import Flask, request, render_template, jsonify
from flask_cors import CORS
from rag_agent import get_agent_response

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    """
    Render the main interface
    """
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask_agent():
    """
    Handle agent queries
    """
    try:
        # Get the question from the request
        data = request.get_json()
        question = data.get('question', '').strip()

        if not question:
            return jsonify({"error": "No question provided"}), 400

        # Get response from the agent
        response = get_agent_response(question)

        return jsonify({
            "question": question,
            "answer": response
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)