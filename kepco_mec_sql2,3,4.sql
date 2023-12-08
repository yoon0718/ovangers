CREATE TABLE stat (
	stat INT PRIMARY KEY COMMENT "충전기상태",
	situation VARCHAR(20) NOT NULL COMMENT "상태"
) COMMENT "충전기상태";

CREATE TABLE chger_type (
	chget_type VARCHAR(10) PRIMARY KEY COMMENT "충전기타입",
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

INSERT INTO chger_type VALUES("01","DC차데모");
INSERT INTO chger_type VALUES("02","AC완속");
INSERT INTO chger_type VALUES("03","DC차데모+AC3상");
INSERT INTO chger_type VALUES("04","DC콤보");
INSERT INTO chger_type VALUES("05","DC차데모+DC콤보");
INSERT INTO chger_type VALUES("06","DC차데모+AC3상+DC콤보");
INSERT INTO chger_type VALUES("07","AC3상");
INSERT INTO chger_type VALUES("08","DC콤보(완속)");
INSERT INTO chger_type VALUES("89","H2");

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