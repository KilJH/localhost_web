# localhost

![localhost_log](https://github.com/KilJH/localhost_web/blob/main/public/img/logos/localhostLogoWhite.png?raw=true)

현지인과 함께 여행할 수 있게 현지인을 매칭해주는 웹 플랫폼입니다.
localhost는 **플랜**과 **호스트** 두가지 서비스를 제공하고 있습니다.

**플랜**은 여행계획을 회원들과 공유할 수 있는 게시판입니다.
마음에 드는 여행계획은 좋아요를 누르거나 내 여행에 담아 나중에 손쉽게 찾아볼 수 있습니다.
재밌었던 여행을 작성해 회원들과 그 즐거움을 공유해보세요!

**호스트**는 동네의 현지인으로서 여행객들과 만나 로컬맛집 등을 소개해주는 시스템입니다.
모든 회원은 지역을 기반으로 호스트로 등록된 회원들을 검색 및 동행요청을 할 수 있으며,
호스트로 활동하고자 하는 사람들은 권한 신청을 통해 손쉽게 호스트로 활동할 수 있습니다.

## 사용기술

- 프론트
  - 언어: 타입스크립트
  - 프레임워크: 리액트
  - SSR: Next.js
- 백
  - 언어: 자바스크립트( Node.js )
  - 프레임워크: Express.js
  - 데이터베이스: AWS RDS( mysql )
  - 파일서버: AWS S3
  - 실시간 통신: WebSocket( socket.io )
- 배포
  - AWS EC2
- 외부 API
  - Google Maps API ( 지도표시 )
  - Google Place API ( 장소검색 및 지리정보 )

## developer

- 길진혁: 프론트엔드 & 백엔드
  - 플랜
  - 호스트
  - 마이페이지
  - EC2 서버 구축
  - 지도정보,
- 이찬빈: 프론트엔드
  - 관리자페이지
  - 채팅
  - 회원정보
  - 호스트 마이페이지
- 황인종: 백엔드
  - DB 설계
  - 파일업로드
  - API 작성
