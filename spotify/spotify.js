var MongoClient = require('/home/albert/Escritorio/MongoDBProjects/node_modules/mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
use ('spotify');
db.dropDatabase();
const dbName = 'spotify';
const client = new MongoClient(url);
client.connect(function(err) {
  assert.equal(null, err);
  console.log("'spotify' is connected to the server");
  var db = client.db(dbName);
  user = db.collection('user', {
    validator:{
      $jsonSchema: {
      bsonType: 'object',
      required: ['userId', 'userName', 'email', 'password', 'dateOfBirth', 'gender', 'postalCode', 'country', 'accountType'],
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
        accountType: {enum: ['free', 'premium']},
        suscription: {
           bsonType: 'object',
           required: ['dateStart', 'dateRenewal', 'creditCardOrPayPal'],
           properties: {
             dateStart: {bsonType: 'date'},
             dateRenewal: {bsonType: 'date'},
             creditCardOrPayPal: {enum: ['creditCard', 'PayPal']},
             creditCard: {
               bsonType: 'object',
               required: ['number', 'caducity', 'securityCode'],
               properties: {
                 number: {bsonType: 'int'},
                 caducity: {bsonType: 'string'},
                 securityCode: {bsonType: 'int'}
               }
             },
             userPayPal: {bsonType: 'int'},
             payments: {
               bsonType: 'array',
               minItems: 1,
               items: {
                 bsonType: 'object',
                 required: ['paymentId', 'datePayment', 'total'],
                 properties: {
                   paymentId: {bsonType: 'int'},
                   datePayment: {bsonType: 'date'},
                   total: {bsonType: ['int', 'double']}
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
            required: ['playlistId', 'playlistName', 'dateCreation', 'activeOrRemoved', 'howManySongs', 'songsPlaylist'],
            properties:{
              playlistId: {bsonType: 'int'},
              playlistName: {bsonType: 'string'},
              dateCreation: {bsonType: 'date'},
              activeOrRemoved: {enum: ['active', 'removed']},
              howManySongs: {bsonType: 'int'},
              songsPlaylist: {
                bsonType: 'object',
                required: ['song'],
                properties: {
                  songs:{
                    bsonType: 'array',
                    minItems: 1,
                    items: {
                      bsonType: 'object',
                      required: ['songId', 'songTitle','userId', 'userName', 'dateAdded'],
                      properties: {
                        songId: {bsonType: 'int'},
                        songTitle: {bsonType: 'string'},
                        userId: {bsonType: 'int'},
                        userName: {bsonType: 'string'},
                        dateAdded: {bsonType: 'date'}
                      }
                    }
                  }
                }
              }
            }
          }
        },
        favoriteAlbums: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['albumId', 'albumTitle'],
            properties: {
              albumId: {bsonType: 'int'},
              albumTitle: {bsonType: 'string'}
            }
          }
        },
        favoriteSongs: {
          bsonType: 'array',
          minItems: 1,
          items: {
            bsonType: 'object',
            required: ['songId', 'songTitle'],
            properties: {
              songId: {bsonType: 'int'},
              songTitle: {bsonType: 'string'}
            }
          }
        }
      }
    }
  }
});
  artist = db.collection('artist', {
  validator:{
    $jsonSchema: {
    bsonType: 'object',
    required: ['artistId', 'artistName', 'image', 'albums', 'relatedArtists'],
    properties: {
      _id: {},
      artitsId: {bsonType: 'int'},
      artitsName: {bsonType: 'string'},
      image: {bsonType: 'string'},
      albums: {
        bsonType: 'array',
        minItems: 1,
        items: {
          bsonType: 'object',
          required: ['albumId', 'albumTitle', 'image', 'yearPublication', 'songs'],
          properties:{
            albumId: {bsonType: 'int'},
            albumTitle: {bsonType: 'string'},
            image: {bsonType: 'string'},
            yearPublication: {bsonType: 'date'},
            songs: {
              bsonType: 'array',
              minItems: 1,
              items: {
                bsonType: 'object',
                required: ['songId', 'songTitle', 'length', 'reproductions'],
                properties:{
                  songId: {bsonType: 'int'},
                  songTitle: {bsonType: 'string'},
                  length: {bsonType: 'string'},
                  reproductions: {bsonType: 'int'}
                  }
                }
              }
            }
          }
        },
      relatedArtists: {
        bsonType: 'array',
        minItems: 1,
        items: {
          bsonType: 'object',
          required: ['artistId', 'artistName'],
          properties:{
            artistId: {bsonType: 'int'},
            artistName: {bsonType: 'string'}
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
    "accountType": 'premium',
    "suscription": {
      "dateStart": new Date(2020, 01, 01),
      "dateRenewal": new Date(2022, 01, 01),
      "creditCardOrPayPal": 'creditCard',
      "creditCard": {
        "number": 1111111111,
        "caducity": '10/24',
        "securityCode": 123,
        },
      "payments": [
        {
        "paymentId": 1,
        "datePayment": new Date(2020, 1, 01),
        "total": 45
        },{
        "paymentId": 3,
        "datePayment": new Date(2021, 1, 01),
        "total": 50
        },{
        "paymentId": 5,
        "datePayment": new Date(2022, 1, 01),
        "total": 55
        }]
      },
    "playlist": [
        {
        "playlistId": 1,
        "playlistTitle": 'Playlist1 User1',
        "dateCreation": new Date(2021, 6, 01),
        "activeOrRemoved": 'active',
        "howManySongs": 2,
        "songsPlaylist": {
          "songs": [{
            "songId": 5,
            "songTitle": "Song5Album2",
            "userId": 1,
            "userName":'John Allred',
            "dateAdded":new Date(2020, 10, 10)
          },{
            "songId": 13,
            "songTitle":"Song13Album",
            "userId": 2,
            "userName": 'Diana Krall',
            "dateAdded":new Date(2020, 6, 01)
            }]
          }
        },{
        "playlistId": 2,
        "playlistTitle":'Playlist2 User1',
        "dateCreation": new Date(2020, 6, 01),
        "activeOrRemoved": 'active',
        "howManySongs": 2,
        "songsPlaylist": {
          "songs": [{
            "songId": 6,
            "songTitle":"Song6Album2",
            "userId": 1,
            "userName": 'John Allred',
            "dateAdded":new Date(2020,7,21)
            },{
            "songId": 3,
            "songTitle": 'Song3Album1',
            "userId": 3,
            "userName": 'Frank Wess',
            "dateAdded":new Date(2020,12,25)
            }]
          }
        }],
    "favoriteAlbums": [
      {
        "albumId": 1,
        "albumTitle": 'Album1Artist1'
      },{
        "albumId": 4,
        "albumTitle": 'Album4Artist2'
      }
    ],
    "favoriteSongs": [
      {
        "songId": 2,
        "songName": 'Song2Album1'
      },{
        "songId": 11,
        "songName": 'Song11Album4'
      }
    ]
  },{
    "userId": 2,
    "userName": 'Diana Krall',
    "email": 'diana@email.com',
    "password": 'dianapassword',
    "dateOfBirth": new Date(1964, 11, 16),
    'gender': 'dona',
    "postalCode": 22222,
    "country": "Japan",
    "accountType": 'premium',
    "suscription": {
      "dateStart": new Date(2020, 06, 01),
      "dateRenewal": new Date(2022, 06, 01),
      "creditCardOrPayPal": 'PayPal',
      "userPayPal": 'diana@email.com',
      "payments": [
        {
        "paymentId": 2,
        "datePayment": new Date(2020, 06, 01),
        "total": 45
        },{
        "paymentId": 4,
        "datePayment": new Date(2021, 06, 01),
        "total": 50
        },{
        "paymentId": 6,
        "datePayment": new Date(2022, 06, 01),
        "total": 55
        }]
      },
    "playlist": [
        {
        "playlistId": 3,
        "playlistTitle":'Playlist3 User2',
        "dateCreation": new Date(2021,10,10),
        "activeOrRemoved": 'active',
        "howManySongs": 3,
        "songsPlaylist": {
          "songs": [{
            "songId": 9,
            "songTitle": 'Song9Album3',
            "userId": 2,
            "userName": 'Diana Krall',
            "dateAdded":new Date(2021,11, 01)
          },{
            "songId": 14,
            "songTitle": 'Song14Album5',
            "userId": 1,
            "userName": 'John Allred',
            "dateAdded":new Date(2022,01,01)
          },{
            "songId":6,
            "songTitle": 'Song6Album2',
            "userId": 2,
            "userName": 'Diana Krall',
            "dateAdded":new Date(2022,02,27)
            }]
          }
        },{
        "playlistId": 4,
        "playlistTitle":'Playlist4 User2',
        "dateCreation": new Date(2020,8,21),
        "activeOrRemoved": 'removal',
        "dateRemoval": new Date(212,11,21),
        "howManySongs": 2,
        "songsPlaylist": {
          "songs": [{
            "songId": 7,
            "songTitle": 'Song7Album3',
            "userId": 2,
            "userName": 'Diana Krall',
            "dateAdded":new Date(2021, 3, 24)
            },{
            "songId": 9,
            "songTitle": 'Song9Album3',
            "userId": 3,
            "userName": 'Frank Wess',
            "dateAdded":new Date(2020,11,12)
            }]
          }
        }],
    "favoriteAlbums": [
      {
        "albumId": 6,
        "albumTitle": 'Album6Artist3'
      },{
        "albumId": 4,
        "albumTitle": 'Album4Artist2'
      }
    ],
    "favoriteSongs": [
      {
        "songId": 10,
        "songName": 'Song10Album4',
      },{
        "songId": 15,
        "songName": 'Song15Album5'
      }
    ]
  },{
    "userId": 3,
    "userName": 'Frank Wess',
    "email": 'frank@email.com',
    "password": 'frankpassword',
    "dateOfBirth": new Date(1922, 1, 04),
    'gender': 'home',
    "postalCode": 33333,
    "country": 'France',
    "accountType": 'free',
    "playlist": [
        {
        "playlistId": 5,
        "playlistTitle":'Playlist5 User3',
        "dateCreation": new Date(2021,4,21),
        "activeOrRemoved": 'active',
        "howManySongs": 2,
        "songsPlaylist": {
          "songs": [{
            "songId": 5,
            "songTitle": 'Song5Album2',
            "userId": 3,
            "userName": 'Frank Wess',
            "dateAdded":new Date(2021,5,13)
          },{
            "songId":3,
            "songTitle": 'Song3Album1',
            "userId": 1,
            "userName": 'John Allred',
            "dateAdded":new Date(2020,9,12)
            }]
          }
        },{
        "playlistId": 6,
        "playlistTitle":'Playlist6 User3',
        "dateCreation": new Date(2021,4,20),
        "activeOrRemoved": 'active',
        "howManySongs": 2,
        "songsPlaylist": {
          "songs": [{
            "songId": 1,
            "songTitle": 'Song1Album1',
            "userId": 3,
            "userName": 'Frank Wess',
            "dateAdded":new Date(2021,7,17)
            },{
            "songId": 12,
            "songTitle": 'Song12Album4',
            "userId": 3,
            "userName":'Frank Wess',
            "dateAdded":new Date(2020, 6, 01)
            }]
          }
      }],
    "favoriteAlbums": [
      {
        "albumId": 6,
        "albumTitle": 'Album6Artist3'
      },{
        "albumId": 2,
        "albumTitle": 'Album2Artist1'
      }
    ],
    "favoriteSongs": [
      {
        "songId": 10,
        "songName": 'Song10Album4',
      },{
        "songId": 17,
        "songName": 'Song17Album6'
      }
    ]
  }
]);
  artist.insertMany([
  {
    "artistId": 1,
    "artistName": "Artist1",
    "image":'/imageSpotify/artist1.jpeg',
    "albums":[
       {
         "albumId": 1,
         "albumTitle": "Album1Artist1",
         "image":'/imageSpotify/album1.jpeg',
         "yearPublication": 2000,
         "songs":[
            {
              "songId": 1,
              "songTitle": "Song1Album1",
              "length": "04:55",
              "reproductions": 243,
            },{
              "songId": 2,
              "songTitle": "Song2Album1",
              "length": "06:14",
              "reproductions": 150,
            },{
              "songId": 3,
              "songTitle": "Song3Album1",
              "length": "08:37",
              "reproductions": 115,
            }]
        },{
         "albumId": 2,
         "albumTitle": "Album2Artist1",
         "image":'/imageSpotify/album2.jpeg',
         "yearPublication": 2003,
         "songs":[
            {
              "songId": 4,
              "songTitle": "Song4Album2",
              "length": "10:05",
              "reproductions": 315,
            },{
              "songId": 5,
              "songTitle": "Song5Album2",
              "length": "07:25",
              "reproductions": 412,
            },{
              "songId": 6,
              "songTitle": "Song6Album2",
              "length": "02:38",
              "reproductions": 99,
            }]
          }],
    "relatedArtist": [
       {
        "artistId": 2,
        "artistName": 'Artist2'
       },{
        "artistId": 3,
        "artistName": 'Artist3'
       }],
  },{
    "artistId": 2,
    "artistName": "Artist2",
    "image":'/imageSpotify/artist2.jpeg',
    "albums":[
       {
         "albumId": 3,
         "albumTitle": "Album3Artist2",
         "image":'/imageSpotify/album3.jpeg',
         "yearPublication": 2005,
         "songs":[
            {
              "songId": 7,
              "songTitle": "Song7Album3",
              "length": "05:10",
              "reproductions": 243,
            },{
              "songId": 8,
              "songTitle": "Song8Album3",
              "length": "06:14",
              "reproductions": 150,
            },{
              "songId": 9,
              "songTitle": "Song9Album3",
              "length": "08:37",
              "reproductions": 115,
            }]
        },{
         "albumId": 4,
         "albumTitle": "Album4Artist2",
         "image":'/imageSpotify/album4.jpeg',
         "yearPublication": 2007,
         "songs":[
            {
              "songId": 10,
              "songTitle": "Song10Album4",
              "length": "12:20",
              "reproductions": 95,
            },{
              "songId": 11,
              "songTitle": "Song11Album4",
              "length": "04:21",
              "reproductions": 125,
            },{
              "songId": 12,
              "songTitle": "Song12Album4",
              "length": "07:14",
              "reproductions": 185,
            }]
          }],
    "relatedArtist":[
       {
        "artistId": 1,
        "artistName": 'Artist2'
       },{
        "artistId": 3,
        "artistName": 'Artist3'
       }],
  },{
    "artistId": 3,
    "artistName": "Artist3",
    "image":'/imageSpotify/artist3.jpeg',
    "albums":[
       {
         "albumId": 5,
         "albumTitle": "Album5Artist3",
         "image":'/imageSpotify/album5.jpeg',
         "yearPublication": 1995,
         "songs":[
            {
              "songId": 13,
              "songTitle": "Song13Album5",
              "length": "04:55",
              "reproductions": 303,
            },{
              "songId": 14,
              "songTitle": "Song14Album5",
              "length": "03:49",
              "reproductions": 214,
            },{
              "songId": 15,
              "songTitle": "Song15Album5",
              "length": "12:59",
              "reproductions": 85,
            }]
        },{
         "albumId": 6,
         "albumTitle": "Album6Artist3",
         "image":'/imageSpotify/album6.jpeg',
         "yearPublication": 1998,
         "songs":[
            {
              "songId": 16,
              "songTitle": "Song16Album6",
              "length": "12:00",
              "reproductions": 199,
            },{
              "songId": 17,
              "songTitle": "Song17Album6",
              "length": "06:29",
              "reproductions": 540,
            },{
              "songId": 18,
              "songTitle": "Song18Album6",
              "length": "04:11",
              "reproductions": 222,
            }]
          }],
    "relatedArtist":[
       {
        "artistId": 1,
        "artistName": 'Artist1'
       },{
        "artistId": 2,
        "artistName": 'Artist2'
       }],
     }
   ]);
});
