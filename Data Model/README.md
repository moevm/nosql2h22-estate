# Описание нереляционной модели данных
## Графическое представление 
<img src="https://i.imgur.com/B21GCWR.png" alt="nonSqlDB"/>

## Подробное описание
БД содержит одну коллекцию "Houses"
Коллекция "Houses":
- "Название поля" - Описание поля
- _id - Номер
- street - Улица
- houseNumber - Номер дома
- houseFractionNumber - Дробный номер дома
- housing - Корпус
- character - Литера
- entrance - Парадная
- district - Район
- commune - Коммунальные
  - roomsCount - Количество комнат
  - count - Количество квартир с данным количеством комнат
- series - Серия, тип проекта
- yearBuild - Год постройки
- yearReconstruct - Год проведения реконструкции
- areaHouse - Общая площадь здания, м2
- areaLiving - Площадь жилых помещений, м2
- areaFunctional - Площадь нежилых помещений функционального назначения, м2
- countLadder - Число лестниц
- countFloor - Число этажей
- countLiving - Количество проживающих
- areaAttic - Площадь мансард, м2
- hasCentalHeating - Центральное отопление
- hasAutonomousBoiler - Автономная котельная
- hasFurnanceHeating - Печное отопление
- hasCentralHotWater - Центральное горячее водоснабжение
- hasCentalHotWaterGas - Горячее водоснабжение от газовых колонок
- hasCentralHotWaterWood - Горячее водоснабжение от дровяных колонок
- hasCentralElectricity - Центральное электроснабжение
- hasCentralGas - Центральное газоснабжение
- hasChute - Мусоропроводы
- flat - Квартиры
  - roomsCount - Количество комнат
  - count - Количество квартир с данным количеством комнат
- functionalCount - Количество встроенных нежилых помещений
- yearLiftBuild - Год ввода лифтов в эксплуатацию
- yearLiftReconstruct - Год реконструкции лифтов
- yearLiftUpgrade - Год модернизации лифтов
- areaCleaning - Общая площадь уборки придомовых территорий, м2
- tapDate - Дата составления ТЭП
- mcName - Полное наименование управляющей компании
- hasAccident - Аварийность
- capitalRepairDates - Год проведения капитального ремонта
- workTypes - Виды работ
- countChute - Количество стволов мусоропровода
- areaMetalRoof - Площадь металлической кровли
- countLift - Общее количество лифтов
- countIntercom - Количество ПЗУ
- areaBasement - Площадь подвалов, м2

## Оценка объема

### Коллекция "Houses":

Название поля | Тип данных | Размер данных
--- | --- | ---
house_id | ObjectId | 12 bytes
street | UTF-8 String | 2 * 64 = 128 bytes
houseNumber | Array[Int32] | 12 bytes в среднем (среднее кол-во 1)
houseFractionNumber | Int32 | 4 bytes
housing | Int32 | 4 bytes
character | UTF-8 String | 2 * 32 = 64 bytes
district | UTF-8 String | 2 * 32 = 64 bytes
commune | Array[Object] | 75 bytes в среднем (среднее кол-во 2)
flat | Array[Object] | 75 bytes в среднем (среднее кол-во 2)
series | UTF-8 String | 2 * 16 = 32 bytes
yearBuild | Int32 | 4 bytes
yearReconstruct | Int32 | 4 bytes
areaHouse | Float | 4 bytes
areaLiving |  Float | 4 bytes
areaFunctional | Float | 4 bytes
countLadder | Int32 | 4 bytes
countFloor | Int32 | 4 bytes
countLiving | Int32 | 4 bytes
areaAttic | Float | 4 bytes
hasCentalHeating | Boolean | 1 bytes
hasAutonomousBoiler | Boolean | 1 bytes
hasFurnanceHeating | Boolean | 1 bytes
hasCentralHotWater | Boolean | 1 bytes
hasCentalHotWaterGas | Boolean | 1 bytes
hasCentralHotWaterWood | Boolean | 1 bytes
hasCentralElectricity | Boolean | 1 bytes
hasCentralGas | Boolean | 1 bytes
hasChute | Boolean | 1 bytes
nonCommuneRooms | Array[Int32] | 19 bytes в среднем (среднее кол-во 2)
functionalCount | Int32 | 4 bytes
yearLiftBuild | Int32 | 4 bytes
yearLiftReconstruct | Int32 | 4 bytes
yearLiftUpgrade | Int32 | 4 bytes
areaCleaning | Float | 4 bytes
tapDate | Date | 8 bytes
mcName | UTF-8 String | 2 * 64 = 128 bytes
hasAccident | Boolean | 1 bytes
capitalRepairDates | Array[Int32] | 26 bytes в среднем (среднее кол-во 3)
workTypes | Array[UTF-8 String[64]] | 549 bytes в среднем (среднее кол-во 3)
countChute | Int32 | 4 bytes
areaMetalRoof | Float | 4 bytes
countLift | Int32 | 4 bytes
countIntercom | Int32 | 4 bytes
areaBasement | Float | 4 bytes

- Средний объем документа с домом: V = 1349 bytes
- Количество многоквартирных домов в Санкт-Петербурге: N = 23123
- Объем базы данных - N * V = 29,7 MB
- Избыточность выражается в дубликатах mcName, street, workTypes - (23123 * 1349 bytes)/(23123 * 1349 bytes - ((23123-3751) * 128 bytes + (23123-1617) * 128 bytes + (23124 * 3 - 938) * 128 bytes)) = 1.8
- Общая формула избыточности (при 83.8% дубликатов mcName, 93% дубликатов street, 98.65% дубликатов типов работ) - N * 1349/(N * 1349 - N * 0.838 * 128 + N * 0.93 * 128 + 3 * N * 0.9865 * 128) = 1.8

*Так как всего существуют 3751 управляющая компания, 1617 улиц и 938 уникальных типов работ*

## Запросы
- Запрос на добавление узлов
```python
db.houses.insert_many([{
    "_id": 1,
    "street": "Дунайский пр.",
    "houseNumber": 36,
    "housing": 1,
    "character": "A",
    "district": "Фрунзенский",
    "commune": Null,
    "series": "600.11",
    "yearBuild": 2001,
    "yearReconstruct": null,
    "areaHouse": 10425.4,
    "areaLiving": 9017.7,
    "areaFunctional": null,
    "countLadder": 4,
    "countFloor": 10,
    "countLiving": 288,
    "areaAttic": null,
    "hasCentalHeating": true,
    "hasAutonomousBoiler": false,
    "hasFurnanceHeating": false,
    "hasCentralHotWater": true,
    "hasCentalHotWaterGas": false,
    "hasCentralHotWaterWood": false,
    "hasCentralElectricity": true,
    "hasCentralGas": false,
    "hasChute": true,
    "flat": [{roomsCount: 1, count: 40}, {roomsCount: 2, count: 42}, {roomsCount: 3, count: 78}],
    "functionalCount": null,
    "yearLiftBuild": 2001,
    "yearLiftReconstruct": null,
    "yearLiftUpgrade": null,
    "areaCleaning": 3558,
    "tapDate": datetime(2012, 12, 27),
    "mcName": "ЮжДомСтрой",
    "hasAccident": false,
    "capitalRepairDates": null,
    "workTypes": workTypes,
    "countChute": 4,
    "areaMetalRoof": areaMetalRoof,
    "countLift": 4,
    "countIntercom": 4,
    "areaBasement": 1206.5
}])
```
- Запрос на обновление данных об доме (добавление информации о наличии аварийности)
```python
db.houses.update_one(
    {"_id": 1}, 
    {
        "$set": {"hasAccident": True}
    }
)
```
- Запрос на обновление данных о доме по его id (добавление информации о реконструкции)
```python
db.houses.update_one({
    '_id': 1,
    {
        "$set": {"yearReconstruct": 2022}
    }
})
```
- Запрос для поиска домов, построенных после 1990 года.
```python
db.houses.find({
    'yearBuild': {'$gt': 1998}
})
```
- Запрос для подсчета кол-ва аварийных домов с id не равным определенному, имеющих определенный год строения.
```python
db.houses.count_documents({
    '_id': {'$ne': 1},
    'yearBuild': 1998,
    'hasAccident': True
})
```


# Аналогичная реляционная модель
## Графическое представление
<img src="https://i.imgur.com/IcB7aLl.png" alt="sqlDB" width="1200"/>

## Описание оценка объема
### Таблица "House"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
house_id | ID дома | UUID | 16 bytes
street | Улица | TEXT | 2 * 64 = 128 bytes
housing | Корпус | INT | 4 bytes
character | Литера | TEXT | 2 * 32 = 64 bytes
series | Серия, тип проекта | TEXT | 2 * 16 = 32 bytes
houseFractionNumber | Дробный номер дома | INT | 4 bytes
yearBuild | Год постройки | INT | 4 bytes
yearReconstruct | Год проведения реконструкции | INT | 4 bytes
areaHouse | Общая площадь здания, м2 | FLOAT | 4 bytes
areaLiving | Площадь жилых помещений, м2 |  FLOAT | 4 bytes
areaFunctional | Площадь нежилых помещений функционального назначения, м2 | FLOAT | 4 bytes
countLadder | Число лестниц | INT | 4 bytes
countFloor | Число этажей | INT | 4 bytes
countLiving | Количество проживающих | INT | 4 bytes
areaAttic | Площадь мансард, м2 | FLOAT | 4 bytes
hasCentalHeating | Центральное отопление | ENUM | 1 bytes
hasAutonomousBoiler | Автономная котельная | ENUM | 1 bytes
hasFurnanceHeating | Печное отопление | ENUM | 1 bytes
hasCentralHotWater | Центральное горячее водоснабжение | ENUM | 1 bytes
hasCentalHotWaterGas | Горячее водоснабжение от газовых колонок | ENUM | 1 bytes
hasCentralHotWaterWood | Горячее водоснабжение от дровяных колонок | ENUM | 1 bytes
hasCentralElectricity | Центральное электроснабжение | ENUM | 1 bytes
hasCentralGas | Центральное газоснабжение | ENUM | 1 bytes
hasChute | Мусоропроводы | ENUM | 1 bytes
functionalCount | Количество встроенных нежилых помещений | INT | 4 bytes
yearLiftBuild | Год ввода лифтов в эксплуатацию | INT | 4 bytes
yearLiftReconstruct | Год реконструкции лифтов | INT | 4 bytes
yearLiftUpgrade | Год модернизации лифтов | INT | 4 bytes
areaCleaning | Общая площадь уборки придомовых территорий, м2 | FLOAT | 4 bytes
tapDate | Дата составления ТЭП | Date | 8 bytes
mc_id | Полное наименование управляющей компании | UUID | 16 bytes
hasAccident | Аварийность | ENUM | 1 bytes
countChute | Количество стволов мусоропровода | INT | 4 bytes
areaMetalRoof | Площадь металлической кровли | FLOAT | 4 bytes
countLift | Общее количество лифтов | INT | 4 bytes
countIntercom | Количество ПЗУ | INT | 4 bytes
areaBasement | Площадь подвалов, м2 | FLOAT | 4 bytes

### Таблица "District"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
district_id | ID района | UUID | 16 bytes
street_id | ID улицы | UUID | 16 bytes
district | Название района | TEXT | 2 * 32 = 64 bytes

### Таблица "Street"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
street_id | ID района | UUID | 16 bytes
house_id | ID улицы | UUID | 16 bytes
street | Улица | TEXT | 2 * 64 = 128 bytes

### Таблица "Company"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
mc_id | ID района | UUID | 16 bytes
mcName | ID улицы | TEXT | 2 * 64 = 128 bytes

### Таблица "Flat"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
flat_id | ID таблицы | UUID | 16 bytes
house_id | ID дома | UUID | 16 bytes
roomsCount | Количество комнат | INT | 4 bytes
count | Количество квартир с данным количеством комнат | INT | 4 bytes

### Таблица "Commune"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
commune_id | ID таблицы | UUID | 16 bytes
house_id | ID дома | UUID | 16 bytes
roomsCount | Количество комнат | INT | 4 bytes
count | Количество квартир с данным количеством комнат | INT | 4 bytes

### Таблица "CapitalRepair"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
capitalRepair_id | ID капитального ремонта | UUID | 16 bytes
house_id | ID дома | UUID | 16 bytes
workType | Виды работ | TEXT | 2 * 64 = 128 bytes
capitalRepairDate | Год проведения капитального ремонта | INT | 4 bytes

### Таблица "HouseNumber"

Название поля | Описание поля | Тип поля | Вес поля
--- | --- | --- | ---
houseNumber_id | ID номера дома | UUID | 16 bytes
house_id | ID дома | UUID | 16 bytes
houseNumber | Дом | INT | 4 bytes

Средний объем таблицы:
- Таблица District:
  - Количество объектов: 19
  - Вес объекта: 96 bytes
  - Вес таблицы: 1536 bytes

- Таблица Street:
  - Количество объектов: 1618
  - Вес объекта: 160 bytes
  - Вес таблицы: 258880 bytes

- Таблица Company:
  - Количество объектов: 3752
  - Вес объекта: 144 bytes
  - Вес таблицы: 540288 bytes

- Таблица House:
  - Количество объектов: 23123
  - Вес объекта: 358 bytes
  - Вес таблицы: 8278034 bytes

- Таблица Flat:
  - Количество объектов: 23123 * 2 = 46246
  - Вес объекта: 40 bytes
  - Вес таблицы: 1849840 bytes

- Таблица Commune:
  - Количество объектов: 23123 * 2 = 46246
  - Вес объекта: 40 bytes
  - Вес таблицы: 1849840 bytes

- Таблица CapitalRepair:
  - Количество объектов: 23123 * 3 = 69372
  - Вес объекта: 164 bytes
  - Вес таблицы: 11377008 bytes

- Таблица HouseNumber:
  - Количество объектов: 23123 * 1 = 23123
  - Вес объекта: 36 bytes
  - Вес таблицы: 832428 bytes

**Итого:** 24447566 bytes (23,3 MB)

- Избыточность выражается дублированием проведенных работ:
24447566  / (24447566  - (69372-938) * 128 bytes) = 1.5
- Количество многоквартирных домов: N = 23123
- Средний вес записи о многоквартирном доме: V = 1057 bytes
- Вес базы данных: N * V = 23.3 MB
- Общая формула избыточности (при дублировании проведенных работ 98.64%): (N * 1057)/(N * 1057 - 3 * N * 0.9864 * 128) = 1.5

## Запросы

### Запрос на ввод данных о доме
```sql
INSERT into Company values (1, 'ЮжДомСтрой');
INSERT into District values (1, 'Фрунзенский');
INSERT into Street values (1, 1, 'Дунайский пр.');
INSERT into House values (1, 1, 1, 'А','Индивидуальный', 1970, 1980,
                          500.0, 400.0, 0.0, 2, 2, 45,
                          1, 34, true, false, false, true,
                          false, false, true, true, false, 1,
                          1980, 1970, 1975, 200.0, '2004-12-12', true,
                          4, 585.4, 4, 2, 170.0);
 
INSERT into Flat values (1, 1, 2, 36);
 
INSERT into CapitalRepair values (1, 1, 'Очистка и антисептирование древесины', 2008);
 
INSERT into HouseNumber values (1, 1, 38);
```

*Количество запросов: 7*

### Запрос на вывод адреса домов
```sql
SELECT district, street, housing, `character` FROM House RIGHT JOIN Street ON House.street_id = street.street_id RIGHT JOIN District ON Street.district_id = District.district_id;
```
*Количество запросов: 1*

### Запрос на обновление данных об доме (добавление информации о наличии аварийности)
```sql
UPDATE House SET hasAccident = true WHERE house_id=3;
```
*Количество запросов: 1*
 
### Запрос на обновление данных о доме по его id (добавление информации о реконструкции)
```sql
UPDATE House SET yearReconstruct = 2022 WHERE house_id=3;
```
*Количество запросов: 1*
 
### Запрос для поиска домов, построенных после 1990 года.
```sql
SELECT district, street, housing, `character`, yearBuild FROM House JOIN Street ON House.street_id = street.street_id JOIN District ON Street.district_id = District.district_id WHERE House.yearBuild > 1990;
```
*Количество запросов: 1*

### Запрос для подсчета кол-ва аварийных домов с id не равным определенному, имеющих определенный год строения.
```sql
SELECT district, street, housing, `character`, yearBuild, house_id FROM House JOIN Street ON House.street_id = street.street_id JOIN District ON Street.district_id = District.district_id WHERE House.yearBuild = 1970 AND House.house_id != 4;
```
*Количество запросов: 1*

# Вывод
- Для данной БД реализация в MongoDB "выигрывает" реализацию в SQL по скорости запросов: несмотря на то, что каждый из примеров требует 1 запрос, из-за медленных `JOIN`'ов в SQL, NoSQL реализация оказывается быстрее. 
- Вес реляционной базы данных - 23.3 MB, вес нереляционной базы данных - 29,7 МВ. 
- Избыточность реляционной базы данных - 1.5, избыточность нереляционной базы данных - 1.8. 
- Анализируя модели данных и полученные результаты, приходим к выводу, что обе модели растут с линейной скоростью.