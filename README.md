Stub API Server for Alloy Model Study: REST API
===============================================

This project is a stub server for [umi-uyura/AlloyModelStudyRestApi](https://github.com/umi-uyura/AlloyModelStudyRestApi) .


Preparation
-----------

```
$ git clone git@github.com:umi-uyura/AlloyModelStudyRestStub.git
$ cd AlloyModelStudyRestStub
$ npm install
```

Start server
------------

```
$ npm start
```

API consists
------------

| Action | Method | URL |
|---|---|---|
| Read memos| GET | `http://127.0.0.1:4321/memos` |
| Add (Create) memo | POST | `http://127.0.0.1:4321/memos` |
| Update memo | PUT | `http://127.0.0.1:4321/memos/{ID}` |
| Remove memo | DELETE | `http://127.0.0.1:4321/memos/{ID}` |


Memo model
-----------

| Field | Column | Type |
|---|---|---|
| Record of the identifier | id | INTEGER |
| Contents of memo | contents | TEXT |
| Priority of memo | priority | TEXT |
