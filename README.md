# 기본적인 설명 
``` 
	* create-react-app + toolkit + saga 프로젝트
```	


# yarn 명령어 
``` json
"start": "react-scripts start",
// cra에 내장된 웹팩설정에 의해서 배포파일생성
"build": "react-scripts build", 
"test": "react-scripts test",
"eject": "react-scripts eject",
// 배포폴더 삭제 (rm -rf 명령어와 동일)
"clean:server": "rimraf dist/*",
"clean:react": "rimraf build/*",
"clean:prefix": "rimraf prefix/*",
// 서버 배포폴더내용 빠르게삭제 && 컴파일
"build:tsc": "yarn clean:server && tsc",
// ts 파일 상태로 실행
"server:start": "nodemon --exec ts-node ./server/app.ts",
"server:dev": "nodemon --watch src --delay 1 --exec ts-node ./server/app.ts",
// 무중단 실행을 위해 사용하는 process manager 켜기
"pm2-start": "pm2 start ./ecosystem.config.js",
// 켜진 pm2에 현재 실행중인 설정 저장
// (ecosystem.config.js 를 안만들시 수동으로 설정을 여러번한후 설정을 저장하는 명령어)
"pm2-save": "pm2 save"
```
```
- pm2 설치 후 오류 발생시
pm2 install typescript 명령으로 타입스크립트추가
```


# 폴더설명
+ build
+ dist
+ prefix
+ public
+ server
+ src
	+ api
	+ components
	+ containers
	+ control
	+ css
	+ lib
	+ modules
	+ util

```
/api 
	통신용 axois 및 interface

/modules
	리덕스사가

/control
	기사 관제용 클래스

/server 
	js로 tsc(js로 컴파일) 하기전 코드
	나중에 서버관련 추가 개발을 하게될 경우 이 폴더 안에서 진행한 후 컴파일

/dist 
	server 안의 ts파일이 컴퍼일 된후 js가 생성되는 폴더

/build
	리액트 개발 코드가 컴파일되어 배포용으로 바뀐내용이 있는 폴더

/prefix
	웹팩이 생성한 로그로 추측

```

# tsconfig.json 생성 및 설명
```
	* tsc --init 명령어로 생성
```	
``` json
	{
		"compilerOptions": {
			"target": "es6", //빌드 결과물을 es6 방식을 한다는 뜻
			"module": "commonjs", // 빌과의 모듈 방식을 commonjs 방식을 한다는 뜻
			"moduleResolution": "node",//모듈 해석 방식은 node 처럼 한다는 뜻
			"sourceMap": true, // .map.js 파일도 함께 생성한다는 뜻
			"emitDecoratorMetadata": true, /* Enables experimental support for ES7 decorators. */
			"experimentalDecorators": true,  /* Enables experimental support for emitting type metadata for decorators. */
			"removeComments": false, /* Do not emit comments to output. */
			"noImplicitAny": false // 암시적으로 선언되었는데 any로 추론되면 에러를 알려준다.
		},
		"include": [ // 특정폴더 아래로 컴파일
			"./server/*"
		],
		"exclude": [ // npm 으로 설치한 모듈들을 import 가능하도록 설정
			"node_modules"
		]
	}
```

