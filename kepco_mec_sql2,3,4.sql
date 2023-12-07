CREATE TABLE chgerMap (
	stchId VARCHAR(10) PRIMARY KEY COMMENT "충전소충전기아이디",
	busiId VARCHAR(10) NOT NULL COMMENT "기관아이디",
	stat INT NOT NULL COMMENT "충전기상태",
	chgertype VARCHAR(10) NOT NULL COMMENT "충전기타입",
	zcode VARCHAR(10) NOT NULL COMMENT "지역구분코드",
	zscode VARCHAR(10) NOT NULL COMMENT "지역구분상세코드2",
	kind VARCHAR(10) NOT NULL COMMENT "충전소구분코드",
	kindDetail VARCHAR(10) NOT NULL COMMENT "충전소구분상세코드",
	statNm VARCHAR(20) COMMENT "충전소명",
	statId VARCHAR(10) COMMENT "충전소아이디",
	chgerId VARCHAR(10) COMMENT "충전기아이디",
	addr VARCHAR(50) COMMENT "주소",
	location VARCHAR(50) COMMENT "상세위치",
	lat FLOAT COMMENT "위도",
	lng FLOAT COMMENT "경도",
	useTime VARCHAR(20) COMMENT "이용가능시간",
	bnm VARCHAR(20) COMMENT "기관명",
	busiNm VARCHAR(20) COMMENT "운영기관명",
	busiCall VARCHAR(20) COMMENT "운영기관연락처",
	statUpdDt VARCHAR(10) COMMENT "상태갱신일시",
	lastTsdt VARCHAR(10) COMMENT "마지막충전시작일시",
	lastTedt VARCHAR(10) COMMENT "마지막충전종료일시",
	nowTsdt VARCHAR(10) COMMENT "충전중시작일시",
	output INT COMMENT "충전용량",
	method VARCHAR(10) COMMENT "충전방식",
	parkingFree VARCHAR(10) COMMENT "주차료무료",
	note VARCHAR(20) COMMENT "충전소안내",
	limitYn VARCHAR(10) COMMENT "이용자제한",
	limitDetail VARCHAR(20) COMMENT "이용제한사유",
	delYn VARCHAR(10) COMMENT "삭제여부",
	delDetail VARCHAR(20) COMMENT "삭제사유",
	trafficYn VARCHAR(10) COMMENT "편의제공여부",
	CONSTRAINT busiId_FK FOREIGN KEY (busiId) REFERENCES busiId(busiId),
	CONSTRAINT stat_FK FOREIGN KEY (stat) REFERENCES stat(stat),
	CONSTRAINT chgerType_FK FOREIGN KEY (chgertype) REFERENCES chgertype(chgertype),
	CONSTRAINT zcode_FK FOREIGN KEY (zcode) REFERENCES zcode(zcode),
	CONSTRAINT zscode_FK FOREIGN KEY (zscode) REFERENCES zscode(zscode),
	CONSTRAINT kind_FK FOREIGN KEY (kind) REFERENCES kind(kind),
	CONSTRAINT kindDetail_FK FOREIGN KEY (kindDetail) REFERENCES kindDetail(kindDetail)
) COMMENT "충전기지도";

CREATE TABLE stat (
	stat INT PRIMARY KEY COMMENT "충전기상태",
	situation VARCHAR(20) NOT NULL COMMENT "상태"
) COMMENT "충전기상태";

CREATE TABLE chgerType (
	chgetType VARCHAR(10) PRIMARY KEY COMMENT "충전기타입",
	type VARCHAR(20) NOT NULL COMMENT "타입"
) COMMENT "충전기타입";

CREATE TABLE zcode (ovangers
	zcode VARCHAR(10) PRIMARY KEY COMMENT "지역구분코드",
	city VARCHAR(20) NOT NULL COMMENT "시도"
) COMMENT "지역구분코드";

INSERT INTO stat VALUES(0,"알수없음");
INSERT INTO stat VALUES(1,"통신이상");
INSERT INTO stat VALUES(2,"사용가능");
INSERT INTO stat VALUES(3,"충전중");
INSERT INTO stat VALUES(4,"운영중지");
INSERT INTO stat VALUES(5,"점검중");

INSERT INTO chgerType VALUES("01","DC차데모");
INSERT INTO chgerType VALUES("02","AC완속");
INSERT INTO chgerType VALUES("03","DC차데모+AC3상");
INSERT INTO chgerType VALUES("04","DC콤보");
INSERT INTO chgerType VALUES("05","DC차데모+DC콤보");
INSERT INTO chgerType VALUES("06","DC차데모+AC3상+DC콤보");
INSERT INTO chgerType VALUES("07","AC3상");
INSERT INTO chgerType VALUES("08","DC콤보(완속)");
INSERT INTO chgerType VALUES("89","H2");

INSERT INTO zcode VALUES("11","서울특별시");
INSERT INTO zcode VALUES("26","부산광역시");
INSERT INTO zcode VALUES("27","대구광역시");
INSERT INTO zcode VALUES("28","인천광역시");
INSERT INTO zcode VALUES("29","광주광역시");
INSERT INTO zcode VALUES("30","대전광역시");
INSERT INTO zcode VALUES("31","울산광역시");
INSERT INTO zcode VALUES("36","세종특별자치시");
INSERT INTO zcode VALUES("41","경기도");
INSERT INTO zcode VALUES("42","강원도");
INSERT INTO zcode VALUES("43","충청북도");
INSERT INTO zcode VALUES("44","충청남도");
INSERT INTO zcode VALUES("45","전라북도");
INSERT INTO zcode VALUES("46","전라남도");
INSERT INTO zcode VALUES("47","경상북도");
INSERT INTO zcode VALUES("48","경상남도");
INSERT INTO zcode VALUES("50","제주특별자치도");
INSERT INTO zcode VALUES("51","강원특별자치도");