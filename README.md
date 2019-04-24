# Hacktivoverflow

## Routes
### List of user routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
| `/users/signup` | POST | `none` | name: String (**Required**), email: String (**Required**), password: String (**Required**) | Create a new user |
| `/users/login` | POST | `none` | email: String (**Required**), password: String (**Required**) | Login as a user |
|

### Responses

> `/users/signup`

Success : 
```
{
    "_id": <ObjectId>,
    "username": <name>,
    "email": <email>,
    "password": <hashed password>,
    "__v": 0
}
```
Failed :
```
{
    message: <error message>
}
```

> `/users/login`

Success :
```
{
    access_token: <genarated jsonwebtoken>
}
```

Failed :
```
{
    message: <error message>
}
```
---

### List of question routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
|   `/questions/` | GET | `none` | `none` | Get all questions |
| `/questions/` | POST | `access_token` | title: String (**Required**), content: String (**Required**) | Create a new question |
| `/questions/:id` | GET | `access_token` | `none` | Get question detail|
| `/questions/:id` | DELETE | `access_token` | `none` | Delete question |
| `/questions/comment/:id` | PUT | `access_token` | `none` | Add comment to question |
| `/questions/upvote/:id` | PUT | `access_token` | `none` | Give upvote to question |
| `/questions/downvote/:id` | PUT | `access_token` | `none` | Give downvote to question |
|

### Responese

Method: ***GET***
> `/questions/`
```
[
    {
        "upvotes": [
            <ObjectId User>
        ],
        "downvotes": [
            <ObjectId User>
        ],
        "answers": [
            <ObjectId Answer>
        ],
        "_id": <ObjectId Question>,
        "title": <String>,
        "content": <String>,
        "owner": <ObjectId User>,
        "comments": [
            {
                "_id": <ObjectId comment>,
                "content": <String>,
                "userId": <ObjectId User>
            }
        ],
        "__v": 0
    }, {}, ...
]
```

Method: ***POST***
> `/questions/`

Success:
```
{
    "upvotes": [],
    "downvotes": [],
    "answers": [],
    "_id": <ObjectId Question>,
    "title": <String>,
    "content": <String>,
    "owner": <ObjectId User>,
    "comments": [],
    "__v": 0
}
```

Method: ***GET***
> `/questions/:id`

```
{
    "upvotes": [
        <Object User>, ...
    ],
    "downvotes": [
        <Object User>, ...
    ],
    "answers": [
        <Object Answer>, ...
    ],
    "_id": <ObjectId Question>,
    "title": <String>,
    "content": <String>,
    "owner": <Object User>,
    "comments": [
        {
            "_id": <ObjectId>,
            "content": <String>,
            "userId": <Object User>
        }, ...
    ],
    "__v": 0
}
```

Method: ***DELETE***
> `/questions/:id` 

Success: 
```
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

Method: ***PUT***
> `/questions/comment/:id` 

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Method: ***PUT***
> `/questions/upvote/:id` 

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Method: ***PUT***
> `/questions/downvote/:id`

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Failed :
```
{
    message: <error message>
}
```
---

### List of answer routes :

| ROUTE             | HTTP | HEADER(S) |     BODY     |   DESCRIPTION   |
| ----------------- | ---- | --------- | ------------ | --------------- |
|   `/answers/` | GET | `access_token` | `none` | Get all answers |
| `/answers/:id` | GET | `access_token` | `none` | Get answer detail|
| `/answers/:questionId` | POST | `access_token` | content: String (**Required**) | Create a new answer |
| `/answers/:id` | DELETE | `access_token` | `none` | Delete answer |
| `/answers/comment/:id` | PUT | `access_token` | `none` | Add comment to answer |
| `/answers/upvote/:id` | PUT | `access_token` | `none` | Give upvote to answer |
| `/answers/downvote/:id` | PUT | `access_token` | `none` | Give downvote to answer |
|

### Responses

Method: ***GET***
> `/answers/`

Success:
```
[
    {
        "upvotes": [
            <ObjectId User>, ...
        ],
        "downvotes": [
            <ObjectId User>, ...
        ],
        "_id": <ObjectId>,
        "content": <String>,
        "owner": <ObjectId User>,
        "comments": [],
        "__v": 0
    }, {}, ...
]
```
Method: ***GET***
> `/answers/:id`

Success:
```
{
    "upvotes": [
            <Object User>, ...
        ],
    "downvotes": [
            <Object User>, ...
        ],
    "_id": <ObjectId>,
    "content": <String>,
    "owner": <ObjectId User>,
    "comments": [
        {
            "_id": <ObjectId>,
            "content": <String>,
            "userId": <Object User>
        }, ...],
    "__v": 0
}
```

Method: ***POST***
> `/answers/:questionId`

Success:
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Method: ***DELETE***
> `/answers/:id` 

Success:
```
{
    "n": 1,
    "ok": 1,
    "deletedCount": 1
}
```

Method: ***PUT***
> `/answers/comment/:id` 

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Method: ***PUT***
> `/answers/upvote/:id` 

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```

Method: ***PUT***
> `/answers/downvote/:id`

Success: 
```
{
    "n": 1,
    "nModified": 1,
    "ok": 1
}
```