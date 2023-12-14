from flask import Flask
import yfinance as yf

app = Flask(__name__)

@app.route('/stock/<ticker>')

def getStock(ticker):
    try:
        stock = yf.Ticker(ticker)
        stockData = stock.history(period="max")
        return stockData.to_json()
    except:
        return "Error: Invalid ticker"

if __name__ == '__main__':
    app.run(debug=True)