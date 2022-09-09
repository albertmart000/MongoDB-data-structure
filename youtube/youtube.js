var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ('youtube');
db.dropDatabase();
const dbName = 'youtube';
const client = new MongoClient(url);
client.connect(function(err) {
  assert.equal(null, err);
  console.log("'youtube' is connected to the server");
  var db = client.db(dbName);
  user = db.collection('user', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'userName', 'email', 'password', 'dateOfBirth', 'gender', 'postalCode', 'country'],
      properties: {
        _id: {},
        userId: {bsonType: 'int'},
        userName: {bsonType: 'string'},
        email: {bsonType: 'string'},
        password: {bsonType: 'string'},
        dateOfBirth: {bsonType: 'date'},
        gender: {enum: ['no binari', 'dona', 'home']},
        postalCode: {bsonType: 'int'},
        country: {bsonType: 'string'},
        channels: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['channelId', 'channelName', 'description', 'dateCreation'],
            properties:{
              channelId: {bsonType: 'int'},
              channelName: {bsonType: 'string'},
              description: {bsonType: 'string'},
              dateCreation: {bsonType: 'date'},
              suscribers: {
                bsonType: 'array',
                minItems: 1,
                items: {
                  bsonType: 'object',
                  required: ['userId', 'userName'],
                  properties: {
                    userId: {bsonType: 'int'},
                    userName: {bsonType: 'string'}
                  }
                }
              }
            }
          }
        },
        playlists: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['playlistId', 'playlistName', 'dateCreation', 'visibility', 'videos'],
            properties:{
              playlistId: {bsonType: 'int'},
              playlistName: {bsonType: 'string'},
              dateCreation: {bsonType: 'date'},
              visibility:  {enum: ['publica', 'privada']},
              videos: {
                bsonType: 'array',
                minItems: 1,
                items: {
                  bsonType: 'int'},
                  }
                }
              }
            }
          }
        },
        subscribedToChannels: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['channelId', 'channelName'],
            properties: {
              channelId: {bsonType: 'int'},
              channelName: {bsonType: 'string'}
            }
          }
        }
      }
    });
  video = db.collection('video', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      required: ['videoId', 'title', 'size', 'length', 'description', 'thumbnail', 'datetimePublication', 'visibility', 'userId', 'userName'],
      properties: {
        _id: {},
        videoId: {bsonType: 'int'},
        title: {bsonType: 'string'},
        size: {bsonType: ['double', 'int']},
        length: {bsonType: 'string'},
        description: {bsonType: 'string'},
        thumbnail: {bsonType: 'string'},
        datetimePublication: {bsonType: 'date'},
        visibility: {enum: ['public', 'privat', 'ocult']},
        userId: {bsonType: 'int'},
        userName: {bsonType: 'string'},
        reproductions: {bsonType: 'int'},
        likes: {bsonType: 'int'},
        dislikes: {bsonType: 'int'},
        likeOrDislike: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['likeOrDislike', 'userId', 'userName', 'datetime'],
            properties:{
              likeOrDislike: {bsonType: 'string'},
              userId: {bsonType: 'int'},
              userName: {bsonType: 'string'},
              datetime: {bsonType: 'date'}
            }
          }
        },
        comments: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['commentId', 'text', 'datetimePublication', 'userId', 'userName'],
            properties:{
              commentId: {bsonType: 'int'},
              text: {bsonType: 'string'},
              datetimePublication: {bsonType: 'date'},
              userId: {bsonType: 'int'},
              userName: {bsonType: 'string'},
              likes: {bsonType: 'int'},
              dislikes: {bsonType: 'int'},
              likeOrDislike: {
                bsonType: 'array',
                minItems: 1,
                items: {
                  bsonType: 'object',
                  required: ['likeOrDislike', 'userId', 'userName', 'datetime'],
                  properties:{
                    likeOrDislike: {bsonType: 'string'},
                    userId: {bsonType: 'int'},
                    userName: {bsonType: 'string'},
                    datetime: {bsonType: 'date'}
                    }
                  }
                }
              }
            }
          },
        tags: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['tagId', 'tagName'],
            properties:{
              tagId: {bsonType: 'int'},
              tagName: {bsonType: 'string'}
              }
            }
          }
        }
      }
    }
  });
  user.insertMany([
    {
    "userId": 1,
    "userName": 'John Allred',
    "email": 'john@email.com',
    "password": 'johnpassword',
    "dateOfBirth": new Date(1962, 06, 24),
    "gender": 'no binari',
    "postalCode": 11111,
    "country": "England",
    "channels": [
      {
        "channelId": 1,
        "channelName": 'Channel Trombone',
        "description": 'Videos trombone',
        "dateCreation": new Date(2001, 01, 01),
        "subscribers": [
          {
            "userId": 3,
            "userName": 'Frank Wess'
          }]
      }],
    "playlists": [
      {
        "playlistId": 1,
        "playlistName": 'Playlist Trombone',
        "dateCreation": new Date(2020, 1, 01),
        "visibility": 'publica',
        "videos": [1, 2, 5],
      }],
    "subscribedToChannels": [
      {
        "channelId": 1,
        "channelName": 'Channel Piano'
      }]
    },{
    "userId": 2,
    "userName": 'Diana Krall',
    "email": 'diana@email.com',
    "password": 'dianapassword',
    "dateOfBirth": new Date(1964, 11, 16),
    'gender': 'dona',
    "postalCode": 22222,
    "country": "Japan",
    "channels": [
      {
        "channelId": 2,
        "channelName": 'Channel Piano',
        "description": 'Videos piano',
        "dateCreation": new Date(2002, 2, 02),
        "subscribers": [
          {
            "userId": 1,
            "userName": 'John Allred'
          }
        ]
      }],
    "playlists": [
      {
        "playlistId": 2,
        "playlistName": 'Playlists Piano',
        "dateCreation":new Date(2020, 2, 02),
        "visibility": 'privada',
        "videos": [6, 8, 9],
      }],
    "subscribedToChannels": [
      {
        "channelId": 3,
        "channelName": 'Channel Flute',
      }]
    },{
    "userId": 3,
    "userName": 'Frank Wess',
    "email": 'frank@email.com',
    "password": 'frankpassword',
    "dateOfBirth": new Date(1922, 1, 04),
    'gender': 'home',
    "postalCode": 33333,
    "country": 'France',
    "channels": [
      {
        "channelId": 3,
        "channelName": 'Channel Flute',
        "description": 'Videos flute',
        "dateCreation":new Date(2003, 3, 03),
        "subscribers": [
          {
            "userId": 2,
            "userName": 'Diana Krall'
          }
        ]
      }],
    "playlists": [
      {
        "playlistId": 3,
        "playlistName": 'Playlist Flute',
        "dateCreation": new Date(2020, 3, 03),
        "visibility": 'publica',
        "videos": [2, 3, 7, 4],
      }],
    "subscribedToChannels": [
      {
        "channelId": 1,
        "channelName": 'Channel Trombone'
      }]
    }
  ]);
  video.insertMany([
    {
    "videoId": 1,
    "title": 'Trombone 1',
    "size": 75.5,
    "length": '03:40',
    "description":'Video Trombone1',
    "thumbnail":'/thumbnailYouTube/trombone1.jpeg',
    "datetimePublication":ISODate("2001-01-15T21:00:00.000Z"),
    "visibility": 'public',
    "userId": 1,
    "userName": 'John Allred',
    "reproductions": 1000,
    "likes": 100,
    "dislikes": 2,
    "likeOrDislike":[
      {
        "likeOrDislikeId": 1,
        "likeOrDislike": 'dislike',
        "userId": 2,
        "userName":'Diana Krall',
        "dataTime":ISODate("2004-07-15T09:30:00.000Z")
      },{
        "likeOrDislikeId": 2,
        "likeOrDislike": 'dislike',
        "userId": 3,
        "userName": 'Frank Wess',
        "dataTime": ISODate("2004-06-14T09:30:00.000Z")
      }],
    "comments":[
      {
        "commentId": 14,
        "text":'Impresionant',
        "datetimePublication": ISODate("2004-11-01T20:00:00.000Z"),
        "userId": 3,
        "userName": 'Frank Wess',
      }],
    "tags":[
      {
        "tagId": 1,
        "tagName": 'Trombone'
      },{
        "tagId": 4,
        "tagName": 'Music'
      }]
    },{
    "videoId": 2,
    "title": 'Trombone2',
    "size": 100.8,
    "length": '05:38',
    "description":'Video Trombone2',
    "thumbnail": '/thumbnailYouTube/trombone2.jpg',
    "datetimePublication":ISODate("2001-03-05T12:00:00.000Z"),
    "visibility": 'privat',
    "userId": 1,
    "userName": 'John Allred',
    "reproductions": 150,
    "likes": 34,
    "likeOrDislike":[
      {
        "likeOrDislike": 'like',
        "userId": 2,
        "userName": 'Diana Krall',
        "dataTime":ISODate("2004-09-15T09:45:00.000Z")
      }],
    "comments":[
      {
        "commentId": 3,
        "text":'Gràcies per pujar aquest video',
        "datetimePublication": ISODate("2004-03-28T09:30:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall',
        "likes": 10,
        "dislikes": 1,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 2,
            "userName":'Diana Krall',
            "dataTime": ISODate("2004-11-11T08:20:00.000Z")
           },{
            "likeOrDislike": 'like',
            "userId": 3,
            "userName": 'Frank Wess',
            "dataTime": ISODate("2004-10-11T14:30:00.000Z")
            }
        ]
      },{
        "commentId": 7,
        "text":"M'agrada molt",
        "datetimePublication": ISODate("2004-11-11T18:20:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall',
        "likes": 5,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 1,
            "userName": 'John Allred',
            "dataTime": ISODate("2004-03-28T09:30:00.000Z")
           },{
            "likeOrDislike": 'like',
            "userId": 2,
            "userName":'Diana Krall',
            "dataTime": ISODate("2004-12-05T03:30:00.000Z")
          }
        ]
      },{
        "commentId": 12,
        "text": 'Yeahhh',
        "datetimePublication": ISODate("2004-10-11T14:30:00.000Z"),
        "userId": 3,
        "userName": 'Frank Wess'
      }],
    "tags":[
      {
        "tagId": 1
    }]
    },{
    "videoId": 3,
    "title":'Trombone3',
    "size": 92.3,
    "length": '02:45',
    "description":'Video Trombone3',
    "thumbnail":'/thumbnailYouTube/trombone3.jpeg',
    "datetimePublication":ISODate("2001-05-28T17:30:00.000Z"),
    "visibility": 'public',
    "userId": 1,
    "userName": 'John Allred',
    "reproductions": 2000,
    "likes": 249,
    "dislikes": 4,
    "likeOrDislike":[
      {
        "likeOrDislike": 'like',
        "userId": 2,
        "userName": 'Diana Krall',
        "dataTime": ISODate("2004-11-11T18:20:00.000Z")
      },{
        "likeOrDislike": 'like',
        "userId": 3,
        "userName": 'Frank Wess',
        "dataTime": ISODate("2001-01-15T21:00:00.000Z")
      }
    ],
    "comments":[
      {
        "commentId": 11,
        "text":'Gracies',
        "datetimePublication": ISODate("2004-04-15T21:50:00.000Z"),
        "userId": 3,
        "userName": 'Frank Wess',
      }],
    "tags":[
      {
        "tagId": 1,
        "tagName": 'Trombone'
      },{
        "tagId": 5,
        "tagName": 'Jazz'
      }]
    },{
    "videoId":4,
    "title":'Piano1',
    "size":68.7,
    "length": '10:15',
    "description": 'Video Piano1',
    "thumbnail":'/thumbnailYouTube/piano1.jpeg',
    "datetimePublication":ISODate("2002-04-09T22:00:00.000Z"),
    "visibility": 'public',
    "userId": 2,
    "userName":'Diana Krall',
    "reproductions": 1800,
    "likes": 415,
    "likeOrDislike":[
      {
        "likeOrDislike": 'like',
        "userId": 1,
        "userName": 'John Allred',
        "dataTime": ISODate("2004-03-15T09:30:00.000Z")
      },{
        "likeOrDislike": 'like',
        "userId":3,
        "userName": 'Frank Wess',
        "dataTime": ISODate("2004-10-22T16:25:00.000Z")
      }
    ],
    "comments":[
      {
        "commentId": 9,
        "text":'Molt bé',
        "datetimePublication": ISODate("2004-12-25T10:15:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall',
      }],
    "tags":[
      {
        "tagId": 2,
        "tagName": 'Piano'
      }]
    },{
    "videoId": 5,
    "title":'Piano2',
    "size":83.5,
    "length":'04:14',
    "description":'Video Piano2',
    "thumbnail":'/thumbnailYouTube/piano2.jpeg',
    "datetimePublication":ISODate("2002-06-18T11:45:00.000Z"),
    "visibility": 'public',
    "userId":2,
    "userName":'Diana Krall',
    "reproductions": 2000,
    "likes":188,
    "dislikes":3,
    "likeOrDislike":[
      {
        "likeOrDislike": 'dislike',
        "userId": 1,
        "userName": 'John Allred',
        "dataTime": ISODate("2004-03-15T10:30:00.000Z")
      },{
        "likeOrDislike": 'like',
        "userId": 3,
        "userName": 'Frank Wess',
        "dataTime": ISODate("2004-11-01T12:00:00.000Z")
      }
    ],
    "comments":[
      {
        "commentId": 4,
        "text":'Molt bo',
        "datetimePublication": ISODate("2004-06-09T19:00:00.000Z"),
        "userId": 1,
        "userName": 'John Allred',
        "likes": 18,
        "dislikes": 2,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 1,
            "userName": 'John Allred',
            "dataTime": ISODate("2004-03-15T09:30:00.000Z")
           },{
            "likeOrDislike": 'like',
            "userId": 3,
            "userName": 'Frank Wess',
            "dataTime": ISODate("2004-10-22T16:25:00.000Z")
          }
        ]
      },{
        "commentId": 5,
        "text":"No m'agrada",
        "datetimePublication": ISODate("2004-07-15T09:30:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall',
        "likes": 1,
        "dislikes": 1,
        "likeOrDislike":[
           {
            "likeOrDislike": 'dislike',
            "userId": 1,
            "userName": 'John Allred',
            "dataTime": ISODate("2004-03-15T10:30:00.000Z")
           },{
            "likeOrDislike": 'like',
            "userId": 3,
            "userName": 'Frank Wess',
            "dataTime": ISODate("2004-11-01T20:00:00.000Z")
         },
        ]
      },{
        "commentId": 13,
        "text":'Perfecte!',
        "datetimePublication": ISODate("2004-10-11T14:30:00.000Z"),
        "userId": 3,
        "userName": 'Frank Wess'
        }
      ],
    "tags":[
      {
        "tagId": 2,
        "tagName": 'Piano'
      },{
        "tagId": 5,
        "tagName": 'Jazz'
      }]
    },{
    "videoId": 6,
    "title":'Piano3',
    "size":104.25,
    "length":'11:11',
    "description":'Video Piano3',
    "thumbnail":'/thumbnailYouTube/piano3.jpeg',
    "datetimePublication":ISODate("2002-08-29T20:14:00.000Z"),
    "visibility": 'ocult',
    "userId": 2,
    "userName":'Diana Krall',
    "tags":[
      {
        "tagId": 2,
        "tagName": 'Piano'
      },{
        "tagId": 4,
        "tagName": 'Music'
    }]
    },{
    "videoId": 7,
    "title":'Flute1',
    "size":112.4,
    "length":'06:56',
    "description":'Video Flute1',
    "thumbnail":'/thumbnailYouTube/flute1.jpeg',
    "datetimePublication":ISODate("2022-05-27T20:20:00.000Z"),
    "visibility":'public',
    "userId": 3,
    "userName": 'Frank Wess',
    "reproductions": 1250,
    "likes": 400,
    "dislikes": 2,
    "likeOrDislike":[
      {
        "likeOrDislike": 'like',
        "userId": 1,
        "userName": 'John Allred',
        "dataTime": ISODate("2004-03-28T09:30:00.000Z")
      },{
        "likeOrDislike": 'like',
        "userId": 2,
        "userName": 'Diana Krall',
        "dataTime": ISODate("2004-12-05T23:30:00.000Z")
      }
    ],
    "comments":[
      {
        "commentId": 8,
        "text":'Gran video',
        "datetimePublication": ISODate("2004-12-05T23:30:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall',
        "likes": 6,
        "dislikes": 2,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 1,
            "userName": 'John Allred',
            "dataTime": ISODate("2004-12-25T10:15:00.000Z"),
           },{
            "likeOrDislike": 'like',
            "userId": 2,
            "userName":'Diana Krall',
            "dataTime": ISODate("2004-05-09T19:00:00.000Z"),
           }
        ]
      }],
    "tags":[
      {
        "tagId": 3,
        "tagName": 'Flute'
      },{
        "tagId": 5,
        "tagName": 'Jazz'
    }]
    },{
    "videoId": 8,
    "title":'Flute2',
    "size": 79.6,
    "length": '06:58',
    "description":'Video Flute2',
    "thumbnail":'/thumbnailYouTube/flute2.jpeg',
    "datetimePublication":ISODate("2003-09-30T15:10:00.000Z"),
    "visibility":'privat',
    "userId": 3,
    "userName": 'Frank Wess',
    "reproductions": 175,
    "likes": 19,
    "likeOrDislike":[
      {
        "likeOrDislike": 'like',
        "userId": 1,
        "userName": "John Allred",
        "dataTime": ISODate("2004-05-09T19:00:00.000Z")
      },{
        "likeOrDislike": 'like',
        "userId": 2,
        "userName":'Diana Krall',
        "dataTime": ISODate("2004-12-25T10:15:00.000Z")
      }
    ],
    "comments":[
      {
        "commentId": 6,
        "text":'Que bo!',
        "datetimePublication": ISODate("2004-09-15T09:45:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall'
      },{
        "commentId": 1,
        "text":"Es un video genial",
        "datetimePublication": ISODate("2004-03-15T09:30:00.000Z"),
        "userId": 1,
        "userName": 'John Allred',
        "likes": 2,
        "dislikes": 1,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 2,
            "userName":'Diana Krall',
            "dataTime": ISODate("2004-07-15T09:30:00.000Z")
           },{
            "likeOrDislike": 'dislike',
            "userId": 1,
            "userName": 'John Allred',
            "dataTime": ISODate("2004-06-14T09:30:00.000Z")
           }
         ]
      }],
    "tags":[
      {
        "tagId": 3,
        "tagName": 'Flute'
      },{
        "tagId": 4,
        "tagName": 'Music'
    }]
    },{
    "videoId": 9,
    "title":'Flute3',
    "size":88.2,
    "length":'04:00',
    "description":'Video Flute3',
    "thumbnail":'/thumbnailYouTube/flute3.jpeg',
    "datetimePublication":ISODate("2003-10-02T10:20:00.000Z"),
    "visibility":'ocult',
    "userId":3,
    "userName": 'Frank Wess',
    "tags":[
      {
        "tagId": 3,
        "tagName": 'Flute'
      }]
    },{
    "videoId": 10,
    "title":'Flute4',
    "size":99,
    "length":'15:15',
    "description":'Video Flute4',
    "thumbnail":'/thumbnailYouTube/flute4.jpeg',
    "datetimePublication":ISODate("2003-11-07T18:00:00.000Z"),
    "visibility": 'public',
    "userId":3,
    "userName": 'Frank Wess',
    "reproductions":2100,
    "likes":300,
    "dislikes":2,
    "comments":[
      {
        "commentId": 10,
        "text":"No m'agrada el video",
        "datetimePublication": ISODate("2004-06-14T09:30:00.000Z"),
        "userId": 2,
        "userName":'Diana Krall'
      },{
        "commentId": 2,
        "text":"Es pot millorar",
        "datetimePublication": ISODate("2004-03-15T10:30:00.000Z"),
        "userId": 1,
        "userName": 'John Allred',
        "likes": 1,
        "dislikes": 1,
        "likeOrDislike":[
           {
            "likeOrDislike": 'like',
            "userId": 2,
            "userName":'Diana Krall',
            "dataTime": ISODate("2004-09-15T09:45:00.000Z")
           },{
            "likeOrDislike": 'like',
            "userId": 3,
            "userName": 'Frank Wess',
            "dataTime": ISODate("2004-04-15T21:50:00.000Z")
           }
        ]
      }],
    "tags":[
      {
        "tagId": 3,
        "tagName": 'Flute'
      }]
    }
  ]);
});
