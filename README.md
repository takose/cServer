# cServer
## Getting Started
```
$ npm install
$ npm run server # http://localhost:3000
$ npm run <device id>
```

## port
|number|service(device id)|
| --- | --- |
| 3000 | server |
| 3001 | ff |
| 3002 | Smoon |
| 3003 | Integlass |
| 3004 | Puta |
| 3005 | WebChoco |

デバイスを追加したらここも更新

## Composition
[![https://gyazo.com/0923c72a2693d710e9f06f3787edb243](https://i.gyazo.com/0923c72a2693d710e9f06f3787edb243.png)](https://gyazo.com/0923c72a2693d710e9f06f3787edb243)

タブレットのブラウザ上でプレーヤーがレシピを実行し，デバイスへの指示をServerになげる．

このServerではプレーヤーとデバイスの各socketの管理と，プレーヤー-DeviceServer間の橋渡しをする．

プレーヤーは別repoになっていて，ここではviewはもたない．

## directory
- server: WebSocketのsocket管理，プレーヤー-DeviceServer間の橋渡しサーバ(express)
- devices: 各デバイス上につながるラズパイに乗るサーバ(express)
- common: 定数管理など，server,devaice両方から参照されるfiles
```
├── common
|  └── events
|     ├── devices.js
|     └── utils.js
├── devices
|  ├── app.js
|  └── lib
|     ├── Device.js
|     └── FlameworkFramework.js
├── package-lock.json
├── package.json
└── server
   ├── app.js
   ├── lib
   |  ├── Connection.js
   |  ├── ConnectionManager.js
   |  ├── DeviceConnection.js
   |  └── UserConnection.js
   ├── public
   |  ├── images
   |  ├── javascripts
   |  |  └── index.js
   |  └── stylesheets
   |     └── style.css
   ├── routes
   |  └── index.js
   ├── test
   |  └── lib
   |     └── ConenctionManager.test.js
   └── views
      ├── error.ejs
      └── index.ejs
```
