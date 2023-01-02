# nlp_django_server
### Django를 이용한 nlp 모델 서빙 
---
### Theme
- 사용자가 입력한 문장에 대해 neg(부정), pos(긍정), neu(중립), compound(복합) 점수를 계산하여 가장 큰 값의 감정을 tag로 저장하는 간단한 앱
---
- nltk vader_lexicon 
- django
---
### Dockerfile
- WORKDIR: [해당 서버가 위치할 docker 컨테이너 상 경로 생성]
- COPY: [현재 프로젝트의 파일] [해당 파일을 복사할 컨테이너 상 위치]
- CMD: [서버 실행 명령어] 
  * 'nlpproject/manage.py'는 manage.py가 있는 경로에 맞춰서 수정
