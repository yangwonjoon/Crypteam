import pymysql
import pandas as pd
import sqlalchemy
import ccxt
import os
import sys
import datetime as datetime
import time
from sqlalchemy import create_engine
class data_bot:
    symbol = ["btc/usdt", "eth/usdt", "xrp/usdt", "etc/usdt", "ada/usdt"]
    timestemp = ["1d", "4h", "1h", "30m", "15m", "5m", "3m", "1m"]
    binance = ccxt.binance()
    col_name = ['datetime', 'open', 'high', 'low', 'close', 'volume']
    def __init__(self) -> None:
        pass
    def timestemp_to_int(self,dt):
        dt = datetime.datetime.timestamp(dt)
        dt = int(dt) * 1000
        return dt
    def connect_db(self):
        host = "127.0.0.1"
        port = 3306
        username = "root"
        database = "CoinData"
        password = "jspbook"
        try:
            con = pymysql.connect(host=host, user=username, password=password,
                            db=database, charset='utf8') # 한글처리 (charset = 'utf8')
        except:
            print(">> Connection 실패")
            return False

        return con
    def table_name_ck(self,db_name):
        con = self.connect_db()
        cur = con.cursor()
        # db 테이블 이름 검색
        db_name_sql = '''SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'CoinData'
        ORDER BY TABLE_NAME;'''
        cur.execute(db_name_sql) # sql문  실행
        db_name_list = cur.fetchall()

        for line in db_name_list:
            if line[0] == db_name:
                return False
        cur.close()
        con.close()
        return True
    def Creat_db_table(self):
        con = self.connect_db()
        cur = con.cursor()
        for name in self.symbol:
            for frame in self.timestemp:
                ck_name = name.replace('/','_') + "_" + frame
                if not self.table_name_ck(ck_name):
                    print(">> "+ ck_name +"이미 생성된 테이블 입니다.")
                    continue
                else:
                    sql = '''CREATE TABLE '''+ ck_name +'''(
                            timestamp datetime,
                            open float(32),
                            high float(32),
                            low float(32),
                            close float(32),
                            volume float(32)
                            )
                    '''
                    try:
                        cur.execute(sql) # sql문  실행
                        print(">> "+ck_name+" 테이블 생성 성공!")
                    except pymysql.err.OperationalError:
                        print(">> 테이블 생성 실패 : 이미 생성된 테이블입니다.")
                        return False
                    except pymysql.err.ProgrammingError:
                        print(">> 테이블 생성 실패 : sql문 에러입니다.")
                        return False
        con.close()
        cur.close()
    
    def GetCoinData(self,start_date,TimeFrame = "1m",target_name = "BTC/USDT"):
        df = pd.DataFrame(columns = self.col_name)

        format = '%Y-%m-%d %H:%M:%S'
        start_date = datetime.datetime.strptime(start_date,format)
        start_date = self.timestemp_to_int(start_date)
        
        while True:
            try:
                btc_ohlcv = self.binance.fetch_ohlcv(target_name,limit = 1500,timeframe = TimeFrame,since = start_date)
            except:
                print(">> 데이터 수집 오류입니다.")
                return df.drop(['datetime'],axis = 1)
            data = pd.DataFrame(btc_ohlcv,columns=self.col_name)
            data['datetime'] = pd.to_datetime(data['datetime'], unit='ms')
            data.set_index('datetime', inplace=True)

            if not btc_ohlcv:
                break
            else:
                df = pd.concat([df,data])
                start_date = btc_ohlcv[-1][0] + 1
            time.sleep(0.5)
        
        return df.drop(['datetime'],axis = 1)
    
    def Insert_db_table(self,df,name,frame):
        host = "127.0.0.1"
        port = 3306
        username = "root"
        database = "CoinData"
        password = "jspbook"
        try:
            db_connection_str = "mysql+pymysql://"+username+":"+password+"@"+host+"/"+database
            db_connection = create_engine(db_connection_str)
            conn = db_connection.connect()
            
        except:
            print(">> Connection 실패")
            return df
        
        df['timestamp'] = df.index
        dtypesql = {"timestamp":sqlalchemy.types.DateTime(), 
                'open':sqlalchemy.types.Float(32), 
                'high':sqlalchemy.types.Float(32),
                'low':sqlalchemy.types.Float(32),
                'close':sqlalchemy.types.Float(32),
                'volume':sqlalchemy.types.Float(32),
        }
        
        try:
            df.to_sql(name = name.replace('/','_')+'_'+frame,con = conn,if_exists='append',index=False,dtype = dtypesql)
            conn.close()
            
            return True
        except:
            
            print(">> 데이터 업로드 실패... 파라미터를 확인하세요")
            return df


    def Update_Data(self):
        # STEP 2: MySQL Connection 연결
        con = self.connect_db()
        # STEP 3: Connection 으로부터 Cursor 생성
        cur = con.cursor()
        db_name_sql = '''SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = 'CoinData'
        ORDER BY TABLE_NAME;'''
        cur.execute(db_name_sql) # sql문  실행
        db_name_list = cur.fetchall()
        con.close()
        cur.close()
        
        split_data = [] # 데이터 베이스에 저장되어있는 코인 정보 이름
        # ex) [['ADA', 'USDT', '15m']]
        for i in db_name_list:
            split_data.append(i[0].split('_'))
        
        for i in range(len(split_data)):
            name = split_data[i][0] + '/' + split_data[i][1]
            print(split_data[i])
            frame = split_data[i][2]
            print(">> 코인 :",name + " - " + frame, "데이터 수집 시작")
            con = self.connect_db()

            cur = con.cursor()
            DB_Feature_sql = "select * from "+str(split_data[i][0])+'_'+str(split_data[i][1])+'_'+str(split_data[i][2]) +" order by timestamp desc limit 1;"
            
            cur.execute(DB_Feature_sql) # sql문  실행
            db_Feature_list = cur.fetchall()
            con.close()
            cur.close()
            # last_date가 0인 경우 예외 처리 -> 처음 테이블을 생성한 경우
            if len(db_Feature_list) == 0:
                update_date = "2018-01-01 00:00:00"
                data = self.GetCoinData(update_date,TimeFrame = frame,target_name = name.upper())
                data = data.loc[update_date:].iloc[1:]
                self.Insert_db_table(data,name,frame)
                pass
            else:
                last_date = db_Feature_list[0][0]
                update_date = db_Feature_list[0][0] - datetime.timedelta(days=1)
                update_date = last_date.strftime("%Y-%m-%d %H:%M:%S")

                data = self.GetCoinData(update_date,TimeFrame = frame,target_name = name.upper())
                data = data.loc[update_date:].iloc[1:]
                self.Insert_db_table(data,name,frame)
            print(">> 코인 :",name + " - " + frame, "데이터 수집 완료")
        print("———————————————————————")
            
data_bot().Creat_db_table()
while True:
    print("업데이트 일시 :", datetime.datetime.now())
    data_bot().Update_Data()
    time.sleep(5)