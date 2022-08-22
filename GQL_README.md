# Description
This is readme file to model querys and mutations on graphql endpoint/playground.

> ## Authentication [Public]
* ### Via GraphQL
```
mutation login ($input: LoginUserInput!){
  login(loginUserInput: $input ){
    access_token,
    user{
      _id,
      email,
      password,
      createdAt,
      updatedAt
    }
  }
}
```
Query Variable
```
{
  "input": {
    "email": "<email>",
    "password": "<password>"
  }
}
```
* ### Via REST Endpoint
__URL = POST localhost:3000/api/v1/auth/login__
```
{
  "email": "<email>",
  "password": "<password>"
}
```
* ### Authorization Headers
```
{
  "Authorization": "Bearer <access_token>"
}
```

> ## Users CRUD [JWT]

* selectUser
```
query selectUser {
  user(input:{_id:"<mongo_id>"}){
    _id,
    email,
    password,
    createdAt,
    updatedAt
  }
}
```
* selectAllUsers
```
query selectAllUsers {
 	users{
    _id,
    email,
    password,
    createdAt,
    updatedAt
  }
}
```
* createUser
```
mutation createUser {
	createUser(input:{ email: "<email>", password: "<password>"}){
    _id,
    email,
    createdAt,
    updatedAt
  }
}
```
* updateUser
```
mutation updateUser{
  updateUser(input:{_id:"<mongo_id>", email:"<email>"}){
    _id,
    email,
    password
  }
}
```
* removeUser
```
mutation removeUser{
  removeUser(input:{_id:"<mongo_id>"})
}
```

> ## Niveles CRUD [JWT]
> ### option: string[] = ['1', '2', '3', '4', 'contaminante']
* seed DB(lvl)
```
query seed {
 seed(lvl: "<option>")
}
```
* getAllNivel(lvl)
```
// Example lvl: '1'
query getLevel1{
  getAllNivel(lvl: "1"){
    __typename
    ... on nivel1Model{
    _id
    name
    }
  }
}

// Example lvl: '2'
query getLevel2{
  getAllNivel(lvl: "2"){
    __typename
    ... on nivel2Model{
      _id
      name,
      nivel1{
        _id
        name
      }
    }
  }
}

// Example lvl: '3'
query getLevel3{
  getAllNivel(lvl: "3"){
    __typename
    ... on nivel3Model{
      _id
      name,
      nivel2{
        _id
        name,
        nivel1{
          _id
          name
        }
      }
    }
  }
}

// Example lvl: '4'
query getLevel4{
  getAllNivel(lvl: "4"){
		__typename
    ... on nivel4Model{
      _id
      name,
      nivel3{
        _id
        name,
        nivel2{
          _id
          name,
          nivel1{
            _id
            name
          }
        }
      }
    }
  }
}

// Example lvl: 'contaminante'
query getLevelContaminante{
  getAllNivel(lvl: "contaminante"){
    __typename
    ... on contaminanteModel{
      _id,
      name,
      value,
      measureUnit,
      nivel4{
        _id,
        name,
        nivel3{
          _id,
          name,
          nivel2{
            _id,
            name,
            nivel1{
              _id,
              name
            }
          }
        }
      }
    }
  }
}
```
* getNivelById(mongoid) __Mongo ID can be from any level__
```
query getNivel{
  getNivelById(id:"<mongo_id>"){
    __typename
    ... on nivel1Model{
      _id,
      name
    },
    __typename
    ... on nivel2Model{
      _id,
      name,
      nivel1{
        _id,
        name
      }
    },
		__typename
    ... on nivel3Model{
      _id,
      name,
      nivel2{
        _id,
        name,
        nivel1{
          _id,
          name,
        }
      }
    },
    __typename
    ... on nivel4Model{
      _id
      name,
      nivel3{
        _id
        name,
        nivel2{
          _id
          name,
          nivel1{
            _id
            name
          }
        }
      }
    },
    __typename
    ... on contaminanteModel{
      _id,
      name,
      value,
      measureUnit,
      nivel4{
        _id,
        name,
        nivel3{
          _id,
          name,
          nivel2{
            _id,
            name,
            nivel1{
              _id,
              name
            }
          }
        }
      }
    }
  }
}
```
<!-- * createNivel1(name)
```
mutation createNivel1 {
	createNivel1(nivel1Input:{ name: "<string>"}){
    _id,
    name
  }
}
``` -->
* createContaminante
```
mutation createContaminante($input: ContaminanteInput!){
  createContaminante(contaminanteInput: $input){
    _id,
    name,
    value,
    measureUnit,
    nivel2{
      _id,
      ...etc
    },
   	nivel3{
      _id
      ...etc
    },
    nivel4{
      _id
      ...etc
    },
  }
}

{
  "input": {
    "name": "<string>",
    "value": <number>,
    "measureUnit": "<string>",
    "nivel2": "<mongo_id>",
    "nivel3": "<mongo_id>",
    "nivel4": "<mongo_id>"
  }
}

```
* updateContaminante ('?' fields are Optional)
```
mutation updateContaminante{
  updateContaminante(updateContaminanteInput:{
    _id: "<mongo_id>",
    name?: "<string>",
    measureUnit?: "<string>",
    value?: "<number>",
    nivel2?: "<mongo_id>",
    nivel3?: "<mongo_id>",
    nivel4?: "<mongo_id>",
  }){
    _id,
    ...etc
  }
}
```
* deleteContaminante
```
mutation deleteContaminante{
  deleteContaminante(id: "<mongo_id>"){
    _id,
    name,
    ...etc
  }
}
```