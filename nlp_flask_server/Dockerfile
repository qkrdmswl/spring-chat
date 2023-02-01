FROM python:3.8.16

MAINTAINER Eunji Park <izzy@minerinc.io>

WORKDIR /shotag/nlpserver/

RUN pip3 install flask


#COPY requirements.txt /shotag/nlpserver/
#COPY requirements-nlp.txt /shotag/nlpserver/
COPY requirements-total.txt /shotag/nlpserver/
#RUN pip3 install -r requirements-nlp.txt
#RUN pip3 install -r requirements.txt
RUN pip3 install -r requirements-total.txt

COPY . .

CMD ["cd api"]
CMD ["gunicorn", "--timeout=120", "-b", "0.0.0.0:8000", "\"app:create_app()\"", "--daemon"]
CMD ["python3", "subprocessor.py"]

EXPOSE 8000