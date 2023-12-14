from flask import Flask
import yfinance as yf
import json

app = Flask(__name__)

@app.route('/hello')
def hello():
    return "World!"


@app.route('/stock/<ticker>')
def getStock(ticker):
        stock = yf.Ticker(ticker)
        stockData = stock.history(period="max")
        return json.loads(stockData.to_json());

if __name__ == '__main__':
    app.run(debug=True)