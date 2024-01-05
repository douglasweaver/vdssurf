import { commitmentDefault } from './vdsbookingcommitment'
import { VDSLabelToLevel } from './vdsbookinglevels';
import { VDSLabelToAuto } from './vdsbookingautos';
import { VDSLabelToCommitment } from './vdsbookingcommitment';

import dayjs from 'dayjs';
var utc = require('dayjs/plugin/utc')
var timezone = require('dayjs/plugin/timezone') // dependent on utc plugin
dayjs.extend(utc)
dayjs.extend(timezone)
// dayjs.tz.setDefault("America/Puerto_Rico")


let csv = `id,title,body,created,enddate,level,startdate,place_id,commitment
35,Lon + 3,"arrive 2 am on 24th
depart 2am on the 29th ",2015-10-26 17:53:15.041988+00,2016-03-28,Steps,2016-03-24,1,Thinking About It
48,Elier Rental,"",2016-02-02 00:11:18.093558+00,2016-02-18,Sandy,2016-02-12,1,Thinking About It
50,mark campbell,"",2016-02-16 15:53:12.069101+00,2016-02-23,Tres Palmas,2016-02-20,1,Thinking About It
70,James Curley,"",2016-10-05 02:36:03.000693+00,2017-04-26,Steps,2017-04-19,1,Thinking About It
10,Susan/Cooper + 6,"",2015-03-16 20:55:53.610279+00,2015-04-14,Steps,2015-04-07,1,Thinking About It
9,Susan/Cooper + 6,"",2015-03-16 20:55:16.049162+00,2015-04-14,Tres Palmas,2015-04-07,1,Thinking About It
8,Lon + 3,"",2015-03-16 20:54:05.911468+00,2015-04-07,Steps,2015-03-31,1,Thinking About It
7,Mark Campbell+4,"",2015-03-16 20:52:12.217031+00,2015-04-02,Steps,2015-03-26,1,Thinking About It
6,Donald,Joining Doug+kids on top floor until Thursday,2015-03-16 20:49:24.275771+00,2015-03-27,Sandy,2015-03-21,1,Thinking About It
5,Susan and Doug,"",2015-03-03 18:22:11.527208+00,2015-03-24,Steps,2015-03-19,1,Thinking About It
4,Susan and Family,The whole crew,2015-03-02 18:52:56.742658+00,2015-03-19,Sandy,2015-03-12,1,Thinking About It
3,Susan and Family,Susan and the inlaws etc,2015-03-02 18:52:26.812924+00,2015-03-19,Tres Palmas,2015-03-12,1,Thinking About It
11,Lon + 12,"",2015-04-24 14:11:02.170724+00,2015-07-08,Steps,2015-06-18,1,Thinking About It
12,Lon + 12,"",2015-04-24 14:11:53.062331+00,2015-07-08,Sandy,2015-06-18,1,Thinking About It
13,Lon + 12,"",2015-04-24 14:12:27.285824+00,2015-07-08,Tres Palmas,2015-06-18,1,Thinking About It
15,Don (5) + Lon (10),"",2015-04-24 14:16:54.336794+00,2015-08-01,Sandy,2015-07-25,1,Thinking About It
16,Don (5) + Lon (10),"",2015-04-24 14:17:46.810401+00,2015-08-01,Steps,2015-07-25,1,Thinking About It
17,Lon + 12,"",2015-04-24 14:20:46.182326+00,2015-08-15,Tres Palmas,2015-08-01,1,Thinking About It
18,Lon + 12,"",2015-04-24 14:21:29.825584+00,2015-08-15,Sandy,2015-08-01,1,Thinking About It
19,Lon + 12,"",2015-04-24 14:22:02.246532+00,2015-08-15,Steps,2015-08-01,1,Thinking About It
20,Donald & Skylar,"",2015-04-24 14:24:15.734973+00,2015-05-22,Steps,2015-05-17,1,Thinking About It
21,Lon/Logan + 3,"",2015-04-24 14:36:33.762864+00,2015-05-29,Steps,2015-05-25,1,Thinking About It
201,DON/KAT + 4,"ARRIVE FRIDAY 3/27 JET BLUE AT 8:34 PM.
DEPART SAT 4/4 JET BLUE 5:46AM

Arrive sat 3/28 1am jet blue 
Depart Sunday  4/5 3:15am jet blue",2020-03-01 20:22:51.796434+00,2020-04-05,Sandy,2020-03-26,1,Thinking About It
14,Don (5) + Lon (10),"",2015-04-24 14:16:21.440351+00,2015-08-01,Tres Palmas,2015-07-25,1,Thinking About It
24,Lon Jury Family,"",2015-09-16 12:11:59.055386+00,2016-01-03,Steps,2015-12-26,1,Thinking About It
25,Elier Rental,"",2015-09-29 22:40:25.66767+00,2016-03-08,Sandy,2016-03-01,1,Thinking About It
26, don weaver solo,"",2015-10-05 01:42:21.468251+00,2015-10-24,Steps,2015-10-18,1,Thinking About It
28,Don Weaver,"",2015-10-19 12:27:48.145711+00,2016-02-16,Steps,2016-02-10,1,Thinking About It
202,DON/KAT + 4,"ARRIVE FRIDAY 3/27 JET BLUE AT 8:34 PM.
DEPART SAT 4/4 JET BLUE 5:46AM

Arrive sat 3/28 1am jet blue 
Depart Sunday  4/5 3:15am jet blue",2020-03-01 20:24:35.498896+00,2020-04-05,Tres Palmas,2020-03-26,1,Thinking About It
31,Elier,"",2015-10-20 02:06:26.845064+00,2016-01-06,Sandy,2015-12-26,1,Thinking About It
27,Douglas and Campbell Weaver,"",2015-10-09 15:45:19.78086+00,2015-11-06,Steps,2015-11-02,1,Thinking About It
32,Mark Campbell plus 1,"",2015-10-20 19:54:32.931627+00,2015-11-09,Tres Palmas,2015-11-04,1,Thinking About It
51,Lon + 12,"",2016-02-29 23:15:07.067522+00,2016-07-07,Steps,2016-06-15,1,Thinking About It
22,Elier,"",2015-08-07 14:09:16.854346+00,2016-02-29,Sandy,2016-02-20,1,Thinking About It
52,Lon + 12,"",2016-02-29 23:15:59.560331+00,2016-07-07,Sandy,2016-06-15,1,Thinking About It
53,Lon + 12,"",2016-02-29 23:16:34.246966+00,2016-07-07,Tres Palmas,2016-06-15,1,Thinking About It
39,Elier Rental,"",2015-11-23 15:09:10.930047+00,2015-12-23,Sandy,2015-12-18,1,Thinking About It
74,Curley/Weaver,"",2016-10-12 20:02:13.675907+00,2017-01-20,Tres Palmas,2017-01-12,1,Thinking About It
54,Don (5) + Lon (10),"",2016-02-29 23:21:30.412325+00,2016-07-30,Steps,2016-07-23,1,Thinking About It
36,Skylar & Friends,"",2015-11-03 22:21:12.502704+00,2015-12-25,Steps,2015-12-18,1,Thinking About It
41,Douglas Weaver Family,"",2015-11-29 18:02:38.819519+00,2015-12-28,Tres Palmas,2015-12-21,1,Thinking About It
43,Carter Weaver,"",2015-12-01 15:05:23.236593+00,2016-03-30,Tres Palmas,2016-03-23,1,Thinking About It
44,Elier Rental,"",2015-12-04 15:48:41.310779+00,2016-01-19,Sandy,2016-01-14,1,Thinking About It
47,ELIER,"",2015-12-27 22:21:26.464544+00,2016-02-02,Sandy,2016-01-27,1,Thinking About It
46,Lon Jury (Rick Morris Family),"Rick is my business associate associate.  Rick , Amy and his 3 boys are renting Sandy for 1 week from Feb 12-19 or Feb 13-20.  Depending upon when Elier''s rental arrives on the 20th",2015-12-17 19:06:50.183362+00,2016-02-19,Tres Palmas,2016-02-12,1,Thinking About It
55,Don (5) + Lon (10),"",2016-02-29 23:22:12.287021+00,2016-07-30,Sandy,2016-07-23,1,Thinking About It
56,Don (5) + Lon (10),"",2016-02-29 23:22:47.511002+00,2016-07-30,Tres Palmas,2016-07-23,1,Thinking About It
57,Lon + 12,"",2016-02-29 23:23:41.248983+00,2016-08-13,Steps,2016-07-30,1,Thinking About It
58,Lon + 12,"",2016-02-29 23:24:17.876279+00,2016-08-13,Sandy,2016-07-30,1,Thinking About It
59,Lon + 12,"",2016-02-29 23:24:51.803822+00,2016-08-13,Tres Palmas,2016-07-30,1,Thinking About It
60,ELIER,"",2016-03-07 01:11:31.437263+00,2016-12-28,Sandy,2016-12-21,1,Thinking About It
42,Susan Curley (Wayne family),"",2015-12-01 15:04:47.986233+00,2016-03-30,Sandy,2016-03-24,1,Thinking About It
61,Don and Disco,"",2016-03-13 17:48:40.897264+00,2016-04-05,Steps,2016-03-29,1,Thinking About It
62,Cooper Weaver + 4,"",2016-05-19 22:59:04.54573+00,2016-06-13,Sandy,2016-06-07,1,Thinking About It
64,Kathy COGLEY (Don),2 floors,2016-07-16 16:30:45.302287+00,2017-01-30,Steps,2017-01-24,1,Thinking About It
63,Kathy COGLEY (Don),2 floors sandy and steps,2016-07-16 16:29:20.705925+00,2017-01-30,Sandy,2017-01-24,1,Thinking About It
72,WE ARE Weaver,"",2016-10-11 00:48:29.354433+00,2017-01-11,Sandy,2016-12-29,1,Thinking About It
73,WE ARE Weaver,"",2016-10-11 00:50:32.409357+00,2017-01-03,Tres Palmas,2016-12-24,1,Thinking About It
87,Rick Morris Family (Lon Jury),"Rick and Amy and the boys stayed On Tres Palmas last February while Don was there

They will arrive at Aguadilla 2/17 at 1:45 A.M.    and leave 2/24 at 2:55 A.M.",2016-12-09 01:30:29.352023+00,2017-02-24,Tres Palmas,2017-02-17,1,Thinking About It
83,Jury +,"Depart JFK 5:35 am Saturday, July 22nd and arrive BQN at 9:21 am 

Depart BQN 10:04am arrive JFK 1:54pm",2016-12-09 00:37:08.952711+00,2017-08-13,Steps,2017-07-22,1,Thinking About It
69,Jury,planning to depart NY Wednesday 4/12 and arrive BQN at 2 am on 4/13 and depart 2am on 4/18,2016-09-25 12:37:34.910588+00,2017-04-18,Steps,2017-04-13,1,Thinking About It
75,Don Weaver,"",2016-11-07 01:49:17.460204+00,2016-12-10,Sandy,2016-12-05,1,Thinking About It
71,WE ARE Weaver,"",2016-10-11 00:47:36.098294+00,2017-01-11,Steps,2017-01-03,1,Thinking About It
79,Curey/Weaver,"",2016-11-28 15:26:12.066833+00,2017-01-17,Steps,2017-01-12,1,Thinking About It
91,Cooper Weaver + CMU,"Sat, Mar 11  11:59 PM 04:44 AM
NEW YORK, NY (JFK) to AGUADILLA, PR (BQN)

Fri, Mar 17 05:05 AM  09:06 AM	
AGUADILLA, PR (BQN) to NEW YORK, NY (JFK)",2016-12-16 19:44:46.957075+00,2017-03-18,Tres Palmas,2017-03-12,1,Thinking About It
80,Jury +,"",2016-12-09 00:34:08.415437+00,2017-06-29,Steps,2017-06-15,1,Thinking About It
67,Jury,"Arrive at 4:43 BQN on Tuesday, December 27th
Depart BQN at 6:10 am on Sunday, January 1st",2016-09-25 12:31:12.483066+00,2017-01-02,Steps,2016-12-26,1,Thinking About It
77,DON And FALON CREW,"Don  + Kathy + Falon and Friends

arrive united Thursday  Jun 8
12:55 AM

depart Thursday Jun 15
1:55 AM",2016-11-24 01:38:30.054687+00,2017-06-15,Steps,2017-06-07,1,Thinking About It
90,Cooper Weaver + CMU,"",2016-12-16 19:44:18.358073+00,2017-03-17,Sandy,2017-03-12,1,Thinking About It
88,Cooper Weaver + CMU,"",2016-12-16 19:02:26.101745+00,2017-03-17,Steps,2017-03-12,1,Thinking About It
84,Jury +,"",2016-12-09 00:37:55.471768+00,2017-08-05,Sandy,2017-07-22,1,Thinking About It
85,Jury +,"",2016-12-09 00:38:41.765078+00,2017-08-05,Tres Palmas,2017-08-01,1,Thinking About It
168,Christian & Co.,"",2019-03-04 23:13:53.210315+00,2019-04-06,Tres Palmas,2019-03-30,1,Thinking About It
204,Mark & Kent,"",2020-04-20 00:59:53.772742+00,2020-07-20,Sandy,2020-07-06,1,Thinking About It
94,Campbell,"",2017-01-18 17:56:21.394834+00,2017-02-03,Steps,2017-01-31,1,Thinking About It
95,DON SOLO,"",2017-01-23 21:47:45.65404+00,2017-02-27,Sandy,2017-02-21,1,Thinking About It
86,Jury / Heffner,Dave and Dina are flying down night of 4/11 and  flying back morning of 4/18,2016-12-09 00:51:28.515938+00,2017-04-18,Sandy,2017-04-12,1,Thinking About It
68,Jury,"planning to depart NY Wednesday 2/15 and arrive BQN at 2 am on 2/16 and depart the morning of 02/20
may add 1 more level for friends",2016-09-25 12:34:21.358463+00,2017-02-20,Steps,2017-02-16,1,Thinking About It
118,SUSAN SOLO,"",2017-12-29 22:41:50.061653+00,2018-01-24,Tres Palmas,2018-01-16,1,Thinking About It
96,Mike & Kim Warner (Jury),"Sandy rental.   Dorothy''s relative
Kim Warner cell (717) 871-1050",2017-01-23 23:19:01.987916+00,2017-04-05,Sandy,2017-03-28,1,Thinking About It
97,Mark C,"",2017-02-01 00:08:29.285412+00,2017-02-14,Steps,2017-02-08,1,Thinking About It
129,KAT KELLY AND FRIENDS,"",2018-04-21 19:25:55.832367+00,2019-01-23,Sandy,2019-01-15,1,Thinking About It
206,Mark & Kent,"",2020-04-20 01:01:59.041969+00,2020-07-20,Steps,2020-07-06,1,Thinking About It
208,Jury Family,"",2020-07-04 19:29:28.218698+00,2020-07-06,Jeep,2020-06-13,1,Thinking About It
130,KAT KELLY AND FRIENDS,"",2018-04-21 19:26:44.851367+00,2019-01-23,Steps,2019-01-15,1,Thinking About It
98,DON W. guest,"HOWARD AMMONS (DON''S BUSINESS PARTNER) AND CHRISTY (DAUGHTER) AND 3 OTHERS

MON. 3/20 1am arrival

SAT. 3/25 1:55 departure",2017-02-08 22:50:41.760063+00,2017-03-25,Steps,2017-03-20,1,Thinking About It
102,DON WEAVER GUEST,"JEFF GRECO + GIRLFRIEND + 3 KIDS
631-278-2137
ARRIVES APRIL 10TH 3:44 AM
DEPARTS SAT APRIL 15TH 5:05 AM",2017-02-13 17:32:54.815684+00,2017-04-15,Tres Palmas,2017-04-09,1,Thinking About It
104,MARK C GUEST,"",2017-03-08 20:03:17.802483+00,2017-04-07,Tres Palmas,2017-04-03,1,Thinking About It
76,DON AND FALON CREW,"Don  + Kathy + Falon and Friends

arrive united Thursday  Jun 8
12:55 AM

depart Thursday Jun 15
1:55 AM",2016-11-24 01:37:21.644158+00,2017-06-15,Sandy,2017-06-07,1,Thinking About It
78,DON AND FALON CREW,"Don Kathy Falon and Friends

arrive united Thursday  Jun 8 at 12:55 AM

depart Thursday Jun 15 at 1:55 AM

Lon and Dorothy 
are departing JFK on Sat, Jun 10 at  11:59 PM and arriving BQN at 03:49 AM Sunday June 12th
**  staying in big bedroom on Tres Palmas - 2 of Falon''s friends are staying on the same floor in the ''bunker room'' **",2016-11-24 01:39:31.281411+00,2017-06-15,Tres Palmas,2017-06-07,1,Thinking About It
106,Don W,"",2017-09-02 00:53:10.301048+00,2018-02-12,Steps,2018-02-06,1,Thinking About It
107,Don W Premium Surfer,Solo,2017-09-17 14:37:00.089326+00,2017-10-27,Sandy,2017-10-22,1,Thinking About It
122,HOWARD AMMONS / CHRISTY...FRIENDS?,"3/13 1am arrive
3/19 2am depart
CHRISTY AND 3 FRIENDS",2018-01-07 18:57:33.136186+00,2018-03-19,Tres Palmas,2018-03-12,1,Thinking About It
125,Carter Weaver,"",2018-02-03 16:16:05.382259+00,2018-03-23,Sandy,2018-03-14,1,Thinking About It
123,Campbell+Friends,"",2018-01-29 17:10:52.977131+00,2018-04-09,Steps,2018-04-02,1,Thinking About It
133,Jury Family,"",2018-05-31 21:04:32.47908+00,2018-08-20,Steps,2018-08-10,1,Thinking About It
112,Douglas Weaver Family,"",2017-10-25 02:35:57.261655+00,2017-11-26,Steps,2017-11-21,1,Thinking About It
113,DON W SOLO,"",2017-10-27 01:51:01.84577+00,2017-12-11,Sandy,2017-12-05,1,Thinking About It
114,Campbell Weaver + Genna,"",2017-11-27 19:16:54.441996+00,2017-12-22,Steps,2017-12-17,1,Thinking About It
115,Jury,"",2017-11-28 16:32:10.968659+00,2018-01-01,Steps,2017-12-26,1,Thinking About It
116,MARK C GUIEST RICO & GF,"",2017-12-13 23:56:54.419217+00,2018-02-10,Sandy,2018-02-03,1,Thinking About It
117,DON WEAVER/AFTON AND FRIENDS/sky,"Skylar arrives on 3/15
DON/AFTON AND FRIENDS
DEPART SAT 9PM EWR
Arrive:
12:59 a.m. +1 Day
Sun., Mar. 18, 2018
Aguadilla, PR, US (BQN)
---------------------------------
Depart:   1:54 a.m.
Sat., Mar. 24, 2018
Aguadilla, PR, US (BQN)",2017-12-29 22:39:24.567677+00,2018-03-25,Steps,2018-03-15,1,Thinking About It
136,Skylar +,"",2018-08-01 19:56:16.217329+00,2018-08-06,Steps,2018-08-01,1,Thinking About It
137,Mark & Kent Family,"",2018-08-23 15:09:35.785019+00,2019-01-06,Tres Palmas,2018-12-28,1,Thinking About It
138,Mark & Kent Family,"",2018-08-23 15:10:36.155981+00,2019-01-06,Steps,2018-12-28,1,Thinking About It
121,Jury +,"Bechtold + guest     June 15 -20
Sylvan                       June 26 - July 1
Nottingham             July 3 - July 8",2018-01-07 18:56:05.137684+00,2018-07-11,Tres Palmas,2018-06-15,1,Thinking About It
126,Derek C & Friends,"",2018-04-05 15:43:39.951499+00,2018-05-21,Steps,2018-05-14,1,Thinking About It
120,Jury +,"Bechtold + Guest   June 15 -20
Sylvan                       June 26 - July 1
Nottingham             July 3 - July 8",2018-01-07 18:54:55.156052+00,2018-07-11,Sandy,2018-06-15,1,Thinking About It
119,Jury +,"Flight 2639
JFK   2:20pm 
BQN  6:13pm

Flight 838
BQN  5:10 am
JFK   9:03 am

Bechtold + guest     June 15 -20
Sylvan                       June 26 - July 1
Nottingham             July 3 - July 8",2018-01-07 18:54:00.714258+00,2018-07-11,Steps,2018-06-15,1,Thinking About It
110,Jury,"JetBlue 839
Friday, March 23. 11:59 am.  
Arrive BQN 3;42am Saturday March 24th      

Depart Monday, April 2nd 
Jet Blue flight 838 
5:02 am 
arrive JFK 9:01 am

Dave & Dina Heffner were scheduled at the same time but did not stay at the house due to the ''water situation''",2017-09-17 15:36:44.408014+00,2018-04-02,Steps,2018-03-24,1,Thinking About It
127,Campbell ++,"",2018-04-18 21:04:14.416907+00,2018-05-08,Steps,2018-05-03,1,Thinking About It
128,Campbell ++,"",2018-04-18 21:04:35.798375+00,2018-05-08,Sandy,2018-05-03,1,Thinking About It
153,Douglas Weaver Family,"",2018-12-29 03:21:31.231458+00,2019-03-20,Steps,2019-03-15,1,Thinking About It
152,"Don, Falon, Skylar Weaver","Jet Blue arrives 4AM Saturday 
Depart 6AM Friday",2018-12-12 12:29:04.631367+00,2019-01-11,Sandy,2019-01-04,1,Thinking About It
144,Campbell +,"",2018-09-11 15:22:15.194042+00,2018-12-29,Sandy,2018-12-19,1,Thinking About It
141,Don W - premium surfer,"",2018-08-23 22:28:45.445496+00,2018-10-20,Sandy,2018-10-14,1,Thinking About It
148,Doug Weaver-Family friend,"",2018-11-07 03:27:36.40421+00,2019-02-25,Steps,2019-02-21,1,Thinking About It
147,CRISTY AND HOWARD,"",2018-10-04 21:18:26.633786+00,2019-03-24,Tres Palmas,2019-03-17,1,Thinking About It
145,Douglas Weaver Family,"",2018-09-14 22:20:58.889614+00,2018-12-27,Steps,2018-12-19,1,Thinking About It
150,DFW,"",2018-12-06 18:41:39.726565+00,2018-12-11,Sandy,2018-12-06,1,Thinking About It
151,Rico & Sons (From MN via Mark),"",2018-12-11 23:28:13.491859+00,2019-03-15,Sandy,2019-03-08,1,Thinking About It
165,Jury Family,"",2019-03-02 21:32:37.365256+00,2019-08-19,Steps,2019-07-26,1,Thinking About It
149,Jury family,"Arrive April 16 at 3:47am
Depart April 22 10:00 am",2018-11-18 15:20:04.997334+00,2019-04-22,Steps,2019-04-15,1,Thinking About It
166,Jury Family,"",2019-03-02 21:39:49.488535+00,2019-08-10,Sandy,2019-08-03,1,Thinking About It
156,Douglas Weaver Family,"",2019-01-19 14:45:39.404634+00,2019-03-15,Steps,2019-03-08,1,Thinking About It
157,Douglas Weaver Family,"",2019-01-21 23:10:58.563068+00,2019-03-15,Tres Palmas,2019-03-08,1,Thinking About It
162,Jury / Bechtold,"",2019-03-02 21:28:15.99169+00,2019-06-23,Tres Palmas,2019-06-15,1,Thinking About It
159,Campbell Weaver + Co,"",2019-02-10 21:46:26.057102+00,2019-04-05,Sandy,2019-03-26,1,Thinking About It
161,Alex Campbell & Associates,"",2019-02-21 03:08:41.296811+00,2019-04-08,Steps,2019-04-03,1,Thinking About It
160,Campbell Weaver + Co,"",2019-02-19 17:36:17.785061+00,2019-04-02,Steps,2019-03-28,1,Thinking About It
163,Jury / Bechtold,"",2019-03-02 21:28:53.581956+00,2019-06-23,Sandy,2019-06-15,1,Thinking About It
155,Sam Lehr (Jury),Dorothy's son,2019-01-17 21:49:02.596087+00,2019-05-12,Steps,2019-05-03,1,Thinking About It
154,Douglas Weaver Family,Isabel and 1 friend arrives BQN from Newark 3/17 at 12:50 am ... departs BQN to Ft Lauderdale 3/22 at 3:28 am,2018-12-29 03:21:54.120305+00,2019-03-22,Sandy,2019-03-15,1,Thinking About It
169,Douglas Weaver Family,"",2019-03-07 17:47:03.953405+00,2019-03-20,Jeep,2019-03-08,1,Thinking About It
190,Douglas Weaver Family,"",2019-11-12 18:04:17.651883+00,2020-03-23,Steps,2020-03-18,1,Thinking About It
170,Jury family,"",2019-03-07 18:57:49.243849+00,2019-04-22,Jeep,2019-04-15,1,Thinking About It
203,DON/KAT + 4,"",2020-03-01 20:25:19.587799+00,2020-04-04,Jeep,2020-03-26,1,Thinking About It
167,DON/KAT,"FLY DOWN SUNDAY NIGHT 5/26 ...RETURN SUN EARLY AM FLIGHT.
Depart: Sunday, May 26, 2019 
FLIGHT
0839

 ROUTE
JFK

New York-Kennedy, NY (JFK) 
  to BQN

Aguadilla, PR (BQN) 
   DEPART
11:59 PM 
ARRIVE
3:51 AM
(Next day)

Return: Sunday, June 2, 2019 
FLIGHT
0838
Aircraft (321)
 ROUTE
BQN

Aguadilla, PR (BQN) 
  to JFK

New York-Kennedy, NY (JFK) 
   DEPART
5:13 AM 

ARRIVE
9:10 AM",2019-03-03 00:36:37.170277+00,2019-06-02,Sandy,2019-05-26,1,Thinking About It
172,Trick or Treat Mark & Kent,"",2019-08-07 15:11:53.380645+00,2019-11-03,Sandy,2019-10-29,1,Thinking About It
173,Mark & Ghouls,"",2019-08-07 15:13:24.387231+00,2019-11-03,Steps,2019-10-29,1,Thinking About It
174,DON Q,"ARRIVE FRIDAY 10/11 AT 1AM
DEPART TUES 10/15 AT MIDNIGHT",2019-09-13 16:21:09.87203+00,2019-10-16,Sandy,2019-10-10,1,Thinking About It
175,DON AND KAT,"",2019-09-13 17:06:15.372301+00,2019-12-17,Sandy,2019-12-10,1,Thinking About It
176,Don W and girls,"United.   Confirmation Number:
N7YY2Z
Flight 1 of 2 UA1071		Class: Economy (T)
Wed, Jan 01, 2020		Thu, Jan 02, 2020
08:02 PM		12:50 AM
New York/Newark, NJ, US (EWR)		Aguadilla, PR, US (BQN)
Flight 2 of 2 UA1162		Class: Economy (W)
Wed, Jan 08, 2020		Wed, Jan 08, 2020
01:50 AM		04:48 AM",2019-10-16 18:12:26.296395+00,2020-01-08,Steps,2020-01-01,1,Thinking About It
171,Jury Family,"",2019-04-06 17:14:40.477879+00,2019-08-18,Sandy,2019-08-11,1,Thinking About It
205,Mark & Kent,"",2020-04-20 01:00:49.847047+00,2020-07-20,Tres Palmas,2020-07-06,1,Thinking About It
217,Jury Family,"+ Trish & Stumpy 
Tickets purchased",2020-12-19 12:25:10.645186+00,2021-02-16,Steps,2021-02-10,1,Thinking About It
182,Jury Family,Arrive in SJU (BQN Closed) on Saturday July 25th,2019-11-10 12:59:49.60477+00,2020-08-17,Steps,2020-07-25,1,Thinking About It
218,Jury Family,United to BQN,2020-12-19 12:27:44.623466+00,2021-04-05,Steps,2021-03-26,1,Thinking About It
180,Jury +,"Dorothy''s work colleagues 
Kaylin''s 2020 graduation crew (Dorothy and I will be at VDS the entire time)
Lon + family",2019-11-10 12:54:27.774673+00,2020-07-06,Sandy,2020-06-13,1,Thinking About It
219,Dave & Dina Heffner (Jury) Rental,Dave / Dina.  Another couple + Dylan,2020-12-19 12:32:47.314645+00,2021-04-05,Sandy,2021-03-26,1,Thinking About It
220,Jury Family,"",2020-12-19 12:36:49.83296+00,2021-04-05,Jeep,2021-03-26,1,Thinking About It
207,Jury Family,"",2020-07-04 19:28:15.883693+00,2020-08-17,Jeep,2020-07-25,1,Thinking About It
179,Jury Family,"Dorothy''s work colleagues 
Kaylin''s 2020 graduation crew (Dorothy and I will be at VDS the entire time)
Lon + family",2019-11-10 12:48:59.437553+00,2020-07-06,Steps,2020-06-13,1,Thinking About It
183,Jury Family,"",2019-11-10 13:07:12.709185+00,2020-08-16,Sandy,2020-08-08,1,Thinking About It
194,Douglas Weaver Family,"",2019-11-14 22:12:41.748915+00,2020-01-25,Jeep,2020-01-14,1,Thinking About It
193,Douglas Weaver Family,"",2019-11-14 22:12:12.211209+00,2020-01-25,Steps,2020-01-14,1,Thinking About It
195,Kim Webber (Jury),"Colleague of Dorothy’s 
Kim + 2 others",2019-11-21 00:16:35.426361+00,2020-02-22,Sandy,2020-02-14,1,Thinking About It
196,Douglas Weaver Family,"",2019-11-22 04:02:23.432052+00,2020-01-22,Sandy,2020-01-17,1,Thinking About It
197,Christy Ammons (DFW friend) plus 2,"United 
Jan 10 1 Am arrives 
Jan 16th 1:50 Am departs",2019-12-20 07:39:35.301284+00,2020-01-16,Tres Palmas,2020-01-09,1,Thinking About It
198,DON W SOLO,"",2020-02-04 03:37:03.171659+00,2020-02-28,Sandy,2020-02-22,1,Thinking About It
222,Kim Webber (Jury),"Rental - Dorothy’s teacher friend 
Kim rented this floor last year during the same week",2021-01-20 23:36:41.203934+00,2021-02-21,Sandy,2021-02-13,1,Thinking About It
192,Douglas Weaver Family,"",2019-11-12 18:05:23.603167+00,2020-03-25,Jeep,2020-03-16,1,Thinking About It
191,Douglas Weaver Family,"",2019-11-12 18:04:40.084548+00,2020-03-25,Tres Palmas,2020-03-16,1,Thinking About It
189,Douglas Weaver Family,"",2019-11-12 18:03:49.811399+00,2020-03-25,Sandy,2020-03-16,1,Thinking About It
223,Maddy (Jury),Maddy may be coming with us on the 10th - 15th or she may go these dates.   Call me if you have any questions or want us to consolidate to the top floor.  As soon as I know if she is coming with us on the 10th I will update.,2021-01-20 23:40:14.502056+00,2021-02-20,Tres Palmas,2021-02-13,1,Thinking About It
215,Douglas Weaver Family,"",2020-11-12 00:49:42.398743+00,2021-01-31,Steps,2021-01-04,1,Thinking About It
224,Linda Hallinan (Campbell Rental),"",2021-01-25 22:55:16.182835+00,2021-03-27,Tres Palmas,2021-03-20,1,Thinking About It
216,Douglas Weaver Family (see note),I anticipate having a new vehicle for the house by early December.  We should discuss whether to hold on to the Jeep for the duration of the pandemic of if rentals are cheap and easy we can sell it.,2020-11-12 00:50:55.542456+00,2021-01-31,Jeep,2021-01-04,1,Thinking About It
226,Susan Curley,"",2021-03-01 22:45:27.03166+00,2021-04-30,Steps,2021-04-06,1,Thinking About It
227,Susan Curley,"",2021-03-01 22:45:56.599712+00,2021-04-30,Jeep,2021-04-06,1,Thinking About It
249,Jury Family,"",2021-06-17 20:11:11.609078+00,2021-08-18,Sandy,2021-07-22,1,Thinking About It
233,Maddy (Jury),"",2021-03-26 13:20:21.628294+00,2021-07-17,Tres Palmas,2021-07-10,1,Thinking About It
232,Maddy (Jury),I will confirm this by May,2021-03-26 13:19:37.024118+00,2021-07-17,Sandy,2021-07-12,1,Thinking About It
234,Christian Campbell & Co,"",2021-04-06 14:48:46.427783+00,2021-05-27,Sandy,2021-05-18,1,Thinking About It
241,Campbell Weaver + co,"",2021-04-28 01:11:13.947226+00,2021-05-16,Jeep,2021-05-09,1,Thinking About It
225,Susan Curley,"",2021-03-01 22:44:49.227201+00,2021-05-30,Tres Palmas,2021-04-14,1,Thinking About It
235,DON W. with Craig and Daniel,use jeep,2021-04-18 23:09:05.774963+00,2021-05-24,Steps,2021-05-17,1,Thinking About It
231,Campbell Weaver + co,"",2021-03-15 16:27:26.161431+00,2021-05-16,Steps,2021-05-09,1,Thinking About It
239,Carter Weaver + co,"",2021-04-22 21:43:00.320694+00,2021-06-11,Steps,2021-05-24,1,Thinking About It
240,Carter Weaver + co,"",2021-04-25 17:07:23.864914+00,2021-06-11,Jeep,2021-05-24,1,Thinking About It
245,Douglas Weaver,"",2021-06-07 11:30:26.697302+00,2021-06-23,Steps,2021-06-11,1,Thinking About It
250,Jury Family,"",2021-06-17 20:11:47.951384+00,2021-08-18,Tres Palmas,2021-07-22,1,Thinking About It
246,Douglas Weaver,"",2021-06-07 11:30:49.544617+00,2021-06-23,Volvo,2021-06-11,1,Confirmed
252,Campbell + Friends,"",2021-06-25 00:58:22.67771+00,2022-01-06,Sandy,2021-12-27,1,Confirmed
221,Jury Family (see note),these dates are confirmed,2020-12-19 12:40:57.507517+00,2021-08-18,Steps,2021-07-22,1,Thinking About It
247,Falon W. AND 3 FRIENDS,"",2021-06-07 14:40:54.346052+00,2021-07-17,Steps,2021-07-11,1,Confirmed
251,Campbell + Friends,"",2021-06-25 00:57:55.365445+00,2022-01-06,Tres Palmas,2021-12-29,1,Confirmed
253,Campbell + Friends,"",2021-06-25 03:16:33.805018+00,2022-01-06,Jeep,2021-12-27,1,Confirmed
244,Cooper Weaver + 1,"",2021-05-11 19:39:35.964646+00,2021-07-07,Jeep,2021-06-26,1,Confirmed
243,Cooper Weaver + 1,"",2021-05-11 19:39:14.834404+00,2021-07-07,Steps,2021-06-26,1,Confirmed
290,Susan Curley,"",2022-01-18 14:40:39.46341+00,2022-03-23,Volvo,2022-02-24,1,Confirmed
258,Vince & Kim Blando (Jury rental),"",2021-08-22 14:12:38.177933+00,2022-04-18,Sandy,2022-04-08,1,Confirmed
268,Mark & Kent,"",2021-10-18 18:13:24.517529+00,2021-12-14,Sandy,2021-12-09,1,Confirmed
259,Dave & Dina Heffner (rental Jury),"",2021-08-22 16:37:52.216721+00,2022-04-18,Tres Palmas,2022-04-08,1,Pretty Sure
255,Campbell + Friends,"",2021-07-06 21:21:55.637514+00,2022-01-05,Steps,2021-12-27,1,Confirmed
260,Campbell Weaver,"",2021-09-09 14:11:45.911645+00,2022-01-05,Volvo,2021-12-27,1,Confirmed
263,DON W SOLO,"",2021-09-26 01:44:33.881902+00,2021-11-13,Jeep,2021-11-07,1,Confirmed
266,Linda Famigletti (Jury friend rental),"",2021-10-12 14:30:30.955685+00,2022-07-04,Tres Palmas,2022-06-26,1,Pretty Sure
267,Mark & Kent,"",2021-10-12 17:10:34.459436+00,2021-12-14,Steps,2021-12-09,1,Confirmed
262,DON W. AND BRO DOUG,"Sunday, November 07, 2021
Departing Sun, Nov 7 7:57 pm New York/Newark, NJ, US (EWR) Arriving Mon, Nov 8 12:50 am Aguadilla, PR, US (BQN)Number of stops Nonstop

Saturday, November 13, 2021
Departing 2:00 am Aguadilla, PR, US (BQN) Arriving 4:58 am New York/Newark, NJ, US (EWR)Number of stops Nonstop",2021-09-26 01:42:23.737584+00,2021-11-13,Sandy,2021-11-07,1,Confirmed
271,Kim Weber (rental - Jury),"She has rented before 
daughter works in Rincon
she and Dorothy work together 
when Kim sends their airline tickets I will input",2021-10-30 12:45:51.921852+00,2022-02-20,Tres Palmas,2022-02-12,1,Confirmed
256,Evan Good  (rental Jury),"Lon will add his flight information

Evan is late 20''s friend of Sam and travelling with girlfriend 

814-242-3921 EVAN CELL",2021-08-22 14:08:54.643844+00,2021-11-21,Sandy,2021-11-13,1,Confirmed
273,Jury Family,"",2021-10-30 13:13:07.437469+00,2022-08-21,Sandy,2022-08-01,1,Confirmed
287,Alex C & Friends,"6/8 11:50 pm arrive
6/12 1 am depart UNITED BQN",2022-01-16 16:53:58.699369+00,2022-06-12,Sandy,2022-06-05,1,Pretty Sure
281,DON W.,"",2021-11-14 23:00:29.197267+00,2022-01-13,Jeep,2022-01-05,1,Confirmed
257,Jury Family,"",2021-08-22 14:11:37.089152+00,2022-04-24,Steps,2022-04-08,1,Confirmed
293,Susan Curley,"",2022-01-18 17:36:45.256138+00,2022-01-24,Volvo,2022-01-18,1,Confirmed
299,DON W. + KAT AND GUESTS,"Betzie /Tim arriving 12midnight Sunday EWR/BQN
Devon doug Saturday June 11 8:44 AM",2022-02-12 16:09:58.247102+00,2022-06-20,Tres Palmas,2022-06-13,1,Pretty Sure
284,Maddy (+ 2 friends) - Jury,"asking Doug about other dates will change to confirmed as soon as confirmed

Landing sju 2/19 10:am",2021-12-09 18:49:03.98544+00,2022-02-28,Steps,2022-02-19,1,Confirmed
277,Doug and Carter,"",2021-10-31 02:03:12.989655+00,2022-01-15,Sandy,2022-01-09,1,Confirmed
270,Kim Webber (rental - Jury),"She has rented before 
daughter works in Rincon
she and Dorothy work together 
when Kim sends their airline tickets I will input

arrive at 7pm Friday",2021-10-30 12:43:22.055125+00,2022-02-20,Sandy,2022-02-11,1,Confirmed
283,Doug and Carter,"",2021-12-07 01:57:18.982966+00,2022-01-15,Volvo,2022-01-09,1,Confirmed
297,DON W. + KAT AND GUESTS,"",2022-02-12 16:07:41.464365+00,2022-06-20,Sandy,2022-06-13,1,Pretty Sure
292,Susan Curley,"",2022-01-18 17:31:39.300711+00,2022-03-23,Steps,2022-03-09,1,Confirmed
301,Doug Weaver,"",2022-03-14 23:37:36.79065+00,2022-04-06,Steps,2022-03-26,1,Confirmed
296,Jim Weber (Lon Friend),"",2022-01-30 15:14:50.278733+00,2022-02-04,Steps,2022-01-22,1,Confirmed
294,RYAN W/ WIFE AND 1 CHILD,"ARRIVE 3 PM 
PRIOR RENTER-FROM RI ... FRIEND OF ELIERS.
2/19 RYAN LEAVING 3AM ... 
STEPS NEEDS TO BE CLEANED ON 1/19 FOR MADDY 1PM ARRIVAL.",2022-01-18 18:36:45.850388+00,2022-02-19,Steps,2022-02-08,1,Confirmed
282,Susan Curley,"",2021-12-06 14:02:49.432227+00,2022-01-24,Sandy,2022-01-12,1,Confirmed
269,DON W AND KIDS,"",2021-10-19 00:56:52.954124+00,2022-01-13,Steps,2022-01-05,1,Pretty Sure
280,Carter Weaver,"",2021-11-06 18:47:52.133315+00,2022-03-09,Steps,2022-03-01,1,Confirmed
276,Douglas Weaver,"",2021-10-30 15:09:11.178629+00,2022-02-08,Sandy,2022-01-24,1,Confirmed
261,Susan Curley,"",2021-09-23 14:50:49.843353+00,2022-03-23,Sandy,2022-02-24,1,Confirmed
278,Susan Curley,"",2021-11-01 13:18:53.60971+00,2022-03-09,Tres Palmas,2022-02-24,1,Confirmed
286,Susan Curley,"",2022-01-02 20:07:22.249565+00,2022-03-23,Jeep,2022-02-24,1,Confirmed
291,Douglas Weaver,"",2022-01-18 15:20:57.933729+00,2022-02-08,Volvo,2022-01-25,1,Confirmed
289,Alex C & Friends,"",2022-01-16 16:57:43.561689+00,2022-06-12,Volvo,2022-06-05,1,Pretty Sure
300,PJ and Samantha Pepi (rental - Jury),Overlap with Lon et al.    Lon will compress until PJ and Sammi leave.,2022-03-11 13:50:55.148897+00,2022-07-31,Sandy,2022-07-23,1,Confirmed
272,Jury Family,"",2021-10-30 13:12:14.060254+00,2022-08-21,Steps,2022-08-14,1,Confirmed
288,Alex C & Friends,"6/8 11:50 pm arrive
6/12 1 am depart UNITED BQN",2022-01-16 16:55:50.254141+00,2022-06-12,Tres Palmas,2022-06-05,1,Pretty Sure
248,ELIER FRIEND -RYAN RICHER  (PER DON),"Arrive:
 November 10th 4:38am (need the 9th night)

richergraphics@gmail.com
Depart:
November 21st 6:05am
Ryan Richer
401-742-4361
Richergraphics@gmail.com

$1500",2021-06-15 19:39:48.588768+00,2021-11-21,Tres Palmas,2021-11-09,1,Confirmed
298,DON W. + KAT AND GUESTS,"",2022-02-12 16:08:07.947933+00,2022-06-20,Steps,2022-06-10,1,Confirmed
265,Linda Famigletti  (Jury friend rental),"",2021-10-12 14:29:27.737123+00,2022-07-04,Sandy,2022-06-26,1,Confirmed
303,Kent's Daughter Julia,"",2022-07-07 13:41:38.008022+00,2022-09-05,Sandy,2022-08-29,1,Confirmed
304,RYAN RICHER - DON BOOKED,"richergraphics@gmail.com

November 10TH ARRIVE BQN 4:45 AM JET BLUE
DEPART TUES NOV 22 10:40 AM

Ryan Richer
401-742-4361
Richergraphics@gmail.com",2022-07-08 13:47:36.334396+00,2022-11-22,Tres Palmas,2022-11-10,1,Confirmed
306,Mark Kent & Co,"",2022-08-07 20:01:31.064467+00,2022-12-14,Sandy,2022-12-08,1,Pretty Sure
307,Mark Kent &  Co,"",2022-08-07 20:04:47.019047+00,2022-12-14,Steps,2022-12-08,1,Pretty Sure
308,Lon Jury,"",2022-08-14 16:47:58.876212+00,2023-04-10,Steps,2023-03-31,1,Confirmed
309,Dave & Dina Heffner (Jury rental),"",2022-08-14 16:48:52.700294+00,2023-04-10,Tres Palmas,2023-03-31,1,Confirmed
310,Vince & Kim Blando (Jury Rental),"",2022-08-14 16:49:56.687598+00,2023-04-10,Sandy,2023-03-31,1,Confirmed
311,Don solo?,"Arriving 1am Sunday 16th…departing 1am Sunday 24th
United EWR to bqn",2022-09-08 00:54:34.790444+00,2022-10-24,Steps,2022-10-16,1,Confirmed
312,Don and kids,"",2022-09-08 01:37:33.158837+00,2023-01-11,Steps,2023-01-01,1,Pretty Sure
313,Michelle Fernandez (Jury rental),"",2022-09-10 21:09:12.656203+00,2022-10-31,Sandy,2022-10-24,1,Pretty Sure
320,Susan Curley,"",2022-09-19 01:29:34.684398+00,2022-12-08,Sandy,2022-12-01,1,Thinking About It
369,Campbell W,"",2023-10-01 17:54:47.754627+00,2024-01-01,Steps,2023-12-26,1,Confirmed
381,Rick Morris Family,"Rick, Amy
Ricky, Rylan and Roen

works with Lon
friends with Lon and Don 

I will add flight information",2023-10-16 20:04:56.493314+00,2023-12-20,Tres Palmas,2023-12-13,1,Confirmed
387,CW Friend Josh,"",2023-10-31 23:00:15.372063+00,2024-02-25,Steps,2024-02-22,1,Thinking About It
364,DFW SOLO,"",2023-08-06 16:24:14.705078+00,2023-11-04,Sandy,2023-10-25,1,Confirmed
339,Carter,"",2022-12-29 18:56:58.733782+00,2023-03-02,Tres Palmas,2023-02-25,1,Confirmed
328,DON AND KIDS,"",2022-10-24 17:07:01.148084+00,2023-01-11,Jeep,2023-01-01,1,Confirmed
363,RYAN RICHER,DON BOOKED RYAN-ELIER FRIEND.,2023-07-11 21:12:20.281914+00,2023-11-21,Tres Palmas,2023-11-09,1,Confirmed
330,Douglas Weaver,"",2022-11-16 14:43:42.414169+00,2023-01-26,Steps,2023-01-08,1,Confirmed
358,DON AND KIDS,"",2023-06-02 13:52:34.300407+00,2024-01-12,Steps,2024-01-01,1,Confirmed
331,Susan Curley,"",2022-11-16 15:04:38.075747+00,2022-12-08,Steps,2022-11-29,1,Confirmed
332,Max - Christian's Friend,"",2022-11-20 21:49:07.037922+00,2023-01-05,Sandy,2023-01-01,1,Confirmed
333,Campbell Weaver,"",2022-11-22 15:25:21.33442+00,2022-12-31,Tres Palmas,2022-12-26,1,Thinking About It
335,Ryan Richer / family,"Repeat guest…DFW knows him…also friends with Elier. 
Arriving very early on 3rd.",2022-11-30 02:42:04.169283+00,2023-03-12,Sandy,2023-03-03,1,Confirmed
359,DON AND KIDS,"",2023-06-02 13:53:17.049303+00,2024-01-09,Volvo,2024-01-02,1,Thinking About It
316,Dina Heffner's Parents (Jury rental),"Charles and Delinda Duccilli
3704 Shore Drive
Villas, NJ 08251-1059",2022-09-10 21:15:09.868509+00,2023-02-19,Sandy,2023-02-03,1,Confirmed
323,Campbell W,"",2022-09-22 20:16:55.622606+00,2023-03-31,Sandy,2023-03-17,1,Confirmed
322,Campbell W,"",2022-09-22 20:16:29.135337+00,2023-03-31,Steps,2023-03-17,1,Confirmed
326,Campbell Weaver,"",2022-10-11 13:32:18.924607+00,2023-03-31,Jeep,2023-03-17,1,Confirmed
324,Campbell W,"",2022-09-22 20:17:49.293551+00,2023-03-31,Tres Palmas,2023-03-20,1,Confirmed
361,Mark & Kent & KIds/Friends,"",2023-06-02 16:49:44.728066+00,2024-01-13,Tres Palmas,2024-01-03,1,Pretty Sure
352,Lon Jury,"",2023-04-17 12:17:01.323065+00,2023-07-10,Steps,2023-06-19,1,Pretty Sure
334,KELLY FOGARTY AND FAMILY (PER DFW),"",2022-11-29 02:05:29.052843+00,2023-02-11,Tres Palmas,2023-02-06,1,Pretty Sure
327,Susan Curley,"",2022-10-24 17:03:25.812764+00,2023-03-17,Steps,2023-02-07,1,Confirmed
325,Christian C & Friends,"",2022-10-11 13:10:55.742381+00,2023-03-20,Tres Palmas,2023-03-10,1,Confirmed
343,Lon Jury,"",2023-01-18 17:05:01.701683+00,2023-08-20,Steps,2023-08-06,1,Confirmed
340,Susan Curley,"",2022-12-29 22:07:40.581418+00,2023-03-17,Jeep,2023-02-07,1,Pretty Sure
321,Mark Campbell,"",2022-09-22 20:13:54.667953+00,2023-01-31,Steps,2023-01-24,1,Confirmed
346,cooper bachelor,"",2023-02-20 19:06:50.143105+00,2023-07-17,Sandy,2023-07-10,1,Thinking About It
347,cooper bachelor,"",2023-02-20 19:08:04.15928+00,2023-07-17,Steps,2023-07-10,1,Thinking About It
348,cooper bachelor,"",2023-02-20 19:11:07.399511+00,2023-07-17,Tres Palmas,2023-07-10,1,Thinking About It
349,Rico & Sons MAC Rental,"",2023-03-01 20:24:17.702181+00,2023-04-15,Sandy,2023-04-11,1,Confirmed
350,Susan Curley,"",2023-03-19 08:22:44.665103+00,2023-05-02,Steps,2023-04-12,1,Thinking About It
354,Michelle Fernndez (Lon),"",2023-04-30 12:44:46.693604+00,2023-06-18,Sandy,2023-06-09,1,Confirmed
353,Lon Jury,"",2023-04-17 12:17:39.674947+00,2023-07-10,Jeep,2023-06-18,1,Confirmed
362,Lon Jury,"",2023-07-05 12:17:20.386007+00,2023-08-20,Jeep,2023-08-06,1,Confirmed
378,Dorothy Jury,"",2023-10-13 17:51:00.331866+00,2024-04-01,Steps,2024-03-22,1,Confirmed
373,Douglas Weaver,"",2023-10-11 16:19:43.246962+00,2024-02-03,Steps,2024-01-13,1,Pretty Sure
374,Douglas Weaver,"",2023-10-11 16:24:49.020744+00,2024-02-03,Jeep,2024-01-13,1,Pretty Sure
360,Mark & Kent,"",2023-06-02 16:46:50.623231+00,2024-01-13,Sandy,2024-01-02,1,Confirmed
372,Susan Curley,"",2023-10-04 20:19:10.911998+00,2024-01-02,Steps,2023-12-16,1,Thinking About It
379,Jury Group,"",2023-10-13 17:52:26.234409+00,2024-04-01,Sandy,2024-03-22,1,Confirmed
382,Susan curley,"",2023-10-19 12:30:51.716881+00,2024-03-22,Steps,2024-02-20,1,Pretty Sure
376,Campbell W,"",2023-10-12 15:45:11.071874+00,2024-01-02,Tres Palmas,2023-12-26,1,Pretty Sure
380,Jury Group,"",2023-10-13 17:53:32.795637+00,2024-04-01,Sandy,2024-03-22,1,Confirmed
383,Susan Curley,"",2023-10-19 12:32:26.035341+00,2024-03-12,Tres Palmas,2024-03-05,1,Pretty Sure
366,Campbell Weaver +friends,"",2023-09-19 02:59:17.95075+00,2024-02-20,Steps,2024-02-15,1,Confirmed
367,Campbell Weaver + friends,"",2023-09-19 03:00:04.640591+00,2024-02-20,Sandy,2024-02-15,1,Confirmed
368,Campbell Weaver +,"",2023-09-19 13:35:56.730736+00,2024-02-20,Tres Palmas,2024-02-15,1,Confirmed
377,Campbell W,"",2023-10-12 16:22:48.677612+00,2024-01-01,Sandy,2023-12-26,1,Confirmed
384,Susan Curley,"",2023-10-19 12:33:32.563035+00,2024-03-12,Sandy,2024-03-05,1,Pretty Sure
385,Susan Curley,"",2023-10-19 12:34:19.100475+00,2024-03-22,Jeep,2024-02-20,1,Pretty Sure
386,Susan Curley,"",2023-10-24 18:57:22.053402+00,2023-12-01,Steps,2023-11-14,1,Confirmed`


/**
 * CSVToArray parses any String of Data including '\r' '\n' characters,
 * and returns an array with the rows of data.
 * @param {String} CSV_string - the CSV string you need to parse
 * @param {String} delimiter - the delimeter used to separate fields of data
 * @returns {Array} rows - rows of CSV where first row are column headers
 */
function CSVToArray(CSV_string, delimiter) {
    delimiter = (delimiter || ","); // user-supplied delimeter or default comma

    var pattern = new RegExp( // regular expression to parse the CSV values.
        ( // Delimiters:
            "(\\" + delimiter + "|\\r?\\n|\\r|^)" +
            // Quoted fields.
            "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
            // Standard fields.
            "([^\"\\" + delimiter + "\\r\\n]*))"
        ), "gi"
    );

    var rows = [[]];  // array to hold our data. First row is column headers.
    // array to hold our individual pattern matching groups:
    var matches = false; // false if we don't find any matches
    // Loop until we no longer find a regular expression match
    while ((matches = pattern.exec(CSV_string))) {
        var matched_delimiter = matches[1]; // Get the matched delimiter
        // Check if the delimiter has a length (and is not the start of string)
        // and if it matches field delimiter. If not, it is a row delimiter.
        if (matched_delimiter.length && matched_delimiter !== delimiter) {
            // Since this is a new row of data, add an empty row to the array.
            rows.push([]);
        }
        var matched_value;
        // Once we have eliminated the delimiter, check to see
        // what kind of value was captured (quoted or unquoted):
        if (matches[2]) { // found quoted value. unescape any double quotes.
            matched_value = matches[2].replace(
                new RegExp("\"\"", "g"), "\""
            );
        } else { // found a non-quoted value
            matched_value = matches[3];
        }
        // Now that we have our value string, let's add
        // it to the data array.
        rows[rows.length - 1].push(matched_value);
    }
    return rows; // Return the parsed data Array
}


export function testBookings() {

    let bk = [];
    for (let i = -5; i < 25; i = i + 2) {
        bk.push(
            {
                guests: 'testgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestgueststestguests ' + i,
                description: '',
                levels: ['SANDY', 'STEPS', 'TRESPALMAS'],
                autos: ['VOLVO', 'JEEP'],
                commitment: commitmentDefault,
                checkIn: dayjs().tz().hour(3).minute(0).second(0).add(i * 7 + 1, 'day').toISOString(),
                checkOut: dayjs().tz().hour(3).minute(0).second(0).add((i + 1) * 7 + 1, 'day').toISOString(),
                type: "Booking"
            }
        );
    }
    return bk;
}

export function importCSVBookings() {

    var rows = CSVToArray(csv, ',');

    // The first row will be the header
    // let header = rows[0];
    // The rest is the data
    let data = rows.slice(2);

    const autoArray = ['Volvo', 'Jeep']
    // Reduce each row into the desired format, and use the ID as a key
    let result = data.map((currentItem) => {

        console.log(currentItem[8])
        // const newbk = {...currentItem};
        // Object.assign(newbk,
        const newbk = {
            guests: currentItem[1],
            description: currentItem[2] || '',
            levels: autoArray.includes(currentItem[5]) ? [] : [VDSLabelToLevel(currentItem[5])],
            autos: autoArray.includes(currentItem[5]) ? [VDSLabelToAuto(currentItem[5])] : [],
            commitment: VDSLabelToCommitment(currentItem[8]),
            checkIn: dayjs(currentItem[6]).toISOString(),
            checkOut: dayjs(currentItem[4]).toISOString(),
            type: "Booking"
        };
        // console.log(newbk)
        return newbk;
    }
    )

    // Log the result
    console.log(result);
    return result;

}


