Deployed url:https://password-reset-abh.herokuapp.com

```
Login
POST http://localhost:5000/api/user/login

{
    "email":"abulhissam@test.com",
    "password":"Abcd@1234"
}
```

```
Request Reset Password URL
POST http://localhost:5000/api/auth/requestPasswordReset

{
    "email":"abulhissam@test.com"
}
```

```
Reset Password
POST http://localhost:5000/api/auth/resetPassword?token=39daec55eb808d96b7c6147279b5004552c82167a16f05b6a61871c95a70ce17

{
    "email":"abulhissam@test.com",
    "password":"Abcd@1234"
}
```
