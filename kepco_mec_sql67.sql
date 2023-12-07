CREATE TABLE kind(
	kind VARCHAR(10) PRIMARY KEY NOT NULL,
	facility VARCHAR(20) NOT NULL
);
INSERT INTO kind VALUES("A0","공공시설");
INSERT INTO kind (kind,facility) 
VALUES("B0","주차시설"),("C0","휴게시설"),("D0","관광시설"),
("E0","상업시설"),("F0","차량정비시설"),("G0","기타시설"),("H0","공동주택시설"),("I0","근린생활시설"),("J0","교육문화시설");

CREATE TABLE kindDetail(
	kindDetail VARCHAR(10) PRIMARY KEY NOT NULL,
	facility VARCHAR(20) NOT NULL
);
kinddetail