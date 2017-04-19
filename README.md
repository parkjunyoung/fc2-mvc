# Nodejs MVC

### Routing

GET /posts => 글리스트<br />

GET /posts/write => 글작성<br />
POST /posts/write<br />

GET /posts/detail/:id => 상세글 보기<br />

GET /posts/edit/:id => 글수정<br />
POST /posts/edit/:id<br />

GET /posts/delete/:id => 글삭제<br />

POST /posts/ajax_comment/insert => 댓글 추가<br />
POST /posts/ajax_comment/delete => 댓글 삭제<br />

GET /accounts/join => 회원가입 템플릿<br />
POST /accounts/join => 회원가입 액션<br />
GET /accounts/login => 로그인 템플릿<br />
POST /accounts/login => 로그인 액션<br />

GET /auth/facebook => 페이스북 로그인으로 이동<br />
GET /auth/facebook/callback => 페이스북 인증 성공,실패에 따라 분기해줌<br />





### Model

Post
- title : 글제목
- content : 글 내용
- created_at : 작성일

Comment
- content : 댓글 내용
- created_at : 작성일
- post_id : Post의 id

User
- username : 아이디
- password : 비밀번호
- created_at : 가입일

### View

<pre>
├─ header.ejs                        #  상단 공통        
│
├─ footer.ejs                        #  하단 공통       
│    
├── posts                           
│      │
│      ├─ list.ejs                  #  리스트
│      │
│      ├─ detail.ejs                #  글 상세
│      │
│      └─ form.ejs                  #  글 입력폼
│
└── accounts
        │
        ├─ join.ejs                  #  회원가입
        │
        └─ login.ejs                 #  로그인

</pre>