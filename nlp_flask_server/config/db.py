import os
import pymysql

# configuration for development DB
class dev_db():

    def __init__(self):
        self.db = pymysql.connect(
            host=os.getenv('DEV_DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            db='shotag',
            port=int(os.getenv('DB_PORT'))
        )
        print("successfully connect to dev_db")
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def get_nlp_status(self, imageIdx):
        query = "SELECT NLP_STATUS FROM IMAGE WHERE IMAGE_IDX=%s"
        self.cursor.execute(query, imageIdx)
        row = self.cursor.fetchone()
        return row.get('NLP_STATUS')

    def insert_tag(self, tags):
        query = "INSERT INTO TAG (IMAGE_IDX, CONTENT, TYPE) VALUES (%s, %s, %s)"
        self.cursor.executemany(query, tags)

    def change_status(self, imageIdx):
        query = "UPDATE IMAGE SET NLP_STATUS=1 WHERE IMAGE_IDX=%s"
        return self.cursor.execute(query, imageIdx)

    def commit(self):
        self.db.commit()


# configuration for production DB
class prod_db():

    def __init__(self):
        self.db = pymysql.connect(
            host=os.getenv('DB_HOST'),
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASSWORD'),
            db='shotag',
            port=int(os.getenv('DB_PORT'))
        )
        print("successfully connect to prod_db")
        self.cursor = self.db.cursor(pymysql.cursors.DictCursor)

    def get_nlp_status(self, imageIdx):
        query = "SELECT NLP_STATUS FROM IMAGE WHERE IMAGE_IDX=%s"
        self.cursor.execute(query, imageIdx)
        row = self.cursor.fetchone()
        return row.get('NLP_STATUS')

    def insert_tag(self, tags):
        query = "INSERT INTO TAG (IMAGE_IDX, CONTENT, TYPE) VALUES (%s, %s, %s)"
        self.cursor.executemany(query, tags)

    def change_status(self, imageIdx):
        query = "UPDATE IMAGE SET NLP_STATUS=1 WHERE IMAGE_IDX=%s"
        return self.cursor.execute(query, imageIdx)

    def commit(self):
        self.db.commit()
