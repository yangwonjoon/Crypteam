import pymysql
import pandas as pd
class DB_Bot:
    symbol = ["BTC/USDT", "ETH/USDT", "XRP/USDT", "ETC/USDT", "ADA/USDT"]
    def __init__(self,coin_name, since = "2020-01-01 00:00:00"):
        self.coin_name = coin_name
        self.since = since
    
    def connect_db(self):
        host = "127.0.0.1"
        port = 3306
        username = "root"
        database = "CoinData"
        password = "825582qaz"
        try:
            con = pymysql.connect(host=host, user=username, password=password,
                            db=database, charset='utf8') # 한글처리 (charset = 'utf8')
        except:
            print(">> connection 실패 ")
            return False

        return con
    
    def GetData(self):
        con = self.connect_db()
        cur = con.cursor()
        sql = "SELECT * FROM CoinData."+str(self.coin_name)+" where timestamp >= " +"'"+ str(self.since)+"'"+";"
        
        cur.execute(sql)
        data = cur.fetchall()
        
        cur.close()
        con.close()
        col = ["datetime", "open", "high", "low", "close", "volume"]
        data = pd.DataFrame(data,columns = col)
        return data