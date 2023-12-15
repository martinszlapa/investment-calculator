from flask import Flask, Response
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

        stockData['Date'] = stockData.index.strftime('%Y-%m-%d')

        csv_data = stockData.to_csv()

        response = Response(csv_data, content_type='text/csv')
        response.headers["Content-Disposition"] = "attachment; filename=stock_data.csv"
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response

if __name__ == '__main__':
    app.run(debug=True)