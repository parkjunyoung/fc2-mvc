# Nodejs MVC

### Routing

GET /posts => 글리스트<br />

GET /posts/write => 글작성<br />
POST /posts/write<br />

GET /posts/detail/:id => 상세글 보기<br />

GET /posts/edit/:id => 글수정<br />
POST /posts/edit/:id<br />

GET /posts/delete/:id => 글삭제<br />


### Model

Post
- title : 글제목
- content : 글 내용
- created_at : 작성일

### View

<pre>
├─ header.ejs                        #  상단 공통        
│
├─ footer.ejs                        #  하단 공통       
│    
└── posts                           
        │
        ├─ list.ejs                  #  리스트
        │
        ├─ detail.ejs                #  글 상세
        │
        └─ form.ejs                  #  글 입력폼


</pre>