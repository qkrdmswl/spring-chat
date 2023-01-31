import os
import pymysql


# configuration for development DB
class dev_db():

    def __init__(self):
        self.db = pymysql.connect(
            host=os.getenv('DEV_DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            db='mysql',
            port=os.getenv('DB_PORT')
        )
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def get_nlp_status(self, imageIdx):
        query = "SELECT NLP_STATUS FROM IMAGE WHERE IMAGE_IDX=%s;"
        self.cursor.execute(query, imageIdx)

    def insert_tag(self, tags):
        query = "INSERT INTO TAG (IMAGE_IDX, CONTENT, TYPE) VALUES (%s, %s, %s)"
        self.cursor.executemany(query, tags)

    def execute_one(self, query):
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        return row

    def execute_all(self, query):
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.db.commit()



# configuration for production DB
class prod_db():

    def __init__(self):
        self.db = pymysql.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            db='mysql',
            port=os.getenv('DB_PORT')
        )
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def get_nlp_status(self, imageIdx):
        query = "SELECT NLP_STATUS FROM IMAGE WHERE IMAGE_IDX=%s;"
        self.cursor.execute(query, imageIdx)

    def insert_tag(self, tags):
        query = "INSERT INTO TAG (IMAGE_IDX, CONTENT, TYPE) VALUES (%s, %s, %s)"
        self.cursor.executemany(query, tags)

    def execute_one(self, query):
        self.cursor.execute(query)
        row = self.cursor.fetchone()
        return row

    def execute_all(self, query):
        self.cursor.execute(query)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.db.commit()