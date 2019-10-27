INSERT INTO "public"."accommodation"("id","name","adress","geom","review","booking_link","place")
VALUES
  -- Georgia 
	(1,'StarHostel',E'თამარ მეფის ქუჩა (Tamar Mepe St)',ST_Makepoint(42.2670918, 42.7074275),'4/10',NULL,'Kutaisi'),
	(2,'Jeiran Japariidze''s Guesthoue',E'ჯონდო ხაფთანის ქუჩა (Jondo Khaptani St)',ST_Makepoint(43.04214, 42.71906),'6/10',NULL,'Mestia'),
	(3,'Guest House Adelina',E'უშბის ქუჩა (Ushba Street)',ST_Makepoint(43.04462, 42.7218),'8/10',NULL,'Mestia'),
	(4,'My Moon Hostel',E'Rustaveli St.',ST_Makepoint(42.5052150, 41.8766611),'8/10',NULL,'Zugdidi'),
	(5,'Back2me',E'ჭილაძის (ელიავა) ქუჩა (Chiladze)',ST_Makepoint(41.65108, 41.64276),'4/10',NULL,'Batumi'),
	(6,'Marco Polo Hostel',E'შოთა რუსთაველის გამზირი (Rustaveli Ave)',ST_Makepoint(41.701813, 44.793906),'10/10',NULL,'Tblisi'),
  -- Azerbaijan
	(7,'Khurma Hostel',E'Şah İsmayıl Xətai',ST_Makepoint(40.698095, 46.359468),'5/10',NULL,'Ganja'),
	(8,'Sheki Adventure Hostel',E'P.Manafova',ST_Makepoint(41.205071, 47.180339),'6/10',NULL,'Şəki'),
	(9,'Sahli Hostel & Hotel',E'Zarifa Aliyeva Street',ST_Makepoint(40.370719, 49.843672),'6/10',NULL,'Baku')